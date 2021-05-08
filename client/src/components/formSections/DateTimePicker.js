import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 230,
  },
}));

const DateTimePicker = ({ postData, setPostData }) => {
  const classes = useStyles();
  const { alert } = useSelector((state) => state);

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Date/Time"
        type="datetime-local"
        value={postData.dateTime}
        onChange={(e) => {
          setPostData({ ...postData, dateTime: e.target.value });
        }}
        name="dateTime"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={alert.dateTime ? alert.dateTime : null}
        error={alert.dateTime ? true : false}
      />
    </form>
  );
};

export default DateTimePicker;
