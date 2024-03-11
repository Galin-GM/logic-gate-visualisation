import dagre from '@dagrejs/dagre';

// This is a layout function using Dagre to arrange nodes and edges
const dagreLayout = async (nodes, edges, options) => {
  // Create a new directed graph
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: options.direction || 'LR', // Default to left-right layout
    // Consider adding more graph configuration options here as needed
  });
  g.setDefaultEdgeLabel(() => ({}));

  // Add nodes to the graph. The `width` and `height` are necessary for Dagre to compute the layout.
  nodes.forEach(node => {
    g.setNode(node.id, { width: node.width, height: node.height });
  });

  // Add edges to the graph
  edges.forEach(edge => {
    g.setEdge(edge.source, edge.target);
  });

  // Ask Dagre to do the layout calculation
  dagre.layout(g);

  // Apply the calculated layout to the nodes
  const nextNodes = nodes.map(node => {
    const nodeWithLayout = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithLayout.x - nodeWithLayout.width / 2,
        y: nodeWithLayout.y - nodeWithLayout.height / 2,
      },
    };
  });

  // Edges don't typically need layout adjustment in simple cases,
  // but if you're using edge labels or custom curves, you might need to adjust them based on the nodes' positions

  return {
    nodes: nextNodes,
    edges, // Returning edges unchanged; adjust if necessary
  };
};

export default dagreLayout;
