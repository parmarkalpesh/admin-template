import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './componants/Sidebar';
import Account from './pages/Account';
import CreateCampaign from './pages/CreateCampaign';
import UploadDatabase from './pages/Uploaddatabase';
import CallRecordings from './pages/CallRecordings';
import Blacklist from './pages/BlackList';
import WhiteList from './pages/WhiteList';
import Wallet from './pages/Wallet';
import Contact from './pages/Contact';
import Setting from './pages/Setting';
import Logout from './pages/Logout';



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
            <Route path="/callrecordings" element={<CallRecordings />} />
            <Route path="/blacklist" element={<Blacklist />} />
            <Route path="/whitelist" element={<WhiteList />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/logout" element={<Logout />} />
            
            
            
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
