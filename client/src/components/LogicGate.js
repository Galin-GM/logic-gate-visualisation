import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import '../styles/LogicGate.css';


export default memo(({ data, isConnectable }) => {

    const handleAClass = data.handleA ? 'handle--true' : 'handle--false';
    const handleBClass = data.handleB ? 'handle--true' : 'handle--false';
    const outputClass = data.value ? 'handle--true' : 'handle--false';

    const gateToUse = typeToSvg[data.gateType] || null

    return (
        <div style={{ height: 'auto', width: '100%' }}>

            {data.gateType !== 'notNode' ? ( // 2 INPUTS 
                <>
                    <Handle
                        className={`inputA ${handleAClass}`}
                        type="target"
                        position={Position.Left}
                        id='a'
                        isConnectable={isConnectable}
                    />
                    <Handle
                        className={`inputB ${handleBClass}`}
                        type="target"
                        position={Position.Left}
                        id='b'
                        isConnectable={isConnectable}
                    />
                </>
            ) : ( // ONE INPUT (NOT GATE)
                <Handle
                    className={`inputA-not ${handleAClass}`}
                    type="target"
                    position={Position.Left}
                    id='a'
                    isConnectable={isConnectable}
                />
            )}

            {gateToUse} {/* SVG */}

            <Handle
                className={`output ${outputClass}`}
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </div>
    );
});



