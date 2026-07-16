# Architecture

## Stack Decision

Temporal Atlas starts with Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Vitest.

This stack fits the MVP because it supports a rich interactive graph UI, server-rendered routes when needed, strong domain typing, and a relational model that can represent entities, states, relationships, views, and layout records without requiring a graph database.

## Layers

- UI: route components and graph presentation.
- Domain: TypeScript types and pure temporal resolution service.
- Data: sample in-memory data for the first UI, Prisma schema for future PostgreSQL persistence.
- Tests: Vitest tests for temporal resolution.

## Persistence Direction

The initial app reads sample data from TypeScript modules. The Prisma schema defines the intended PostgreSQL shape, but database wiring is deliberately deferred. This allows UI and temporal logic to be verified without local database setup.

## Why Not Neo4j Yet

The MVP needs ordered timeline diffs, saved layout records, annotations, and transactional editing more than complex graph traversal. PostgreSQL can model these requirements clearly. A graph database can be reconsidered if traversal depth, graph analytics, or performance demands outgrow relational queries.
