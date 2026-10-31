'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { GraphEntityType } from '@/types/atlas';
import { CERTAINTY_LABELS } from '@/data';
import {
  buildObservatoryGraph,
  getEntityConnections,
  type ObservatoryEdge,
  type ObservatoryNode,
} from '@/lib/graph';

const ALL_ENTITY_TYPES: {
  type: GraphEntityType;
  label: string;
  shapeLabel: string;
  color: string;
}[] = [
  {
    type: 'place',
    label: 'Places',
    shapeLabel: 'Double Circle',
    color: '#8E3E2A',
  },
  {
    type: 'artifact',
    label: 'Artifacts',
    shapeLabel: 'Square',
    color: '#4B4E38',
  },
  {
    type: 'event',
    label: 'Events',
    shapeLabel: 'Diamond',
    color: '#7A4F13',
  },
  {
    type: 'person',
    label: 'People',
    shapeLabel: 'Hexagon',
    color: '#292820',
  },
];

function renderNodeShape(
  node: ObservatoryNode,
  isSelected: boolean,
  isHighlighted: boolean
) {
  const strokeW = isSelected ? 2.6 : isHighlighted ? 1.8 : 1.3;
  if (node.entityType === 'place') {
    return (
      <>
        <circle
          r={isSelected ? 14 : 11.5}
          fill="#8E3E2A"
          stroke="#FFFCF5"
          strokeWidth={strokeW}
        />
        <circle
          r={isSelected ? 18 : 15}
          fill="none"
          stroke="#8E3E2A"
          strokeWidth="1.2"
        />
      </>
    );
  }
  if (node.entityType === 'artifact') {
    const s = isSelected ? 18 : 14;
    return (
      <rect
        x={-s / 2}
        y={-s / 2}
        width={s}
        height={s}
        fill="#4B4E38"
        stroke="#FFFCF5"
        strokeWidth={strokeW}
      />
    );
  }
  if (node.entityType === 'event') {
    const r = isSelected ? 12 : 9.5;
    return (
      <polygon
        points={`0,${-r} ${r},0 0,${r} ${-r},0`}
        fill="#7A4F13"
        stroke="#FFFCF5"
        strokeWidth={strokeW}
      />
    );
  }
  // Person: Hexagon
  const r = isSelected ? 11.5 : 9.5;
  const pts = [0, 1, 2, 3, 4, 5]
    .map((k) => {
      const a = (Math.PI / 3) * k - Math.PI / 6;
      return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
    })
    .join(' ');
  return (
    <polygon
      points={pts}
      fill="#292820"
      stroke="#FFFCF5"
      strokeWidth={strokeW}
    />
  );
}

const LOGICAL_WIDTH = 960;
const LOGICAL_HEIGHT = 620;

