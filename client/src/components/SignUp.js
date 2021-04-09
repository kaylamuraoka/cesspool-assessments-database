import React, { useState } from "react";

import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

import {
  isEmail,
  isName,
  isPhone,
  isValidPassword,
  isMatch,
} from "../utils/validation";

// Icons
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Copyright from "./Copyright";
import { showErrMsg, showSuccessMsg } from "./Alerts";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
      color: "green",
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    opacity: "0.6",
  },
  signinLink: {
    fontWeight: "600",
    marginLeft: "4px",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cf_password: "",
    err: "",
    success: "",
  });

  const [showPass, setShowPass] = useState(false);

  const { name, email, phone, password, cf_password, err } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        phone,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });

      history.push("/confirmation");

      showSuccessMsg(res.data.msg);
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });

      showErrMsg(err.response.data.msg);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChangeInput}
                autoComplete="name"
                helperText={!isName(name) ? "Please enter a valid name." : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                error={!isName(name) ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                placeholder="Email address"
                value={email}
                onChange={handleChangeInput}
                helperText={
                  !isEmail(email) ||
                  err ===
                    "An account with this email address already exists. Please sign in."
                    ? "Please enter a valid email address."
                    : null
                }
                fullWidth
                id="email"
                label="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                error={
                  !isEmail(email) ||
                  err ===
                    "An account with this email address already exists. Please sign in."
                    ? true
                    : false
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="phone"
                fullWidth
                label="Phone Number"
                placeholder="Phone number"
                value={phone}
                onChange={handleChangeInput}
                helperText={
                  !isPhone(phone) ||
                  err ===
                    "An account with this phone number already exists. Please sign in."
                    ? "Please enter a valid phone number."
                    : null
                }
                name="phone"
                autoComplete="phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <PhoneIcon />
                      +1
                    </InputAdornment>
                  ),
                }}
                error={
                  !isPhone(phone) ||
                  err ===
                    "An account with this phone number already exists. Please sign in."
                    ? true
                    : false
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPass ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={handleChangeInput}
                helperText={
                  !isValidPassword(password)
                    ? "Password must be at least six characters long."
                    : null
                }
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
                error={!isValidPassword(password) ? true : false}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cf_password"
                label="Confirm Password"
                type={showPass ? "text" : "password"}
                id="cf_password"
                placeholder="Confirm Password"
                value={cf_password}
                onChange={handleChangeInput}
                helperText={
                  !isMatch(password, cf_password)
                    ? "Passwords do not match."
                    : "Passwords match."
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
                error={!isMatch(password, cf_password) ? true : false}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography component="p" variant="inherit" color="textSecondary">
                Already have an account?
                <Link
                  href="/signin"
                  variant="body2"
                  className={classes.signinLink}
                >
                  Sign In
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
