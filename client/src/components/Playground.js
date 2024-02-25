import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, addEdge, Background, Controls } from 'reactflow';

import 'reactflow/dist/style.css';
import '../styles/Playground.css';


const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const nodeTypes = {
    // selectorNode: Gate,
  };

let id = 0;
const getId = () => `dndnode_${id++}`;

const Playground = () => {

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
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
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            console.log(newNode.type)

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    return (
        <div className='container' >
            <div className="dndflow">
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            nodeTypes={nodeTypes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            fitView
                        >
                            <Controls />
                            <Background variant='dots' gap={12} size={1} />
                        </ReactFlow>
                    </div>
                    {/* <Sidebar /> */}
                </ReactFlowProvider>
            </div>
        </div>
    );
};

export default Playground;

