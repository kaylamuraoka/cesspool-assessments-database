import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import {
  isReadNotify,
  NOTIFY_TYPES,
  deleteAllNotifies,
} from "../redux/actions/notifyAction";

// Material UI Components
import { blue } from "@material-ui/core/colors";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  div: {
    backgroundColor: theme.palette.background.paper,
  },
  titleText: {
    padding: theme.spacing(1, 2, 0),
    fontWeight: 600,
  },
  list: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const NotifyModal = () => {
  const classes = useStyles();

  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({
      type: NOTIFY_TYPES.UPDATE_SOUND,
      payload: !notify.sound,
    });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));

    if (
      window.confirm(
        `You have ${newArr.length} unread notifications. Are you sure you want to delete all?`
      )
    ) {
      return dispatch(deleteAllNotifies(auth.token));
    }
  };

  return (
    <div className={classes.div}>
      <div style={{ width: "100%" }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography className={classes.titleText} variant="subtitle1">
              Notifications
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleSound}>
              {notify.sound ? (
                <NotificationsIcon color="secondary" />
              ) : (
                <NotificationsOffIcon color="secondary" />
              )}
            </IconButton>
          </Box>
        </Box>
      </div>
      <Divider />
      <List className={classes.list}>
        {notify.data.length === 0 && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            align="center"
          >
            No new notifications
          </Typography>
        )}
        {notify.data.map((msg, index) => (
          <Fragment key={index}>
            {/* {msg.createdAt - Date().toLocaleString() < 12 && (
              <ListSubheader className={classes.subheader}>New</ListSubheader>
            )} */}
            {/* {msg.createdAt && (
              <ListSubheader className={classes.subheader}>
                Earlier
              </ListSubheader>
            )} */}
            <ListItem
              button
              dense
              component="a"
              href={`${msg.url}`}
              onClick={() => handleIsRead(msg)}
            >
              <ListItemAvatar>
                <Avatar alt={msg.user.name} src={msg.user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {msg.user.name}
                    <Typography
                      variant="body2"
                      component="span"
                      style={{
                        fontWeight: 400,
                        marginLeft: 4,
                        color: grey[700],
                      }}
                    >
                      {msg.text}
                    </Typography>
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    <Moment fromNow>{msg.createdAt}</Moment>
                  </Typography>
                }
              />
              {/* {msg.content && <small>{msg.content.slice(0,20)}...</small>} */}
              {/* {msg.image && <Avatar alt={msg.image} src={msg.image} />} */}

              {!msg.isRead && (
                <FiberManualRecordIcon
                  style={{ color: blue[400], fontSize: "12px", marginLeft: 20 }}
                />
              )}
            </ListItem>
          </Fragment>
        ))}
      </List>

      <Divider />
      <Button fullWidth color="secondary" onClick={handleDeleteAll}>
        Delete All
      </Button>
    </div>
  );
};

export default NotifyModal;
