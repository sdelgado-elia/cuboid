import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Importa el componente Home
import Login from './components/Login'; // Importa el componente Login (si lo tienes)

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/home" element={<Home />} />
        {/* Ruta para la página de login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;