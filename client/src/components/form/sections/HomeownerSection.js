import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const HomeownerSection = ({ postData, setPostData, classes }) => {
  const { alert } = useSelector((state) => state);

  return (
    <>
      <div className={classes.inputDiv}>
        <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
          <Box bgcolor="grey.200">
            <FormControl
              error={alert.propertyLocation ? true : false}
              style={{ width: 323 }}
            >
              <FormLabel component="legend" style={{ marginTop: "10px" }}>
                Is this property on OSDS or on Public Sewer?
                <FormHelperText>Select one</FormHelperText>
              </FormLabel>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              error={alert.propertyLocation ? true : false}
            >
              <RadioGroup
                row
                name="propertyLocation"
                value={postData.propertyLocation}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    propertyLocation: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value="OSDS"
                  control={<Radio size="small" color="primary" />}
                  label="OSDS"
                />
                <FormControlLabel
                  value="Public Sewer"
                  control={<Radio size="small" color="primary" />}
                  label="Public Sewer"
                />
                <FormControlLabel
                  value="Unknown"
                  control={<Radio size="small" color="primary" />}
                  label="Unknown"
                />
              </RadioGroup>
              {alert.propertyLocation && (
                <FormHelperText>{alert.propertyLocation}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      </div>

      <div className={classes.inputDiv}>
        <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
          <Box bgcolor="grey.200">
            <FormControl
              error={alert.osdsInService ? true : false}
              style={{ width: 323 }}
            >
              <FormLabel component="legend" style={{ marginTop: "10px" }}>
                If OSDS is found, is OSDS still in service?
                <FormHelperText>Select one</FormHelperText>
              </FormLabel>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              error={alert.osdsInService ? true : false}
            >
              <RadioGroup
                row
                name="osdsInService"
                value={postData.osdsInService}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    osdsInService: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio size="small" color="primary" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No (Abandoned)"
                  control={<Radio size="small" color="primary" />}
                  label="No (Abandoned)"
                />
                <FormControlLabel
                  value="Unknown"
                  control={<Radio size="small" color="primary" />}
                  label="Unknown"
                />
              </RadioGroup>
              {alert.osdsInService && (
                <FormHelperText>{alert.osdsInService}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      </div>

      <div className={classes.inputDiv}></div>
    </>
  );
};

export default HomeownerSection;
