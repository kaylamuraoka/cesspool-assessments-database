const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/auth");

router.post("/appointment", auth, appointmentController.createAppointment);

module.exports = router;
