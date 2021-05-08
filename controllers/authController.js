const Users = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const CLIENT_URL = process.env.CLIENT_URL;

const authController = {
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
          .json({ msg: "Password must be at least six characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        phone,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/activate/${activation_token}`;

      sendMail(
        email,
        url,
        "Verify your email address",
        name,
        "Sign in to Validate your Email Address",
        "Congratulations! You're almost set to start using your account. Just click the button below to validate your email address."
      );

      res.json({
        msg:
          "Your account has been created successfully! Please check your email for a verification link to activate your account.",
        user: {
          ...newUser._doc,
          password: "",
        },
      });

      // const access_token = createAccessToken({ id: newUser._id });
      // const refresh_token = createRefreshToken({ id: newUser._id });

      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/api/refresh_token",
      //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      // });

      // await newUser.save();

      // const url = `${CLIENT_URL}/user/activate/${activation_token}`;

      // sendMail(
      //   email,
      //   url,
      //   "Verify your email address",
      //   name,
      //   "Sign in to Validate your Email Address",
      //   "Congratulations! You're almost set to start using your account. Just click the button below to validate your email address."
      // );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateAccount: async (req, res) => {
    try {
      const { activation_token } = req.body;

      if (!activation_token)
        return res.status(400).json({
          msg:
            "No activation token. Please sign up again to receive a valid link.",
        });

      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, phone, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({
          msg: "You've already confirmed your email. Sign in to your account.",
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
      if (err.message === "jwt expired")
        return res.status(500).json({
          msg:
            "This link has expired. Sign up again to receive an active link.",
        });

      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const user = await Users.findOne({ email }).populate(
        "followers following",
        "avatar name email followers following"
      );

      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email exists in our system." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        msg: "Login success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) return res.status(400).json({ msg: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now!" });

          const user = await Users.findById(result.id)
            .select("-password")
            .populate("followers following");

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email exists in our system." });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/reset_password/${access_token}`;

      sendMail(
        email,
        url,
        "Password Reset Request for Cesspool Assessments",
        user.name,
        "Reset Password",
        "Your password can be reset by clicking the button below. If you did not request a new password, please ignore this email."
      );

      res.json({
        msg: `Password Reset Email Sent. An email has been sent to your email address, ${email}. Follow the directions in the email to reset your password.`,
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, cf_password } = req.body;

      if (!validatePassword(password))
        return res
          .status(400)
          .json({ msg: "Password must be at least six characters long." });

      if (!isMatch(password, cf_password))
        return res.status(400).json({ msg: "Passwords do not match." });

      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed! Please sign in." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", {
        path: "/api/refresh_token",
      });
      return res.json({ msg: "Logged out!" });
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

function isMatch(password, cf_password) {
  if (password === cf_password) return true;
  return false;
}

// Authentication functions
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "24hr",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authController;
