import dagre from '@dagrejs/dagre';

/* This is piece of code is not my own work.
Code was used from code example in React Flow Auto Layout (https://pro.reactflow.dev/examples/react/auto-layout).
Translated from typescript to javascript.
Uses Dagre open source library for calculating node positions.
Dagre is provided nodes in our application and it returns node with new positions.
*/

const dagreLayout = async (nodes, edges, options) => {

  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: options.direction || 'LR' });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach(node => {
    g.setNode(node.id, { width: node.width, height: node.height });
  });

  edges.forEach(edge => {
    g.setEdge(edge.source, edge.target);
  });

  // Dagre does calculate here
  dagre.layout(g);

  const nodesWithNewPositions = nodes.map(node => {

    const nodeWithLayout = g.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithLayout.x - nodeWithLayout.width / 2,
        y: nodeWithLayout.y - nodeWithLayout.height / 2,
      },
    };

  });

  return {
    nodes: nodesWithNewPositions,
    edges,
  };
};

export default dagreLayout;
