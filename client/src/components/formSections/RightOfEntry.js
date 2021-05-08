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

const RightOfEntry = ({
  postData,
  setPostData,
  rightOfEntryIssue,
  setRightOfEntryIssue,
  removeElement,
}) => {
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
                  checked={rightOfEntryIssue.none}
                  onChange={(e) => {
                    setRightOfEntryIssue({
                      ...rightOfEntryIssue,
                      none: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.rightOfEntryIssue.push("None");
                    } else {
                      removeElement(postData.rightOfEntryIssue, "None");
                    }
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
                  checked={rightOfEntryIssue.fenced}
                  onChange={(e) => {
                    setRightOfEntryIssue({
                      ...rightOfEntryIssue,
                      fenced: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.rightOfEntryIssue.push("Fenced");
                    } else {
                      removeElement(postData.rightOfEntryIssue, "Fenced");
                    }
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
                  checked={rightOfEntryIssue.gated}
                  onChange={(e) => {
                    setRightOfEntryIssue({
                      ...rightOfEntryIssue,
                      gated: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.rightOfEntryIssue.push("Gated");
                    } else {
                      removeElement(postData.rightOfEntryIssue, "Gated");
                    }
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
                  checked={rightOfEntryIssue.dogs}
                  onChange={(e) => {
                    setRightOfEntryIssue({
                      ...rightOfEntryIssue,
                      dogs: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.rightOfEntryIssue.push("Dogs");
                    } else {
                      removeElement(postData.rightOfEntryIssue, "Dogs");
                    }
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
                  checked={rightOfEntryIssue.other}
                  onChange={(e) => {
                    setRightOfEntryIssue({
                      ...rightOfEntryIssue,
                      other: e.target.checked,
                    });
                    setPostData({
                      ...postData,
                      rightOfEntryIssueOtherValue: "",
                    });
                    if (e.target.checked) {
                      postData.rightOfEntryIssue.push("Other");
                    } else {
                      removeElement(postData.rightOfEntryIssue, "Other");
                    }
                  }}
                  name="other"
                />
              }
              label="Other"
            />
            <TextField
              required
              onChange={(e) =>
                setPostData({
                  ...postData,
                  rightOfEntryIssueOtherValue: e.target.value,
                })
              }
              value={postData.rightOfEntryIssueOtherValue}
              name="otherValue"
              size="small"
              style={{
                marginLeft: 0,
                marginTop: 12,
                maxWidth: 150,
              }}
              helperText={
                rightOfEntryIssue.other &&
                postData.rightOfEntryIssueOtherValue.length === 0
                  ? "Please provide a value."
                  : "Other value"
              }
              error={
                rightOfEntryIssue.other &&
                postData.rightOfEntryIssueOtherValue.length === 0
                  ? true
                  : false
              }
              disabled={rightOfEntryIssue.other ? false : true}
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
