import React, { useState } from 'react';
import '../styles/Playground.css'; 
import LogicGate from './LogicGate';


const Playground = ({ nodes }) => {
    
    return (
        <div className='container'>
            {nodes.map((node) => (
                <LogicGate key={node.id} id={node.id} type={node.type} image={node.image} />
            ))}
        </div>
      );
};

export default Playground;

