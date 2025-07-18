import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const SidebarItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  const handleToggleSubmenu = (e) => {
    if (hasSubmenu) {
      e.preventDefault(); // Prevent navigation for parent menu item
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className="sidebar-item">
      <NavLink to={item.path} className="sidebar-link" onClick={handleToggleSubmenu}>
        <span className="sidebar-icon">{item.icon}</span>
        <span className="sidebar-title">{item.title}</span>
        {hasSubmenu && (
          <span className={`sidebar-arrow ${isOpen ? 'open' : ''}`}>
            <FaChevronDown />
          </span>
        )}
      </NavLink>
      {hasSubmenu && isOpen && (
        <ul className="sidebar-submenu">
          {item.submenu.map((subItem, index) => (
            <li key={index} className="submenu-item">
              <NavLink to={subItem.path} className="submenu-link">
                {subItem.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;