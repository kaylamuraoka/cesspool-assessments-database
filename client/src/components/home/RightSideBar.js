import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "./../../images/loading.gif";
import UserCard from "../UserCard";
import FollowBtn from "../buttons/FollowBtn";
import { getSuggestions } from "../../redux/actions/suggestionsAction";

// Material UI Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <List
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          width: "100%",
        }}
      >
        <UserCard user={auth.user} href={`/profile/${auth.user._id}`} />
      </List>

      <div style={{ width: "100%" }}>
        <Box display="flex">
          <Box flexGrow={1} p={1}>
            <Typography
              variant="subtitle1"
              color="secondary"
              style={{ fontWeight: 500 }}
            >
              Suggestions for you
            </Typography>
          </Box>
          <Box>
            {" "}
            {!suggestions.loading && (
              <IconButton
                aria-label="delete"
                onClick={() => dispatch(getSuggestions(auth.token))}
              >
                <RefreshIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </div>

      {suggestions.loading ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <img
            src={LoadIcon}
            alt="Loading..."
            style={{ height: 100, width: 160 }}
          />
        </Grid>
      ) : (
        <List
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            width: "100%",
          }}
        >
          {suggestions.users.map((user) => (
            <UserCard key={user._id} user={user} href={`/profile/${user._id}`}>
              <FollowBtn user={user} size="small" />
            </UserCard>
          ))}
        </List>
      )}
    </>
  );
};

export default RightSideBar;
