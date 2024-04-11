import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import LightOn from '../assets/lightbulb-on.svg'
import LightOff from '../assets/lightbulb-off.svg'

import '../styles/OutputNode.css';


export default memo(({ data, isConnectable }) => {

  const handleAClass = data.handleA ? 'handle--true' : 'handle--false';
  const outputClass = data.value ? 'value--true' : 'value--false';

  const svgToUse = data.value ? LightOn : LightOff;

  return (
    <div>
      <Handle 
        data-cy="handle"
        className={`inputForOutputNode ${handleAClass}`}
        type="target"
        id='a'
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <img className={`OutputNode ${outputClass}`} src={svgToUse} alt='outputNode'></img>
    </div>
  );
});