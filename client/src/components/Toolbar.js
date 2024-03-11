import '../styles/Toolbar.css';
import React from 'react';
// import images for the logic gates
import AndGate from "../assets/and.svg";
import NandGate from "../assets/nand.svg"
import OrGate from "../assets/or.svg";
import NorGate from "../assets/nor.svg";
import XorGate from "../assets/xor.svg";
import XnorGate from "../assets/xnor.svg";
import NotGate from "../assets/not.svg";

import Input from '../assets/input.svg';
import InputZero from '../assets/output.svg';
import Switch from '../assets/switch.svg';
import Output from '../assets/lightbulb-off.svg';

const Toolbar = () => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className='sidebar'>
            <h1 className="description">Inputs</h1>
            <div className='content'>
                <div className='grid-container'>
                    <div className='left-col'>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'inputOneNode')} draggable src={Input} alt=''></img>
                    </div>

                    <div className='right-col'>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'inputZeroNode')} draggable src={InputZero} alt=''></img>
                    </div>

                    <div className='left-col'>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'switchNode')} draggable src={Switch} alt=''></img>
                    </div>
                </div>
            </div>

            <h1 className="description">Outputs</h1>
            <div className='content'>
                <div className='grid-container'>
                    <div className='left-col'>
                        {/* <img className='inputNode' onDragStart={(event) => onDragStart(event, 'outputNode')} draggable src={Input}></img> */}
                    </div>

                    <div className="right-col" onDragStart={(event) => onDragStart(event, 'outputNode')} draggable>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'inputZeroNode')} draggable src={Output} alt=''></img>
                    </div>
                </div>
            </div>

            <h1 className="description">Logic Gates</h1>
            <div className='content'>
                <div className='grid-container'>
                    <div className='left-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'andNode')} draggable src={AndGate} alt=''></img>
                            <div className='gate-label'>AND</div>
                        </div>
                    </div>

                    <div className='right-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'orNode')} draggable src={OrGate} alt=''></img>
                            <div className='gate-label' style={{ fontSize: '18px', left: '54%' }}>OR</div>
                        </div>
                    </div>

                    <div className='left-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'nandNode')} draggable src={NandGate} alt=''></img>
                            <div className='gate-label' style={{ fontSize: '18px', left: '52%' }}>NAND</div>
                        </div>
                    </div>

                    <div className='right-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'norNode')} draggable src={NorGate} alt=''></img>
                            <div className='gate-label' style={{ fontSize: '18px', left: '54%' }}>NOR</div>
                        </div>
                    </div>

                    <div className='left-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'xorNode')} draggable src={XorGate} alt=''></img>
                            <div className='gate-label' style={{ fontSize: '18px', left: '54%' }}>XOR</div>
                        </div>
                    </div>

                    <div className='right-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'xnorNode')} draggable src={XnorGate} alt=''></img>
                            <div className='gate-label' style={{ fontSize: '16px', left: '55%' }}>XNOR</div>
                        </div>
                    </div>



                </div>
                <div className='last-row'>
                    <div className='image-container'>
                        <img className='gate' onDragStart={(event) => onDragStart(event, 'notNode')} draggable src={NotGate} alt=''></img>
                        <div className='gate-label' style={{ fontSize: '18px', left: '45%' }}>NOT</div>
                    </div>
                </div>


            </div>
        </aside>
    );
};

export default Toolbar;
