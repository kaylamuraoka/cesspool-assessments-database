import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";

const InletPiping = ({ postData, setPostData, classes }) => {
  const { alert } = useSelector((state) => state);

  return (
    <>
      <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
        <Box bgcolor="grey.200">
          <FormLabel component="legend" style={{ marginTop: "10px" }}>
            Inlet Piping Found?
            <FormHelperText>
              If yes, you will be asked more questions
            </FormHelperText>
          </FormLabel>
        </Box>
        <Box>
          <FormControl
            component="fieldset"
            className={classes.formControl}
            size="small"
            error={alert.inletPipingFound ? true : false}
          >
            <RadioGroup
              row
              name="inletPipingFound"
              value={postData.inletPipingFound}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  inletPipingFound: e.target.value,
                  inletPipingDistance: "",
                });
              }}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio size="small" color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio size="small" color="primary" />}
                label="No"
              />
            </RadioGroup>

            {alert.inletPipingFound && (
              <FormHelperText>{alert.inletPipingFound}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>

      {postData.inletPipingFound === "Yes" && (
        <Box
          display="flex"
          bgcolor="grey.200"
          style={{
            paddingTop: "0px",
            marginTop: "0px",
            paddingLeft: 40,
          }}
          p={1}
        >
          <Box bgcolor="grey.200" style={{ marginTop: "9px" }}>
            <Typography variant="subtitle2" color="textSecondary">
              Distance to finished ground:
            </Typography>
          </Box>
          <Box bgcolor="grey.200" flexGrow={1} style={{ marginLeft: "5px" }}>
            <TextField
              variant="outlined"
              onChange={(e) =>
                setPostData({
                  ...postData,
                  inletPipingDistance: e.target.value,
                })
              }
              value={postData.inletPipingDistance}
              name="distance"
              size="small"
              style={{ maxWidth: "150px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ft</InputAdornment>
                ),
              }}
              helperText={
                alert.inletPipingDistance ? alert.inletPipingDistance : null
              }
              label="Distance"
              error={alert.inletPipingDistance ? true : false}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default InletPiping;
