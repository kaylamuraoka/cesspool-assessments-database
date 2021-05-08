import React, { useState, useEffect } from "react";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    minHeight: "100vh",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
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
    marginBottom: "8px",
  },
  link: {
    marginTop: "4px",
    fontWeight: "600",
    float: "right",
  },
  signupLink: {
    fontWeight: "600",
    marginLeft: "4px",
  },
  icon: {
    opacity: "0.6",
  },
}));

const Login = () => {
  const classes = useStyles();

  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [showPass, setShowPass] = useState(false);

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.gridContainer}
      >
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
                alert.error ===
                "No account with this email exists in our system."
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
                alert.error ===
                "No account with this email exists in our system."
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
                alert.error === "Password is incorrect."
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
              error={alert.error === "Password is incorrect." ? true : false}
            />
            <Link
              href="/forgot_password"
              variant="body2"
              className={classes.link}
            >
              Forgot password?
            </Link>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={email && password ? false : true}
          >
            Sign In
          </Button>
          <Container align="center">
            <Grid item>
              <Typography component="p" variant="inherit" color="textSecondary">
                Don't have an account?
                <Link
                  href="/register"
                  variant="body2"
                  className={classes.signupLink}
                >
                  Sign up
                </Link>
              </Typography>
            </Grid>
          </Container>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
