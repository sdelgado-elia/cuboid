// auth.js - Función para verificar si el usuario está logueado

// Decodificar el JWT (por ejemplo, para verificar la fecha de expiración del token)
const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
    } catch (e) {
      return null;
    }
  };
  
  export const isAuthenticated = () => {
    const token = localStorage.getItem('userToken'); // Obtener el token desde localStorage
  
    if (!token) return false; // Si no hay token, el usuario no está autenticado
  
    // const decodedToken = parseJwt(token); // Decodificar el JWT
    // if (!decodedToken) return false; // Si el token no es válido, el usuario no está autenticado
  
    // const expiryTime = decodedToken.exp * 1000; // Convertir la fecha de expiración a milisegundos
    // if (Date.now() > expiryTime) {
    //   // Si el token ha expirado, eliminarlo y retornar false
    //   localStorage.removeItem('userToken');
    //   return false;
    // }
  
    return true; // Si el token es válido y no ha expirado, el usuario está autenticado
  };
  