# AGENTS.md

## Project Rules

- Project name: Temporal Atlas.
- Repository name: TemporalAtlas.
- Package name and application identifier: `temporal-atlas`.
- Temporal data is mandatory. Do not add features that treat time as an afterthought.
- Keep domain data separate from view and layout data.
- Read related documents in `docs/` before changing domain, temporal, view, or UI behavior.
- Update documentation when changing product or architecture decisions.
- Run `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test`, and `npm.cmd run build` before reporting completion, or explain why a command could not be run.
- Do not delete tests to make checks pass.
- Do not add real-person images or copyrighted reference images to the repository.
- Do not commit secrets, tokens, generated local files, or production credentials.
- Do not deploy from this repository unless a future task explicitly asks for it.
- Keep the presentation UI from drifting into a generic admin dashboard look.
- Document major design changes before making broad implementation changes.
- Do not hide unresolved product questions behind assumptions; record them in `docs/open-questions.md`.
