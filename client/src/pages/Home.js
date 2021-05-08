import React from "react";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import { useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";
import RightSideBar from "../components/home/RightSideBar";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

const Home = () => {
  const classes = useStyles();

  const { homePosts } = useSelector((state) => state);

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.paper}>
            <Status />
          </Paper>
          {homePosts.loading ? (
            <img src={LoadIcon} alt="Loading..." />
          ) : homePosts.result === 0 || homePosts.posts.length === 0 ? (
            <Typography
              variant="h5"
              color="textSecondary"
              align="center"
              style={{ fontWeight: 600, marginTop: 20 }}
            >
              No Posts
            </Typography>
          ) : (
            <Posts />
          )}
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}>
            <RightSideBar />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
