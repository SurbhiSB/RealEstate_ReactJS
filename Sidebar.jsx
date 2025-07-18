import React from 'react';
import './Sidebar.css';
import { menuItems } from './menuItems';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">Admin Panel</div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;