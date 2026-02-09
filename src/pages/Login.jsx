import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import githubLogo from "../assets/github.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Importa los íconos

function Login() {
  const [key, setKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const SECRET_KEY = "admin";

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
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Clave de acceso"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button>Log In</button>
        </form>

        <div className="login-footer">
          <a
            href="https://github.com/amartello88"
            target="_blank"
            rel="noopener noreferrer"
            className="github-footer-link"
          >
            <img src={githubLogo} alt="GitHub" />
            <span>Developed by Luna M ♡</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
