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
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";

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

      <div className={classes.inputDiv}>
        <Box display="flex" p={1}>
          <Box>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Typography variant="subtitle2">Number of Bedrooms:</Typography>
              </Grid>
              <Grid item>
                <TextField
                  placeholder="0"
                  type="number"
                  size="small"
                  value={postData.numOfBedrooms}
                  onChange={(e) => {
                    setPostData({
                      ...postData,
                      numOfBedrooms: e.target.value,
                    });
                  }}
                  style={{ width: 40 }}
                  name="numOfBedrooms"
                  helperText={alert.numOfBedrooms ? alert.numOfBedrooms : null}
                  error={alert.numOfBedrooms ? true : false}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Typography variant="subtitle2">
                  Number of OSDS units:
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      numOfOsdsUnits: e.target.value,
                    })
                  }
                  value={postData.numOfOsdsUnits}
                  name="numOfOsdsUnits"
                  placeholder="0"
                  style={{ width: 40 }}
                  size="small"
                  helperText={
                    alert.numOfOsdsUnits ? alert.numOfOsdsUnits : null
                  }
                  error={alert.numOfOsdsUnits ? true : false}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Typography variant="subtitle2">Total volume:</Typography>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      totalVolume: e.target.value,
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Gal</InputAdornment>
                    ),
                  }}
                  value={postData.totalVolume}
                  name="totalVolume"
                  placeholder="0"
                  style={{ width: 100 }}
                  size="small"
                  helperText={alert.totalVolume ? alert.totalVolume : null}
                  error={alert.totalVolume ? true : false}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>

      <div className={classes.inputDiv}>
        <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
          <Box bgcolor="grey.200">
            <FormControl
              error={alert.solidPumpInterval ? true : false}
              style={{ width: 323 }}
            >
              <FormLabel component="legend" style={{ marginTop: "10px" }}>
                Solid pumped out every
                <FormHelperText>Select one</FormHelperText>
              </FormLabel>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              error={alert.solidPumpInterval ? true : false}
            >
              <RadioGroup
                row
                name="solidPumpInterval"
                value={postData.solidPumpInterval}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    solidPumpInterval: e.target.value,
                    solidPumpIntervalOtherValue: "",
                  });
                }}
              >
                <FormControlLabel
                  value="<6"
                  control={<Radio size="small" color="primary" />}
                  label="<6"
                />
                <FormControlLabel
                  value="6-9"
                  control={<Radio size="small" color="primary" />}
                  label="6-9"
                />
                <FormControlLabel
                  value="9-12"
                  control={<Radio size="small" color="primary" />}
                  label="9-12"
                />
                <FormControlLabel
                  value="12-24"
                  control={<Radio size="small" color="primary" />}
                  label="12-24"
                />
                <FormControlLabel
                  value=">24"
                  control={<Radio size="small" color="primary" />}
                  label=">24"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio size="small" color="primary" />}
                  label="Other"
                />
                <TextField
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      solidPumpIntervalOtherValue: e.target.value,
                    }));
                  }}
                  value={postData.solidPumpIntervalOtherValue}
                  name="solidPumpIntervalOtherValue"
                  size="small"
                  style={{
                    marginLeft: 0,
                    paddingTop: 12,
                    maxWidth: 150,
                  }}
                  helperText={
                    postData.solidPumpInterval === "Other" &&
                    postData.solidPumpIntervalOtherValue.length === 0
                      ? "Please provide a value."
                      : "Other value"
                  }
                  error={
                    postData.solidPumpInterval === "Other" &&
                    postData.solidPumpIntervalOtherValue.length === 0
                      ? true
                      : false
                  }
                  disabled={
                    postData.solidPumpInterval === "Other" ? false : true
                  }
                />
                <FormControlLabel
                  value="Unknown"
                  control={<Radio size="small" color="primary" />}
                  label="Unknown"
                />
              </RadioGroup>
              {alert.solidPumpInterval && (
                <FormHelperText>{alert.solidPumpInterval}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      </div>

      <div className={classes.inputDiv}>
        <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
          <Box bgcolor="grey.200">
            <FormControl
              error={alert.overflowPipeToSewer ? true : false}
              style={{ width: 323 }}
            >
              <FormLabel component="legend" style={{ marginTop: "10px" }}>
                Does the OSDS unit have an overflow pipe to public sewer?
                <FormHelperText>Select one</FormHelperText>
              </FormLabel>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              error={alert.overflowPipeToSewer ? true : false}
            >
              <RadioGroup
                row
                name="overflowPipeToSewer"
                value={postData.overflowPipeToSewer}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    overflowPipeToSewer: e.target.value,
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
                <FormControlLabel
                  value="Unknown"
                  control={<Radio size="small" color="primary" />}
                  label="Unknown"
                />
              </RadioGroup>
              {alert.overflowPipeToSewer && (
                <FormHelperText>{alert.overflowPipeToSewer}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      </div>

      <div className={classes.inputDiv}>
        <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
          <Box bgcolor="grey.200">
            <FormControl
              error={alert.osdsType ? true : false}
              style={{ width: 323 }}
            >
              <FormLabel component="legend" style={{ marginTop: "10px" }}>
                OSDS Type
                <FormHelperText>Select one</FormHelperText>
              </FormLabel>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              error={alert.osdsType ? true : false}
            >
              <RadioGroup
                row
                name="osdsType"
                value={postData.osdsType}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    osdsType: e.target.value,
                    osdsTypeOtherValue: "",
                  });
                }}
              >
                <FormControlLabel
                  value="Cesspool"
                  control={<Radio size="small" color="primary" />}
                  label="Cesspool"
                />
                <FormControlLabel
                  value="Septic Tank"
                  control={<Radio size="small" color="primary" />}
                  label="Septic Tank"
                />
                <FormControlLabel
                  value="Aerobic Unit"
                  control={<Radio size="small" color="primary" />}
                  label="Aerobic Unit"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio size="small" color="primary" />}
                  label="Other"
                />
                <TextField
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsTypeOtherValue: e.target.value,
                    }));
                  }}
                  value={postData.osdsTypeOtherValue}
                  name="osdsTypeOtherValue"
                  size="small"
                  style={{
                    marginLeft: 0,
                    paddingTop: 12,
                    maxWidth: 150,
                  }}
                  helperText={
                    postData.osdsType === "Other" &&
                    postData.osdsTypeOtherValue.length === 0
                      ? "Please provide a value."
                      : "Other value"
                  }
                  error={
                    postData.osdsType === "Other" &&
                    postData.osdsTypeOtherValue.length === 0
                      ? true
                      : false
                  }
                  disabled={postData.osdsType === "Other" ? false : true}
                />
                <FormControlLabel
                  value="Unknown"
                  control={<Radio size="small" color="primary" />}
                  label="Unknown"
                />
              </RadioGroup>
              {alert.osdsType && (
                <FormHelperText>{alert.osdsType}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      </div>

      <div className={classes.inputDiv}>
        <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
          <Box bgcolor="grey.200">
            <FormControl
              error={alert.osdsType ? true : false}
              style={{ width: 323 }}
            >
              <FormLabel component="legend" style={{ marginTop: "10px" }}>
                OSDS Type
                <FormHelperText>Select one</FormHelperText>
              </FormLabel>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              error={alert.osdsType ? true : false}
            >
              <RadioGroup
                row
                name="osdsType"
                value={postData.osdsType}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    osdsType: e.target.value,
                    osdsTypeOtherValue: "",
                  });
                }}
              >
                <FormControlLabel
                  value="Cesspool"
                  control={<Radio size="small" color="primary" />}
                  label="Cesspool"
                />
                <FormControlLabel
                  value="Septic Tank"
                  control={<Radio size="small" color="primary" />}
                  label="Septic Tank"
                />
                <FormControlLabel
                  value="Aerobic Unit"
                  control={<Radio size="small" color="primary" />}
                  label="Aerobic Unit"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio size="small" color="primary" />}
                  label="Other"
                />
                <TextField
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsTypeOtherValue: e.target.value,
                    }));
                  }}
                  value={postData.osdsTypeOtherValue}
                  name="osdsTypeOtherValue"
                  size="small"
                  style={{
                    marginLeft: 0,
                    paddingTop: 12,
                    maxWidth: 150,
                  }}
                  helperText={
                    postData.osdsType === "Other" &&
                    postData.osdsTypeOtherValue.length === 0
                      ? "Please provide a value."
                      : "Other value"
                  }
                  error={
                    postData.osdsType === "Other" &&
                    postData.osdsTypeOtherValue.length === 0
                      ? true
                      : false
                  }
                  disabled={postData.osdsType === "Other" ? false : true}
                />
                <FormControlLabel
                  value="Unknown"
                  control={<Radio size="small" color="primary" />}
                  label="Unknown"
                />
              </RadioGroup>
              {alert.osdsType && (
                <FormHelperText>{alert.osdsType}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      </div>

      <div className={classes.inputDiv}>
        <Box>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">
                Best Day/Time for Future Visit:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="datetime-local"
                type="datetime-local"
                value={postData.bestDayTimeForVisit}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    bestDayTimeForVisit: e.target.value,
                  });
                }}
                name="bestDayTimeForVisit"
                style={{ width: 228 }}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  alert.bestDayTimeForVisit ? alert.bestDayTimeForVisit : null
                }
                error={alert.bestDayTimeForVisit ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
      </div>

      <div className={classes.inputDiv}>
        <Box display="flex" p={1}>
          <Box>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Typography variant="subtitle2">Contact Name:</Typography>
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  size="small"
                  value={postData.contactName}
                  onChange={(e) => {
                    setPostData({
                      ...postData,
                      contactName: e.target.value,
                    });
                  }}
                  style={{ width: 150 }}
                  name="contactName"
                  helperText={alert.contactName ? alert.contactName : null}
                  error={alert.contactName ? true : false}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Typography variant="subtitle2">Contact Phone:</Typography>
              </Grid>
              <Grid item>
                <TextField
                  type="tel"
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      contactPhone: e.target.value,
                    })
                  }
                  value={postData.contactPhone}
                  name="contactPhone"
                  style={{ width: 90 }}
                  size="small"
                  helperText={alert.contactPhone ? alert.contactPhone : null}
                  error={alert.contactPhone ? true : false}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Typography variant="subtitle2">Email:</Typography>
              </Grid>
              <Grid item>
                <TextField
                  type="email"
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      email: e.target.value,
                    })
                  }
                  value={postData.email}
                  name="email"
                  size="small"
                  helperText={alert.email ? alert.email : null}
                  error={alert.email ? true : false}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default HomeownerSection;
