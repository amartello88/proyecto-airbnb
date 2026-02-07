import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [key, setKey] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const SECRET_KEY = "lunamartellocasita";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (key === SECRET_KEY) {
      login("token-personal");
      navigate("/dashboard");
    } else {
      alert("Clave incorrecta");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">API Reservas</h1>
        <p className="login-subtitle">La Casita</p>

        <h2>Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Clave de acceso"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />

          <button>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
