import { useState, useEffect } from "react";

function ReservationForm({ onAdd, onUpdate, editing, onCancel }) {
  const [form, setForm] = useState({
    guest: "",
    email: "",
    checkIn: "",
    checkOut: "",
    price: "",
    billed: false,
    place: "",
  });

  // 👉 Cargar datos cuando se edita una reserva
  useEffect(() => {
    if (editing) {
      setForm({
        guest: editing.guest || "",
        email: editing.email || "",
        checkIn: editing.checkIn?.slice(0, 10) || "",
        checkOut: editing.checkOut?.slice(0, 10) || "",
        price: editing.price || "",
        billed: editing.billed || false,
        place: editing.place || "",
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      onUpdate(editing._id, form);
    } else {
      onAdd(form);
    }

    setForm({
      guest: "",
      email: "",
      checkIn: "",
      checkOut: "",
      price: "",
      billed: false,
      place: "",
    });
  };

  return (
    <form className="card reservation-form" onSubmit={handleSubmit}>
      <h3>{editing ? "Editar reserva" : "Nueva reserva"}</h3>

      <div className="form-group">
        <input
          name="guest"
          placeholder="Nombre y apellido"
          value={form.guest}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          name="checkIn"
          value={form.checkIn}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          name="checkOut"
          value={form.checkOut}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Alojamiento</label>
        <select
          name="place"
          value={form.place}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          <option value="casita">Casita</option>
          <option value="container">Container</option>
        </select>
      </div>

      <div className="form-group">
        <input
          name="price"
          placeholder="Precio total"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="billed"
            checked={form.billed}
            onChange={handleChange}
          />
          Facturada
        </label>
      </div>

      <div className="form-group" style={{ display: "flex", gap: "8px" }}>
        <button type="submit">
          {editing ? "Guardar cambios" : "Guardar"}
        </button>

        {editing && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ReservationForm;