const typeToSvg = {
    andNode: <svg width="111" height="115" viewBox="0 0 222 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="51" x2="60" y2="51" stroke="black" strokeWidth="3" />
        <line x1="174" y1="114" x2="222" y2="114" stroke="black" strokeWidth="3" />
        <line x1="-0.00415039" y1="170.5" x2="59.9958" y2="170.5" stroke="black" strokeWidth="3" />
        <mask id="path-4-inside-1_0_1" fill="white">
            <path d="M59 230C74.102 230 89.0562 227.025 103.009 221.246C116.961 215.467 129.639 206.996 140.317 196.317C150.996 185.639 159.467 172.961 165.246 159.009C171.025 145.056 174 130.102 174 115C174 99.898 171.025 84.9438 165.246 70.9914C159.467 57.039 150.996 44.3615 140.317 33.6827C129.639 23.004 116.961 14.5331 103.009 8.75385C89.0561 2.97456 74.102 -1.14017e-06 59 0L59 115L59 230Z" />
        </mask>
        <path d="M59 230C74.102 230 89.0562 227.025 103.009 221.246C116.961 215.467 129.639 206.996 140.317 196.317C150.996 185.639 159.467 172.961 165.246 159.009C171.025 145.056 174 130.102 174 115C174 99.898 171.025 84.9438 165.246 70.9914C159.467 57.039 150.996 44.3615 140.317 33.6827C129.639 23.004 116.961 14.5331 103.009 8.75385C89.0561 2.97456 74.102 -1.14017e-06 59 0L59 115L59 230Z" stroke="black" strokeWidth="6" mask="url(#path-4-inside-1_0_1)" />
    </svg>,

    orNode: <svg width="111" height="115" viewBox="0 0 222 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.00292969" y1="52.7672" x2="67.0012" y2="52.7672" stroke="black" strokeWidth="3" />
        <line x1="179.999" y1="115" x2="222.011" y2="115" stroke="black" strokeWidth="3" />
        <path d="M0 171.004H68.5" stroke="black" strokeWidth="3" />
        <path d="M162.5 150.194L161.617 149.724C140.258 189.894 101.869 218.24 57.1925 226.83L47.8336 228.629C84.3208 157.267 84.3175 72.7111 47.8237 1.35152L55.3101 2.72595C100.306 10.9867 139.278 38.8726 161.619 78.7933L171.112 97.1194L180.369 114.99L161.62 149.719L162.5 150.194Z" fill="" stroke="black" strokeWidth="3" />
    </svg>,

    nandNode: <svg width="111" height="115" viewBox="0 0 222 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="51" x2="60" y2="51" stroke="black" strokeWidth="3" />
        <line x1="174" y1="114" x2="222" y2="114" stroke="black" strokeWidth="3" />
        <line x1="-0.00415039" y1="170.5" x2="59.9958" y2="170.5" stroke="black" strokeWidth="3" />
        <mask id="path-4-inside-1_0_1" fill="white">
            <path d="M59 230C74.102 230 89.0562 227.025 103.009 221.246C116.961 215.467 129.639 206.996 140.317 196.317C150.996 185.639 159.467 172.961 165.246 159.009C171.025 145.056 174 130.102 174 115C174 99.898 171.025 84.9438 165.246 70.9914C159.467 57.039 150.996 44.3615 140.317 33.6827C129.639 23.004 116.961 14.5331 103.009 8.75385C89.0561 2.97456 74.102 -1.14017e-06 59 0L59 115L59 230Z" />
        </mask>
        <path d="M59 230C74.102 230 89.0562 227.025 103.009 221.246C116.961 215.467 129.639 206.996 140.317 196.317C150.996 185.639 159.467 172.961 165.246 159.009C171.025 145.056 174 130.102 174 115C174 99.898 171.025 84.9438 165.246 70.9914C159.467 57.039 150.996 44.3615 140.317 33.6827C129.639 23.004 116.961 14.5331 103.009 8.75385C89.0561 2.97456 74.102 -1.14017e-06 59 0L59 115L59 230Z" stroke="black" strokeWidth="6" mask="url(#path-4-inside-1_0_1)" />
        <circle cx="183" cy="114" r="9" fill="white" stroke="black" strokeWidth="2" />
    </svg>,

    norNode: <svg width="111" height="115" viewBox="0 0 222 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.00292969" y1="52.7672" x2="67.0012" y2="52.7672" stroke="black" strokeWidth="3" />
        <line x1="179.999" y1="115" x2="222.011" y2="115" stroke="black" strokeWidth="3" />
        <path d="M0 171.004H68.5" stroke="black" strokeWidth="3" />
        <path d="M162.5 150.194L161.617 149.724C140.258 189.894 101.869 218.24 57.1925 226.83L47.8336 228.629C84.3208 157.267 84.3175 72.7111 47.8237 1.35152L55.3101 2.72595C100.306 10.9867 139.278 38.8726 161.619 78.7933L171.112 97.1194L180.369 114.99L161.62 149.719L162.5 150.194Z" fill="" stroke="black" strokeWidth="3" />
        <circle cx="190" cy="114" r="9" fill="white" stroke="black" strokeWidth="2" />
    </svg>,

    xorNode: <svg width="111" height="115" viewBox="0 0 222 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38 3V3C75.4803 72.9632 75.4803 157.037 38 227V227" stroke="black" strokeWidth="3" />
        <line x1="0.00292969" y1="52.7672" x2="67.0012" y2="52.7672" stroke="black" strokeWidth="3" />
        <line x1="179.999" y1="115" x2="222.011" y2="115" stroke="black" strokeWidth="3" />
        <path d="M0 171.004H68.5" stroke="black" strokeWidth="3" />
        <path d="M162.5 150.194L161.617 149.724C140.258 189.894 101.869 218.24 57.1925 226.83L47.8336 228.629C84.3208 157.267 84.3175 72.7111 47.8237 1.35152L55.3101 2.72595C100.306 10.9867 139.278 38.8726 161.619 78.7933L171.112 97.1194L180.369 114.99L161.62 149.719L162.5 150.194Z" fill="" stroke="black" strokeWidth="3" />
    </svg>,

    xnorNode: <svg width="111" height="115" viewBox="0 0 222 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38 3V3C75.4803 72.9632 75.4803 157.037 38 227V227" stroke="black" strokeWidth="3" />
        <line x1="0.00292969" y1="52.7672" x2="67.0012" y2="52.7672" stroke="black" strokeWidth="3" />
        <line x1="179.999" y1="115" x2="222.011" y2="115" stroke="black" strokeWidth="3" />
        <path d="M0 171.004H68.5" stroke="black" strokeWidth="3" />
        <path d="M162.5 150.194L161.617 149.724C140.258 189.894 101.869 218.24 57.1925 226.83L47.8336 228.629C84.3208 157.267 84.3175 72.7111 47.8237 1.35152L55.3101 2.72595C100.306 10.9867 139.278 38.8726 161.619 78.7933L171.112 97.1194L180.369 114.99L161.62 149.719L162.5 150.194Z" fill="" stroke="black" strokeWidth="3" />
        <circle cx="190" cy="114" r="9" fill="white" stroke="black" strokeWidth="2" />
    </svg>,

    notNode: <svg width="111" height="113" viewBox="0 0 225 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="61.5946" x2="46" y2="61.5946" stroke="black" strokeWidth="3" />
        <line x1="179.995" y1="61.5946" x2="222.008" y2="61.5946" stroke="black" strokeWidth="3" />
        <path d="M46 120V2L181 62.0261L46 120Z" stroke="black" strokeWidth="3" />
        <circle cx="190" cy="61" r="9" fill="white" stroke="black" strokeWidth="2" />
    </svg>,
}

