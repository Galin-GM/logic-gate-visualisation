import LogicGate from './LogicGate';
import '../styles/Toolbar.css'; 

// import images for the logic gates
import Image1 from "../assets/image0.jpg";

const Toolbar = ({onAddNode}) => {
    
    const gates = [
        {id: 1, type: 'AND', image: Image1},
        {id: 2, type: 'OR', image: Image1},
        {id: 3, type: 'NOT', image: Image1},
        {id: 4, type: 'XOR', image: Image1},   
    ];

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
                    {gates.map(gate => (
                        <LogicGate key={gate.id} id={gate.id} type={gate.type} image={gate.image} onClick={onAddNode}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Toolbar;
