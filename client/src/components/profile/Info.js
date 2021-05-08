import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import EditProfile from "./EditProfile";
import Followers from "./Followers";
import Following from "./Following";
import FollowBtn from "../buttons/FollowBtn";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

const Info = ({ id, auth, profile, dispatch }) => {
  const classes = useStyles();

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar alt={user.name} src={user.avatar} className={classes.large} />

          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.name}</h2>
              {user._id === auth.user._id ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  size="medium"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>

            <div className="follow_btn">
              <Box
                display="flex"
                justifyContent="flex-start"
                style={{ paddingTop: "10px" }}
              >
                <Box
                  style={{ marginRight: "30px", cursor: "pointer" }}
                  onClick={() => setShowFollowers(true)}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    style={{ fontWeight: "500" }}
                  >
                    {user.followers.length} Followers
                  </Typography>
                </Box>
                <Box
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={() => setShowFollowing(true)}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    style={{ fontWeight: "500" }}
                  >
                    {user.following.length} Following
                  </Typography>
                </Box>
              </Box>
            </div>
            <Grid container>
              <Grid item xs={12}>
                <Link
                  component="a"
                  href={`mailto:${user.email}`}
                  underline="none"
                  variant="inherit"
                  color="textPrimary"
                >
                  <IconButton size="small">
                    <EmailIcon fontSize="small" />
                  </IconButton>
                  {"   "}
                  {user.email}
                </Link>
              </Grid>
              {user.phone && (
                <Grid item xs={12}>
                  <Link
                    component="a"
                    href={`tel:${user.phone}`}
                    underline="none"
                    variant="inherit"
                    color="textPrimary"
                  >
                    <IconButton size="small">
                      <PhoneIcon fontSize="small" />
                    </IconButton>
                    {"   "}
                    {user.phone}
                  </Link>
                </Grid>
              )}
              {user.address && (
                <Grid item xs={12}>
                  <Link
                    component="a"
                    href={`http://maps.google.com/?q=${user.address}`}
                    target="_blank"
                    underline="none"
                    variant="inherit"
                    color="textPrimary"
                  >
                    <IconButton size="small">
                      <LocationOnIcon fontSize="small" />
                    </IconButton>
                    {"   "}
                    {user.address}
                  </Link>
                </Grid>
              )}
            </Grid>
          </div>

          {onEdit && <EditProfile onEdit={onEdit} setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              showFollowers={showFollowers}
              setShowFollowers={setShowFollowers}
            />
          )}

          {showFollowing && (
            <Following
              users={user.following}
              showFollowing={showFollowing}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
