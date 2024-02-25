import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, addEdge, updateEdge, getOutgoers, Background, Controls } from 'reactflow';

import './App.css';
import 'reactflow/dist/style.css';
import Toolbar from './components/Toolbar';
import LogicGate from './components/LogicGate';
import InputNode from './components/InputNode';
import OutputNode from './components/OutputNode';

const nodeTypes = {
  andNode: LogicGate,
  orNode: LogicGate,
  inputOneNode: InputNode,
  inputZeroNode: InputNode
};

const initialNodes = [
  // { id: '1', position: { x: 200, y: 200 }, data: { value: true, label: 'INPUT' }, sourcePosition: 'right', type: 'input' },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {

  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [updateInfo, setUpdateInfo] = useState({ needUpdate: false, latestSource: null });

  // console.log(edges)
  // console.log(nodes)

  const evaluateGate = (data) => {
    const { gateType, handleA, handleB } = data

    switch (gateType) {
      case 'andNode': return handleA && handleB;
      case 'orNode' : return handleA || handleB;
      default: 
        console.error(`Unknown gate type: ${gateType}`);
        return false;
    } 

  }


  // THIS IS USED FOR THERE IS A CHANGE IN NODE DATA AND NODES NEED TO BE UPDATED 
  // NEEDUPDATE WOULD BE TRUE AND LATESTSOURCE WOULD BE LATEST CHANGE
  useEffect(() => {
    // iterative function that takes a node and goes through all it outgoing edges and updates nodes
    const updateNodes = (sourceId, updatedNodesParam) => {
      const outgoingEdges = edges.filter(edge => edge.source === sourceId)

      outgoingEdges.forEach(edge => {
        const targetNodeIndex = updatedNodesParam.findIndex(node => node.id === edge.target)
        if (targetNodeIndex === -1) return;

        const sourceNode = updatedNodesParam.find(node => node.id === edge.source)
        if (!sourceNode) {
          console.error("source node not found")
        }

        const updatedData = { ...updatedNodesParam[targetNodeIndex].data };
        if (edge.targetHandle === 'a') {
          updatedData.handleA = sourceNode.data.value;
        } else if (edge.targetHandle === 'b') {
          updatedData.handleB = sourceNode.data.value;
        }

        updatedData.value = evaluateGate(updatedData);
        updatedNodesParam[targetNodeIndex] = { ...updatedNodesParam[targetNodeIndex], data: updatedData };

        updateNodes(updatedNodesParam[targetNodeIndex].id, updatedNodesParam)
      })
    }

    if (updateInfo.needUpdate && updateInfo.latestSource) {
      let updatedNodes = [...nodes]; // create copy of nodes to modify
      const { source, target } = updateInfo.latestSource;

      updateNodes(source, updatedNodes); // call func with copy

      setNodes(updatedNodes); // set nodes to copy
      setUpdateInfo({ needUpdate: false, latestSource: null }); // reset as update complete
    }
  }, [updateInfo, edges, nodes, setNodes]);

  const onConnect = useCallback(
    (params) => {
      const { target, source, targetHandle } = params;

      const targetNode = nodes.find(node => node.id === target);
      const sourceNode = nodes.find(node => node.id === source);

      // safety check to see both have been found
      if (!targetNode || !sourceNode) {
        console.error('Source or target node not found');
        return;
      }

      // create copy
      const updatedData = { ...targetNode.data };

      // update copy
      if (targetHandle === 'a') {
        updatedData.handleA = sourceNode.data.value;
      } else if (targetHandle === 'b') {
        updatedData.handleB = sourceNode.data.value;
      } else {
        console.error("Invalid target handle:", targetHandle);
        return;
      }

      
      // compute value based on logic
      updatedData.value = evaluateGate(updatedData);

      // update nodes with new data
      const updatedNodes = nodes.map(node => {
        if (node.id === targetNode.id) {
          return {
            ...node,
            data: updatedData
          };
        }
        return node;
      });

      // set nodes to new updated nodes
      setNodes(updatedNodes)
      setEdges((eds) => addEdge(params, eds));

      // const newEdge = {
      //   ...params,
      //   style: { stroke: '#00ff00', strokeWidth: 2 },
      // };

      // setEdges((eds) => addEdge(newEdge, eds));

      // sets update to be need from newest edge
      setUpdateInfo({ needUpdate: true, latestSource: params });
    },
    [setEdges, setNodes, nodes, edges, evaluateGate]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      // finds old edge handle and sets to false
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === oldEdge.target) {
            const handleToUpdate = oldEdge.targetHandle;
            const updatedData = { ...node.data };

            if (handleToUpdate === 'a') {
              updatedData.handleA = false;
            } else if (handleToUpdate === 'b') {
              updatedData.handleB = false;
            }

            
            updatedData.value = evaluateGate(updatedData);

            return { ...node, data: updatedData };
          }
          return node;
        });
      });

      edgeUpdateSuccessful.current = true;

      // removes old edge and adds new edge
      setEdges((eds) => updateEdge(oldEdge, newConnection, eds));

      // set to update from new edge connection
      setUpdateInfo({ needUpdate: true, latestSource: newConnection });
    },
    []
  );

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {

      // finds handle and set to false
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === edge.target) {
            const handleToUpdate = edge.targetHandle;
            const updatedData = { ...node.data };

            if (handleToUpdate === 'a') {
              updatedData.handleA = false;
            } else if (handleToUpdate === 'b') {
              updatedData.handleB = false;
            }

            
            updatedData.value = evaluateGate(updatedData);

            return { ...node, data: updatedData };
          }
          return node;
        });
      });
      
      // updated needed starting from node handle was on
      setUpdateInfo({ needUpdate: true, latestSource: {source: edge.target} });

      // remove edge from edges
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const isValidConnection = useCallback(
    (connection) => {
      // if trying to connect own node to itself, not valid
      if (connection.target === connection.source) return false;

      // check if there is already an edge connecting to that handle
      const isHandleConnected = edges.some(edge =>
        edge.target === connection.target && edge.targetHandle === connection.targetHandle
      );
      if (isHandleConnected) return false;

      const target = nodes.find(node => node.id === connection.target);
      const hasCycle = (node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id)

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target.id === connection.source) return true;
      return !hasCycle(target);
    }, [nodes, edges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymorea
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode;
      if (type === 'inputOneNode') {
        newNode = {
          id: getId(),
          type, 
          position,
          data: { label: `${type} node`, gateType: `${type}`, value: true },
        };
      } else if (type === 'inputZeroNode') {
        newNode = {
          id: getId(),
          type, 
          position,
          data: { label: `${type} node`, gateType: `${type}`, value: false },
        };
      } else {
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`, gateType: `${type}`, handleA: false, handleB: false, value: false },
        };
      }

      
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <div className="app">
      <div className='topbar'>

      </div>

      <div className='main-container'>
        <Toolbar />
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onConnect={onConnect}
              isValidConnection={isValidConnection}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              // fitView
              maxZoom={2.5}
              minZoom={0.5}
              defaultViewport={{x: 0, y: 0, zoom: 1}}
            >
              <Controls />
              <Background variant='dots' gap={12} size={1} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

// const App = () => {

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//       <div className="app">
//         <div className='topbar'>

//         </div>

//         <div className='main-container'>

//           <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//             <div className='title-collapse'>
//               <div className='title'>
//                 <p>APP TITLE</p>
//               </div>
//               <div className='collapse-button' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                 <p>X</p>
//               </div>
//             </div>

//             <div>
//               <Toolbar />
//             </div>
//           </div>
// {/* 
//           <div className='playground'>
//             <Playground />
//           </div>  */}
//         </div>
//       </div>
//   );
// };

export default App;
