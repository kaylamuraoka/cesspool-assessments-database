import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer: {
    minHeight: "100vh",
  },
  title: {
    fontWeight: 500,
    letterSpacing: 4,
  },
  subtitle: {
    fontWeight: 300,
  },
});

const NotFound = () => {
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
          <Typography variant="h1" component="h2" className={classes.title}>
            OOPS!
          </Typography>
          <Typography component="p" variant="h5" className={classes.subtitle}>
            404 - Page not found.
          </Typography>
          <Box mt={3}>
            <Typography color="textSecondary">
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </Typography>
          </Box>

          <Box mt={3}>
            <Button variant="contained" color="primary" href="/">
              Go to homepage
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
