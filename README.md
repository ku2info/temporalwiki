# Temporal Atlas

Temporal Atlas is a visual relationship atlas for entities whose state changes over time. It is not a Wiki or MediaWiki clone. The primary experience is exploring people, organizations, groups, works, events, places, and their relationships through a selected timeline point and a selected center entity.

## Main Features

- Structured entities and relationships rather than page-centered prose.
- Timeline labels that support both calendar dates and semantic points such as "before the incident" or "chapter 3 begins".
- Center-entity views that can emphasize different relationships, labels, groups, and layouts from the same data.
- Separate domain data, temporal state, and view/layout data.
- A presentation-oriented graph surface with visual groups, cards, arrows, labels, and annotations.
- A pure temporal resolution service with unit tests.

## Temporal And Center View

Temporal Atlas resolves entity and relationship state by starting from base domain records and applying timeline-specific diffs up to the selected timeline point. Later diffs override earlier values, while unspecified values are inherited.

Views add perspective. A view can define a center entity, timeline point, depth, filters, manual node positions, groups, edge styling, and annotations without changing the underlying domain records.

## Technology Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma schema targeting PostgreSQL
- Vitest

PostgreSQL is the MVP database target because the core model is structured, transactional, and queryable with relational joins. A graph database is not required for the first milestone; the graph behavior can be derived from relationship tables and view-layout tables.

## Development

```bash
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000.

## Quality Checks

```bash
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```

## Directory Structure

- `app/`: Next.js routes and global styles.
- `src/domain/`: TypeScript domain models, sample data, and temporal resolution logic.
- `src/components/`: UI components for the atlas surface.
- `prisma/`: Prisma schema for the planned PostgreSQL persistence model.
- `docs/`: Product, architecture, temporal, and MVP design notes.

## Current MVP Scope

- Documentation for product direction, requirements, domain model, temporal model, architecture, UI concept, and MVP plan.
- TypeScript domain model for projects, entities, timeline points, states, relationships, views, nodes, edges, groups, and annotations.
- Pure temporal resolution service for entities and relationships.
- Sample fictional data with multiple groups, timeline labels, relationship changes, and annotations.
- Initial graph viewer with center entity and timeline switching.

## Out Of Scope

- Production deployment.
- Rental server setup.
- Authentication and user management.
- MediaWiki compatibility.
- Existing TemporalWiki API compatibility.
- Real-person image collection.
- Scraping or AI-generated article import.
- Graph database adoption.
- Real-time collaborative editing.
