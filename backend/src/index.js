import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reservationRoutes from "./routes/reservationRoutes.js";




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/reservations", reservationRoutes);


// ruta de prueba
app.get("/", (req, res) => {
  res.send("API de Reservas funcionando 🚀");
});

// levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
