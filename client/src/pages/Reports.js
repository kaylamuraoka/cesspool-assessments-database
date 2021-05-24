import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actions/postAction";

import LoadIcon from "../images/loading.gif";
import DataTable from "../components/tables/DataTable";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import SurveyDataTable from "../components/tables/SurveyDataTable";

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
  const { homePosts, auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    dispatch(getAllPosts(auth.token));
    setLoad(false);
  }, [dispatch, auth.token]);

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" align="center">
              Survey Data
            </Typography>
            <Divider />
            {homePosts.loading ? (
              <img src={LoadIcon} alt="Loading..." />
            ) : (
              <DataTable posts={homePosts.posts} load={load} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" align="center">
              Survey Data
            </Typography>
            <Divider />
            {homePosts.loading ? (
              <img src={LoadIcon} alt="Loading..." />
            ) : (
              <SurveyDataTable posts={homePosts.posts} load={load} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
