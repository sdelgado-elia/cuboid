import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../assets/Cuboid.png'; // Importa la imagen

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      // Almacenar el token en el estado o en localStorage
      setToken(response.data);
      localStorage.setItem('token', response.data);
      setError('');
      navigate('/home'); // Redirecciona a la página de inicio
      
    } catch (err) {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="App">
       <div className="background"></div>
      <div className="background-image"></div>
      <div >
        {/* Mostrar la imagen con la etiqueta <img /> */}
        <h1>Cuboid</h1>
        <img src={Logo} alt="Cuboid Logo" />
        <h2></h2>
        <form onSubmit={handleLogin}>
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
          
        </form>
        <button className="register" >Register</button>
        {error && <p style={{ color: 'white' }}>{error}</p>}
        {/* {token && <p>Token: {token}</p>} */}
      </div>
    </div>
  );
};

export default Login;
