import express from "express";
import {
  getReservations,
  createReservation,
  deleteReservation,
  updateReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

router.get("/", getReservations);
router.post("/", createReservation);
router.put("/:id", updateReservation); 
router.delete("/:id", deleteReservation);

export default router;
