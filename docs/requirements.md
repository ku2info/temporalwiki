# Requirements

## Priority Requirements

1. Preserve temporal change for entities, attributes, roles, affiliations, descriptions, and relationships.
2. Support arbitrary timeline labels with project-level ordering.
3. Allow views with different center entities over the same data.
4. Separate structured domain data from visual layout.
5. Provide an MVP that runs without production infrastructure.

## MVP Functional Scope

- Select a project.
- Select a timeline point.
- Select a center entity.
- Display the center entity and related entities.
- Show groups, entity cards, labels, arrows, and annotations.
- Resolve entity and relationship state from base data plus timeline diffs.
- Save-ready model for view nodes, view edges, visual groups, and annotations.

## Non-Functional Scope

- Type-safe TypeScript models.
- Testable domain services outside UI components.
- PostgreSQL-ready schema, while sample UI can run from local data.
- No real-person images.
- No deployment, secrets, authentication, or MediaWiki compatibility in this initial task.
