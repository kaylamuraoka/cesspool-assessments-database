const Users = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const CLIENT_URL = process.env.CLIENT_URL;

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;

      if (!name || !email || !phone || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateName(name))
        return res.status(400).json({ msg: "Please enter a valid name." });

      if (!validateEmail(email))
        return res
          .status(400)
          .json({ msg: "Please enter a valid email address." });

      if (!validatePhone(phone))
        return res
          .status(400)
          .json({ msg: "Please enter a valid phone number." });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({
          msg:
            "An account with this email address already exists. Please sign in.",
        });

      const phoneExists = await Users.findOne({ phone });
      if (phoneExists)
        return res.status(400).json({
          msg:
            "An account with this phone number already exists. Please sign in.",
        });

      if (!validatePassword(password))
        return res
          .status(400)
          .json({ msg: "Password must be at least six characters long." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        phone,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;

      sendMail(
        email,
        url,
        "Verify your email address",
        name,
        "Sign in to Validate your Email Address",
        "Congratulations! You're almost set to start using your account. Just click the button below to validate your email address."
      );

      console.log({ activation_token });

      res.json({
        msg:
          "Your account has been created successfully! Please check your email for a verification link to activate your account.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, phone, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({
          msg:
            "An account with this email address already exists. Try sign in.",
        });

      const newUser = new Users({
        name,
        email,
        phone,
        password,
      });

      await newUser.save();

      res.json({ msg: "Your account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email exists in our system." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Functions to validate user input
function validateName(name) {
  if (name.length < 2 || !name.match(/^[A-Za-z- ]+$/)) {
    return false;
  }
  return true;
}

function validatePhone(phone) {
  if (phone.length !== 10 || !phone.match(/^\d{10}$/)) {
    return false;
  }
  return true;
}

function validatePassword(password) {
  if (password.length < 6) {
    return false;
  }
  return true;
}

// Authentication functions
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "24hr",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userController;
