import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(null);

  const login = (token) => {
    setToken(token);
    const decodedToken = jwtDecode(token);
    setRole(decodedToken.role);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
