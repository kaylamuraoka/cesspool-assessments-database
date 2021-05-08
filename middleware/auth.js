const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded)
      return res.status(400).json({ msg: "Invalid Authentication" });

    const user = await Users.findOne({ _id: decoded.id });
    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
