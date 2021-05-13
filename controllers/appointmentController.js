const Appointments = require("../models/appointmentModel");

const appointmentController = {
  createAppointment: async (req, res) => {
    try {
      const {
        title,
        description,
        status,
        location,
        startDateTime,
        endDateTime,
      } = req.body;

      const newAppointment = new Appointments({
        title,
        description,
        status,
        location,
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
  getAllAppointments: async (req, res) => {
    try {
      const appointments = await Appointments.find({});
      res.json({ msg: "Success", results: appointments.length, appointments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBookedAppointments: async (req, res) => {
    try {
      const appointments = await Appointments.find({ status: "Booked" });
      res.json({ msg: "Success", results: appointments.length, appointments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAvailableAppointments: async (req, res) => {
    try {
      const appointments = await Appointments.find({ status: "Available" });
      res.json({ msg: "Success", results: appointments.length, appointments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMyAppointments: async (req, res) => {
    try {
      const appointments = await Appointments.find({ user: req.user._id });
      res.json({ msg: "Success", results: appointments.length, appointments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAppointment: async (req, res) => {
    try {
      const {
        title,
        description,
        status,
        location,
        startDateTime,
        endDateTime,
      } = req.body;

      await Appointments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { title, description, status, location, startDateTime, endDateTime }
      );

      res.json({ msg: "Updated Appointment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = appointmentController;
