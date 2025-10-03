import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    document.body.setAttribute("data-bs-theme", darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container flex justify-between items-center py-1">
        <a href="#" className="flex items-center gap-2">
          <i className="bi bi-shield-lock-fill fs-4 text-white"></i>
          <div>
            <div className="font-bold text-white">Hackethics138</div>
            <div className="text-sm opacity-80 text-white">Cybersecurity · OSINT · AI</div>
          </div>
        </a>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu */}
        <ul
          className={`flex flex-col lg:flex-row lg:static top-full w-full text-white lg:w-auto transition-all duration-300 ${
            menuOpen ? "block " : "hidden lg:flex"
          }`}
        >
          
          {/* Auth */}
          <SignedOut>
            <Link to="/login" className="block nav-link px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="block nav-link px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
            
          </SignedOut>
          <SignedIn>


            <li>
            <Link to="/" className="block px-2 py-2 nav-link text-white " onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses" className="block px-2 py-2 nav-link text-white" onClick={() => setMenuOpen(false)}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/features" className="block nav-link  px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/osinttool" className="block nav-link px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
              OSINT Tools
            </Link>
          </li>
          <li>
            <Link to="/gpt" className="block nav-link px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
              AI Agent
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block nav-link px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="block px-2 py-2 nav-link text-white" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          </li>


            <li className="px-4 py-2">
              <UserButton afterSignOutUrl="/" />
            </li>
          </SignedIn>

          <li className="nav-item ms-3 d-flex align-items-center">
                 <div className="form-check form-switch mb-0">
                   <input
                     className="form-check-input"
                     type="checkbox"
                     id="themeToggle"
                     aria-label="Toggle dark mode"
                     onClick={toggleTheme}
                   />
                   <label
                     className="form-check-label small"
                     htmlFor="themeToggle"
                     style={{ color: "#fff" }}
                   >
                     <i id="themeIcon" className="bi bi-sun"></i>
                   </label>
                 </div>
               </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
