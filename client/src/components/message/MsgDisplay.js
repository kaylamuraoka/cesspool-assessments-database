import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessages } from "../../redux/actions/messageAction";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  smallAvatar: {
    border: "1px solid #ddd",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const MsgDisplay = ({ user, msg, data }) => {
  const classes = useStyles();

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  return (
    <>
      <div className="chat_title">
        <Avatar
          alt={user.name}
          src={user.avatar}
          className={classes.smallAvatar}
        />
        <span>
          <Typography variant="caption" color="textPrimary">
            {user.name}
          </Typography>
        </span>
      </div>

      <div className="my_content">
        {user._id === auth.user._id && (
          <IconButton
            aria-label="delete"
            className="delete_my_msg_icon"
            size="small"
            onClick={handleDeleteMessages}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}

        <div>
          {msg.text && <div className="chat_text">{msg.text}</div>}

          {msg.media.map((image, index) => (
            <div key={index}>
              {
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "contain",
                  }}
                  src={
                    image.camera
                      ? image.camera
                      : image.url
                      ? image.url
                      : URL.createObjectURL(image)
                  }
                  alt="images"
                />
              }
            </div>
          ))}
        </div>
      </div>

      <div className="chat_time">
        <Typography variant="caption" color="textSecondary">
          {new Date(msg.createdAt).toLocaleString()}
        </Typography>
      </div>
    </>
  );
};

export default MsgDisplay;