function ObservatoryCanvasView({
  visibleNodes,
  visibleEdges,
  nodeMap,
  activeNode,
  neighborIdSet,
  onSelectNode,
}: {
  visibleNodes: ObservatoryNode[];
  visibleEdges: ObservatoryEdge[];
  nodeMap: Map<string, ObservatoryNode>;
  activeNode: ObservatoryNode | null;
  neighborIdSet: Set<string>;
  onSelectNode: (id: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [canvasCssWidth, setCanvasCssWidth] = useState<number>(LOGICAL_WIDTH);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const first = entries[0];
      if (first && first.contentRect.width > 0) {
        setCanvasCssWidth(first.contentRect.width);
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const scale = canvasCssWidth / LOGICAL_WIDTH;
    const cssHeight = LOGICAL_HEIGHT * scale;

    canvas.width = Math.round(canvasCssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);

    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);

    // Paper survey sheet background
    ctx.fillStyle = '#F2ECE0';
    ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

    // Subtle 80px cartographic graticule
    ctx.save();
    ctx.strokeStyle = '#E4DDD0';
    ctx.lineWidth = 0.75;
    for (let gx = 80; gx < LOGICAL_WIDTH; gx += 80) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, LOGICAL_HEIGHT);
      ctx.stroke();
    }
    for (let gy = 80; gy < LOGICAL_HEIGHT; gy += 80) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(LOGICAL_WIDTH, gy);
      ctx.stroke();
    }
    ctx.restore();

    // Principal Meridian & Baseline crosshairs
    ctx.save();
    ctx.strokeStyle = '#C9BFAE';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(LOGICAL_WIDTH / 2, 0);
    ctx.lineTo(LOGICAL_WIDTH / 2, LOGICAL_HEIGHT);
    ctx.moveTo(0, LOGICAL_HEIGHT / 2);
    ctx.lineTo(LOGICAL_WIDTH, LOGICAL_HEIGHT / 2);
    ctx.stroke();
    ctx.restore();

    // Relationship edges
    for (const edge of visibleEdges) {
      const sNode = nodeMap.get(edge.sourceId);
      const tNode = nodeMap.get(edge.targetId);
      if (!sNode || !tNode) continue;

      const isIncident =
        activeNode !== null &&
        (edge.sourceId === activeNode.id || edge.targetId === activeNode.id);
      const dimmed = Boolean(activeNode && !isIncident);

      ctx.save();
      ctx.strokeStyle = isIncident ? '#8E3E2A' : '#89877F';
      ctx.lineWidth = isIncident ? 2.2 : 1.1;
      ctx.globalAlpha = dimmed ? 0.16 : isIncident ? 0.95 : 0.45;
      if (
        edge.certainty === 'contested' ||
        edge.certainty === 'approximate'
      ) {
        ctx.setLineDash([5, 3.5]);
      }
      ctx.beginPath();
      ctx.moveTo(sNode.x, sNode.y);
      ctx.lineTo(tNode.x, tNode.y);
      ctx.stroke();
      ctx.restore();
    }

    // Entity nodes
    for (const node of visibleNodes) {
      const isSelected = activeNode?.id === node.id;
      const isHovered = hoveredNodeId === node.id;
      const isNeighbor = neighborIdSet.has(node.id);
      const dimmed = Boolean(activeNode && !isNeighbor);

      ctx.save();
      ctx.globalAlpha = dimmed ? 0.24 : 1;
      ctx.translate(node.x, node.y);

      if (isHovered && !isSelected) {
        ctx.beginPath();
        ctx.arc(0, 0, 19, 0, Math.PI * 2);
        ctx.strokeStyle = '#8E3E2A';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      const strokeW = isSelected ? 2.6 : isNeighbor ? 1.8 : 1.3;

      if (node.entityType === 'place') {
        const innerR = isSelected ? 14 : 11.5;
        const outerR = isSelected ? 18 : 15;
        ctx.beginPath();
        ctx.arc(0, 0, innerR, 0, Math.PI * 2);
        ctx.fillStyle = '#8E3E2A';
        ctx.fill();
        ctx.lineWidth = strokeW;
        ctx.strokeStyle = '#FFFCF5';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, outerR, 0, Math.PI * 2);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = '#8E3E2A';
        ctx.stroke();
      } else if (node.entityType === 'artifact') {
        const s = isSelected ? 18 : 14;
        ctx.fillStyle = '#4B4E38';
        ctx.strokeStyle = '#FFFCF5';
        ctx.lineWidth = strokeW;
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.strokeRect(-s / 2, -s / 2, s, s);
      } else if (node.entityType === 'event') {
        const r = isSelected ? 12 : 9.5;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(r, 0);
        ctx.lineTo(0, r);
        ctx.lineTo(-r, 0);
        ctx.closePath();
        ctx.fillStyle = '#7A4F13';
        ctx.fill();
        ctx.strokeStyle = '#FFFCF5';
        ctx.lineWidth = strokeW;
        ctx.stroke();
      } else {
        const r = isSelected ? 11.5 : 9.5;
        ctx.beginPath();
        for (let k = 0; k < 6; k += 1) {
          const a = (Math.PI / 3) * k - Math.PI / 6;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = '#292820';
        ctx.fill();
        ctx.strokeStyle = '#FFFCF5';
        ctx.lineWidth = strokeW;
        ctx.stroke();
      }

      const showLabel =
        node.entityType === 'place' ||
        node.entityType === 'person' ||
        isSelected ||
        isHovered ||
        Boolean(activeNode && isNeighbor);

      if (showLabel) {
        const labelText = node.label.slice(0, 22);
        ctx.font = `${isSelected ? '700' : '500'} 10px monospace`;
        const measured = ctx.measureText(labelText).width;
        const boxW = Math.min(182, measured + 10);

        ctx.fillStyle = isSelected ? '#292820' : 'rgba(255, 252, 245, 0.94)';
        ctx.strokeStyle = isSelected ? '#292820' : '#B8AF9E';
        ctx.lineWidth = 0.8;
        ctx.fillRect(12, -7, boxW, 16);
        ctx.strokeRect(12, -7, boxW, 16);

        ctx.fillStyle = isSelected ? '#FFFCF5' : '#292820';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, 17, 1);
      }

      ctx.restore();
    }
  }, [
    visibleNodes,
    visibleEdges,
    nodeMap,
    activeNode,
    neighborIdSet,
    hoveredNodeId,
    canvasCssWidth,
  ]);

  const findHitNode = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): ObservatoryNode | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const lx = ((event.clientX - rect.left) / rect.width) * LOGICAL_WIDTH;
    const ly = ((event.clientY - rect.top) / rect.height) * LOGICAL_HEIGHT;

    let closest: ObservatoryNode | null = null;
    let minDist = 22;
    for (const node of visibleNodes) {
      const dist = Math.hypot(node.x - lx, node.y - ly);
      if (dist <= minDist) {
        minDist = dist;
        closest = node;
      }
    }
    return closest;
  };

  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive HTML5 canvas entity relationship network"
      onMouseMove={(e) => {
        const hit = findHitNode(e);
        setHoveredNodeId(hit ? hit.id : null);
      }}
      onMouseLeave={() => setHoveredNodeId(null)}
      onClick={(e) => {
        const hit = findHitNode(e);
        if (hit) onSelectNode(hit.id);
      }}
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        aspectRatio: '960 / 620',
        background: '#F2ECE0',
        border: '1px solid var(--rule-strong)',
        cursor: hoveredNodeId ? 'pointer' : 'crosshair',
      }}
    >
      Interactive relationship network canvas. Use the Keyboard Node Selector
      below or switch to the Accessible Ledger Table view.
    </canvas>
  );
}

