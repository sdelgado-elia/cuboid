import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import "../style/Navbar.css";
import Logo from "../assets/Cuboid_white.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();


  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-container">
          <img className="navbar-img" src={Logo} alt="Cuboid Logo" />
        </div>
        <div className="logo-text">Cuboid</div>
      </div>

      <ul className="navbar-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/servicios">Servicios</a></li>
        <li><a href="/contacto">Contacto</a></li>

        <li className="navbar-profile" ref={menuRef}>
          <button className="profile-button" onClick={toggleMenu}>
            Mi Perfil
          </button>
          {open && (
            <div className="profile-dropdown">
              <div onClick={() => navigate("/myuser")}>Ver Perfil</div>
              <div onClick={() => navigate("/configuracion")}>Configuración</div>
              <div onClick={() => navigate("/soporte")}>Soporte</div>
              <div onClick={handleLogout} className="logout">Cerrar Sesión</div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;



// import React from "react";
// import "../style/Navbar.css";
// import Logo from '../assets/Cuboid_white.png'; // Importa la imagen

// const Navbar = () => {
//   return (
//     <nav className="navbar">
      
//       <div className="navbar-logo">
//         <div className="logo-container">
//             <img className="navbar-img" src={Logo} alt="Cuboid Logo" />
//         </div>
//         <div className="logo-text">Cuboid</div>
//     </div>
//       <ul className="navbar-links">
//         <li><a href="/">Inicio</a></li>
//         <li><a href="/servicios">Servicios</a></li>
//         <li><a href="/contacto">Contacto</a></li>
//         <li><a href="/myuser">Mi Perfil</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;