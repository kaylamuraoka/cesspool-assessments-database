import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";

// Material UI Components
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const Followers = ({ users, showFollowers, setShowFollowers }) => {
  const { auth } = useSelector((state) => state);

  return (
    <Dialog
      open={showFollowers}
      keepMounted
      onClose={() => setShowFollowers(false)}
    >
      <DialogTitle
        style={{
          paddingBottom: "4px",
          paddingTop: "25px",
          textAlign: "center",
        }}
      >
        Followers
      </DialogTitle>
      <Divider variant="middle" />
      <IconButton
        aria-label="close"
        onClick={() => setShowFollowers(false)}
        style={{ position: "absolute", right: "5px", top: "3px" }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent style={{ minWidth: "320px", paddingTop: "0px" }}>
        <List
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            width: "100%",
          }}
        >
          {users.length === 0 && (
            <Typography
              align="center"
              variant="subtitle2"
              color="textSecondary"
              style={{ paddingTop: "15px" }}
            >
              No followers yet
            </Typography>
          )}
          {users.map((user) => (
            <UserCard key={user._id} user={user} href={`/profile/${user._id}`}>
              {auth.user._id !== user._id && (
                <FollowBtn user={user} size="small" />
              )}
            </UserCard>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default Followers;
