import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, addEdge, updateEdge, getOutgoers, getConnectedEdges, Background, Controls, Panel, useReactFlow } from 'reactflow';

import './App.css';
import 'reactflow/dist/style.css';

import Toolbar from './components/Toolbar';
import LogicGate from './components/LogicGate';
import InputNode from './components/InputNode';
import OutputNode from './components/OutputNode';
import useUndoRedo from './components/useUndoRedo';
import ContextMenu from './components/ContextMenu';
import dagreLayout from './dagre';

const nodeTypes = {
  andNode: LogicGate,
  orNode: LogicGate,
  nandNode: LogicGate,
  norNode: LogicGate,
  xorNode: LogicGate,
  xnorNode: LogicGate,
  notNode: LogicGate,
  inputOneNode: InputNode,
  inputZeroNode: InputNode,
  switchNode: InputNode,
  outputNode: OutputNode,
};

// FOR TESTING PURPOSES
const initialNodes = [
  // { id: 'input', position: { x: 50, y: 200 }, data: { value: true, gateType: "switchNode" }, type: "switchNode" },
  // { id: 'output', position: { x: 500, y: 200 }, data: { handleA: true, handleB: false, value: true, gateType: "outputNode" }, type: "outputNode" },
  // { id: 'and', position: { x: 350, y: 200 }, data: { handleA: true, handleB:true, value: true, gateType: "andNode" }, type: "andNode" },
  // { id: '4', position: { x: 350, y: 200 }, data: { handleA: true, handleB: false, value: true, gateType: "outputNode" }, type: "outputNode" },
  // { id: 'not', position: { x: 500, y: 200 }, data: { handleA: true, handleB: false, value: false, gateType: "notNode" }, type: "notNode" },
];

const initialEdges = [
  // { source: 'input', sourceHandle: null, target: 'and', targetHandle: 'a', id: '12' },
  // { source: 'input', sourceHandle: null, target: 'and', targetHandle: 'b', id: '34' },
  // { source: 'and', sourceHandle: null, target: 'output', targetHandle: 'a', id: 'abcd' },
];

// SCRIPTS TO FILL PLAYGROUND WITH MANY NODES
// for (let i=0; i <500; i++) {
//   initialNodes.push({
//     id: `not-${i+1}`,
//     position: {x: 200+(i*150), y: 200},
//     data: {value: true, gateType: "notNode"},
//     type: "notNode"
//   });

//    initialEdges.push({
//     source: `not-${i+1}`,
//     sourceHandle: null,
//     target: `not-${i+2}`,
//     targetHandle: 'a',
//     id: `not-${i+1}`
//   })

// initialNodes.push({
//   id: `switch-${i+1}`,
//   position: {x: 200, y: 200+(i*80)},
//   data: {value: true, gateType: "switchNode"},
//   type: "switchNode"
// });

// initialNodes.push({
//   id: `output-${i+1}`, // Unique ID
//   position: { x: 300, y: 200+(i*80) }, // Positioned below the switch node
//   data: { handleA: true, handleB: false, value: true, gateType: "outputNode" },
//   type: "outputNode"
// });

// initialEdges.push({
//   source: `switch-${i+1}`,
//   sourceHandle: null,
//   target: `output-${i+1}`,
//   targetHandle: 'a',
//   id: `result-${i+1}`
// })
// }

// initialNodes.push({
//   id: `output`,
//   position: {x: 50, y: 300},
//   data: {value: true, gateType: "outputNode"},
//   type: "outputNode"
// });

// initialEdges.push({
//     source: `not-500`,
//     sourceHandle: null,
//     target: `output`,
//     targetHandle: 'a',
//     id: `result`
//   })


let id = 0;
const getId = () => `node_${id++}`;

