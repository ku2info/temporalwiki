# Temporal Model

Temporal Atlas supports calendar dates and semantic timeline labels. Ordering is controlled by `TimelinePoint.sortOrder`, not by date alone.

## Resolution Rule

1. Load base entity or relationship records.
2. Validate the project timeline does not contain duplicate `sortOrder` values.
3. Select states whose timeline point order is less than or equal to the selected timeline point.
4. Apply states in ascending `sortOrder`.
5. Later values override earlier values.
6. Missing values inherit from the previous resolved state.
7. Entity and relationship resolution use the same principle.

## Relationship Activity

Relationships are visible only when their resolved `isActive` is true. A relationship can be inactive at the base point, become active later, and end later through `RelationshipState` diffs.

## Chosen MVP Approach

The MVP uses base records plus partial diffs. This keeps the model close to the old TemporalWiki idea of a base state with temporal changes while avoiding event sourcing and full snapshot duplication.

Alternatives considered:

- Full snapshots: simple reads but duplicates data and makes edits noisy.
- Event sourcing: powerful but too complex for the MVP.
- Valid-time ranges: strong for calendar data but awkward for semantic labels such as "chapter 3 begins".
