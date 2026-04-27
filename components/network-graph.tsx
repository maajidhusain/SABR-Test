"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { NetworkGraph, RelationshipEdge, RelationshipNode } from "@/lib/types";

type SimulationNode = RelationshipNode & {
  anchorX: number;
  anchorY: number;
  vx: number;
  vy: number;
};

const nodeFill: Record<RelationshipNode["kind"], string> = {
  viewer:   "#1f3a2e",
  member:   "#a8542a",
  business: "#6b8068",
  student:  "#b08840"
};

const nodeLabels: Record<RelationshipNode["kind"], string> = {
  viewer:   "You",
  member:   "Member",
  business: "Business",
  student:  "Student"
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getNodeConnection(edgeMap: Map<string, RelationshipEdge>, nodeId: string) {
  return edgeMap.get(nodeId);
}

export function NetworkGraphView({ graph }: { graph: NetworkGraph }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const nodesRef = useRef<SimulationNode[]>([]);

  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<RelationshipNode["kind"] | "all">("all");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("viewer");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const centerPan = useCallback((width: number, height: number, nextZoom = 1) => {
    const viewer = graph.nodes.find((node) => node.id === "viewer") ?? graph.nodes[0];
    return viewer
      ? {
          x: width / 2 - viewer.x * nextZoom,
          y: height / 2 - viewer.y * nextZoom
        }
      : { x: 0, y: 0 };
  }, [graph.nodes]);

  const edgeMap = useMemo(() => {
    const map = new Map<string, RelationshipEdge>();
    for (const edge of graph.edges) {
      const otherId = edge.source === "viewer" ? edge.target : edge.source;
      map.set(otherId, edge);
    }
    return map;
  }, [graph.edges]);

  const filteredNodeIds = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    return new Set(
      graph.nodes
        .filter((node) => {
          if (node.kind === "viewer") {
            return true;
          }

          const matchesQuery =
            !lowered ||
            node.label.toLowerCase().includes(lowered) ||
            node.subtitle.toLowerCase().includes(lowered) ||
            getNodeConnection(edgeMap, node.id)?.reasons.some((reason) =>
              reason.toLowerCase().includes(lowered)
            );

          const matchesKind = kindFilter === "all" || node.kind === kindFilter;
          return matchesQuery && matchesKind;
        })
        .map((node) => node.id)
    );
  }, [edgeMap, graph.nodes, kindFilter, query]);

  const selectedNode = useMemo(
    () => graph.nodes.find((node) => node.id === selectedNodeId) ?? graph.nodes[0],
    [graph.nodes, selectedNodeId]
  );

  if (!selectedNode) {
    return (
      <section className="card" style={{ padding: "1.4rem" }}>
        <h2 style={{ marginTop: 0 }}>Network unavailable</h2>
        <p className="section-copy">No relationship data is available for this view yet.</p>
      </section>
    );
  }

  const visibleConnections = useMemo(
    () =>
      graph.nodes
        .filter((node) => node.id !== "viewer" && filteredNodeIds.has(node.id))
        .sort((a, b) => (edgeMap.get(b.id)?.score ?? 0) - (edgeMap.get(a.id)?.score ?? 0)),
    [edgeMap, filteredNodeIds, graph.nodes]
  );

  useEffect(() => {
    nodesRef.current = graph.nodes.map((node) => ({
      ...node,
      anchorX: node.x,
      anchorY: node.y,
      vx: 0,
      vy: 0
    }));
  }, [graph.nodes]);

  useEffect(() => {
    if (!filteredNodeIds.has(selectedNodeId)) {
      setSelectedNodeId("viewer");
    }
  }, [filteredNodeIds, selectedNodeId]);

  const applyForces = useCallback(() => {
    const nodes = nodesRef.current;

    for (const node of nodes) {
      const spring = node.id === "viewer" ? 0.12 : 0.035;
      node.vx += (node.anchorX - node.x) * spring;
      node.vy += (node.anchorY - node.y) * spring;
    }

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDistance = a.size + b.size + 34;

        if (distance < minDistance) {
          const force = (minDistance - distance) * 0.015;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          a.vx -= fx;
          a.vy -= fy;
          b.vx += fx;
          b.vy += fy;
        }
      }
    }

    for (const edge of graph.edges) {
      const source = nodes.find((node) => node.id === edge.source);
      const target = nodes.find((node) => node.id === edge.target);

      if (!source || !target) {
        continue;
      }

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const desired = source.id === "viewer" || target.id === "viewer" ? 165 : 120;
      const force = (distance - desired) * 0.0035;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;

      source.vx += fx;
      source.vy += fy;
      target.vx -= fx;
      target.vy -= fy;
    }

    for (const node of nodes) {
      node.vx *= 0.92;
      node.vy *= 0.92;
      node.x += node.vx;
      node.y += node.vy;
    }
  }, [graph.edges]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      setPan((current) =>
        current.x === 0 && current.y === 0 ? centerPan(canvas.width, canvas.height, zoom) : current
      );
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      context.clearRect(0, 0, width, height);

      applyForces();

      context.save();
      context.translate(pan.x, pan.y);
      context.scale(zoom, zoom);

      const nodes = nodesRef.current;
      const visibleIds = filteredNodeIds;

      for (const edge of graph.edges) {
        const source = nodes.find((node) => node.id === edge.source);
        const target = nodes.find((node) => node.id === edge.target);
        if (!source || !target || !visibleIds.has(source.id) || !visibleIds.has(target.id)) {
          continue;
        }

        context.beginPath();
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
        context.strokeStyle =
          selectedNodeId === source.id || selectedNodeId === target.id
            ? "rgba(168, 84, 42, 0.55)"
            : "rgba(31, 58, 46, 0.18)";
        context.lineWidth = edge.score > 0 ? 1 + edge.score * 0.35 : 1.2;
        context.stroke();
      }

      for (const node of nodes) {
        if (!visibleIds.has(node.id)) {
          continue;
        }

        const selected = node.id === selectedNodeId;
        const hovered = node.id === hoveredNodeId;

        context.beginPath();
        context.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        context.fillStyle = nodeFill[node.kind];
        context.globalAlpha = node.kind === "viewer" ? 1 : 0.92;
        context.fill();
        context.globalAlpha = 1;

        if (selected || hovered) {
          context.strokeStyle = "rgba(31, 58, 46, 0.5)";
          context.lineWidth = 3;
          context.stroke();
        }

        context.fillStyle = "#1f3a2e";
        context.font = `${node.kind === "viewer" ? 600 : 500} ${selected ? 12 : 11}px "Source Serif 4", Georgia, serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        const label = node.label.length > 16 ? `${node.label.slice(0, 16)}…` : node.label;
        context.fillText(label, node.x, node.y - 2);

        context.fillStyle = "#7a7268";
        context.font = "10px Inter, system-ui, sans-serif";
        context.fillText(nodeLabels[node.kind], node.x, node.y + 12);
      }

      context.restore();
      frameRef.current = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [applyForces, filteredNodeIds, graph.edges, hoveredNodeId, pan, selectedNodeId, zoom]);

  const canvasPoint = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return null;
      }

      const rect = canvas.getBoundingClientRect();
      return {
        x: (clientX - rect.left - pan.x) / zoom,
        y: (clientY - rect.top - pan.y) / zoom
      };
    },
    [pan.x, pan.y, zoom]
  );

  const findNodeAtPoint = useCallback(
    (x: number, y: number) =>
      nodesRef.current.find((node) => {
        if (!filteredNodeIds.has(node.id)) {
          return false;
        }

        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= node.size;
      }),
    [filteredNodeIds]
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    if (isPanning) {
      const nextPan = {
        x: pan.x + (event.clientX - panStart.x),
        y: pan.y + (event.clientY - panStart.y)
      };
      setPan(nextPan);
      setPanStart({ x: event.clientX, y: event.clientY });
      canvas.style.cursor = "grabbing";
      return;
    }

    const point = canvasPoint(event.clientX, event.clientY);
    if (!point) {
      return;
    }

    const node = findNodeAtPoint(point.x, point.y);
    setHoveredNodeId(node?.id ?? null);
    canvas.style.cursor = node ? "pointer" : "grab";
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsPanning(true);
    setPanStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const point = canvasPoint(event.clientX, event.clientY);
    if (!point) {
      return;
    }

    const node = findNodeAtPoint(point.x, point.y);
    if (node) {
      setSelectedNodeId(node.id);
    }
  };

  const selectedEdge = selectedNode?.id ? getNodeConnection(edgeMap, selectedNode.id) : undefined;

  return (
    <section className="grid" style={{ gap: "1rem" }}>
      <article className="card" style={{ padding: "1.2rem" }}>
        <div className="network-toolbar">
          <div>
            <p className="network-kicker">Interactive network explorer</p>
            <h2 style={{ margin: "0.25rem 0 0.35rem", fontSize: "1.5rem" }}>Relationship map</h2>
            <p className="section-copy" style={{ maxWidth: "60ch" }}>
              Explore nearby members, businesses, and students by shared signals, then zoom into why a match matters.
            </p>
          </div>
          <div className="network-controls">
            <label className="label">
              Search the network
              <input
                className="field"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search names, subtitles, or match reasons"
              />
            </label>
            <label className="label">
              Filter by type
              <select
                className="select"
                value={kindFilter}
                onChange={(event) =>
                  setKindFilter(event.target.value as RelationshipNode["kind"] | "all")
                }
              >
                <option value="all">All relationship types</option>
                <option value="member">Members</option>
                <option value="business">Businesses</option>
                <option value="student">Students</option>
              </select>
            </label>
            <div className="network-zoom">
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setZoom((value) => clamp(value - 0.15, 0.7, 2.2))}
              >
                Zoom out
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setZoom((value) => clamp(value + 0.15, 0.7, 2.2))}
              >
                Zoom in
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => {
                  setZoom(1);
                  const container = containerRef.current;
                  if (container) {
                    setPan(centerPan(container.clientWidth, container.clientHeight, 1));
                    return;
                  }
                  setPan({ x: 0, y: 0 });
                }}
              >
                Reset view
              </button>
            </div>
          </div>
        </div>
        <div className="network-legend">
          {Object.entries(nodeFill).map(([kind, color]) => (
            <span key={kind} className="pill" style={{ gap: "0.6rem" }}>
              <span
                aria-hidden="true"
                style={{
                  width: "0.75rem",
                  height: "0.75rem",
                  borderRadius: "999px",
                  background: color,
                  display: "inline-block"
                }}
              />
              {nodeLabels[kind as RelationshipNode["kind"]]}
            </span>
          ))}
        </div>
      </article>

      <div className="network-layout">
        <article className="card network-stage">
          <div ref={containerRef} className="network-canvas-wrap">
            <canvas
              ref={canvasRef}
              className="network-canvas"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <div className="network-hint">Drag to pan. Click a node to inspect the relationship.</div>
          </div>
        </article>

        <aside className="grid" style={{ gap: "1rem" }}>
          <article className="card" style={{ padding: "1.25rem" }}>
            <div className="pill" style={{ width: "fit-content", marginBottom: "0.9rem" }}>
              {nodeLabels[selectedNode.kind]}
            </div>
            <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{selectedNode.label}</h3>
            <p className="section-copy" style={{ marginTop: "0.45rem" }}>
              {selectedNode.subtitle}
            </p>
            {selectedEdge ? (
              <>
                <p style={{ margin: "1rem 0 0.5rem", fontWeight: 600 }}>
                  Match score {selectedEdge.score}
                </p>
                <div className="network-pill-list">
                  {selectedEdge.reasons.map((reason) => (
                    <span key={reason} className="pill">
                      {reason}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="section-copy" style={{ marginTop: "1rem" }}>
                This node anchors the network and represents the signed-in member.
              </p>
            )}
          </article>

          <article className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.3rem" }}>Visible matches</h3>
            <p className="section-copy" style={{ marginBottom: "1rem" }}>
              {visibleConnections.length} results in the current view.
            </p>
            <div className="network-results">
              {visibleConnections.map((node) => {
                const edge = edgeMap.get(node.id);
                return (
                  <button
                    key={node.id}
                    type="button"
                    className="network-result-card"
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    <div
                      style={{
                        width: "0.8rem",
                        height: "0.8rem",
                        borderRadius: "999px",
                        background: nodeFill[node.kind],
                        flexShrink: 0
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>{node.label}</div>
                      <div className="section-copy" style={{ fontSize: "0.92rem" }}>
                        {node.subtitle}
                      </div>
                      {edge?.reasons[0] ? (
                        <div className="section-copy" style={{ fontSize: "0.9rem", marginTop: "0.35rem" }}>
                          {edge.reasons[0]}
                        </div>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
