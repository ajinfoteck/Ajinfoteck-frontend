import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import "../App.css";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuData, setMenuData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("/api/header");
        setMenuData(res.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();

    // 👉 click outside close
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest(".hamburger")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);

    
  }, []);
  

  // ✅ FIX: prevent undefined error
  if (!menuData || !menuData.menu) return null;

  const menu = menuData.menu;

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to={menu.home?.link || "/"} style={{ textDecoration: "none" }}>
        <img
          src={`http://localhost:5000/${menuData.logo}`}
          alt="Logo"
          className="logo"
        />
      </Link>

      {/* ✅ HAMBURGER */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MENU */}
      <ul
        ref={menuRef}
        className={`menu ${menuOpen ? "open" : ""}`}
        style={{ fontSize: "22px" }}
      >
        <NavLink
          to={menu.home.link}
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          <li>{menu.home.title}</li>
        </NavLink>
        <NavLink
          to={menu.about?.link || "#"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          <li>{menu.about?.title}</li>
        </NavLink>
        {/* Services Dropdown */}
      <li className="dropdown">
  <NavLink
    to={menu.services?.link || "#"}
    className={({ isActive }) =>
      isActive ? "active-link services-link" : ""
    }
    onClick={() => setMenuOpen(false)}   // close menu after click
  >
    {menu.services?.title}
    <span className="dropdown-arrow">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0f4392">
    <path d="M12 16c-.6 0-1.2-.3-1.6-.8L5.2 8.8c-.9-1-.1-2.8 1.4-2.8h10.8c1.5 0 2.3 1.8 1.4 2.8l-5.2 6.4c-.4.5-1 .8-1.6.8z" />
  </svg>
</span>
  </NavLink>

  <ul className="dropdown-menu">
    {menu.servicesDropdown?.map((service) => (
      <li key={service._id}>
        <NavLink
          to={service.link}
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          {service.title}
        </NavLink>
      </li>
    ))}
  </ul>
</li>
        <NavLink
          to={menu.staffpro?.link || "#"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          <li>{menu.staffpro?.title}</li>
        </NavLink>
        
        <NavLink
          to={menu.talenthub?.link || "#"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          <li>{menu.talenthub?.title}</li>
        </NavLink>
  
        <NavLink
          to={menu.careers?.link || "#"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          <li>{menu.careers?.title}</li>
        </NavLink>
        
        <NavLink
          to={menu.contact?.link || "#"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          <li>{menu.contact?.title}</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
