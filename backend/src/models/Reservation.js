import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  guest: { type: String, required: true },
  email: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  place: {type: String,enum: ["casita", "container"],required: true},
  price: { type: Number, required: true },
  billed: { type: Boolean, default: false }
}, { timestamps: true });


export default mongoose.model("Reservation", reservationSchema);
