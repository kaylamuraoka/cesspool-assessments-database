import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../../redux/actions/authAction";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

// Material UI Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

const Register = () => {
  const classes = useStyles();

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { name, email, phone, password, cf_password } = userData;

  const [showPass, setShowPass] = useState(false);
  const [showCfPass, setShowCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(userData));
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
                fullWidth
                id="name"
                label="Name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChangeInput}
                autoComplete="name"
                helperText={alert.name ? alert.name : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                error={alert.name ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                placeholder="Email address"
                value={email}
                onChange={handleChangeInput}
                helperText={alert.email ? alert.email : null}
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
                  alert.email ||
                  alert.error ===
                    "An account with this email address already exists. Please sign in."
                    ? true
                    : false
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                id="phone"
                fullWidth
                label="Phone Number"
                placeholder="Phone number"
                value={phone}
                onChange={handleChangeInput}
                helperText={alert.phone ? alert.phone : null}
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
                  alert.phone ||
                  alert.error ===
                    "An account with this phone number already exists. Please sign in."
                    ? true
                    : false
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type={showPass ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={handleChangeInput}
                helperText={alert.password ? alert.password : null}
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
                error={alert.password ? true : false}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <TextField
                variant="outlined"
                fullWidth
                name="cf_password"
                label="Confirm Password"
                type={showCfPass ? "text" : "password"}
                id="cf_password"
                placeholder="Confirm Password"
                value={cf_password}
                onChange={handleChangeInput}
                helperText={alert.cf_password ? alert.cf_password : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowCfPass(!showCfPass)}
                      edge="end"
                    >
                      {showCfPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
                error={alert.cf_password ? true : false}
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
                <Link href="/" variant="body2" className={classes.signinLink}>
                  Sign In
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
