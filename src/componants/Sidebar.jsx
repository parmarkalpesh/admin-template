import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaBullhorn, FaUpload, FaPhone, FaBan, FaCheckCircle, FaWallet, FaEnvelope, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="bg-white text-black transition-all duration-300 w-20 hover:w-64 group flex flex-col border-r border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <button className="text-black focus:outline-none">
          <FaBars className="text-xl" />
        </button>
        <span className="ml-2 text-xl font-bold hidden group-hover:inline">Aptivion Tech.</span>
      </div>

      <nav className="flex-1 p-2 space-y-4">
        <NavItem icon={<FaUserCircle />} label="My Account" />
        <NavItem icon={<FaBullhorn />} label="Create Campaign" />
        <NavItem icon={<FaUpload />} label="Upload DB" />
        <NavItem icon={<FaPhone />} label="Call Recordings" />
        <NavItem icon={<FaBan />} label="Blacklist" />
        <NavItem icon={<FaCheckCircle />} label="Whitelist" />
        <NavItem icon={<FaWallet />} label="Wallet" />
        <NavItem icon={<FaEnvelope />} label="Contact" />
        <NavItem icon={<FaCog />} label="Settings" />
        <NavItem icon={<FaSignOutAlt />} label="Logout" className="text-red-500 hover:text-red-700" />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, className = '' }) => (
  <div className={`flex items-center space-x-6 text-gray-700 hover:text-blue-600 ${className}`}>
    {icon}
    <span className="hidden group-hover:inline">{label}</span>
  </div>
);

export default Sidebar;
