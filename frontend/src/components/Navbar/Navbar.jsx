import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  FaBars,
  FaChartLine,
  FaCloudSunRain,
  FaHome,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa'
import './Navbar.css'

const navItems = [
  { to: '/', label: 'Home', icon: <FaHome /> },
  { to: '/prediction', label: 'Prediction', icon: <FaChartLine /> },
  { to: '/about', label: 'About', icon: <FaInfoCircle /> },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__brand-link" onClick={closeMenu}>
          <span className="navbar__brand-icon" aria-hidden="true">
            <FaCloudSunRain />
          </span>
          <span className="navbar__brand-title">AirMind AI</span>
        </Link>
      </div>

      <button
        type="button"
        className="navbar__menu-button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
            onClick={closeMenu}
          >
            <span className="navbar__link-icon" aria-hidden="true">
              {icon}
            </span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
