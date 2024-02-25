import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import InputOne from '../assets/input.svg';
import InputZero from '../assets/output.svg'
import '../styles/InputNode.css';

const typeToSvg = {
  inputOneNode: InputOne,
  inputZeroNode: InputZero,    
}

export default memo(({ data, isConnectable }) => {
    
    const outputClass = data.value ? 'handle--true' : 'handle--false';    
    
    const inputToUse = typeToSvg[data.gateType] || null

    return (
      <div>
          <img className='' src={inputToUse} alt=''></img>
        <Handle
          className={`outputForInputNode ${outputClass}`}
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    );
  });