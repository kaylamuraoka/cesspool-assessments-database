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

const OsdsLocation = ({ postData, setPostData }) => {
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
                  checked={postData.osdsLocation.frontyard}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsLocation: {
                        ...postData.osdsLocation,
                        frontyard: e.target.checked,
                      },
                    }));
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
                  checked={postData.osdsLocation.backyard}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsLocation: {
                        ...postData.osdsLocation,
                        backyard: e.target.checked,
                      },
                    }));
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
                  checked={postData.osdsLocation.nextToBldg}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsLocation: {
                        ...postData.osdsLocation,
                        nextToBldg: e.target.checked,
                      },
                    }));
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
                  checked={postData.osdsLocation.other}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsLocation: {
                        ...postData.osdsLocation,
                        other: e.target.checked,
                        otherValue: "",
                      },
                    }));
                  }}
                  name="other"
                />
              }
              label="Other"
            />
            <TextField
              onChange={(e) => {
                setPostData((postData) => ({
                  ...postData,
                  osdsLocation: {
                    ...postData.osdsLocation,
                    otherValue: e.target.value,
                  },
                }));
              }}
              value={postData.osdsLocation.otherValue}
              name="otherValue"
              size="small"
              style={{
                marginLeft: 0,
                paddingTop: 12,
                maxWidth: 150,
              }}
              helperText={
                postData.osdsLocation.other &&
                postData.osdsLocation.otherValue.length === 0
                  ? "Please provide a value."
                  : "Other value"
              }
              error={
                postData.osdsLocation.other &&
                postData.osdsLocation.otherValue.length === 0
                  ? true
                  : false
              }
              disabled={postData.osdsLocation.other ? false : true}
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
