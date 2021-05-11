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

const RightOfEntry = ({ postData, setPostData }) => {
  const { alert } = useSelector((state) => state);

  return (
    <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
      <Box bgcolor="grey.200">
        <FormControl
          error={alert.rightOfEntryIssue ? true : false}
          style={{ width: 145 }}
        >
          <FormLabel component="legend" style={{ marginTop: "10px" }}>
            Right of Entry Issue:
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
          error={alert.rightOfEntryIssue ? true : false}
          size="small"
        >
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={postData.rightOfEntryIssue.none}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
                        none: e.target.checked,
                      },
                    }));
                  }}
                  name="none"
                />
              }
              label="None"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={postData.rightOfEntryIssue.fenced}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
                        fenced: e.target.checked,
                      },
                    }));
                  }}
                  name="fenced"
                />
              }
              label="Fenced"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={postData.rightOfEntryIssue.gated}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
                        gated: e.target.checked,
                      },
                    }));
                  }}
                  name="gated"
                />
              }
              label="Gated"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={postData.rightOfEntryIssue.dogs}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
                        dogs: e.target.checked,
                      },
                    }));
                  }}
                  name="dogs"
                />
              }
              label="Dogs"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={postData.rightOfEntryIssue.other}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
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
              required
              onChange={(e) =>
                setPostData((postData) => ({
                  ...postData,
                  rightOfEntryIssue: {
                    ...postData.rightOfEntryIssue,
                    otherValue: e.target.value,
                  },
                }))
              }
              value={postData.rightOfEntryIssue.otherValue}
              name="otherValue"
              size="small"
              style={{
                marginLeft: 0,
                marginTop: 12,
                maxWidth: 150,
              }}
              helperText={
                postData.rightOfEntryIssue.other &&
                postData.rightOfEntryIssue.otherValue.length === 0
                  ? "Please provide a value."
                  : "Other value"
              }
              error={
                postData.rightOfEntryIssue.other &&
                postData.rightOfEntryIssue.otherValue.length === 0
                  ? true
                  : false
              }
              disabled={postData.rightOfEntryIssue.other ? false : true}
            />
          </FormGroup>
          {alert.rightOfEntryIssue && (
            <FormHelperText style={{ marginLeft: 0, marginTop: 0 }}>
              {alert.rightOfEntryIssue}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    </Box>
  );
};

export default RightOfEntry;
