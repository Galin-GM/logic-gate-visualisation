import './App.css';
import Toolbar from './components/Toolbar';
import Playground from './components/Playground';
import React, { useState } from 'react';
import Image1 from "./assets/image0.jpg";


const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [nodesInPlayground, setNodesInPlayground] = useState([]);

  const addNode = (newNode) => {
    setNodesInPlayground([...nodesInPlayground, newNode]);
  };

  return (
      <div className="app">
        <div className='topbar'>
        
        </div>

        <div className='main-container'>

          <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <div className='title-collapse'>
              <div className='title'>
                <p>APP TITLE</p>
              </div>
              <div className='collapse-button' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <p>X</p>
              </div>
            </div>

            <div>
              <Toolbar onAddNode={addNode}/>
            </div>
          </div>

          <div className='playground'>
            <Playground nodes={nodesInPlayground}/>
          </div>
        </div>
      </div>
  );
};

export default App;
