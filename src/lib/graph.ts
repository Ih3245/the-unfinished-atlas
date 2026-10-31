import {
  PLACES,
  ARTIFACTS,
  EVENTS,
  PEOPLE,
  RELATIONSHIPS,
} from '@/data';
import type {
  GraphEntityType,
  CertaintyLevel,
} from '@/types/atlas';
import { normalizeText } from './filters';

export interface ObservatoryNode {
  id: string;
  entityType: GraphEntityType;
  catalogueRef: string;
  label: string;
  subtitle: string;
  href: string;
  degree: number;
  x: number;
  y: number;
}

export interface ObservatoryEdge {
  id: string;
  sourceId: string;
  targetId: string;
  label: string;
  detail: string;
  certainty: CertaintyLevel;
  weight: 1 | 2 | 3;
}

export interface ObservatoryGraph {
  nodes: ObservatoryNode[];
  edges: ObservatoryEdge[];
}

export interface ConnectedNeighbor {
  node: ObservatoryNode;
  edge: ObservatoryEdge;
  direction: 'outgoing' | 'incoming';
}

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/**
 * Builds the complete typed entity relationship network from the dataset
 * and computes a deterministic, readable force-relaxed 2D layout within
 * an 960x620 viewport without requiring runtime physics loops that burn CPU.
 */
