import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import Output from '../assets/output.svg';
import '../styles/OutputNode.css';

export default memo(({ data, isConnectable }) => {
    
    const outputClass = data.value ? 'handle--true' : 'handle--false';    

    return (
      <div>
        <Handle
          className={`inputForOutputNode ${outputClass}`}
          type="target"
        //   id='a'
          onConnect={(params) => console.log('handle onConnect', params)}
          position={Position.Left}
          isConnectable={isConnectable}
        />
          <img className='test' src={Output}></img>
      </div>
    );
  });