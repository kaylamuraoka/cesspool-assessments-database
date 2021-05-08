import React from "react";
import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    close: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0),
      marginLeft: theme.spacing(0.7),
      marginTop: theme.spacing(-2.5),
      marginRight: theme.spacing(-1.2),
      opacity: 0.5,
    },
    toast: {
      zIndex: theme.zIndex.drawer + 50,
      position: "fixed",
      top: "5px",
      right: "5px",
      minWidth: "200px",
      color: "#fff",
      display: "block",
    },
  })
);

const Toast = ({ type, msg, handleClose, bgColor }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.toast} show ${bgColor}`}>
      <Alert variant="filled" severity={type}>
        <strong style={{ textTransform: "capitalize" }}>{type}: </strong>
        {msg.body}
        <IconButton
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Alert>
    </div>
  );
};

export default Toast;
