import LogicGate from './LogicGate';
import '../styles/Toolbar.css'; 
import React from 'react';
// import images for the logic gates
import AndGate from "../assets/and.svg";
import { useDrag } from 'react-dnd';

const Toolbar = ({onAddNode}) => {
    
    const DraggableLogicGate = ({ imageSrc, type }) => {
        const [, dragRef] = useDrag(() => ({
          type: 'LOGIC_GATE',
          item: { type, imageSrc },
        }));
      
        return <img ref={dragRef} src={imageSrc} className='gate-image' draggable='true' />;
      };

    const handleClick = () => {
        const newNode = {imageSrc : AndGate};
        onAddNode(newNode)
    } 

    return (
        <div className='sidebar-content'>
            <div className='content-holder'>
                <p>Input Nodes</p>
            </div>
            <div className='content-holder'>
                <div className='title'>
                    Logic Gates
                </div>
                <div className='content'>
                    {/* {gates.map(gate => (
                        <LogicGate key={gate.id} id={gate.id} type={gate.type} image={gate.image} onClick={onAddNode}/>
                    ))} */}
                    {/* <table className='sidebar-table'>
                        <tr>
                            <td className='sidebar-gate'>
                                <DraggableLogicGate imageSrc={AndGate} type="AndGate" />
                            </td>
                        </tr>
                    </table> */}
                    <div className='grid-container'>
                        <div className='left-col'><img src={AndGate} alt='' className='gate-image' onClick={handleClick}></img></div>
                        <div className='right-col'><img src={AndGate} alt='' className='gate-image' onClick={handleClick}></img></div>
                        <div className='left-col'><img src={AndGate} alt='' className='gate-image' onClick={handleClick}></img></div>
                        <div className='right-col'><img src={AndGate} alt='' className='gate-image' onClick={handleClick}></img></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;
