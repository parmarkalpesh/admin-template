import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaUserCircle, FaBullhorn, FaUpload, FaPhone, FaBan,
  FaCheckCircle, FaWallet, FaEnvelope, FaCog, FaSignOutAlt, FaBars
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-50 to-white shadow-lg border-r border-gray-100 transition-all duration-300 ease-in-out z-50 lg:relative ${
        isOpen 
      }`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          {isOpen && (
            <img
              src="https://via.placeholder.com/40"
              alt="Aptivion Logo"
              className="h-8 w-8 rounded-full"
            />
          )}
          {isOpen && (
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Aptivion Tech
            </span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
        >
          <FaBars className="text-lg text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-3 space-y-1 mt-4">
        <NavItem to="/account" icon={<FaUserCircle />} label="My Account" isOpen={isOpen} />
        <NavItem to="/createcampaign" icon={<FaBullhorn />} label="Create Campaign" isOpen={isOpen} />
        <NavItem to="/uploaddatabase" icon={<FaUpload />} label="Upload DB" isOpen={isOpen} />
        <NavItem to="/calls" icon={<FaPhone />} label="Call Recordings" isOpen={isOpen} />
        <NavItem to="/black" icon={<FaBan />} label="Blacklist" isOpen={isOpen} />
        <NavItem to="/white" icon={<FaCheckCircle />} label="Whitelist" isOpen={isOpen} />
        <NavItem to="/wallet" icon={<FaWallet />} label="Wallet" isOpen={isOpen} />
        <NavItem to="/contact" icon={<FaEnvelope />} label="Contact" isOpen={isOpen} />
        <NavItem to="/settings" icon={<FaCog />} label="Settings" isOpen={isOpen} />
        <NavItem
          to="/logout"
          icon={<FaSignOutAlt />}
          label="Logout"
          isOpen={isOpen}
          className="text-red-500 hover:text-red-600"
        />
      </nav>
    </aside>
  );
};

const NavItem = ({ to, icon, label, isOpen, className = '' }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all duration-200 group ${
        isActive
          ? 'bg-blue-50 text-blue-700 font-semibold'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
      } ${className}`
    }
  >
    <div className="text-xl group-hover:scale-110 transition-transform duration-200">{icon}</div>
    {isOpen && (
      <span className="truncate text-sm font-medium">{label}</span>
    )}
    {!isOpen && (
      <span className="absolute left-16 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {label}
      </span>
    )}
  </NavLink>
);

export default Sidebar;