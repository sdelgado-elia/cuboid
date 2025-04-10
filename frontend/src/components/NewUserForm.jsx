import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./NavbarWOlogin";
import Footer from "./Footer";
import axios from 'axios';

const NewUserForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username: formData.nombre,  // Usamos 'nombre' para el 'username'
        email: formData.email,
        password: formData.password,
      });
      // Almacena el token en el localStorage
      localStorage.setItem('userToken', response.data.token);

      // Si tienes una función login, la puedes invocar aquí para actualizar el estado de autenticación
      // login(response.data.token);
      alert("Success. Please confirm your email");
      navigate('/login');  // Redirige al usuario al login
    }catch (err) {
        let mensaje = 'Error desconocido al registrar el usuario.';
        console.log(err)
        alert(err.response.data);
      }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="flex-grow flex justify-center items-center bg-gray-100 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Create New User</h2>

          <div className="mb-6 flex flex-col gap-6">
            <div className="mb-6 flex flex-col gap-6">
            <label className="w-1/3 text-left font-medium">Username</label>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-2/3 border rounded-lg px-3 py-2 text-center"
                required
              />
            </div>
            <div className="mb-6 flex flex-col gap-6">
            <label className="w-1/3 text-left font-medium">Email</label>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-2/3 border rounded-lg px-3 py-2 text-center"
                required
              />
            </div>
            <div className="mb-6 flex flex-col gap-6">
              <label className="w-1/3 text-left font-medium">Password</label>
            </div>

            <div className="flex justify-between items-center">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-2/3 border rounded-lg px-3 py-2 text-center"
                required
              />
            </div>
          </div>

          <button
            type="submit">
            Sing in
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default NewUserForm;


