import Reservation from "../models/Reservation.js";

// GET /api/reservations
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ checkIn: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// POST /api/reservations
export const createReservation = async (req, res) => {
  try {
    const { guest, email, checkIn, checkOut, price } = req.body;

    if (!guest || !email || !checkIn || !checkOut || !price) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const reservation = new Reservation(req.body);
    const saved = await reservation.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE /api/reservations/:id
export const deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar reserva" });
  }
};
// PUT /api/reservations/:id
export const updateReservation = async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(updated);
  }
  catch (err) { res.status(400).json({ error: err.message }); }
};