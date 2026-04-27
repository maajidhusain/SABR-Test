# Network Graph

## Node Structure

Every node is a `RelationshipNode` with a `kind`: `"viewer"` (you), `"member"`, `"business"`, or `"student"`. The viewer node is always placed at the center of the canvas.

## Degree Levels

The current graph is **flat — everything is 1st degree only.** Every non-viewer node has exactly one edge, and it always connects directly to `"viewer"`. There are no edges between non-viewer nodes, so there is no 2nd or 3rd degree.

```
viewer ──── member A
viewer ──── business B
viewer ──── student C
```

If you want true 1st/2nd degree semantics (e.g., "this member knows that business"), you would need to add edges between non-viewer nodes in `buildNetworkGraph` in `lib/network.ts`. That relationship data does not currently exist in the graph.

## How Nodes Are Selected (Scoring)

`buildNetworkGraph` in [`lib/network.ts`](../lib/network.ts) scores every candidate against the viewer's profile:

| Signal | Points |
|---|---|
| Same industry | +1 |
| Same location | +1 |
| Shared specialty (up to 2) | +1 each |
| Shared interest (up to 2) | +1 each |
| Special mentorship/hiring fits | +1 |

Only candidates with `score > 0` are kept, then the **top 8** by score are rendered as nodes.

## Visual Encoding

- **Node size** — `22 + score * 2`: higher match score = physically larger node.
- **Edge line width** — `1 + score * 0.35`: stronger match = thicker line.
- **Node color** — fixed by kind (viewer, member, business, student); see the legend in the UI.
