import '../styles/Toolbar.css';
import React from 'react';
// import images for the logic gates
import AndGate from "../assets/and.svg";
import OrGate from "../assets/or.svg";

import Input from '../assets/input.svg';
import Output from '../assets/output.svg';

const Toolbar = () => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <h1 className="description">Inputs</h1>
            <div className='content'>
                <div className='grid-container'>
                    <div className='left-col'>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'inputOneNode')} draggable src={Input}></img>
                    </div>

                    <div className='right-col'>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'inputZeroNode')} draggable src={Output}></img>
                    </div>
                </div>
            </div>

            <h1 className="description">Outputs</h1>
            <div className='content'>
                <div className='grid-container'>
                    <div className='left-col'>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'outputNode')} draggable src={Input}></img>
                    </div>

                    <div className='right-col'>
                        <img className='outputNode' onDragStart={(event) => onDragStart(event, 'inputZeroNode')} draggable src={Output}></img>
                    </div>
                </div>
            </div>

            <h1 className="description">Logic Gates</h1>
            <div className='content'>
                <div className='grid-container'>
                    <div className='left-col'>
                        <img className='gate' onDragStart={(event) => onDragStart(event, 'andNode')} draggable src={AndGate}></img>
                    </div>

                    <div className='right-col'>
                        <img className='gate' onDragStart={(event) => onDragStart(event, 'orNode')} draggable src={OrGate}></img>
                    </div>
                </div>
            </div>
        </aside>
        // <div className='sidebar-content'>
        //     <div className='content-holder'>
        //         <p>Input Nodes</p>
        //     </div>
        //     <div className='content-holder'>
        //         <div className='title'>
        //             Logic Gates
        //         </div>
        //         <div className='content'>
        //             <div className='grid-container'>
        //                 <div className='left-col'><img src={AndGate} /></div>
        //                 <div className='right-col'><img src={AndGate} /></div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Toolbar;
