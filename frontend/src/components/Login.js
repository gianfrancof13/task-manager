import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para manejar errores de autenticación

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hacer la solicitud POST al backend con el correo y la contraseña
      const response = await axios.post('http://backend/api/login', {
        email: email,
        password: password,
      });

      // Verificar si la respuesta contiene un token
      const token = response.data.token;

      // Guardar el token en localStorage y en el estado global
      localStorage.setItem('token', token);
      setToken(token);

      // Redireccionar o realizar alguna acción después del login exitoso
      console.log('Usuario autenticado con éxito. Token:', token);
      
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Usuario o contraseña incorrectos.'); // Mensaje de error en la interfaz
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
