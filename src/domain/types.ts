export type ID = string;

export type EntityType =
  | "PERSON"
  | "ORGANIZATION"
  | "GROUP"
  | "DUO"
  | "TRIO"
  | "WORK"
  | "EVENT"
  | "PLACE"
  | "CONCEPT"
  | "OTHER";

export type RelationshipDirection = "DIRECTED" | "UNDIRECTED" | "BIDIRECTIONAL";
export type Sentiment = "ALLY" | "FRIENDLY" | "NEUTRAL" | "TENSE" | "HOSTILE";

export type Project = {
  id: ID;
  slug: string;
  name: string;
  description?: string;
  defaultTimelinePointId: ID;
  createdAt: string;
  updatedAt: string;
};

export type Entity = {
  id: ID;
  projectId: ID;
  slug: string;
  name: string;
  entityType: EntityType;
  description?: string;
  image?: string;
  aliases: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type TimelinePoint = {
  id: ID;
  projectId: ID;
  label: string;
  sortOrder: number;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export type EntityState = {
  id: ID;
  entityId: ID;
  timelinePointId: ID;
  nameOverride?: string;
  descriptionOverride?: string;
  imageOverride?: string;
  affiliation?: string;
  role?: string;
  attributes?: Record<string, string | number | boolean | null>;
};

export type Relationship = {
  id: ID;
  projectId: ID;
  sourceEntityId: ID;
  targetEntityId: ID;
  relationshipType: string;
  label: string;
  direction: RelationshipDirection;
  description?: string;
  evidence?: string;
  confidence?: number;
  createdAt: string;
  updatedAt: string;
};

export type RelationshipState = {
  id: ID;
  relationshipId: ID;
  timelinePointId: ID;
  isActive?: boolean;
  labelOverride?: string;
  descriptionOverride?: string;
  strength?: number;
  sentiment?: Sentiment;
};

export type View = {
  id: ID;
  projectId: ID;
  name: string;
  description?: string;
  centerEntityId: ID;
  timelinePointId: ID;
  depth: number;
  theme?: string;
  filters?: {
    entityTypes?: EntityType[];
    relationshipTypes?: string[];
  };
  createdAt: string;
  updatedAt: string;
};

export type ViewNode = {
  id: ID;
  viewId: ID;
  entityId: ID;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  groupId?: ID;
  isPinned: boolean;
  isHidden: boolean;
  displayVariant?: "portrait" | "compact" | "feature";
};

export type ViewEdge = {
  id: ID;
  viewId: ID;
  relationshipId: ID;
  labelOverride?: string;
  lineStyle?: "solid" | "dashed" | "soft";
  color?: string;
  route?: Array<{ x: number; y: number }>;
  isHidden: boolean;
};

export type VisualGroup = {
  id: ID;
  viewId: ID;
  name: string;
  description?: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

export type Annotation = {
  id: ID;
  viewId: ID;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style?: "sticky" | "caption" | "heading";
  linkedEntityId?: ID;
  linkedRelationshipId?: ID;
};

export type ResolvedEntity = Entity & {
  resolvedName: string;
  resolvedDescription?: string;
  resolvedImage?: string;
  affiliation?: string;
  role?: string;
  attributes: Record<string, string | number | boolean | null>;
};

export type ResolvedRelationship = Relationship & {
  isActive: boolean;
  resolvedLabel: string;
  resolvedDescription?: string;
  strength?: number;
  sentiment?: Sentiment;
};

export type AtlasData = {
  project: Project;
  timelinePoints: TimelinePoint[];
  entities: Entity[];
  entityStates: EntityState[];
  relationships: Relationship[];
  relationshipStates: RelationshipState[];
  views: View[];
  viewNodes: ViewNode[];
  viewEdges: ViewEdge[];
  visualGroups: VisualGroup[];
  annotations: Annotation[];
};
