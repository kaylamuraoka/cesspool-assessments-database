import React from "react";
import MailSentImg from "../../images/mail_sent.png";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  gridContainer: {
    minHeight: "100vh",
  },
  title: {
    fontWeight: 700,
    marginBottom: "20px",
  },
  link: {
    fontWeight: "600",
    marginLeft: "4px",
  },
});

const PasswordResetSent = () => {
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
          <Typography variant="h5" component="h5" className={classes.title}>
            Password reset instructions have been sent
          </Typography>
          <Typography variant="body2" color="textSecondary">
            You should receive an e-mail in the next 5 minutes with instructions
            for resetting your password. If you don't receive this email, please
            check your junk mail folder or contact us for further assistance.
          </Typography>
          <Box mt={3}>
            <img
              src={MailSentImg}
              alt=""
              height="120px"
              className={classes.title}
            />
          </Box>
          <Box mt={1}>
            <Typography component="p" variant="body2" color="textSecondary">
              Didn't receive an email?
              <Link
                href="/forgot_password"
                variant="body2"
                className={classes.link}
              >
                Try again
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PasswordResetSent;
