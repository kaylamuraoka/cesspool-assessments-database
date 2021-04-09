import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MailSentImg from "./../images/mail_sent.png";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  gridContainer: {
    minHeight: "100vh",
  },
  title: {
    fontWeight: 700,
    letterSpacing: 1.3,
  },
  subtitle: {
    fontWeight: 300,
  },
  link: {
    fontWeight: "600",
    marginLeft: "4px",
  },
});

const SignUpConfimation = () => {
  const classes = useStyles();

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
            Thank you for creating an account
          </Typography>
          <img src={MailSentImg} alt="" height="100px" />
          <Typography component="p" variant="h6" className={classes.subtitle}>
            Please verify your email address in order to access your account.
            You will not be able to log in until you confirm.
          </Typography>

          <Box mt={3}>
            <Typography component="p" variant="inherit" color="textSecondary">
              Didn't receive the email?
              <Link href="/signup" variant="body2" className={classes.link}>
                Try signing up again
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpConfimation;
