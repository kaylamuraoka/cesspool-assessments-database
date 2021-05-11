import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    width: "100%",
  },
  textField: {
    width: 228,
  },
}));

const HeaderSection = ({ postData, setPostData }) => {
  const classes = useStyles();
  const { alert } = useSelector((state) => state);

  return (
    <div className={classes.container}>
      <Box display="flex" p={1}>
        <Box flexGrow={1}>
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
        </Box>
        <Box>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">Record No: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    recordNum: e.target.value,
                  })
                }
                value={postData.recordNum}
                name="recordNum"
                style={{ maxWidth: 140 }}
                size="small"
                label="Record Number"
                helperText={alert.recordNum ? alert.recordNum : null}
                error={alert.recordNum ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default HeaderSection;
