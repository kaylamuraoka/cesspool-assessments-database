import React from "react";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// Components
import EngineerForm from "../components/form/EngineerForm";

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

const OsdsFieldSurvey = () => {
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
          <EngineerForm />
        </Paper>
      </Grid>
    </Container>
  );
};

export default OsdsFieldSurvey;
