import React, { useState } from "react";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../components/Alerts";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
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
});

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    err: "",
    success: "",
  });

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/user/forgot_password", { email });

      setData({ ...data, err: "", success: res.data.msg });

      history.push("/password_reset_sent");

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
        <Grid item xs={0}>
          <Typography variant="h4" component="h4" className={classes.title}>
            Forgot your password?
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </Typography>
          <Box mt={5} mb={4}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                      err === "No account with this email exists in our system."
                        ? "No account with this email exists in our system."
                        : null
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.icon}
                        >
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={
                      err === "No account with this email exists in our system."
                        ? true
                        : false
                    }
                  />
                  <Box mt={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                    >
                      Send reset link
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>

          <Box mt={0}>
            <Button color="primary" href="/signin">
              Back to Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