const App = () => {

  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();
  const { fitView } = useReactFlow()

  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({ needUpdate: false, latestSource: null });
  const [menu, setMenu] = useState(null);
  const [formula, setFormula] = useState('');

  // console.log(edges)
  // console.log(nodes)

  // EVALUATES OUTPUT OF LOGIC GATE
  const evaluateGate = useCallback(
    (data) => {
      const { gateType, handleA, handleB } = data

      switch (gateType) {
        case 'andNode': return handleA && handleB;
        case 'orNode': return handleA || handleB;
        case 'nandNode': return !(handleA && handleB);
        case 'norNode': return !(handleA || handleB);
        case 'xorNode': return handleA ^ handleB;
        case 'xnorNode': return !(handleA ^ handleB);
        case 'notNode': return !handleA;
        case 'outputNode': return handleA;
        default:
          console.error(`Unknown gate type: ${gateType}`);
          return false;
      }
    }, []);


  // DELETES ALL NODES AND EDGES IN PLAYGROUND
  const deleteAllNodes = () => {
    takeSnapshot();
    setNodes([]);
    setEdges([]);
  }


  // AUTO LAYOUTS THE NODES IN THE PLAYGROUND
  const runDagreLayout = useCallback(async () => {
    takeSnapshot()

    const { nodes: layoutedNodes, edges: layoutedEdges } = await dagreLayout(nodes, edges, { direction: 'LR' });

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    setLayoutComplete(true);
  }, [nodes, edges, setNodes, setEdges, takeSnapshot]);


  // CALLED ON DELETION OF NODE
  const onNodesDelete = useCallback(
    (deleted) => {
      takeSnapshot()
      let updatedNodes = [...nodes]
      let sourcesToUpdate = [];

      deleted.forEach((node) => {
        const connectedEdges = getConnectedEdges([node], edges);
        const edgesToUpdate = connectedEdges.filter((edge) => edge.source === node.id)

        edgesToUpdate.forEach((edge) => {
          const targetNodeIndex = updatedNodes.findIndex(node => node.id === edge.target)

          if (targetNodeIndex === -1) return;

          const updatedData = { ...updatedNodes[targetNodeIndex].data };

          if (edge.targetHandle === 'a') {
            updatedData.handleA = false;
          } else if (edge.targetHandle === 'b') {
            updatedData.handleB = false;
          }

          updatedData.value = evaluateGate(updatedData);

          updatedNodes[targetNodeIndex] = { ...updatedNodes[targetNodeIndex], data: updatedData };
          sourcesToUpdate.push({ source: edge.target });
        })
      })

      setNodes(updatedNodes)
      setUpdateInfo({ needUpdate: true, latestSource: sourcesToUpdate })
    },
    [nodes, edges, setNodes, takeSnapshot, evaluateGate]);

  
  // CALLED ON RIGHT CLICK OF NODE TO OPEN UP MENU
  const onNodeContextMenu = useCallback(
    (event, node) => {

      event.preventDefault();

      const pane = reactFlowWrapper.current.getBoundingClientRect();

      setMenu({
        nodeSelected: node,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX - 300, // MINUS TOOLBAR WIDTH
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX + 300, // PLUS TOOLBAR WIDTH
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );


  // CLOSES MENU UPON CLICK OUTSIDE MENU
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);


  // USE EFFECT FOR PROPOGATING UPDATES TO NODES THROUGHOUT THE CIRCUIT
  useEffect(() => {
    // TRAVERSES CIRCUIT AND UPDATES NODE DATA
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

    // CHECK WHETHER UPDATED OF CIRCUIT IS REQUIRED
    if (updateInfo.needUpdate && updateInfo.latestSource) {
      let updatedNodes = [...nodes]; // create copy of nodes to modify

      if (updateInfo.latestSource.length > 0) { // if theres multiple to update - occurs when multiple nodes deleted together
        updateInfo.latestSource.forEach(({ source }) => {
          updateNodes(source, updatedNodes);
        })
      } else {
        updateNodes(updateInfo.latestSource.source, updatedNodes);
      }

      setNodes(updatedNodes); // set nodes to copy
      setUpdateInfo({ needUpdate: false, latestSource: null }); // reset as update complete
    }

    // CHECK WHETHER AUTO LAYOUT HAS FINISHED TO FOCUS ON NEW POSITIONS
    if (layoutComplete) {
      fitView({ padding: 1 });
      setLayoutComplete(false);
    }
  }, [updateInfo, edges, nodes, setNodes, evaluateGate, fitView, layoutComplete]);


  // CHECK WHETHER CIRCUIT IS VALID
  const isValidCircuit = (nodes, edges) => {
    const middleNodes = nodes.filter(node => node.type !== 'inputOneNode' && node.type !== 'inputZeroNode' && node.type !== 'outputNode' && node.type !== 'switchNode')

    for (const node of middleNodes) {
      const inputEdges = edges.filter(edge => edge.target === node.id)
      const outputEdges = edges.filter(edge => edge.source === node.id)

      if (node.type === 'notNode') {
        if (inputEdges.length !== 1 || outputEdges.length !== 1) return false
      } else {
        if (inputEdges.length !== 2 || outputEdges.length !== 1) return false;
      }
    }
    return true;
  }


  // USE EFFECT FOR FORMULA CONSTRUCTION
  useEffect(() => {
    let switchNodeCount = 0;
    const switchNodeMap = new Map();

    const getSwitchNodeIdentifier = (nodeId) => {
      if (switchNodeMap.has(nodeId)) {
        return switchNodeMap.get(nodeId);
      } else {
        const identifier = String.fromCharCode(65 + switchNodeCount++);
        switchNodeMap.set(nodeId, identifier);
        return identifier;
      }
    };

    const constructFormula = (outputNodeId, nodes, edges) => {
      const node = nodes.find(n => n.id === outputNodeId);

      if (!node) return '';
      if (node.type === 'inputOneNode') return '1';
      if (node.type === 'inputZeroNode') return '0';
      if (node.type === 'switchNode') return getSwitchNodeIdentifier(node.id);

      const inputEdges = edges.filter(edge => edge.target === outputNodeId);
      const inputFormulas = inputEdges.map(edge => constructFormula(edge.source, nodes, edges));

      switch (node.type) {
        case 'andNode':
          return `(${inputFormulas.join(' AND ')})`;
        case 'orNode':
          return `(${inputFormulas.join(' OR ')})`;
        case 'notNode':
          return `(NOT ${inputFormulas[0]})`;
        case 'norNode':
          return `(${inputFormulas.join(' NOR ')})`;
        case 'nandNode':
          return `(${inputFormulas.join(' NAND ')})`;
        case 'xorNode':
          return `(${inputFormulas.join(' XOR ')})`;
        case 'xnorNode':
          return `(${inputFormulas.join(' XNOR ')})`;
        default:
          return inputFormulas;
      }
    }

    if (isValidCircuit(nodes, edges)) {
      const outputNodes = nodes.filter(node => node.type === 'outputNode')
      const formulas = outputNodes.map(outputNode => constructFormula(outputNode.id, nodes, edges)).join('\n')

      setFormula(formulas);
    } else {
      setFormula('')
    }
  }, [nodes, edges]);


  // CALLED ON CONNECTION OF TWO NODES
  const onConnect = useCallback(
    (params) => {
      takeSnapshot()
      const { target, source, targetHandle } = params;

      const targetNode = nodes.find(node => node.id === target);
      const sourceNode = nodes.find(node => node.id === source);

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

      const newEdge = {
        ...params,
        interactionWidth: 20,
        style: { strokeWidth: 2 },
      };

      setEdges((eds) => addEdge(newEdge, eds));

      // sets update to be need from newest edge
      setUpdateInfo({ needUpdate: true, latestSource: params });
    }, [setEdges, setNodes, nodes, evaluateGate, takeSnapshot]);


  // CALLED ON BEGIN OF EDGE CHANGE
  const onEdgeUpdateStart = useCallback(
    () => {
      edgeUpdateSuccessful.current = false;
    }, []);


  // CALLED ON SUCCESSFUL UPDATE OF EDGE
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      takeSnapshot();
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
    }, [setEdges, setNodes, evaluateGate, takeSnapshot]);


  // CALLED ON END OF EDGE UPDATE
  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      takeSnapshot();
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
        setUpdateInfo({ needUpdate: true, latestSource: { source: edge.target } });

        // remove edge from edges
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
    }, [setEdges, setNodes, evaluateGate, takeSnapshot]);


  // CHECK WHETHER A CONNECTION IS VALID TO BE CREATED
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

      // check if there is a cycle
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
    }, [nodes, edges]);


  // CALLED ON ENTRY OF DRAG INTO PLAYGROUND
  const onDragOver = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);


  // CALLED ON DROP OF DRAG ON TOP OF PLAYGROUND - CREATION OF OBJECTS FOR NEW NODE IN HERE
  const onDrop = useCallback(
    (event) => {
      takeSnapshot();
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid (should never be but just in case)
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode;

      if (type === 'inputOneNode') { // if using constant true input
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`, gateType: `${type}`, value: true },
        };
      } else if (type === 'inputZeroNode') { // if using constant false input
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`, gateType: `${type}`, value: false },
        };
      } else if (type === 'switchNode') { // if using switch input
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`, gateType: `${type}`, value: true },
        };
      } else if (type === 'outputNode') { // if using output node
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`, gateType: `${type}`, handleA: false, value: false },
        };
      }
      // THIS CAN BE USED TO ONLY HAVE ONE HANDLE IN OBJECT BUT NOT NECESSARY AS WE ONLY USE HANDLE A
      // FOR NOT GATE SO HANDLE B WILL ALWAYS REMAIN FALSE IN OBJECT
      // else if (type === 'notNode') { // if using not gate - needed because only one handle
      //   newNode = {
      //     id: getId(),
      //     type,
      //     position,
      //     data: { label: `${type} node`, gateType: `${type}`, handleA: false, value: true },
      //   };
      // } 
      else {
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`, gateType: `${type}`, handleA: false, handleB: false, value: evaluateGate({ gateType: type, handleA: false, handleB: false }) },
        };
      }

      setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, setNodes, takeSnapshot, evaluateGate]);


  // CALLED ON BEGIN OF NODE DRAG IN THE PLAYGROUND
  const onNodeDragStart = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);


  // CALLED ON BEGIN OF SELECTION DRAG (SHIFT + DRAG)
  const onSelectionDragStart = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);


  // FLIPS VALUE OF SWITCH NODE ON CLICK - IGNORES ALL OTHER NODES
  const flipNode = useCallback((event, node) => {
    if (node.type === 'switchNode') {
      const updatedData = { ...node.data };

      updatedData.value = !(updatedData.value)

      const updatedNodes = nodes.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: updatedData
          };
        }
        return n;
      });

      setNodes(updatedNodes)

      const edgesToUpdate = edges.find(edge => edge.source === node.id)
      setUpdateInfo({ needUpdate: true, latestSource: edgesToUpdate });
    }
  }, [nodes, edges, setUpdateInfo, setNodes])


  
  return (
    <div className="app">

      <div className='main-container'>
        <Toolbar />

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeDragStart={onNodeDragStart}
            onSelectionDragStart={onSelectionDragStart}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onConnect={onConnect}
            isValidConnection={isValidConnection}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesDelete={onNodesDelete}
            onNodeClick={flipNode}
            onNodeContextMenu={onNodeContextMenu}
            onPaneClick={onPaneClick}
            maxZoom={2.5}
            minZoom={0.5}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            nodeDragThreshold={0.5}
            edgeUpdaterRadius={20}
            onlyRenderVisibleElements={true}
            selectionMode='partial'
            selectNodesOnDrag={false}
            deleteKeyCode={["Backspace", "Delete"]}
          >

            <Panel position='top-left' className='textBarPanel'>
              <input className='textBar' type='text' readOnly value={formula}></input>
            </Panel>

            <Panel position='top-right' className='buttonPanel'>
              <button disabled={!canUndo} onClick={undo}>Undo</button>
              <button disabled={!canRedo} onClick={redo}>Redo</button>
              <button disabled={nodes.length === 0} onClick={runDagreLayout}>Auto-Layout</button>
              <button disabled={nodes.length === 0} onClick={deleteAllNodes}>Delete All</button>
            </Panel>

            <Controls />
            <Background variant='dots' gap={12} size={1} />
            {menu && <ContextMenu onClick={onPaneClick} onNodesDelete={onNodesDelete} evaluateGate={evaluateGate} setUpdateInfo={setUpdateInfo} {...menu} />}
          </ReactFlow>
        </div>

      </div>
    </div>
  );
};

const AppWithProvider = () => {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
};

export default AppWithProvider;
