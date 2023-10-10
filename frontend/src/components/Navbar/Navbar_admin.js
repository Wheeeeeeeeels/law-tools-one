/**
 * 导航栏组件
 */

import React, { useState } from 'react';
import lawIcon from '../../assets/icons/law.png';
import './Navbar_admin.css';

function NavbarAdmin({ userName, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <div className="navbar">
    //   <div>
    //     <img src={lawIcon} alt="Law Icon" className="navbar-logo" />
    //   </div>
    //   <div className="navbar-right">
    //     <span className="welcome-message">欢迎</span>
        <div className="dropdown">
          <button className="dropbtn" onClick={() => setMenuOpen(!menuOpen)}>
            {userName} ▼
          </button>
          {menuOpen && (
            <div className="dropdown-content">
              <button onClick={onLogout}>注销</button>
            </div>
          )}
        </div>
    //   </div>
    // </div>
  );
}

export default NavbarAdmin;
