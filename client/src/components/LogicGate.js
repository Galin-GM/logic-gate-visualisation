import React from 'react';
import '../styles/LogicGate.css'; 
import { useDrag } from 'react-dnd';


const LogicGate = ({ imageSrc, posX, posY }) => {

    
    return (
        <img src={imageSrc} style={{
            backgroundColor: 'white',
            position: 'absolute',
            top: posX,
            left: posY
        }}/>
    );
};

export default LogicGate;