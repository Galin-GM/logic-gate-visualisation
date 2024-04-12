import React from 'react';

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
import Logo from '../assets/logo.svg'

import '../styles/Toolbar.css';


const Toolbar = () => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className='sidebar'>

            <div className='logo-container'>
                <img src={Logo} className='logo' alt='logo'></img>
            </div>

            <div className='content'>
                <h1 className="description">Inputs</h1>
                <div className='grid-container'>
                    <div className='left-col'>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'inputOneNode')} draggable src={Input} alt='inputOneNode'></img>
                        <h className='label' style={{ fontSize: '14px', marginTop: '4px' }}>One Constant</h>
                    </div>

                    <div className='right-col'>
                        <img className='inputNode' onDragStart={(event) => onDragStart(event, 'inputZeroNode')} draggable src={InputZero} alt='inputZeroNode'></img>
                        <h className='label' style={{ fontSize: '14px', marginTop: '4px' }}>Zero Constant</h>
                    </div>

                    <div className='left-col'>
                        <img className='inputNodeSwitch' onDragStart={(event) => onDragStart(event, 'switchNode')} draggable src={Switch} alt='switchNode'></img>
                        <h className='label' style={{ fontSize: '14px', marginTop: '4px', marginBottom: '-10px' }}>Switch</h>
                    </div>
                </div>
            </div>

            <div className='content'>
                <h1 className="description">Outputs</h1>
                <div className='grid-container'>
                    <div className='left-col'>
                        <img className='outputNode' onDragStart={(event) => onDragStart(event, 'outputNode')} draggable src={Output} alt='outputNode'></img>
                        <h className='label' style={{ fontSize: '14px', marginTop: '4px', marginBottom: '-10px' }}>Light Bulb</h>
                    </div>
                </div>
            </div>

            <div className='content'>
                <h1 className="description">Logic Gates</h1>
                <div className='grid-container'>
                    <div className='left-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'andNode')} draggable src={AndGate} alt='andNode'></img>
                            <div className='gate-label'>AND</div>
                        </div>
                    </div>

                    <div className='right-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'orNode')} draggable src={OrGate} alt='orNode'></img>
                            <div className='gate-label' style={{ fontSize: '14px', left: '54%' }}>OR</div>
                        </div>
                    </div>

                    <div className='left-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'nandNode')} draggable src={NandGate} alt='nandNode'></img>
                            <div className='gate-label' style={{ fontSize: '14px', left: '52%' }}>NAND</div>
                        </div>
                    </div>

                    <div className='right-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'norNode')} draggable src={NorGate} alt='norNode'></img>
                            <div className='gate-label' style={{ fontSize: '14px', left: '54%' }}>NOR</div>
                        </div>
                    </div>

                    <div className='left-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'xorNode')} draggable src={XorGate} alt='xorNode'></img>
                            <div className='gate-label' style={{ fontSize: '14px', left: '54%' }}>XOR</div>
                        </div>
                    </div>

                    <div className='right-col'>
                        <div className='image-container'>
                            <img className='gate' onDragStart={(event) => onDragStart(event, 'xnorNode')} draggable src={XnorGate} alt='xnorNode'></img>
                            <div className='gate-label' style={{ fontSize: '14px', left: '55%' }}>XNOR</div>
                        </div>
                    </div>
                </div>

                <div className='last-row'>
                    <div className='image-container-not-gate'>
                        <img className='gate' onDragStart={(event) => onDragStart(event, 'notNode')} draggable src={NotGate} alt='notNode'></img>
                        <div className='gate-label' style={{ fontSize: '14px', left: '45%' }}>NOT</div>
                    </div>
                </div>

            </div>
        </aside>
    );
};

export default Toolbar;
