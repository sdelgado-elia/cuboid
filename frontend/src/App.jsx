import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './utils/AuthContext'; // Importa el AuthContext
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'; // Importa PrivateRoute
import NewUserForm from './components/NewUserForm';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Cambié component={Home} por envolver Home en el PrivateRoute */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<NewUserForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
