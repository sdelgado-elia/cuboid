import React from 'react';
import '../style/Home.css'
import Navbar from '../components/Navbar'; 

const Home = () => {
  return (
    <div >
    <Navbar/>
      <h1>Bienvenido a Cuboid</h1>
      <p>La aplicacion donde podras gestionar, analizar y simular el futuro de tu negocio!</p>
      <button onClick={() => alert('Has hecho clic en el botón!')}>Haz clic aquí</button>
    </div>
  );
};

export default Home;