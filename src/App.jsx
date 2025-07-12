import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './componants/Sidebar';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/home" element={<Dashboard />} /> */}
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
