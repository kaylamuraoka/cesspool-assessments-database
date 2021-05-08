import React, { useEffect, useState } from "react";
import { getProfileUsers } from "../redux/actions/profileAction";
import Info from "../components/profile/Info";
import Posts from "../components/profile/Posts";
import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "../images/loading.gif";
import { useParams } from "react-router-dom";
import Saved from "../components/profile/Saved";

// Material UI Components
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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

const Profile = () => {
  const classes = useStyles();

  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
            {auth.user._id === id && (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button
                  style={{ marginRight: 20 }}
                  variant="outlined"
                  color="secondary"
                  className={saveTab ? "" : "active"}
                  onClick={() => setSaveTab(false)}
                >
                  My Posts
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={saveTab ? "active" : ""}
                  onClick={() => setSaveTab(true)}
                >
                  Saved Posts
                </Button>
              </Grid>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {profile.loading ? (
              <img src={LoadIcon} alt="Loading..." />
            ) : (
              <>
                {saveTab ? (
                  <Saved auth={auth} dispatch={dispatch} />
                ) : (
                  <Posts
                    auth={auth}
                    profile={profile}
                    dispatch={dispatch}
                    id={id}
                  />
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
