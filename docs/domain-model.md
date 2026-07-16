# Domain Model

The model separates knowledge records from temporal diffs and view layout.

## Core Records

- `Project`: an independent knowledge world.
- `Entity`: a person, organization, group, work, event, place, concept, or other subject.
- `TimelinePoint`: an ordered point or semantic label in a project timeline.
- `Relationship`: a domain relationship between two entities.

## Temporal Records

- `EntityState`: a partial override for an entity at a timeline point.
- `RelationshipState`: a partial override for a relationship at a timeline point.

## View Records

- `View`: a saved perspective with center entity, timeline point, filters, and theme.
- `ViewNode`: visual placement for an entity in a view.
- `ViewEdge`: visual styling for a relationship in a view.
- `VisualGroup`: colored area or category on a view.
- `Annotation`: note, label, heading, or callout on a view.

## Entity Types

The MVP uses a fixed TypeScript union and Prisma enum for predictable UI behavior. Project-level custom entity types remain an open question after the first milestone.

## Relationship Type And Label

`relationshipType` is a stable semantic classification. `label` is the display phrase. This allows the same type to be rendered differently by timeline state or center perspective.
