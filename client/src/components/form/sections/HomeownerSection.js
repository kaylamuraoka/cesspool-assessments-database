import React from "react";
import { useSelector } from "react-redux";

import StyledRadio from "../../inputs/StyledRadio";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { DateTimePicker } from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
  inputDiv: {
    width: "100%",
    marginTop: 15,
  },
}));

const propertyLocationOptions = ["OSDS", "Public Sewer", "Unknown"];
const osdsInServiceOptions = ["Yes", "No (Abandoned)", "Unknown"];
const solidPumpIntervalOptions = [
  "<6",
  "6-9",
  "9-12",
  "12-24",
  ">24",
  "Unknown",
];

const overflowPipeToSewerOptions = ["Yes", "No", "Unknown"];

const osdsTypeOptions = ["Cesspool", "Septic Tank", "Aerobic Unit", "Unknown"];

const HomeownerSection = ({ postData, setPostData }) => {
  const classes = useStyles();
  const { alert } = useSelector((state) => state);

  const handleChangeInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl
          required
          fullWidth
          error={alert.propertyLocation ? true : false}
        >
          <FormLabel component="legend">
            Is this property on OSDS or on Public Sewer?{" "}
            <FormHelperText component="span">(Select one)</FormHelperText>
          </FormLabel>
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
            {propertyLocationOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<StyledRadio />}
                color="primary"
                label={option}
              />
            ))}
          </RadioGroup>
          {alert.propertyLocation && (
            <FormHelperText>{alert.propertyLocation}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl
          required
          fullWidth
          error={alert.osdsInService ? true : false}
        >
          <FormLabel component="legend">
            If OSDS is found, is OSDS still in service?{" "}
            <FormHelperText component="span">(Select one)</FormHelperText>
          </FormLabel>
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
            {osdsInServiceOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<StyledRadio />}
                color="primary"
                label={option}
              />
            ))}
          </RadioGroup>
          {alert.osdsInService && (
            <FormHelperText>{alert.osdsInService}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <TextField
          fullWidth
          placeholder="0"
          type="number"
          size="small"
          value={postData.numOfBedrooms}
          name="numOfBedrooms"
          onChange={handleChangeInput}
          label="Number of Bedrooms"
          helperText={alert.numOfBedrooms ? alert.numOfBedrooms : null}
          error={alert.numOfBedrooms ? true : false}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          fullWidth
          type="number"
          value={postData.numOfOsdsUnits}
          name="numOfOsdsUnits"
          onChange={handleChangeInput}
          placeholder="0"
          size="small"
          label="Number of OSDS units"
          helperText={alert.numOfOsdsUnits ? alert.numOfOsdsUnits : null}
          error={alert.numOfOsdsUnits ? true : false}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          type="number"
          value={postData.totalVolume}
          name="totalVolume"
          label="Total volume"
          onChange={handleChangeInput}
          InputProps={{
            endAdornment: <InputAdornment position="end">Gal</InputAdornment>,
          }}
          placeholder="0"
          size="small"
          helperText={alert.totalVolume ? alert.totalVolume : null}
          error={alert.totalVolume ? true : false}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl
          required
          fullWidth
          error={alert.solidPumpInterval ? true : false}
        >
          <FormLabel component="legend">
            Solid pumped out every{" "}
            <FormHelperText component="span">(Select one)</FormHelperText>
          </FormLabel>
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
            {solidPumpIntervalOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<StyledRadio />}
                color="primary"
                label={option}
              />
            ))}
            <Box display="flex">
              <FormControlLabel
                value="Other"
                control={<StyledRadio />}
                label="Other"
              />
              <TextField
                value={postData.solidPumpIntervalOtherValue}
                name="solidPumpIntervalOtherValue"
                onChange={handleChangeInput}
                size="small"
                style={{ maxWidth: 90 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">(month)</InputAdornment>
                  ),
                }}
                error={
                  postData.solidPumpInterval === "Other" &&
                  postData.solidPumpIntervalOtherValue.length === 0
                    ? true
                    : false
                }
                disabled={postData.solidPumpInterval === "Other" ? false : true}
              />
            </Box>
          </RadioGroup>
          {alert.solidPumpInterval && (
            <FormHelperText>{alert.solidPumpInterval}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl
          required
          fullWidth
          error={alert.overflowPipeToSewer ? true : false}
        >
          <FormLabel component="legend">
            Does the OSDS unit have an overflow pipe to public sewer?{" "}
            <FormHelperText component="span">(Select one)</FormHelperText>
          </FormLabel>
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
            {overflowPipeToSewerOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<StyledRadio />}
                color="primary"
                label={option}
              />
            ))}
          </RadioGroup>
          {alert.overflowPipeToSewer && (
            <FormHelperText>{alert.overflowPipeToSewer}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl required fullWidth error={alert.osdsType ? true : false}>
          <FormLabel component="legend">
            OSDS Type
            <FormHelperText component="span">(Select one)</FormHelperText>
          </FormLabel>
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
            {osdsTypeOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<StyledRadio />}
                color="primary"
                label={option}
              />
            ))}
            <Box display="flex">
              <FormControlLabel
                value="Other"
                control={<StyledRadio />}
                label="Other"
              />
              <TextField
                value={postData.osdsTypeOtherValue}
                name="osdsTypeOtherValue"
                onChange={handleChangeInput}
                size="small"
                style={{
                  maxWidth: 120,
                }}
                error={
                  postData.osdsType === "Other" &&
                  postData.osdsTypeOtherValue.length === 0
                    ? true
                    : false
                }
                disabled={postData.osdsType === "Other" ? false : true}
              />
            </Box>
          </RadioGroup>
          {alert.osdsType && <FormHelperText>{alert.osdsType}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Best Day/Time for Future Visit"
          id="datetime-local"
          type="datetime-local"
          name="bestDayTimeForVisit"
          value={postData.bestDayTimeForVisit}
          onChange={handleChangeInput}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={
            alert.bestDayTimeForVisit ? alert.bestDayTimeForVisit : null
          }
          error={alert.bestDayTimeForVisit ? true : false}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          type="text"
          size="small"
          value={postData.contactName}
          name="contactName"
          onChange={handleChangeInput}
          fullWidth
          label="Contact Name"
          helperText={alert.contactName ? alert.contactName : null}
          error={alert.contactName ? true : false}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          type="tel"
          value={postData.contactPhone}
          name="contactPhone"
          onChange={handleChangeInput}
          fullWidth
          label="Contact Phone"
          size="small"
          helperText={alert.contactPhone ? alert.contactPhone : null}
          error={alert.contactPhone ? true : false}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          type="email"
          onChange={handleChangeInput}
          value={postData.email}
          name="email"
          size="small"
          label="Contact Email"
          fullWidth
          helperText={alert.email ? alert.email : null}
          error={alert.email ? true : false}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          type="text"
          value={postData.mailingAddress}
          name="mailingAddress"
          onChange={handleChangeInput}
          label="Mailing Address"
          helperText={alert.mailingAddress ? alert.mailingAddress : null}
          error={alert.mailingAddress ? true : false}
        />
      </Grid>
    </Grid>
  );
};

export default HomeownerSection;
