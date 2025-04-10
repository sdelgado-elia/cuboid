import React from "react";
import "../style/Footer.css"; // Asegúrate de tener este archivo
import FootImage from "../assets/foot.png"; // Ajustá el path si es necesario

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Qubony. All rights reserved. || Delgado softwares</p>
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
