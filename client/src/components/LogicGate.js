import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import AndGate from "../assets/and.svg";
import OrGate from "../assets/or.svg";
import NandGate from "../assets/nand.svg";
import NorGate from "../assets/nor.svg";
import XorGate from "../assets/xor.svg"
import XnorGate from "../assets/xnor.svg"

import '../styles/LogicGate.css';

const typeToSvg = {
    andNode: AndGate,
    orNode: OrGate,  
    nandNode: NandGate,  
    norNode: NorGate,
    xorNode: XorGate,
    xnorNode: XnorGate,
}

export default memo(({ data, isConnectable }) => {
    
    const handleAClass = data.handleA ? 'handle--true' : 'handle--false';
    const handleBClass = data.handleB ? 'handle--true' : 'handle--false';
    const outputClass = data.value ? 'handle--true' : 'handle--false';

    const gateToUse = typeToSvg[data.gateType] || null
    

    return (
      <div>
        <Handle
          className={`inputA ${handleAClass}`}
          type="target"
          position={Position.Left}
          id='a'
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
        <Handle
          className={`inputB ${handleBClass}`}
          type="target"
          position={Position.Left}
          id='b'
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
          <img src={gateToUse} alt={`${gateToUse}`}></img>
        <Handle
          className={`output ${outputClass}`}
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    );
  });