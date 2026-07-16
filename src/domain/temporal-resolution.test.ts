import { describe, expect, it } from "vitest";
import {
  DuplicateTimelineSortOrderError,
  resolveEntityAtTimeline,
  resolveRelationshipAtTimeline
} from "./temporal-resolution";
import type { Entity, EntityState, Relationship, RelationshipState, TimelinePoint } from "./types";

const timeline: TimelinePoint[] = [
  { id: "basic", projectId: "p1", label: "basic", sortOrder: 0 },
  { id: "incident", projectId: "p1", label: "Incident", sortOrder: 10 },
  { id: "after", projectId: "p1", label: "Aftermath", sortOrder: 20 }
];

const entity: Entity = {
  id: "e1",
  projectId: "p1",
  slug: "akira",
  name: "Akira",
  entityType: "PERSON",
  description: "Archivist",
  aliases: [],
  tags: [],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z"
};

const relationship: Relationship = {
  id: "r1",
  projectId: "p1",
  sourceEntityId: "e1",
  targetEntityId: "e2",
  relationshipType: "ALLY",
  label: "ally",
  direction: "UNDIRECTED",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z"
};

describe("temporal entity resolution", () => {
  it("uses base state only", () => {
    const resolved = resolveEntityAtTimeline(entity, [], timeline, "basic");
    expect(resolved.resolvedName).toBe("Akira");
    expect(resolved.resolvedDescription).toBe("Archivist");
  });

  it("applies one diff", () => {
    const states: EntityState[] = [{ id: "s1", entityId: "e1", timelinePointId: "incident", role: "Witness" }];
    const resolved = resolveEntityAtTimeline(entity, states, timeline, "incident");
    expect(resolved.role).toBe("Witness");
  });

  it("inherits through multiple timeline points", () => {
    const states: EntityState[] = [
      { id: "s1", entityId: "e1", timelinePointId: "basic", affiliation: "North Archive" },
      { id: "s2", entityId: "e1", timelinePointId: "incident", role: "Witness" }
    ];
    const resolved = resolveEntityAtTimeline(entity, states, timeline, "after");
    expect(resolved.affiliation).toBe("North Archive");
    expect(resolved.role).toBe("Witness");
  });

  it("lets later values override earlier values", () => {
    const states: EntityState[] = [
      { id: "s1", entityId: "e1", timelinePointId: "basic", affiliation: "North Archive" },
      { id: "s2", entityId: "e1", timelinePointId: "after", affiliation: "Harbor Studio" }
    ];
    const resolved = resolveEntityAtTimeline(entity, states, timeline, "after");
    expect(resolved.affiliation).toBe("Harbor Studio");
  });

  it("inherits when a later diff omits a value", () => {
    const states: EntityState[] = [
      { id: "s1", entityId: "e1", timelinePointId: "basic", affiliation: "North Archive", role: "Researcher" },
      { id: "s2", entityId: "e1", timelinePointId: "after", role: "Editor" }
    ];
    const resolved = resolveEntityAtTimeline(entity, states, timeline, "after");
    expect(resolved.affiliation).toBe("North Archive");
    expect(resolved.role).toBe("Editor");
  });
});

describe("temporal relationship resolution", () => {
  it("starts a relationship", () => {
    const states: RelationshipState[] = [
      { id: "rs1", relationshipId: "r1", timelinePointId: "basic", isActive: false },
      { id: "rs2", relationshipId: "r1", timelinePointId: "incident", isActive: true }
    ];
    const resolved = resolveRelationshipAtTimeline(relationship, states, timeline, "incident");
    expect(resolved.isActive).toBe(true);
  });

  it("ends a relationship", () => {
    const states: RelationshipState[] = [
      { id: "rs1", relationshipId: "r1", timelinePointId: "incident", isActive: true },
      { id: "rs2", relationshipId: "r1", timelinePointId: "after", isActive: false }
    ];
    const resolved = resolveRelationshipAtTimeline(relationship, states, timeline, "after");
    expect(resolved.isActive).toBe(false);
  });

  it("throws on duplicate sortOrder", () => {
    const brokenTimeline = [...timeline, { id: "duplicate", projectId: "p1", label: "Duplicate", sortOrder: 10 }];
    expect(() => resolveRelationshipAtTimeline(relationship, [], brokenTimeline, "after")).toThrow(
      DuplicateTimelineSortOrderError
    );
  });
});
