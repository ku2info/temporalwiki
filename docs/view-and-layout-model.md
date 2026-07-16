# View And Layout Model

Views are presentation records over the domain graph. A view can choose a center entity, default timeline point, filters, theme, manual positions, groups, annotations, and edge styling.

Domain records should remain reusable across views. Moving a node or changing a line color must not mutate the entity or relationship itself.

## MVP Layout

- Use saved `ViewNode` positions when available.
- Derive visible relationships from the selected center entity and active resolved relationship states.
- Use `VisualGroup` rectangles as colored regions.
- Use `Annotation` records as sticky-note style overlays.

## Editing Direction

The MVP can begin with client-side position updates. Persistence should be abstracted behind a repository interface before adding a database-backed editor.
