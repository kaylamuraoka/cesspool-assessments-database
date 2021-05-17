import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions/usersAction";

import LoadIcon from "../images/loading.gif";
import UserTable from "../components/tables/UserTable";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: "100%",
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
  const { auth, users } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    dispatch(getAllUsers(auth.token));
    setLoad(false);
  }, [dispatch, auth.token]);

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" align="center">
              Users Table
            </Typography>
            <Divider />
            {users.loading ? (
              <img src={LoadIcon} alt="Loading..." />
            ) : (
              <UserTable users={users.users} total={users.total} load={load} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
