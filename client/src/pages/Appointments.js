import React from "react";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// Components
import AppointmentFormPopup from "../components/form/AppointmentFormPopup";
import Calendar from "../components/calendar/Calendar";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Appointments = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid
        container
        direction="column-reverse"
        justify="space-around"
        alignItems="stretch"
      >
        <Paper className={classes.paper}>
          <AppointmentFormPopup />
        </Paper>

        <Calendar />
      </Grid>
    </Container>
  );
};

export default Appointments;
