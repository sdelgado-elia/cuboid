import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext'; // Importa el hook de AuthContext
import Logo from '../assets/Cuboid_hex.png'; // Importa la imagen
import '../style/Login.css'

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); 
  // const { login } = useAuth(); // Obtén la función login desde el contexto
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    // ✅ Redirigir si ya está autenticado
    if (isAuthenticated) {
      return <Navigate to="/home" replace />;
    }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      // Almacena el token y actualiza el estado de autenticación
      login(response.data.token); // Usa el token recibido para actualizar el estado de autenticación

      setError(localStorage.getItem("userToken"));
      navigate('/home'); // Redirige al usuario a la página de inicio

    } catch (err) {
      setError('Incorrect credentials');
    }
  };

  return (
    <div>
      <div className="background"></div>
      
      
      <div>
        <h1 className='imagen' style={{ color: 'white' }}>Cuboid</h1>
        <img className='imagen' src={Logo} alt="Cuboid Logo" />
        <h2></h2>
        <form className='form' onSubmit={handleLogin}>
        <div className="background-image"></div>
          
          <div>
            <div className='col'>
              <label>Username</label>
            </div>
            <div className="col">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label>Password</label>
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Login</button>
          <button className="register" >Register</button>
          {error && <p style={{ color: 'white' }}>{error}</p>}
        
        </form>

      </div>
    </div>
  );
};

export default Login;
