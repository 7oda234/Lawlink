import express from "express";
import * as appController from "./appointment.controller.js";

const router = express.Router();

router.post("/book", appController.bookAppointment);
router.get("/list", appController.listAppointments);
router.put("/update/:appointmentId", appController.modifyAppointment); 
router.delete("/delete/:appointmentId", appController.removeAppointment);

export default router;