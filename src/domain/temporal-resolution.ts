import type {
  Entity,
  EntityState,
  Relationship,
  RelationshipState,
  ResolvedEntity,
  ResolvedRelationship,
  TimelinePoint
} from "./types";

export class DuplicateTimelineSortOrderError extends Error {
  constructor(sortOrder: number) {
    super(`TimelinePoint sortOrder must be unique within a project. Duplicate sortOrder: ${sortOrder}`);
    this.name = "DuplicateTimelineSortOrderError";
  }
}

export class MissingTimelinePointError extends Error {
  constructor(timelinePointId: string) {
    super(`TimelinePoint was not found: ${timelinePointId}`);
    this.name = "MissingTimelinePointError";
  }
}

export function validateTimelineOrder(timelinePoints: TimelinePoint[]): void {
  const seen = new Set<number>();
  for (const point of timelinePoints) {
    if (seen.has(point.sortOrder)) {
      throw new DuplicateTimelineSortOrderError(point.sortOrder);
    }
    seen.add(point.sortOrder);
  }
}

export function getApplicableTimelinePointIds(
  timelinePoints: TimelinePoint[],
  selectedTimelinePointId: string
): Set<string> {
  validateTimelineOrder(timelinePoints);
  const selected = timelinePoints.find((point) => point.id === selectedTimelinePointId);
  if (!selected) {
    throw new MissingTimelinePointError(selectedTimelinePointId);
  }

  return new Set(
    timelinePoints
      .filter((point) => point.sortOrder <= selected.sortOrder)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((point) => point.id)
  );
}

export function resolveEntityAtTimeline(
  entity: Entity,
  states: EntityState[],
  timelinePoints: TimelinePoint[],
  selectedTimelinePointId: string
): ResolvedEntity {
  const applicablePointIds = getApplicableTimelinePointIds(timelinePoints, selectedTimelinePointId);
  const timelineOrder = timelineOrderMap(timelinePoints);

  const applicableStates = states
    .filter((state) => state.entityId === entity.id && applicablePointIds.has(state.timelinePointId))
    .sort((a, b) => timelineOrder.get(a.timelinePointId)! - timelineOrder.get(b.timelinePointId)!);

  return applicableStates.reduce<ResolvedEntity>(
    (resolved, state) => ({
      ...resolved,
      resolvedName: state.nameOverride ?? resolved.resolvedName,
      resolvedDescription: state.descriptionOverride ?? resolved.resolvedDescription,
      resolvedImage: state.imageOverride ?? resolved.resolvedImage,
      affiliation: state.affiliation ?? resolved.affiliation,
      role: state.role ?? resolved.role,
      attributes: {
        ...resolved.attributes,
        ...(state.attributes ?? {})
      }
    }),
    {
      ...entity,
      resolvedName: entity.name,
      resolvedDescription: entity.description,
      resolvedImage: entity.image,
      attributes: {}
    }
  );
}

export function resolveRelationshipAtTimeline(
  relationship: Relationship,
  states: RelationshipState[],
  timelinePoints: TimelinePoint[],
  selectedTimelinePointId: string
): ResolvedRelationship {
  const applicablePointIds = getApplicableTimelinePointIds(timelinePoints, selectedTimelinePointId);
  const timelineOrder = timelineOrderMap(timelinePoints);

  const applicableStates = states
    .filter((state) => state.relationshipId === relationship.id && applicablePointIds.has(state.timelinePointId))
    .sort((a, b) => timelineOrder.get(a.timelinePointId)! - timelineOrder.get(b.timelinePointId)!);

  return applicableStates.reduce<ResolvedRelationship>(
    (resolved, state) => ({
      ...resolved,
      isActive: state.isActive ?? resolved.isActive,
      resolvedLabel: state.labelOverride ?? resolved.resolvedLabel,
      resolvedDescription: state.descriptionOverride ?? resolved.resolvedDescription,
      strength: state.strength ?? resolved.strength,
      sentiment: state.sentiment ?? resolved.sentiment
    }),
    {
      ...relationship,
      isActive: true,
      resolvedLabel: relationship.label,
      resolvedDescription: relationship.description
    }
  );
}

export function resolveEntitiesAtTimeline(
  entities: Entity[],
  states: EntityState[],
  timelinePoints: TimelinePoint[],
  selectedTimelinePointId: string
): ResolvedEntity[] {
  return entities.map((entity) => resolveEntityAtTimeline(entity, states, timelinePoints, selectedTimelinePointId));
}

export function resolveRelationshipsAtTimeline(
  relationships: Relationship[],
  states: RelationshipState[],
  timelinePoints: TimelinePoint[],
  selectedTimelinePointId: string
): ResolvedRelationship[] {
  return relationships.map((relationship) =>
    resolveRelationshipAtTimeline(relationship, states, timelinePoints, selectedTimelinePointId)
  );
}

function timelineOrderMap(timelinePoints: TimelinePoint[]): Map<string, number> {
  return new Map(timelinePoints.map((point) => [point.id, point.sortOrder]));
}
