import React from "react";
import { useSelector } from "react-redux";
import { lotOccupiedOptions } from "../../../utils/formData";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const LotOccupied = ({ postData, setPostData, classes, handleChangeInput }) => {
  const { alert } = useSelector((state) => state);

  return (
    <>
      <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
        <Box bgcolor="grey.200" style={{ marginTop: 18, width: 155 }}>
          <FormLabel component="legend">Lot Occupied?</FormLabel>
        </Box>
        <Box>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
            error={alert.lotOccupied ? true : false}
          >
            <RadioGroup
              row
              name="lotOccupied"
              value={postData.lotOccupied}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  lotOccupied: e.target.value,
                  lotOccupiedOtherValue: "",
                });
              }}
            >
              {lotOccupiedOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio size="small" color="primary" />}
                  label={option}
                />
              ))}

              <Box>
                <FormControlLabel
                  value="Other"
                  control={<Radio size="small" color="primary" />}
                  label="Other"
                />
                <TextField
                  required
                  onChange={handleChangeInput}
                  value={postData.lotOccupiedOtherValue}
                  name="lotOccupiedOtherValue"
                  size="small"
                  style={{ maxWidth: 150 }}
                  helperText={
                    postData.lotOccupied === "Other" &&
                    postData.lotOccupiedOtherValue.length === 0
                      ? "Please provide a value."
                      : "Other value"
                  }
                  error={
                    postData.lotOccupied === "Other" &&
                    postData.lotOccupiedOtherValue.length === 0
                      ? true
                      : false
                  }
                  disabled={postData.lotOccupied === "Other" ? false : true}
                />
              </Box>
            </RadioGroup>
            {alert.lotOccupied && (
              <FormHelperText>{alert.lotOccupied}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default LotOccupied;
