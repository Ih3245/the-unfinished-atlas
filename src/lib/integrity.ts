import {
  PLACES,
  ARTIFACTS,
  EVENTS,
  PEOPLE,
  PERIODS,
  SOURCES,
  RELATIONSHIPS,
} from '@/data';
import type { GraphEntityType } from '@/types/atlas';

export interface IntegrityReport {
  valid: boolean;
  errors: string[];
  counts: {
    places: number;
    artifacts: number;
    events: number;
    people: number;
    periods: number;
    sources: number;
    relationships: number;
  };
}

export function validateDatasetIntegrity(): IntegrityReport {
  const errors: string[] = [];

  const placeIds = new Set<string>();
  const placeSlugs = new Set<string>();
  const artifactIds = new Set<string>();
  const eventIds = new Set<string>();
  const personIds = new Set<string>();
  const periodIds = new Set<string>();
  const sourceIds = new Set<string>();
  const relationshipIds = new Set<string>();

  if (PLACES.length < 8) {
    errors.push(`Expected at least 8 places, found ${PLACES.length}.`);
  }
  if (ARTIFACTS.length < 24) {
    errors.push(`Expected at least 24 artifacts, found ${ARTIFACTS.length}.`);
  }
  if (EVENTS.length < 12) {
    errors.push(`Expected at least 12 events, found ${EVENTS.length}.`);
  }

  for (const period of PERIODS) {
    if (periodIds.has(period.id)) {
      errors.push(`Duplicate period ID: ${period.id}`);
    }
    periodIds.add(period.id);
  }

  for (const source of SOURCES) {
    if (sourceIds.has(source.id)) {
      errors.push(`Duplicate source ID: ${source.id}`);
    }
    sourceIds.add(source.id);
  }

  for (const place of PLACES) {
    if (placeIds.has(place.id)) {
      errors.push(`Duplicate place ID: ${place.id}`);
    }
    placeIds.add(place.id);

    if (placeSlugs.has(place.slug)) {
      errors.push(`Duplicate place slug: ${place.slug}`);
    }
    placeSlugs.add(place.slug);

    if (place.periods.length < 2) {
      errors.push(`Place ${place.id} must have at least 2 historical periods for Time Machine.`);
    }
  }

  for (const artifact of ARTIFACTS) {
    if (artifactIds.has(artifact.id)) {
      errors.push(`Duplicate artifact ID: ${artifact.id}`);
    }
    artifactIds.add(artifact.id);
  }

  for (const event of EVENTS) {
    if (eventIds.has(event.id)) {
      errors.push(`Duplicate event ID: ${event.id}`);
    }
    eventIds.add(event.id);
  }

  for (const person of PEOPLE) {
    if (personIds.has(person.id)) {
      errors.push(`Duplicate person ID: ${person.id}`);
    }
    personIds.add(person.id);
  }

  // Referential checks on Places
  for (const place of PLACES) {
    for (const pState of place.periods) {
      if (!periodIds.has(pState.eraId)) {
        errors.push(`Place ${place.id} period ${pState.id} references unknown era ${pState.eraId}`);
      }
    }
    for (const aId of place.artifactIds) {
      if (!artifactIds.has(aId)) {
        errors.push(`Place ${place.id} references unknown artifact ${aId}`);
      }
    }
    for (const eId of place.eventIds) {
      if (!eventIds.has(eId)) {
        errors.push(`Place ${place.id} references unknown event ${eId}`);
      }
    }
    for (const perId of place.personIds) {
      if (!personIds.has(perId)) {
        errors.push(`Place ${place.id} references unknown person ${perId}`);
      }
    }
    for (const relPlaceId of place.relatedPlaceIds) {
      if (!placeIds.has(relPlaceId)) {
        errors.push(`Place ${place.id} references unknown related place ${relPlaceId}`);
      }
      if (relPlaceId === place.id) {
        errors.push(`Place ${place.id} references itself in relatedPlaceIds`);
      }
    }
    for (const sId of place.sourceIds) {
      if (!sourceIds.has(sId)) {
        errors.push(`Place ${place.id} references unknown source ${sId}`);
      }
    }
    for (const claim of place.claims) {
      for (const sId of claim.sourceIds) {
        if (!sourceIds.has(sId)) {
          errors.push(`Claim ${claim.id} on place ${place.id} references unknown source ${sId}`);
        }
      }
    }
  }

  // Referential checks on Artifacts
  for (const artifact of ARTIFACTS) {
    if (!placeIds.has(artifact.placeId)) {
      errors.push(`Artifact ${artifact.id} references unknown primary place ${artifact.placeId}`);
    }
    for (const rpId of artifact.relatedPlaceIds) {
      if (!placeIds.has(rpId)) {
        errors.push(`Artifact ${artifact.id} references unknown related place ${rpId}`);
      }
    }
    if (!periodIds.has(artifact.eraId)) {
      errors.push(`Artifact ${artifact.id} references unknown era ${artifact.eraId}`);
    }
    if (!sourceIds.has(artifact.sourceId)) {
      errors.push(`Artifact ${artifact.id} references unknown source ${artifact.sourceId}`);
    }
  }

  // Referential checks on Events
  for (const event of EVENTS) {
    if (!periodIds.has(event.eraId)) {
      errors.push(`Event ${event.id} references unknown era ${event.eraId}`);
    }
    for (const pId of event.placeIds) {
      if (!placeIds.has(pId)) {
        errors.push(`Event ${event.id} references unknown place ${pId}`);
      }
    }
    for (const aId of event.artifactIds) {
      if (!artifactIds.has(aId)) {
        errors.push(`Event ${event.id} references unknown artifact ${aId}`);
      }
    }
    for (const perId of event.personIds) {
      if (!personIds.has(perId)) {
        errors.push(`Event ${event.id} references unknown person ${perId}`);
      }
    }
    for (const sId of event.sourceIds) {
      if (!sourceIds.has(sId)) {
        errors.push(`Event ${event.id} references unknown source ${sId}`);
      }
    }
  }

  // Referential checks on People
  for (const person of PEOPLE) {
    for (const pId of person.placeIds) {
      if (!placeIds.has(pId)) {
        errors.push(`Person ${person.id} references unknown place ${pId}`);
      }
    }
    for (const aId of person.artifactIds) {
      if (!artifactIds.has(aId)) {
        errors.push(`Person ${person.id} references unknown artifact ${aId}`);
      }
    }
    for (const eId of person.eventIds) {
      if (!eventIds.has(eId)) {
        errors.push(`Person ${person.id} references unknown event ${eId}`);
      }
    }
  }

  const hasGraphEntity = (type: GraphEntityType, id: string): boolean => {
    switch (type) {
      case 'place':
        return placeIds.has(id);
      case 'artifact':
        return artifactIds.has(id);
      case 'event':
        return eventIds.has(id);
      case 'person':
        return personIds.has(id);
    }
  };

  for (const rel of RELATIONSHIPS) {
    if (relationshipIds.has(rel.id)) {
      errors.push(`Duplicate relationship ID: ${rel.id}`);
    }
    relationshipIds.add(rel.id);

    if (!hasGraphEntity(rel.fromType, rel.fromId)) {
      errors.push(`Relationship ${rel.id} has invalid from reference ${rel.fromType}:${rel.fromId}`);
    }
    if (!hasGraphEntity(rel.toType, rel.toId)) {
      errors.push(`Relationship ${rel.id} has invalid to reference ${rel.toType}:${rel.toId}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    counts: {
      places: PLACES.length,
      artifacts: ARTIFACTS.length,
      events: EVENTS.length,
      people: PEOPLE.length,
      periods: PERIODS.length,
      sources: SOURCES.length,
      relationships: RELATIONSHIPS.length,
    },
  };
}
