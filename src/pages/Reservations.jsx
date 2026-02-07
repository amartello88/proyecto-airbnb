import { useState, useEffect } from "react";
import ReservationForm from "../components/ReservationForm";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null);

  // GET reservas
  useEffect(() => {
    fetch("http://localhost:3000/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, []);

  // POST
  const addReservation = async (reservation) => {
    const res = await fetch("http://localhost:3000/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });

    const saved = await res.json();
    setReservations((prev) => [...prev, saved]);
  };

  // PUT
  const updateReservation = async (id, updatedData) => {
    const res = await fetch(
      `http://localhost:3000/api/reservations/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    const updated = await res.json();

    setReservations((prev) =>
      prev.map((r) => (r._id === id ? updated : r))
    );

    setEditing(null);
  };

  // DELETE
  const deleteReservation = async (id) => {
    if (!window.confirm("¿Eliminar esta reserva?")) return;

    await fetch(`http://localhost:3000/api/reservations/${id}`, {
      method: "DELETE",
    });

    setReservations((prev) => prev.filter((r) => r._id !== id));
  };

  // helpers UI
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("es-AR") : "-";

  const formatPrice = (n) =>
    new Intl.NumberFormat("es-AR").format(Number(n));

  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.checkIn) - new Date(b.checkIn)
  );

  return (
    <div>
      <h2>Reservas</h2>

      <ReservationForm
        onAdd={addReservation}
        onUpdate={updateReservation}
        editing={editing}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {sortedReservations.map((r) => (
          <li
            key={r._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span style={{ flex: 1 }}>
              {r.guest} ({r.email}) |{" "}
              <strong>
                {r.place === "casita" ? "🏡 Casita" : "📦 Container"}
              </strong>{" "}
              | {formatDate(r.checkIn)} → {formatDate(r.checkOut)} | $
              {formatPrice(r.price)}
            </span>

            <span className={r.billed ? "badge billed" : "badge not-billed"}>
              {r.billed ? "Facturada" : "No facturada"}
            </span>

            <button onClick={() => setEditing(r)}>✏️</button>

            <button
              onClick={() => deleteReservation(r._id)}
              style={{
                background: "transparent",
                border: "none",
                color: "#c00",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservations;
