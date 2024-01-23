import React from 'react';
import '../styles/LogicGate.css'; 


const LogicGate = ({id, type, image, onClick}) => {


    return (
        <div className='logic-gate' onClick={() => onClick({ id, type, image })}>
            <img src={image} alt={`${type} gate`} />
            <p>{type} Gate</p>
        </div>
    );
};

export default LogicGate;