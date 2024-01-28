import React, { useState } from 'react';
import '../styles/Playground.css';
import LogicGate from './LogicGate';
import { useDrop } from 'react-dnd';
import AndGate from "../assets/and.svg";

const Playground = ({ nodes, onDropNode }) => {
    // FOR ZOOMING IN AND OUT OF THE PLAYGROUND
    const [zoom, setZoom] = useState(1);
    const speed = 0.1;

    // FOR MOVING INSIDE THE PLAYGROUND BY DRAGGING
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

    // HANDLES THE SCROLLING OF THE MOUSE WHEEL TO SET A ZOOM LEVEL
    const handleWheel = (e) => {
        e.preventDefault();
        const maxZoom = 3; // Maximum zoom level
        const minZoom = 0.5; // Minimum zoom level

        setZoom(prevZoom => {
            let newZoom = prevZoom;
            if (e.deltaY > 0) {
                newZoom = Math.max(prevZoom - speed, minZoom); // Zoom out
            } else {
                newZoom = Math.min(prevZoom + speed, maxZoom); // Zoom in
            }
            return newZoom;
        });
    };

    // HANDLES THE PRESS DOWN OF THE MOUSE WHEEL
    const handleMouseDown = (e) => {
        if (e.button === 1) { // Middle mouse button
            e.preventDefault();
            setIsDragging(true);
            setStartDragPosition({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    // HANDLES THE MOVING OF THE MOUSE WHEEL WHEN PRESSED DOWN
    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - startDragPosition.x;
            const newY = e.clientY - startDragPosition.y;
            setPosition({ x: newX, y: newY });
        }
    };

    // HANDLES THE RELEASE OF THE MOUSE WHEEL
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const [, dropRef] = useDrop(() => ({
        accept: 'LOGIC_GATE', 
        drop: (item, monitor) => {
            const delta = monitor.getClientOffset();
            onDropNode(item, { x: delta.x, y: delta.y });
        },
    }));

    // BASE GRID SIZE FOR THE SPACING OF THE PLAYGROUND GRID
    const baseGridSize = 15;

    /* CONTROLS THE STYLING OF THE MAIN CONTAINER
        - backgroundSize -> controls the size of the grid spacing to give the effect of zooming in and out 
    */
    const containerStyle = {
        height: '100%',
        width: '100%',
        backgroundSize: `${baseGridSize * zoom}px ${baseGridSize * zoom}px`,
        backgroundImage: `
            linear-gradient(to right, grey 1px, transparent 1px),
            linear-gradient(to bottom, grey 1px, transparent 1px)
        `,
        cursor: isDragging ? 'grabbing' : 'default',
        position: 'relative',
        overflow: 'hidden'
    };

    /* CONTROLS THE STYLING OF THE WRAPPER INSIDE THE MAIN CONTAINER
        - wrapper needed to be able to apply effect on all children inside the main container

        - transform scale -> controls the scale of the children to give the effect of zooming in and out
        - transform translate -> controls the position of the children to give the effect of panning inside the playground
        - transformOrigin -> scales the children based on the center
        */
    const wrapperStyle = {
        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
        transformOrigin: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute', // if your children are positioned absolutely
    };



    return (
        <div className='container' style={containerStyle} ref={dropRef}
            onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        >
            <div style={wrapperStyle}>
                {nodes.map((node) => (
                    <img src={node.imageSrc} />
                ))}
                <LogicGate imageSrc={AndGate} posY={300} posX={100} />
            </div>
        </div>
    );
};

export default Playground;

