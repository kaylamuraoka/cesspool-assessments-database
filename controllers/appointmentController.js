const Appointments = require("../models/appointmentModel");

const appointmentController = {
  createAppointment: async (req, res) => {
    try {
      const {
        title,
        notes,
        status,
        location,
        startDateTime,
        endDateTime,
      } = req.body;

      const newAppointment = new Appointments({
        title,
        notes,
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
      const appointments = await Appointments.find({}).populate(
        "user likes",
        "avatar name email followers"
      );
      res.json({ msg: "Success", results: appointments.length, appointments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBookedAppointments: async (req, res) => {
    try {
      const appointments = await Appointments.find({
        status: "Booked",
      }).populate("user likes", "avatar name email followers");
      res.json({ msg: "Success", results: appointments.length, appointments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAvailableAppointments: async (req, res) => {
    try {
      const appointments = await Appointments.find({
        status: "Available",
      }).populate("user likes", "avatar name email followers");
      res.json({ msg: "Success", results: appointments.length, appointments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMyAppointments: async (req, res) => {
    try {
      const appointments = await Appointments.find({
        user: req.user._id,
      }).populate("user likes", "avatar name email followers");
      res.json({ msg: "Success", results: appointments.length, appointments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAppointment: async (req, res) => {
    try {
      const {
        title,
        notes,
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
        { title, notes, status, location, startDateTime, endDateTime }
      );

      res.json({ msg: "Updated Appointment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAppointment: async (req, res) => {
    try {
      const appointment = await Appointments.findOneAndDelete({
        _id: req.params.id,
        // $or: [{ user: req.user._id }, { postUserId: req.user._id }],
      });

      res.json({ msg: "Deleted Appointment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAppointmentDetails: async (req, res) => {
    try {
      const appointment = await Appointments.findById(req.params.id).populate(
        "user likes",
        "avatar name email followers"
      );

      if (!appointment)
        return res.status(400).json({ msg: "This event does not exist." });

      res.json({ appointment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = appointmentController;
