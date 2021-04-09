import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Copyright from "./Copyright";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "./Alerts";
import { isEmail } from "../utils/validation";

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
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    marginTop: "35px",
    marginBottom: "30px",
  },
  link: {
    fontWeight: "600",
  },
  signupLink: {
    fontWeight: "600",
    marginLeft: "4px",
  },
  icon: {
    opacity: "0.6",
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
    err: "",
    success: "",
  });

  const [showPass, setShowPass] = useState(false);

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);
      window.location.href = "/";

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
          Sign in
        </Typography>
        <form
          className={classes.form}
          autoComplete="on"
          onSubmit={handleSubmit}
        >
          <Grid item xs={12} className={classes.input}>
            <TextField
              label="Email Address"
              fullWidth
              autoComplete="email"
              id="email"
              name="email"
              variant="outlined"
              required
              placeholder="Email address"
              value={email}
              onChange={handleChangeInput}
              helperText={
                !isEmail(email) ||
                err === "No account with this email exists in our system."
                  ? "No account with this email exists in our system."
                  : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={classes.icon}>
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              error={
                !isEmail(email) ||
                err === "No account with this email exists in our system."
                  ? true
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.input}>
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
                err === "Password is incorrect."
                  ? "Password is incorrect."
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
              error={err === "Password is incorrect." ? true : false}
            />
          </Grid>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" className={classes.link}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Typography component="p" variant="inherit" color="textSecondary">
                Don't have an account?
                <Link
                  href="/signup"
                  variant="body2"
                  className={classes.signupLink}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
