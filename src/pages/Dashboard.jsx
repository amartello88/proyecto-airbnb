import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Reservations from "../pages/Reservations";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      {/* Header con título a la izquierda y botón a la derecha */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1>Reservas Airbnb</h1>
        <button onClick={handleLogout}>Salir</button>
      </div>

      {/* Formulario y lista de reservas */}
      <Reservations />
    </div>
  );
}

export default Dashboard;

