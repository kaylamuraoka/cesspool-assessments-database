import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

const OsdsLocation = ({
  postData,
  setPostData,
  osdsLocation,
  setOsdsLocation,
  removeElement,
}) => {
  const { alert } = useSelector((state) => state);

  return (
    <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
      <Box bgcolor="grey.200">
        <FormControl
          error={alert.osdsLocation ? true : false}
          style={{ width: 120 }}
        >
          <FormLabel component="legend" style={{ marginTop: "10px" }}>
            OSDS Location:
            <FormHelperText>Select all that apply</FormHelperText>
          </FormLabel>
        </FormControl>
      </Box>
      <Box
        bgcolor="grey.200"
        flexGrow={1}
        style={{ marginLeft: "20px", marginTop: 0, paddingTop: 0 }}
      >
        <FormControl
          component="fieldset"
          error={alert.osdsLocation ? true : false}
          size="small"
        >
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsLocation.frontyard}
                  onChange={(e) => {
                    setOsdsLocation({
                      ...osdsLocation,
                      frontyard: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.osdsLocation.push("Frontyard");
                    } else {
                      removeElement(postData.osdsLocation, "Frontyard");
                    }
                  }}
                  name="frontyard"
                />
              }
              label="Frontyard"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsLocation.backyard}
                  onChange={(e) => {
                    setOsdsLocation({
                      ...osdsLocation,
                      backyard: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.osdsLocation.push("Backyard");
                    } else {
                      removeElement(postData.osdsLocation, "Backyard");
                    }
                  }}
                  name="backyard"
                />
              }
              label="Backyard"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsLocation.nextToBldg}
                  onChange={(e) => {
                    setOsdsLocation({
                      ...osdsLocation,
                      nextToBldg: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.osdsLocation.push("Next to Bldg");
                    } else {
                      removeElement(postData.osdsLocation, "Next to Bldg");
                    }
                  }}
                  name="nextToBldg"
                />
              }
              label="Next to Bldg"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsLocation.other}
                  onChange={(e) => {
                    setOsdsLocation({
                      ...osdsLocation,
                      other: e.target.checked,
                    });
                    setPostData({
                      ...postData,
                      osdsLocationOtherValue: "",
                    });
                    if (e.target.checked) {
                      postData.osdsLocation.push("Other");
                    } else {
                      removeElement(postData.osdsLocation, "Other");
                    }
                  }}
                  name="other"
                />
              }
              label="Other"
            />
            <TextField
              onChange={(e) =>
                setPostData({
                  ...postData,
                  osdsLocationOtherValue: e.target.value,
                })
              }
              value={postData.osdsLocationOtherValue}
              name="otherValue"
              size="small"
              style={{
                marginLeft: 0,
                paddingTop: 12,
                maxWidth: 150,
              }}
              helperText={
                osdsLocation.other &&
                postData.osdsLocationOtherValue.length === 0
                  ? "Please provide a value."
                  : "Other value"
              }
              error={
                osdsLocation.other &&
                postData.osdsLocationOtherValue.length === 0
                  ? true
                  : false
              }
              disabled={osdsLocation.other ? false : true}
            />
          </FormGroup>
          {alert.osdsLocation && (
            <FormHelperText style={{ marginLeft: 0, marginTop: 0 }}>
              {alert.osdsLocation}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    </Box>
  );
};

export default OsdsLocation;
