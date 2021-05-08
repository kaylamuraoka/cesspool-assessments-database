import React from "react";
import ActiveAvatar from "../ActiveAvatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StatusModal from "../StatusModal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  statusBtn: {
    background: "#f1f1f1",
    border: "none",
    outline: "none",
    borderRadius: "30px",
    color: "#555",
    textAlign: "left",
    margin: "0 5px",
    padding: "12px",
  },
}));

const Status = () => {
  const classes = useStyles();
  const { auth, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <Typography variant="h6" gutterBottom>
          Status
        </Typography>
        <ActiveAvatar alt={auth.user.name} src={auth.user.avatar} />

        <button className={classes.statusBtn}>
          {auth.user.name}, what are you thinking?
        </button>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          size="medium"
          onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        >
          Create Post
        </Button>
        {status && <StatusModal />}
      </div>
    </>
  );
};

export default Status;
