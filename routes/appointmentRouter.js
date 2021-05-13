const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/auth");

router.post("/appointment", auth, appointmentController.createAppointment);

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

router.get(
  "/appointment/:id",
  auth,
  appointmentController.getAppointmentDetails
);

router.patch("/appointment/:id", auth, appointmentController.updateAppointment);

router.delete(
  "/appointment/:id",
  auth,
  appointmentController.deleteAppointment
);

module.exports = router;