export function ObservatoryClient({
  initialNodeId,
}: {
  initialNodeId?: string;
}) {
  const [enabledTypes, setEnabledTypes] = useState<GraphEntityType[]>([
    'place',
    'artifact',
    'event',
    'person',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    initialNodeId ?? 'pl-st-clement-concourse'
  );
  const [isolateImmediateOnly, setIsolateImmediateOnly] = useState(false);
  const [displayMode, setDisplayMode] = useState<'svg' | 'canvas' | 'table'>(
    'svg'
  );

  const graph = useMemo(
    () => buildObservatoryGraph(enabledTypes, searchQuery),
    [enabledTypes, searchQuery]
  );

  // Derive valid selected node from current filtered graph
  const activeNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return graph.nodes.find((n) => n.id === selectedNodeId) ?? null;
  }, [graph.nodes, selectedNodeId]);

  const connections = useMemo(() => {
    if (!activeNode) return [];
    return getEntityConnections(graph, activeNode.id);
  }, [graph, activeNode]);

  const neighborIdSet = useMemo(() => {
    const set = new Set<string>();
    if (activeNode) {
      set.add(activeNode.id);
      for (const c of connections) set.add(c.node.id);
    }
    return set;
  }, [activeNode, connections]);

  const visibleNodes = useMemo(() => {
    if (isolateImmediateOnly && activeNode) {
      return graph.nodes.filter((n) => neighborIdSet.has(n.id));
    }
    return graph.nodes;
  }, [graph.nodes, isolateImmediateOnly, activeNode, neighborIdSet]);

  const visibleNodeIds = useMemo(
    () => new Set(visibleNodes.map((n) => n.id)),
    [visibleNodes]
  );

  const visibleEdges = useMemo(
    () =>
      graph.edges.filter(
        (e) => visibleNodeIds.has(e.sourceId) && visibleNodeIds.has(e.targetId)
      ),
    [graph.edges, visibleNodeIds]
  );

  const nodeMap = useMemo(
    () => new Map(graph.nodes.map((n) => [n.id, n])),
    [graph.nodes]
  );

  const toggleEntityType = (t: GraphEntityType) => {
    setEnabledTypes((prev) => {
      if (prev.includes(t)) {
        // Keep at least one entity type active
        return prev.length > 1 ? prev.filter((item) => item !== t) : prev;
      }
      return [...prev, t];
    });
  };

  const resetObservatory = () => {
    setEnabledTypes(['place', 'artifact', 'event', 'person']);
    setSearchQuery('');
    setIsolateImmediateOnly(false);
    setSelectedNodeId(null);
  };

  return (
    <div style={{ paddingBlock: '1.5rem 2.5rem', display: 'grid', gap: '1.5rem' }}>
      {/* Controls & Visual Encoding Legend */}
      <div
        style={{
          background: 'var(--paper-chalk)',
          border: '1px solid var(--rule-strong)',
          padding: '1.25rem',
          display: 'grid',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
            gap: '1rem',
            alignItems: 'end',
          }}
        >
          <div>
            <label htmlFor="obs-search" className="archival-label">
              Filter Network by Entity Name or Catalogue Code
            </label>
            <input
              id="obs-search"
              type="search"
              className="archival-input"
              placeholder="e.g., Pendelton, St. Clement, UA-AR-19…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div
              role="group"
              aria-label="Visualization renderer mode"
              style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.35rem' }}
            >
              {(
                [
                  { id: 'svg', label: 'SVG Vector' },
                  { id: 'canvas', label: 'HTML5 Canvas' },
                  { id: 'table', label: 'Ledger Table' },
                ] as const
              ).map((mode) => {
                const active = displayMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setDisplayMode(mode.id)}
                    className={
                      active
                        ? 'btn-archival'
                        : 'btn-archival btn-secondary'
                    }
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>

            {activeNode && (
              <button
                type="button"
                aria-pressed={isolateImmediateOnly}
                onClick={() => setIsolateImmediateOnly((v) => !v)}
                className={
                  isolateImmediateOnly
                    ? 'btn-archival btn-terracotta'
                    : 'btn-archival btn-secondary'
                }
              >
                {isolateImmediateOnly
                  ? 'Showing Ego-Network Only'
                  : 'Isolate Immediate Connections'}
              </button>
            )}

            <button
              type="button"
              onClick={resetObservatory}
              className="btn-archival btn-secondary"
            >
              Reset Selection &amp; Filters
            </button>
          </div>
        </div>

        {/* Entity Type Toggles + Shape Legend (Shape + Color + Label) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingBlockStart: '0.75rem',
            borderBlockStart: '1px solid var(--rule-fine)',
          }}
        >
          <div
            role="group"
            aria-label="Filter network by entity types"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}
          >
            {ALL_ENTITY_TYPES.map((et) => {
              const active = enabledTypes.includes(et.type);
              return (
                <button
                  key={et.type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleEntityType(et.type)}
                  style={{
                    minHeight: '44px',
                    padding: '0.4rem 0.85rem',
                    fontFamily: 'var(--font-catalogue)',
                    fontSize: '0.75rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: active ? et.color : 'var(--paper-warm)',
                    color: active ? '#FFFCF5' : 'var(--ink-primary)',
                    border: `1px solid ${active ? et.color : 'var(--rule-strong)'}`,
                    borderRadius: 'var(--radius-sharp)',
                    cursor: 'pointer',
                  }}
                >
                  <span>{active ? '✓' : '○'}</span>
                  <span>
                    {et.label} ({et.shapeLabel})
                  </span>
                </button>
              );
            })}
          </div>

          <span className="catalogue-code" aria-live="polite">
            {visibleNodes.length} NODES · {visibleEdges.length} EVIDENTIARY
            EDGES
          </span>
        </div>
      </div>

      {/* Main Graph + Selected Entity Detail Panel */}
      {visibleNodes.length === 0 ? (
        <div
          style={{
            padding: '2rem',
            background: 'var(--paper-chalk)',
            border: '1px solid var(--rule-strong)',
          }}
        >
          <h2 style={{ fontSize: 'var(--text-h3)', marginBlockEnd: '0.5rem' }}>
            No entities match “{searchQuery}”
          </h2>
          <button
            type="button"
            onClick={resetObservatory}
            className="btn-archival"
          >
            Restore Full Network
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              displayMode !== 'table'
                ? 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))'
                : '1fr',
            gap: '1.35rem',
            alignItems: 'start',
          }}
        >
          {displayMode !== 'table' ? (
            <div
              style={{
                gridColumn: 'span 1',
                background: 'var(--paper-chalk)',
                border: '1px solid var(--ink-primary)',
                padding: '0.85rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBlockEnd: '0.5rem',
                }}
                className="catalogue-code"
              >
                <span>
                  FORCE-RELAXED ARCHIVAL NETWORK PROJECTION (
                  {displayMode === 'canvas' ? 'HTML5 CANVAS 2D' : 'SVG VECTOR'})
                </span>
                <span>SELECT ANY NODE TO HIGHLIGHT 1ST-DEGREE LINKS</span>
              </div>

              {displayMode === 'canvas' ? (
                <ObservatoryCanvasView
                  visibleNodes={visibleNodes}
                  visibleEdges={visibleEdges}
                  nodeMap={nodeMap}
                  activeNode={activeNode}
                  neighborIdSet={neighborIdSet}
                  onSelectNode={(id) => setSelectedNodeId(id)}
                />
              ) : (
                <svg
                viewBox="0 0 960 620"
                role="group"
                aria-label="Interactive entity relationship network"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '960 / 620',
                  background: '#F2ECE0',
                  border: '1px solid var(--rule-strong)',
                }}
              >
                {/* Subtle Coordinate Crosshairs */}
                <line
                  x1="480"
                  y1="0"
                  x2="480"
                  y2="620"
                  stroke="#D8D0C2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="310"
                  x2="960"
                  y2="310"
                  stroke="#D8D0C2"
                  strokeDasharray="4 4"
                />

                {/* Relationship Edges */}
                <g>
                  {visibleEdges.map((edge) => {
                    const sNode = nodeMap.get(edge.sourceId);
                    const tNode = nodeMap.get(edge.targetId);
                    if (!sNode || !tNode) return null;

                    const isIncident =
                      activeNode &&
                      (edge.sourceId === activeNode.id ||
                        edge.targetId === activeNode.id);
                    const dimmed = Boolean(activeNode && !isIncident);

                    return (
                      <line
                        key={edge.id}
                        x1={sNode.x}
                        y1={sNode.y}
                        x2={tNode.x}
                        y2={tNode.y}
                        stroke={isIncident ? '#8E3E2A' : '#89877F'}
                        strokeWidth={isIncident ? 2.2 : 1.1}
                        strokeOpacity={dimmed ? 0.16 : isIncident ? 0.95 : 0.45}
                        strokeDasharray={
                          edge.certainty === 'contested' ||
                          edge.certainty === 'approximate'
                            ? '5 3.5'
                            : undefined
                        }
                      />
                    );
                  })}
                </g>

                {/* Entity Nodes */}
                <g>
                  {visibleNodes.map((node) => {
                    const isSelected = activeNode?.id === node.id;
                    const isNeighbor = neighborIdSet.has(node.id);
                    const dimmed = Boolean(activeNode && !isNeighbor);
                    const showLabel =
                      node.entityType === 'place' ||
                      node.entityType === 'person' ||
                      isSelected ||
                      (activeNode && isNeighbor);

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        opacity={dimmed ? 0.24 : 1}
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <circle r="20" fill="transparent" />
                        {renderNodeShape(node, isSelected, isNeighbor)}
                        {showLabel && (
                          <g transform="translate(14, 4)">
                            <rect
                              x="-2"
                              y="-11"
                              width={Math.min(
                                178,
                                node.label.slice(0, 22).length * 6.2 + 12
                              )}
                              height="16"
                              rx="1.5"
                              fill={isSelected ? '#292820' : '#FFFCF5'}
                              fillOpacity="0.93"
                              stroke={isSelected ? '#292820' : '#B8AF9E'}
                              strokeWidth="0.8"
                            />
                            <text
                              x="3"
                              y="0"
                              fontSize="10"
                              fontFamily="monospace"
                              fontWeight={isSelected ? '700' : '500'}
                              fill={isSelected ? '#FFFCF5' : '#292820'}
                            >
                              {node.label.slice(0, 22)}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>
              )}

              {/* Keyboard Quick-Jump Selector below SVG / Canvas */}
              <div
                style={{
                  marginBlockStart: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  flexWrap: 'wrap',
                }}
              >
                <label
                  htmlFor="obs-node-picker"
                  className="catalogue-code"
                  style={{ fontWeight: 600 }}
                >
                  KEYBOARD NODE SELECTOR:
                </label>
                <select
                  id="obs-node-picker"
                  className="archival-select"
                  style={{ maxWidth: '24rem', minHeight: '44px' }}
                  value={activeNode?.id ?? ''}
                  onChange={(e) =>
                    setSelectedNodeId(e.target.value || null)
                  }
                >
                  <option value="">— No node selected (overview) —</option>
                  {visibleNodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      [{n.entityType.toUpperCase()}] {n.catalogueRef} · {n.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            /* Accessible Structured Ledger Table View */
            <div
              className="table-wrapper"
              tabIndex={0}
              role="region"
              aria-label="Complete archival relationship matrix"
            >
              <table className="archival-table">
                <caption>
                  ARCHIVAL RELATIONSHIP MATRIX ({visibleEdges.length} CONNECTIONS)
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Source Entity</th>
                    <th scope="col">Relationship &amp; Certainty</th>
                    <th scope="col">Target Entity</th>
                    <th scope="col">Evidentiary Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleEdges.map((edge) => {
                    const s = nodeMap.get(edge.sourceId);
                    const t = nodeMap.get(edge.targetId);
                    if (!s || !t) return null;
                    return (
                      <tr key={edge.id}>
                        <th scope="row">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedNodeId(s.id);
                              setDisplayMode('svg');
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              textAlign: 'start',
                              fontWeight: 600,
                              color: 'var(--accent-terracotta)',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            }}
                          >
                            {s.catalogueRef} · {s.label}
                          </button>
                        </th>
                        <td data-label="Relationship">
                          <strong>{edge.label}</strong>
                          <div className="catalogue-code">
                            {CERTAINTY_LABELS[edge.certainty]}
                          </div>
                        </td>
                        <td data-label="Target">
                          <Link href={t.href}>
                            {t.catalogueRef} · {t.label}
                          </Link>
                        </td>
                        <td data-label="Detail">{edge.detail}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Selected Entity Detail Panel */}
          <aside
            aria-label="Selected network entity inspector"
            style={{
              background: 'var(--paper-chalk)',
              border: '1px solid var(--ink-primary)',
              padding: '1.35rem',
              display: 'grid',
              gap: '1rem',
            }}
          >
            {!activeNode ? (
              <div>
                <span className="catalogue-code">NETWORK INSPECTOR</span>
                <h2 style={{ fontSize: 'var(--text-h3)', marginBlock: '0.3rem 0.5rem' }}>
                  Select a node to inspect its archival connections
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--ink-secondary)',
                  }}
                >
                  Click any circle (Place), square (Artifact), diamond (Event),
                  or hexagon (Person) on the plate—or choose from the keyboard
                  selector—to isolate its first-degree relationships.
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    paddingBlockEnd: '0.75rem',
                    borderBlockEnd: '1px solid var(--rule-fine)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    className="catalogue-code"
                  >
                    <span
                      style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}
                    >
                      {activeNode.entityType.toUpperCase()} ·{' '}
                      {activeNode.catalogueRef}
                    </span>
                    <span>{connections.length} IMMEDIATE LINKS</span>
                  </div>
                  <h2
                    style={{
                      fontSize: 'var(--text-h3)',
                      marginBlock: '0.3rem 0.25rem',
                    }}
                  >
                    {activeNode.label}
                  </h2>
                  <p
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--ink-secondary)',
                    }}
                  >
                    {activeNode.subtitle}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBlockStart: '0.85rem',
                    }}
                  >
                    <Link href={activeNode.href} className="btn-archival">
                      Open Corresponding Record
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedNodeId(null)}
                      className="btn-archival btn-secondary"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>

                <div>
                  <div
                    className="catalogue-code"
                    style={{ marginBlockEnd: '0.6rem' }}
                  >
                    IMMEDIATE CONNECTIONS ({connections.length})
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'grid',
                      gap: '0.6rem',
                      maxHeight: '26rem',
                      overflowY: 'auto',
                    }}
                  >
                    {connections.map(({ node: neighbor, edge }) => (
                      <li
                        key={edge.id}
                        style={{
                          padding: '0.75rem',
                          background: 'var(--paper-warm)',
                          border: '1px solid var(--rule-strong)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '0.4rem',
                          }}
                          className="catalogue-code"
                        >
                          <span>
                            {neighbor.entityType.toUpperCase()} ·{' '}
                            {neighbor.catalogueRef}
                          </span>
                          <span>{CERTAINTY_LABELS[edge.certainty]}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedNodeId(neighbor.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            marginBlock: '0.2rem',
                            textAlign: 'start',
                            fontFamily: 'var(--font-editorial)',
                            fontSize: '1.06rem',
                            fontWeight: 600,
                            color: 'var(--ink-primary)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {neighbor.label}
                        </button>
                        <div
                          style={{
                            fontSize: 'var(--text-caption)',
                            fontWeight: 600,
                            color: 'var(--accent-terracotta)',
                          }}
                        >
                          {edge.label}
                        </div>
                        <p
                          style={{
                            fontSize: 'var(--text-caption)',
                            color: 'var(--ink-secondary)',
                            marginBlockStart: '0.15rem',
                          }}
                        >
                          {edge.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
