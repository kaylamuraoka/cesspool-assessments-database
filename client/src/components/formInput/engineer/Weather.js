import React from "react";
import { useSelector } from "react-redux";
import { weatherOptions } from "../../../utils/formData";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const Weather = ({ postData, setPostData, classes, handleChangeInput }) => {
  const { alert } = useSelector((state) => state);

  return (
    <>
      <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
        <Box bgcolor="grey.200">
          <FormControl error={alert.weather ? true : false}>
            <FormLabel component="legend" style={{ marginTop: "10px" }}>
              Weather:
              <FormHelperText>Select one</FormHelperText>
            </FormLabel>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
            error={alert.weather ? true : false}
          >
            <RadioGroup
              row
              name="weather"
              value={postData.weather}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  weather: e.target.value,
                  weatherOtherValue: "",
                });
              }}
            >
              {weatherOptions.map((option) => (
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
                  value={postData.weatherOtherValue}
                  name="weatherOtherValue"
                  size="small"
                  style={{ maxWidth: 150 }}
                  helperText={
                    postData.weather === "Other" &&
                    postData.weatherOtherValue.length === 0
                      ? "Please provide a value."
                      : "Other value"
                  }
                  error={
                    postData.weather === "Other" &&
                    postData.weatherOtherValue.length === 0
                      ? true
                      : false
                  }
                  disabled={postData.weather === "Other" ? false : true}
                />
              </Box>
            </RadioGroup>
            {alert.weather && <FormHelperText>{alert.weather}</FormHelperText>}
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default Weather;
