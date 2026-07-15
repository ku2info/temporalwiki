"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Focus, Save } from "lucide-react";
import type { AtlasData, ViewNode } from "@/src/domain/types";
import { resolveEntitiesAtTimeline, resolveRelationshipsAtTimeline } from "@/src/domain/temporal-resolution";

type AtlasBoardProps = {
  atlas: AtlasData;
};

export function AtlasBoard({ atlas }: AtlasBoardProps) {
  const view = atlas.views[0];
  const [selectedTimelineId, setSelectedTimelineId] = useState(view.timelinePointId);
  const [centerEntityId, setCenterEntityId] = useState(view.centerEntityId);
  const [nodes, setNodes] = useState<ViewNode[]>(atlas.viewNodes);
  const [selectedEntityId, setSelectedEntityId] = useState(centerEntityId);

  const resolvedEntities = useMemo(
    () => resolveEntitiesAtTimeline(atlas.entities, atlas.entityStates, atlas.timelinePoints, selectedTimelineId),
    [atlas.entities, atlas.entityStates, atlas.timelinePoints, selectedTimelineId]
  );

  const resolvedRelationships = useMemo(
    () =>
      resolveRelationshipsAtTimeline(
        atlas.relationships,
        atlas.relationshipStates,
        atlas.timelinePoints,
        selectedTimelineId
      ).filter((relationship) => relationship.isActive),
    [atlas.relationships, atlas.relationshipStates, atlas.timelinePoints, selectedTimelineId]
  );

  const entitiesById = new Map(resolvedEntities.map((entity) => [entity.id, entity]));
  const nodesByEntityId = new Map(nodes.map((node) => [node.entityId, node]));
  const selectedEntity = entitiesById.get(selectedEntityId) ?? entitiesById.get(centerEntityId);

  const visibleRelationships = resolvedRelationships.filter(
    (relationship) => relationship.sourceEntityId === centerEntityId || relationship.targetEntityId === centerEntityId
  );

  function moveNode(entityId: string, dx: number, dy: number) {
    setNodes((current) =>
      current.map((node) => {
        if (node.entityId !== entityId) {
          return node;
        }

        const group = atlas.visualGroups.find((item) => item.id === node.groupId);
        const bounds = group
          ? {
              minX: group.x,
              maxX: group.x + group.width - node.width,
              minY: group.y,
              maxY: group.y + group.height - node.height
            }
          : {
              minX: 0,
              maxX: 1200 - node.width,
              minY: 0,
              maxY: 720 - node.height
            };

        return {
          ...node,
          x: clamp(node.x + dx, bounds.minX, bounds.maxX),
          y: clamp(node.y + dy, bounds.minY, bounds.maxY)
        };
      })
    );
  }

  return (
    <main className="min-h-screen overflow-hidden p-4 text-[#27221f]">
      <div className="mb-3 flex flex-wrap items-center gap-2 rounded border border-[#27221f]/20 bg-[#fff8ec]/80 px-3 py-2 shadow-sm backdrop-blur">
        <strong className="mr-2 text-sm uppercase tracking-[0.18em] text-[#6f493c]">Temporal Atlas</strong>
        <label className="text-sm">
          Timeline
          <select
            className="ml-2 rounded border border-[#27221f]/20 bg-white px-2 py-1"
            value={selectedTimelineId}
            onChange={(event) => setSelectedTimelineId(event.target.value)}
          >
            {atlas.timelinePoints.map((point) => (
              <option key={point.id} value={point.id}>
                {point.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Center
          <select
            className="ml-2 rounded border border-[#27221f]/20 bg-white px-2 py-1"
            value={centerEntityId}
            onChange={(event) => {
              setCenterEntityId(event.target.value);
              setSelectedEntityId(event.target.value);
            }}
          >
            {atlas.entities.map((entity) => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </select>
        </label>
        <button className="ml-auto inline-flex items-center gap-1 rounded border border-[#27221f]/20 bg-white px-2 py-1 text-sm">
          <Focus size={15} /> Fit
        </button>
        <button className="inline-flex items-center gap-1 rounded border border-[#27221f]/20 bg-white px-2 py-1 text-sm">
          <Save size={15} /> Save view
        </button>
      </div>

      <section className="relative h-[calc(100vh-88px)] min-h-[620px] overflow-hidden rounded bg-[#fbf4e8] shadow-[inset_0_0_0_1px_rgba(39,34,31,0.16)]">
        {atlas.visualGroups.map((group) => (
          <div
            key={group.id}
            className="absolute rounded border border-[#27221f]/15 px-4 py-3"
            style={{
              left: group.x,
              top: group.y,
              width: group.width,
              height: group.height,
              background: group.color,
              zIndex: group.zIndex
            }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#6f493c]">{group.name}</div>
          </div>
        ))}

        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 720" preserveAspectRatio="xMinYMin meet">
          <defs>
            <marker id="arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
              <path d="M0,0 L8,4 L0,8 z" fill="#27221f" />
            </marker>
          </defs>
          {visibleRelationships.map((relationship) => {
            const source = nodesByEntityId.get(relationship.sourceEntityId);
            const target = nodesByEntityId.get(relationship.targetEntityId);
            const edge = atlas.viewEdges.find((item) => item.relationshipId === relationship.id);
            if (!source || !target || edge?.isHidden) {
              return null;
            }
            const sx = source.x + source.width / 2;
            const sy = source.y + source.height / 2;
            const tx = target.x + target.width / 2;
            const ty = target.y + target.height / 2;
            const mx = (sx + tx) / 2;
            const my = (sy + ty) / 2;
            return (
              <g key={relationship.id}>
                <line
                  x1={sx}
                  y1={sy}
                  x2={tx}
                  y2={ty}
                  stroke={edge?.color ?? "#27221f"}
                  strokeDasharray={edge?.lineStyle === "dashed" ? "8 8" : undefined}
                  strokeWidth={relationship.strength ? Math.max(2, relationship.strength) : 2}
                  markerEnd={relationship.direction === "DIRECTED" ? "url(#arrow)" : undefined}
                  opacity={0.78}
                />
                <text x={mx} y={my - 8} textAnchor="middle" className="fill-[#27221f] text-[13px] font-semibold">
                  {edge?.labelOverride ?? relationship.resolvedLabel}
                </text>
              </g>
            );
          })}
        </svg>

        {nodes.map((node) => {
          const entity = entitiesById.get(node.entityId);
          if (!entity || node.isHidden) {
            return null;
          }
          const isCenter = entity.id === centerEntityId;
          return (
            <article
              key={node.id}
              className={[
                "absolute cursor-pointer border bg-[#fffdf7] p-3 shadow-md transition-transform",
                isCenter ? "border-[#b84840] ring-4 ring-[#b84840]/20" : "border-[#27221f]/20",
                selectedEntityId === entity.id ? "scale-[1.02]" : ""
              ].join(" ")}
              style={{ left: node.x, top: node.y, width: node.width, minHeight: node.height, zIndex: node.zIndex }}
              onClick={() => setSelectedEntityId(entity.id)}
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded bg-[#3a6b6d] text-lg font-bold text-white">
                  {entity.resolvedName.slice(0, 1)}
                </div>
                <div>
                  <h2 className="text-base font-bold leading-tight">{entity.resolvedName}</h2>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#6f493c]">{entity.entityType}</p>
                </div>
              </div>
              <p className="line-clamp-3 text-sm leading-snug">{entity.resolvedDescription}</p>
              <dl className="mt-2 grid gap-1 text-xs">
                {entity.affiliation ? (
                  <div>
                    <dt className="inline font-bold">Affiliation: </dt>
                    <dd className="inline">{entity.affiliation}</dd>
                  </div>
                ) : null}
                {entity.role ? (
                  <div>
                    <dt className="inline font-bold">Role: </dt>
                    <dd className="inline">{entity.role}</dd>
                  </div>
                ) : null}
              </dl>
              <div className="mt-2 flex gap-1">
                <button
                  className="grid h-6 w-6 place-items-center rounded border border-[#27221f]/20"
                  aria-label={`Move ${entity.name} left`}
                  onClick={(event) => {
                    event.stopPropagation();
                    moveNode(entity.id, -18, 0);
                  }}
                >
                  <ArrowLeft size={13} />
                </button>
                <button
                  className="grid h-6 w-6 place-items-center rounded border border-[#27221f]/20"
                  aria-label={`Move ${entity.name} right`}
                  onClick={(event) => {
                    event.stopPropagation();
                    moveNode(entity.id, 18, 0);
                  }}
                >
                  <ArrowRight size={13} />
                </button>
                <button
                  className="grid h-6 w-6 place-items-center rounded border border-[#27221f]/20"
                  aria-label={`Move ${entity.name} up`}
                  onClick={(event) => {
                    event.stopPropagation();
                    moveNode(entity.id, 0, -18);
                  }}
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  className="grid h-6 w-6 place-items-center rounded border border-[#27221f]/20"
                  aria-label={`Move ${entity.name} down`}
                  onClick={(event) => {
                    event.stopPropagation();
                    moveNode(entity.id, 0, 18);
                  }}
                >
                  <ArrowDown size={13} />
                </button>
              </div>
            </article>
          );
        })}

        {atlas.annotations.map((annotation) => (
          <aside
            key={annotation.id}
            className="absolute rotate-[-1deg] border border-[#d5a33f]/50 bg-[#fff1a8] p-3 text-sm shadow"
            style={{ left: annotation.x, top: annotation.y, width: annotation.width, minHeight: annotation.height, zIndex: 8 }}
          >
            {annotation.text}
          </aside>
        ))}

        <aside className="absolute bottom-5 right-5 w-[310px] rounded border border-[#27221f]/20 bg-[#fffdf7]/95 p-4 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f493c]">Selected</p>
          <h2 className="mt-1 text-xl font-bold">{selectedEntity?.resolvedName}</h2>
          <p className="mt-2 text-sm leading-relaxed">{selectedEntity?.resolvedDescription}</p>
          <p className="mt-3 text-sm">{[selectedEntity?.affiliation, selectedEntity?.role].filter(Boolean).join(" / ")}</p>
        </aside>
      </section>
    </main>
  );
}

function clamp(value: number, min: number, max: number): number {
  if (max < min) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}