export function buildObservatoryGraph(
  enabledTypes?: GraphEntityType[],
  searchQuery?: string
): ObservatoryGraph {
  const allowedTypes = new Set<GraphEntityType>(
    enabledTypes && enabledTypes.length > 0
      ? enabledTypes
      : ['place', 'artifact', 'event', 'person']
  );

  const rawNodes: Omit<ObservatoryNode, 'degree' | 'x' | 'y'>[] = [];

  if (allowedTypes.has('place')) {
    for (const p of PLACES) {
      rawNodes.push({
        id: p.id,
        entityType: 'place',
        catalogueRef: p.catalogueRef,
        label: p.name,
        subtitle: `${p.region} · ${p.activeSpan.eraSummary}`,
        href: `/places/${p.slug}`,
      });
    }
  }

  if (allowedTypes.has('artifact')) {
    for (const a of ARTIFACTS) {
      rawNodes.push({
        id: a.id,
        entityType: 'artifact',
        catalogueRef: a.catalogueRef,
        label: a.title,
        subtitle: `${a.dateDisplay} · ${a.creator}`,
        href: `/artifacts/${a.id}`,
      });
    }
  }

  if (allowedTypes.has('event')) {
    for (const e of EVENTS) {
      rawNodes.push({
        id: e.id,
        entityType: 'event',
        catalogueRef: e.catalogueRef,
        label: e.title,
        subtitle: e.dateDisplay,
        href: `/search?q=${encodeURIComponent(e.catalogueRef)}`,
      });
    }
  }

  if (allowedTypes.has('person')) {
    for (const per of PEOPLE) {
      rawNodes.push({
        id: per.id,
        entityType: 'person',
        catalogueRef: per.catalogueRef,
        label: per.name,
        subtitle: `${per.role} (${per.lifespanDisplay})`,
        href: `/search?q=${encodeURIComponent(per.name)}`,
      });
    }
  }

  const candidateIds = new Set(rawNodes.map((n) => n.id));

  // Combine explicit curated RELATIONSHIPS with structural primary artifact->place links
  // avoiding duplicate pairs so every node in the archive has authentic connectivity.
  const edgeMap = new Map<string, ObservatoryEdge>();

  for (const rel of RELATIONSHIPS) {
    if (candidateIds.has(rel.fromId) && candidateIds.has(rel.toId)) {
      edgeMap.set(rel.id, {
        id: rel.id,
        sourceId: rel.fromId,
        targetId: rel.toId,
        label: rel.label,
        detail: rel.detail,
        certainty: rel.certainty,
        weight: rel.weight,
      });
    }
  }

  // Ensure every artifact connects to its primary place if both are enabled and not already linked
  if (allowedTypes.has('place') && allowedTypes.has('artifact')) {
    for (const art of ARTIFACTS) {
      if (!candidateIds.has(art.id) || !candidateIds.has(art.placeId)) continue;
      const alreadyLinked = Array.from(edgeMap.values()).some(
        (e) =>
          (e.sourceId === art.id && e.targetId === art.placeId) ||
          (e.sourceId === art.placeId && e.targetId === art.id)
      );
      if (!alreadyLinked) {
        const autoId = `rel-struct-${art.id}-${art.placeId}`;
        edgeMap.set(autoId, {
          id: autoId,
          sourceId: art.id,
          targetId: art.placeId,
          label: 'Primary archival provenance',
          detail: `${art.catalogueRef} documents ${art.dateDisplay} stratum.`,
          certainty: art.dateCertainty,
          weight: 2,
        });
      }
    }
  }

  let edges = Array.from(edgeMap.values());

  // Apply search filter: keep matching nodes + their immediate 1st-degree neighbors if query provided
  const normQ = searchQuery ? normalizeText(searchQuery) : '';
  let filteredRawNodes = rawNodes;

  if (normQ) {
    const directMatches = new Set(
      rawNodes
        .filter((n) =>
          normalizeText(`${n.label} ${n.catalogueRef} ${n.subtitle}`).includes(normQ)
        )
        .map((n) => n.id)
    );
    const keepIds = new Set<string>(directMatches);
    for (const e of edges) {
      if (directMatches.has(e.sourceId)) keepIds.add(e.targetId);
      if (directMatches.has(e.targetId)) keepIds.add(e.sourceId);
    }
    filteredRawNodes = rawNodes.filter((n) => keepIds.has(n.id));
    const finalSet = new Set(filteredRawNodes.map((n) => n.id));
    edges = edges.filter((e) => finalSet.has(e.sourceId) && finalSet.has(e.targetId));
  }

  // Compute degrees
  const degreeCount = new Map<string, number>();
  for (const n of filteredRawNodes) degreeCount.set(n.id, 0);
  for (const e of edges) {
    degreeCount.set(e.sourceId, (degreeCount.get(e.sourceId) ?? 0) + 1);
    degreeCount.set(e.targetId, (degreeCount.get(e.targetId) ?? 0) + 1);
  }

  // Deterministic concentric + force-relaxed layout (960 x 620)
  const W = 960;
  const H = 620;
  const cx = W / 2;
  const cy = H / 2;

  const nodes: ObservatoryNode[] = filteredRawNodes.map((n, index) => {
    const total = Math.max(filteredRawNodes.length, 1);
    const baseAngle = (index / total) * Math.PI * 2 + hashSeed(n.id) * 0.35;
    const radiusByType =
      n.entityType === 'place'
        ? 135
        : n.entityType === 'person'
          ? 205
          : n.entityType === 'event'
            ? 235
            : 268;
    return {
      ...n,
      degree: degreeCount.get(n.id) ?? 0,
      x: cx + Math.cos(baseAngle) * radiusByType * 1.25,
      y: cy + Math.sin(baseAngle) * radiusByType * 0.88,
    };
  });

  // Safeguarded bounded force relaxation (75 iterations max — O(N^2) for N <= 65 is <2ms)
  const nodeIndex = new Map<string, number>();
  nodes.forEach((n, idx) => nodeIndex.set(n.id, idx));

  const iterations = Math.min(75, Math.max(30, nodes.length));
  for (let iter = 0; iter < iterations; iter++) {
    const cooling = 1 - iter / iterations;
    const dxArr = new Float64Array(nodes.length);
    const dyArr = new Float64Array(nodes.length);

    // Repulsion
    for (let i = 0; i < nodes.length; i++) {
      const ni = nodes[i]!;
      for (let j = i + 1; j < nodes.length; j++) {
        const nj = nodes[j]!;
        let dx = ni.x - nj.x;
        let dy = ni.y - nj.y;
        const distSq = dx * dx + dy * dy + 0.1;
        const dist = Math.sqrt(distSq);
        if (dist < 190) {
          const force = (3400 / distSq) * cooling;
          dx = (dx / dist) * force;
          dy = (dy / dist) * force;
          dxArr[i]! += dx;
          dyArr[i]! += dy;
          dxArr[j]! -= dx;
          dyArr[j]! -= dy;
        }
      }
    }

    // Spring attraction
    for (const edge of edges) {
      const si = nodeIndex.get(edge.sourceId);
      const ti = nodeIndex.get(edge.targetId);
      if (si === undefined || ti === undefined) continue;
      const sn = nodes[si]!;
      const tn = nodes[ti]!;
      const dx = tn.x - sn.x;
      const dy = tn.y - sn.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const targetLen = sn.entityType === 'place' && tn.entityType === 'place' ? 185 : 122;
      const pull = ((dist - targetLen) * 0.045 * cooling * (edge.weight * 0.4 + 0.6));
      const fx = (dx / dist) * pull;
      const fy = (dy / dist) * pull;
      dxArr[si]! += fx;
      dyArr[si]! += fy;
      dxArr[ti]! -= fx;
      dyArr[ti]! -= fy;
    }

    // Gentle centering gravity & viewport clamping
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]!;
      const grav = n.entityType === 'place' ? 0.022 : 0.009;
      n.x += dxArr[i]! + (cx - n.x) * grav * cooling;
      n.y += dyArr[i]! + (cy - n.y) * grav * cooling;
      n.x = Math.max(58, Math.min(W - 58, Math.round(n.x * 10) / 10));
      n.y = Math.max(48, Math.min(H - 48, Math.round(n.y * 10) / 10));
    }
  }

  return { nodes, edges };
}

export function getEntityConnections(
  graph: ObservatoryGraph,
  nodeId: string
): ConnectedNeighbor[] {
  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));
  const neighbors: ConnectedNeighbor[] = [];

  for (const edge of graph.edges) {
    if (edge.sourceId === nodeId) {
      const target = nodeMap.get(edge.targetId);
      if (target) {
        neighbors.push({ node: target, edge, direction: 'outgoing' });
      }
    } else if (edge.targetId === nodeId) {
      const source = nodeMap.get(edge.sourceId);
      if (source) {
        neighbors.push({ node: source, edge, direction: 'incoming' });
      }
    }
  }

  return neighbors.sort((a, b) => b.edge.weight - a.edge.weight);
}
