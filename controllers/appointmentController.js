const Appointments = require("../models/appointmentModel");

const appointmentController = {
  createAppointment: async (req, res) => {
    try {
      const { title, description, type, startDateTime, endDateTime } = req.body;

      const newAppointment = new Appointments({
        title,
        description,
        type,
        startDateTime,
        endDateTime,
        user: req.user._id,
      });

      await newAppointment.save();

      res.json({ msg: "Success", newAppointment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = appointmentController;
