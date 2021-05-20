import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { googleMapsApiKey } from "../../../utils/config";
import throttle from "lodash/throttle";
import PropTypes from "prop-types";
import parse from "autosuggest-highlight/parse";
import StyledRadio from "../../inputs/StyledRadio";
import PhoneMaskInput from "../../textMasks/PhoneMaskInput";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";

PhoneMaskInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  startIconPhoneInput: {
    color: theme.palette.text.secondary,
    opacity: 0.7,
    marginRight: theme.spacing(1),
  },
  startIcon: {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
}));
const autocompleteService = { current: null };

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

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  const { alert } = useSelector((state) => state);

  const handleChangeInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }
    if (inputValue === "") {
      setOptions(postData.mailingAddress ? [postData.mailingAddress] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (postData.mailingAddress) {
          newOptions = [postData.mailingAddress];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [postData.mailingAddress, inputValue, fetch]);

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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
          placeholder="Contact Name"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon fontSize="small" className={classes.startIcon} />
              </InputAdornment>
            ),
          }}
          helperText={alert.contactName ? alert.contactName : null}
          error={alert.contactName ? true : false}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          label="Contact Phone"
          value={postData.contactPhone}
          onChange={handleChangeInput}
          id="property-owner-phone-input"
          name="contactPhone"
          InputProps={{
            startAdornment: (
              <PhoneIcon
                fontSize="small"
                className={classes.startIconPhoneInput}
              />
            ),
            inputComponent: PhoneMaskInput,
          }}
          error={alert.contactPhone ? true : false}
          helperText={alert.contactPhone ? alert.contactPhone : null}
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
          variant="outlined"
          placeholder="Contact Email"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon fontSize="small" className={classes.startIcon} />
              </InputAdornment>
            ),
          }}
          helperText={alert.email ? alert.email : null}
          error={alert.email ? true : false}
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          id="google-map"
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={postData.mailingAddress}
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setPostData({
              ...postData,
              mailingAddress: newValue
                ? newValue.description
                : event.target.value,
            });
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Mailing Address"
              variant="outlined"
              size="small"
              fullWidth
              required
              helperText={alert.mailingAddress ? alert.mailingAddress : null}
              error={alert.mailingAddress ? true : false}
            />
          )}
          renderOption={(option) => {
            const matches =
              option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [
                match.offset,
                match.offset + match.length,
              ])
            );
            return (
              <Grid container alignItems="center">
                <Grid item>
                  <LocationOnIcon className={classes.icon} />
                </Grid>
                <Grid item xs>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}

                  <Typography variant="body2" color="textSecondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HomeownerSection;
