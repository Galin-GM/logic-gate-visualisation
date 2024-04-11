import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

import '../styles/ContextMenu.css';

const typeToGeneric = {
    andNode: 'logic',
    orNode: 'logic',
    nandNode: 'logic',
    norNode: 'logic',
    xorNode: 'logic',
    xnorNode: 'logic',
    notNode: 'logic',
    inputOneNode: 'input',
    inputZeroNode: 'input',
    switchNode: 'input',
    outputNode: 'output',
}


export default function ContextMenu({ nodeSelected, top, left, right, bottom, onNodesDelete, evaluateGate, setUpdateInfo, ...props }) {

    const { deleteElements, getNodes, setNodes, getEdges, setEdges } = useReactFlow();

    const deleteNode = useCallback(() => {
        deleteElements({ nodes: [nodeSelected], edges: [] })
    }, [deleteElements, nodeSelected]);

    const swapLogicGate = (to) => {

        const nodes = getNodes()
        const updatedData = { ...nodeSelected }

        updatedData.data.gateType = to
        updatedData.type = to

        if (to === 'notNode') {
            updatedData.data.value = !(updatedData.data.handleA)

            const allEdges = getEdges()
            const bHandle = allEdges.find(edge => edge.target === nodeSelected.id && edge.targetHandle === 'b')

            if (bHandle) {
                setEdges((edges) => edges.filter((edge) => edge.id !== bHandle.id));
            }
        }
        else {
            updatedData.data.value = evaluateGate(updatedData.data)
        }

        const updatedNodes = nodes.map(node => {

            if (node.id === nodeSelected.id) {
                return {
                    ...updatedData,
                    data: updatedData.data
                };
            }

            return node;
        });

        setNodes(updatedNodes)
        setUpdateInfo({ needUpdate: true, latestSource: { source: nodeSelected.id } })
    }

    const swapInput = (to) => {

        const nodes = getNodes()
        const updatedData = { ...nodeSelected }

        updatedData.data.gateType = to
        updatedData.type = to;

        if (to === 'inputZeroNode') { updatedData.data.value = false }
        else { updatedData.data.value = true }

        const updatedNodes = nodes.map(node => {

            if (node.id === nodeSelected.id) {
                return {
                    ...updatedData,
                    data: updatedData.data
                };
            }

            return node;
        });

        setNodes(updatedNodes)
        setUpdateInfo({ needUpdate: true, latestSource: { source: nodeSelected.id } })
    }

    return (
        <div
            style={{ top, left, right, bottom }}
            className='context-menu'
            {...props}
        >

            {typeToGeneric[nodeSelected.type] === 'logic' && (
                <>
                    <p style={{ margin: '0.5em' }}>
                        <small>Swap Node For:</small>
                    </p>
                    <div className='swapButtons'>
                        <button onClick={() => swapLogicGate('andNode')}>AND</button>
                        <button onClick={() => swapLogicGate('orNode')}>OR</button>
                        <button onClick={() => swapLogicGate('nandNode')}>NAND</button>
                        <button onClick={() => swapLogicGate('norNode')}>NOR</button>
                        <button onClick={() => swapLogicGate('xorNode')}>XOR</button>
                        <button onClick={() => swapLogicGate('xnorNode')}>XNOR</button>
                        <button className='notButton' onClick={() => swapLogicGate('notNode')}>NOT</button>
                    </div>
                </>
            )}

            {typeToGeneric[nodeSelected.type] === 'input' && (
                <>
                    <p style={{ margin: '0.5em' }}>
                        <small>Swap Node For:</small>
                    </p>
                    <div className='swapButtons'>
                        <button onClick={() => swapInput('inputOneNode')}>ONE CONSTANT</button>
                        <button onClick={() => swapInput('inputZeroNode')}>ZERO CONSTANT</button>
                        <button onClick={() => swapInput('switchNode')}>SWITCH</button>
                    </div>
                </>
            )}

            <div className='deleteButton'>
                <button onClick={deleteNode}>DELETE</button>
            </div>

        </div>
    )
}