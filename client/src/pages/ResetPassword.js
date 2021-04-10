import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../components/Alerts";
import { isValidPassword, isMatch } from "../utils/validation";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    minHeight: "100vh",
  },
  title: {
    fontWeight: 700,
    marginBottom: "7px",
  },
  icon: {
    opacity: "0.6",
  },
  link: {
    fontWeight: "600",
    marginLeft: "4px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const { token } = useParams();

  const [data, setData] = useState({
    password: "",
    cf_password: "",
    err: "",
    success: "",
  });
  const [showPass, setShowPass] = useState(false);

  const { password, cf_password, err } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/user/reset_password",
        { password, cf_password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: res.data.msg });

      history.push("/signin");

      showSuccessMsg(res.data.msg);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });

      showErrMsg(err.response.data.msg);
    }
  };

  return (
    <Container component="main" maxWidth="xs" align="center">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.gridContainer}
      >
        <Grid item xs={10}>
          <Typography variant="h4" component="h4" className={classes.title}>
            Reset your password
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please enter and confirm your new password below to access your
            account.
          </Typography>
          <Box mt={5} mb={4}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
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
                        <InputAdornment
                          position="start"
                          className={classes.icon}
                        >
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
                        <InputAdornment
                          position="start"
                          className={classes.icon}
                        >
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
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Reset password
              </Button>
            </form>
          </Box>

          <Box mt={0}>
            <Button color="primary" href="/signin">
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
