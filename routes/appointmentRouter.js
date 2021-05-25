const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/auth");

// To add a new appointment
router.post("/addAppointment", auth, appointmentController.createAppointment);

router.get("/all_appointments", auth, appointmentController.getAllAppointments);

router.get("/my_appointments", auth, appointmentController.getMyAppointments);

router.get(
  "/booked_appointments",
  auth,
  appointmentController.getBookedAppointments
);

router.get(
  "/available_appointments",
  auth,
  appointmentController.getAvailableAppointments
);

// To Get Appointment Details By Appointment ID
router.get(
  "/appointment/:id",
  auth,
  appointmentController.getAppointmentDetails
);

// To Update The Appointment Details
router.patch(
  "/updateAppointment/:id",
  auth,
  appointmentController.updateAppointment
);

// To Delete the Appointment
router.delete(
  "/deleteAppointment/:id",
  auth,
  appointmentController.deleteAppointment
);

module.exports = router;
