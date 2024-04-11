import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import '../styles/InputNode.css';


export default memo(({ data, isConnectable }) => {

  const outputClass = data.value ? 'handle--true' : 'handle--false';
  const switchClass = data.value ? 'switch--true' : 'switch--false';

  const inputToUse = typeToSvg[data.gateType] || null;

  return (
    <div className={`switchNode ${switchClass}`} data-cy={data.gateType}>
      
      {inputToUse}

      <Handle data-cy={outputClass}
        className={`outputForInputNode ${outputClass}`}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      
    </div>
  );
});


const typeToSvg = {
  inputOneNode: <svg width="65" height="65" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="128" height="128" stroke="black" strokeWidth="3" />
    <path d="M73.5057 18.9091V112H67.8239V24.9091H67.2784L46.3693 38.7727V32.6818L67.0966 18.9091H73.5057Z" fill="black" />
  </svg>,

  inputZeroNode: <svg width="65" height="65" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="128" height="128" stroke="black" strokeWidth="3" />
    <path d="M64.983 113.273C58.7708 113.273 53.4375 111.364 48.983 107.545C44.5284 103.727 41.1042 98.2576 38.7102 91.1364C36.3466 83.9848 35.1648 75.4242 35.1648 65.4545C35.1648 55.5151 36.3617 46.9697 38.7557 39.8182C41.1496 32.6667 44.5587 27.1818 48.983 23.3636C53.4375 19.5455 58.7708 17.6364 64.983 17.6364C71.1951 17.6364 76.5133 19.5455 80.9375 23.3636C85.392 27.1818 88.8163 32.6667 91.2102 39.8182C93.6042 46.9697 94.8011 55.5151 94.8011 65.4545C94.8011 75.4242 93.6042 83.9848 91.2102 91.1364C88.8466 98.2576 85.4375 103.727 80.983 107.545C76.5284 111.364 71.1951 113.273 64.983 113.273ZM64.983 108C72.5284 108 78.4527 104.258 82.7557 96.7727C87.0587 89.2576 89.2102 78.8182 89.2102 65.4545C89.2102 56.5455 88.2254 48.9091 86.2557 42.5455C84.3163 36.1818 81.5436 31.3182 77.9375 27.9545C74.3314 24.5606 70.0133 22.8636 64.983 22.8636C57.4375 22.8636 51.5133 26.6212 47.2102 34.1364C42.9072 41.6515 40.7557 52.0909 40.7557 65.4545C40.7557 74.3636 41.7254 82 43.6648 88.3636C45.6042 94.697 48.3769 99.5606 51.983 102.955C55.6193 106.318 59.9527 108 64.983 108Z" fill="black" />
  </svg>,

  switchNode: <svg width="60" height="65" viewBox="0 0 145 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect className='true' x="26" y="24" width="93" height="76" fill="#73FF81" />
    <rect className='false' x="25" y="100" width="93" height="76" fill="#FF7373" />
    <path d="M134.557 0H10.1512C4.55378 0 0 4.55378 0 10.1512V189.849C0 195.446 4.55378 200 10.1512 200H134.557C140.155 200 144.708 195.446 144.708 189.849V10.1512C144.708 4.55378 140.155 0 134.557 0ZM138.229 189.849C138.229 191.873 136.582 193.521 134.557 193.521H10.1512C8.12657 193.521 6.47948 191.873 6.47948 189.849V10.1512C6.47948 8.12657 8.12657 6.47948 10.1512 6.47948H134.557C136.582 6.47948 138.229 8.12657 138.229 10.1512V189.849Z" fill="black" />
    <path d="M113.823 20.7343H30.8856C25.2882 20.7343 20.7344 25.2881 20.7344 30.8855V169.114C20.7344 174.712 25.2882 179.266 30.8856 179.266H113.823C119.42 179.266 123.974 174.712 123.974 169.114V30.8855C123.974 25.2881 119.42 20.7343 113.823 20.7343ZM30.8856 27.2138H113.823C115.848 27.2138 117.495 28.8609 117.495 30.8855V96.7603H27.2139V30.8855C27.2139 28.8609 28.8609 27.2138 30.8856 27.2138ZM113.823 172.786H30.8856C28.8609 172.786 27.2139 171.139 27.2139 169.114V103.24H117.495V169.114C117.495 171.139 115.848 172.786 113.823 172.786Z" fill="black" />
    <path d="M72.3543 117.495C61.0407 117.495 51.8359 126.699 51.8359 138.013C51.8359 149.327 61.0407 158.531 72.3543 158.531C83.6679 158.531 92.8727 149.327 92.8727 138.013C92.8727 126.699 83.6679 117.495 72.3543 117.495ZM72.3543 152.052C64.6135 152.052 58.3154 145.754 58.3154 138.013C58.3154 130.272 64.6135 123.974 72.3543 123.974C80.0951 123.974 86.3932 130.272 86.3932 138.013C86.3932 145.754 80.0951 152.052 72.3543 152.052Z" fill="black" />
    <path d="M72.354 82.5054C74.1432 82.5054 75.5937 81.0549 75.5937 79.2657V44.7084C75.5937 42.9192 74.1432 41.4687 72.354 41.4687C70.5648 41.4687 69.1143 42.9192 69.1143 44.7084V79.2657C69.1143 81.0549 70.5648 82.5054 72.354 82.5054Z" fill="black" />
  </svg>,
}