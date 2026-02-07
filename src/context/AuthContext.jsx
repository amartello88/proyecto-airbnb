import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Token persistente en localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Login: guarda token en localStorage y estado
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // Logout: borra token de localStorage y estado
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el context fácilmente
export function useAuth() {
  return useContext(AuthContext);
}
