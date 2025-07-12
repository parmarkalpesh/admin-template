import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './componants/Sidebar';
import Account from './pages/Account';
import CreateCampaign from './pages/CreateCampaign';
import UploadDatabase from './pages/Uploaddatabase';



function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/createcampaign" element={<CreateCampaign />} />
            <Route path="/uploaddatabase" element={<UploadDatabase />} />
            
            
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
