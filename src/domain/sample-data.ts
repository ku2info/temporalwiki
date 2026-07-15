import type { AtlasData } from "./types";

const now = "2026-07-16T00:00:00.000Z";

export const sampleAtlas: AtlasData = {
  project: {
    id: "project-starlight",
    slug: "starlight-archive",
    name: "Starlight Archive",
    description: "A fictional troupe whose alliances shift across three story points.",
    defaultTimelinePointId: "tp-basic",
    createdAt: now,
    updatedAt: now
  },
  timelinePoints: [
    { id: "tp-basic", projectId: "project-starlight", label: "basic", sortOrder: 0 },
    { id: "tp-festival", projectId: "project-starlight", label: "Festival Night", sortOrder: 10 },
    { id: "tp-after", projectId: "project-starlight", label: "After Rehearsal", sortOrder: 20 }
  ],
  entities: [
    {
      id: "entity-mira",
      projectId: "project-starlight",
      slug: "mira-kade",
      name: "Mira Kade",
      entityType: "PERSON",
      description: "A quiet arranger who notices every shift in the room.",
      aliases: ["Mira"],
      tags: ["fictional", "performer"],
      createdAt: now,
      updatedAt: now
    },
    {
      id: "entity-ren",
      projectId: "project-starlight",
      slug: "ren-solas",
      name: "Ren Solas",
      entityType: "PERSON",
      description: "A lead vocalist with a bright public face and a private rivalry.",
      aliases: ["Ren"],
      tags: ["fictional", "performer"],
      createdAt: now,
      updatedAt: now
    },
    {
      id: "entity-io",
      projectId: "project-starlight",
      slug: "io-min",
      name: "Io Min",
      entityType: "PERSON",
      description: "Stage designer, note keeper, and reluctant mediator.",
      aliases: ["Io"],
      tags: ["fictional", "staff"],
      createdAt: now,
      updatedAt: now
    },
    {
      id: "entity-vela",
      projectId: "project-starlight",
      slug: "vela-company",
      name: "Vela Company",
      entityType: "ORGANIZATION",
      description: "A small performance company.",
      aliases: ["Vela"],
      tags: ["fictional", "organization"],
      createdAt: now,
      updatedAt: now
    },
    {
      id: "entity-harbor",
      projectId: "project-starlight",
      slug: "harbor-studio",
      name: "Harbor Studio",
      entityType: "PLACE",
      description: "A rehearsal space by the old ferry terminal.",
      aliases: [],
      tags: ["fictional", "place"],
      createdAt: now,
      updatedAt: now
    }
  ],
  entityStates: [
    { id: "state-mira-basic", entityId: "entity-mira", timelinePointId: "tp-basic", affiliation: "Vela Company", role: "Arranger" },
    { id: "state-ren-basic", entityId: "entity-ren", timelinePointId: "tp-basic", affiliation: "Vela Company", role: "Lead vocalist" },
    { id: "state-io-basic", entityId: "entity-io", timelinePointId: "tp-basic", affiliation: "Harbor Studio", role: "Designer" },
    { id: "state-mira-festival", entityId: "entity-mira", timelinePointId: "tp-festival", role: "Acting director" },
    { id: "state-ren-after", entityId: "entity-ren", timelinePointId: "tp-after", affiliation: "Solo project", role: "Guest vocalist" },
    { id: "state-io-after", entityId: "entity-io", timelinePointId: "tp-after", role: "Mediator" }
  ],
  relationships: [
    {
      id: "rel-mira-ren",
      projectId: "project-starlight",
      sourceEntityId: "entity-mira",
      targetEntityId: "entity-ren",
      relationshipType: "CREATIVE_PARTNER",
      label: "creative partners",
      direction: "UNDIRECTED",
      description: "They build songs together.",
      confidence: 0.95,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "rel-ren-io",
      projectId: "project-starlight",
      sourceEntityId: "entity-ren",
      targetEntityId: "entity-io",
      relationshipType: "TENSION",
      label: "uneasy collaborators",
      direction: "UNDIRECTED",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "rel-mira-vela",
      projectId: "project-starlight",
      sourceEntityId: "entity-mira",
      targetEntityId: "entity-vela",
      relationshipType: "MEMBER_OF",
      label: "member",
      direction: "DIRECTED",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "rel-ren-vela",
      projectId: "project-starlight",
      sourceEntityId: "entity-ren",
      targetEntityId: "entity-vela",
      relationshipType: "MEMBER_OF",
      label: "member",
      direction: "DIRECTED",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "rel-io-harbor",
      projectId: "project-starlight",
      sourceEntityId: "entity-io",
      targetEntityId: "entity-harbor",
      relationshipType: "BASED_AT",
      label: "based at",
      direction: "DIRECTED",
      createdAt: now,
      updatedAt: now
    }
  ],
  relationshipStates: [
    { id: "relstate-mira-ren-basic", relationshipId: "rel-mira-ren", timelinePointId: "tp-basic", isActive: true, strength: 3, sentiment: "FRIENDLY" },
    { id: "relstate-mira-ren-festival", relationshipId: "rel-mira-ren", timelinePointId: "tp-festival", labelOverride: "strained duet", strength: 2, sentiment: "TENSE" },
    { id: "relstate-mira-ren-after", relationshipId: "rel-mira-ren", timelinePointId: "tp-after", labelOverride: "rebuilding trust", strength: 4, sentiment: "FRIENDLY" },
    { id: "relstate-ren-io-basic", relationshipId: "rel-ren-io", timelinePointId: "tp-basic", isActive: false },
    { id: "relstate-ren-io-festival", relationshipId: "rel-ren-io", timelinePointId: "tp-festival", isActive: true, strength: 4, sentiment: "HOSTILE" },
    { id: "relstate-ren-vela-after", relationshipId: "rel-ren-vela", timelinePointId: "tp-after", isActive: false, labelOverride: "former member" }
  ],
  views: [
    {
      id: "view-main",
      projectId: "project-starlight",
      name: "Main relationship board",
      description: "A first Temporal Atlas sample view.",
      centerEntityId: "entity-mira",
      timelinePointId: "tp-basic",
      depth: 1,
      theme: "scrapbook",
      createdAt: now,
      updatedAt: now
    }
  ],
  viewNodes: [
    { id: "node-mira", viewId: "view-main", entityId: "entity-mira", x: 410, y: 230, width: 180, height: 150, zIndex: 4, groupId: "group-troupe", isPinned: true, isHidden: false, displayVariant: "feature" },
    { id: "node-ren", viewId: "view-main", entityId: "entity-ren", x: 710, y: 160, width: 170, height: 140, zIndex: 3, groupId: "group-troupe", isPinned: true, isHidden: false, displayVariant: "portrait" },
    { id: "node-io", viewId: "view-main", entityId: "entity-io", x: 680, y: 430, width: 170, height: 140, zIndex: 3, groupId: "group-staff", isPinned: true, isHidden: false, displayVariant: "portrait" },
    { id: "node-vela", viewId: "view-main", entityId: "entity-vela", x: 170, y: 160, width: 180, height: 130, zIndex: 2, groupId: "group-troupe", isPinned: true, isHidden: false, displayVariant: "compact" },
    { id: "node-harbor", viewId: "view-main", entityId: "entity-harbor", x: 170, y: 430, width: 180, height: 130, zIndex: 2, groupId: "group-staff", isPinned: true, isHidden: false, displayVariant: "compact" }
  ],
  viewEdges: [
    { id: "edge-mira-ren", viewId: "view-main", relationshipId: "rel-mira-ren", lineStyle: "solid", color: "#b84840", isHidden: false },
    { id: "edge-ren-io", viewId: "view-main", relationshipId: "rel-ren-io", lineStyle: "dashed", color: "#6b5bbd", isHidden: false },
    { id: "edge-mira-vela", viewId: "view-main", relationshipId: "rel-mira-vela", lineStyle: "solid", color: "#3a6b6d", isHidden: false },
    { id: "edge-ren-vela", viewId: "view-main", relationshipId: "rel-ren-vela", lineStyle: "soft", color: "#836642", isHidden: false },
    { id: "edge-io-harbor", viewId: "view-main", relationshipId: "rel-io-harbor", lineStyle: "solid", color: "#3a6b6d", isHidden: false }
  ],
  visualGroups: [
    { id: "group-troupe", viewId: "view-main", name: "Troupe", description: "Performers and company ties.", color: "rgba(184, 72, 64, 0.15)", x: 120, y: 110, width: 800, height: 240, zIndex: 0 },
    { id: "group-staff", viewId: "view-main", name: "Studio", description: "Backstage and places.", color: "rgba(58, 107, 109, 0.16)", x: 120, y: 380, width: 780, height: 240, zIndex: 0 }
  ],
  annotations: [
    { id: "ann-festival", viewId: "view-main", text: "Festival Night changes Mira's role and exposes Ren and Io's conflict.", x: 930, y: 160, width: 220, height: 120, style: "sticky" }
  ]
};
