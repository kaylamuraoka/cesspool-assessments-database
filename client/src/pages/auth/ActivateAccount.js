import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activateAccount } from "../../redux/actions/authAction";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  gridContainer: {
    minHeight: "100vh",
  },
  title: {
    fontWeight: 700,
    letterSpacing: 1.3,
    textTransform: "capitalize",
  },
  subtitle: {
    fontWeight: 300,
  },
  link: {
    fontWeight: "600",
    marginLeft: "4px",
  },
});

const ActivateAccount = () => {
  const classes = useStyles();

  const { activation_token } = useParams();
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activateAccount(activation_token));
  }, [activation_token, dispatch]);

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
            {auth.isActivated
              ? "Registration Completed Successfully"
              : "Something went wrong."}
          </Typography>

          <Box mt={1}>
            <Typography component="p" variant="body2" color="textSecondary">
              {auth.isActivated
                ? "Sign in to access your account."
                : "Try signing up again to receive a valid activation link."}
            </Typography>
          </Box>
          <Box mt={5}>
            <Button
              variant="contained"
              color="primary"
              href={auth.isActivated ? "/" : "/register"}
            >
              {auth.isActivated ? "Sign In" : "Try sign up again"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivateAccount;
