import React from "react";
import PostTable from "../components/tables/PostTable";
import DataTable from "../components/tables/DataTable";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Reports = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PostTable />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DataTable />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}>{/* <Orders /> */}</Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
