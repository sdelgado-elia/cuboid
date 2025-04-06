import React from 'react';


const Home = () => {
  return (
    <div >
      <h1>Bienvenido a la Página de Inicio</h1>
      <p>Esta es la sección principal de tu aplicación. Puedes agregar contenido aquí.</p>
      <button onClick={() => alert('Has hecho clic en el botón!')}>Haz clic aquí</button>
    </div>
  );
};

export default Home;
