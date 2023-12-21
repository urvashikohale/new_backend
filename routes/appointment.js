const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  deleteAppointment,
} = require("../controllers/appointmentController");

router.param("appoinId", getAppointmentById);

router.post("/app/create", createAppointment);
router.delete("/app/:appoinId/delete", deleteAppointment);
router.get("/app/all", getAllAppointments);
module.exports = router;
