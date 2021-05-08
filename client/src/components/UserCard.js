import React from "react";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { makeStyles } from "@material-ui/core/styles";
import PhotoIcon from "@material-ui/icons/Photo";

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    border: "2px solid #ddd",
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const UserCard = ({
  children,
  user,
  handleClose,
  href,
  onClickAction,
  msg,
}) => {
  const classes = useStyles();

  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };

  return (
    <ListItem
      dense
      button
      component="a"
      href={href}
      style={{
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 2,
        paddingTop: 2,
      }}
      onClick={onClickAction}
    >
      <ListItemAvatar>
        <Link href={`/profile/${user._id}`} onClick={handleCloseAll}>
          <Avatar
            alt={user.name}
            src={user.avatar}
            className={classes.avatarSize}
          />
        </Link>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2" color="textPrimary">
            {user.name}
          </Typography>
        }
        secondary={
          msg ? (
            <>
              <Typography variant="caption" color="textSecondary">
                {user.text}
              </Typography>
              {user.media.length > 0 && (
                <Typography variant="caption" color="textSecondary">
                  {user.media.length} <PhotoIcon fontSize="small" />
                </Typography>
              )}
            </>
          ) : (
            <Link
              component="a"
              href={`mailto:${user.email}`}
              underline="none"
              color="textSecondary"
            >
              <Typography variant="caption" color="textSecondary">
                {user.email}
              </Typography>
            </Link>
          )
        }
      />
      <ListItemSecondaryAction>{children}</ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserCard;
