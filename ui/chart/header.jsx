import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/patrimoine" className="nav-link">Patrimoine</Link>
          </li>
          <li className="nav-item">
            <Link to="/possession" className="nav-link">Possessions</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;