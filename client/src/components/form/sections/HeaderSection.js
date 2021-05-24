import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { googleMapsApiKey } from "../../../utils/config";
import throttle from "lodash/throttle";
import parse from "autosuggest-highlight/parse";
import PhoneMaskInput from "../../textMasks/PhoneMaskInput";
import TMKMaskInput from "../../textMasks/TMKMaskInput";
import PropTypes from "prop-types";

// Material UI Components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";

PhoneMaskInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

TMKMaskInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
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

// const currDateTime = moment().utcOffset("-10:00").format("YYYY-MM-DDThh:mm");

const locationOptions = ["Waianae", "Nanakuli", "Waimanalo"];

const HeaderSection = ({ postData, setPostData }) => {
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
      setOptions(postData.projectAddress ? [postData.projectAddress] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (postData.projectAddress) {
          newOptions = [postData.projectAddress];
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
  }, [postData.projectAddress, inputValue, fetch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
        <TextField
          variant="outlined"
          required
          fullWidth
          size="small"
          id="datetime-local"
          label="Date/Time"
          type="datetime-local"
          value={postData.dateTime}
          onChange={handleChangeInput}
          name="dateTime"
          InputLabelProps={{
            shrink: true,
          }}
          helperText={alert.dateTime ? alert.dateTime : null}
          error={alert.dateTime ? true : false}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          fullWidth
          size="small"
          variant="outlined"
          label="TMK"
          value={postData.TMK}
          onChange={handleChangeInput}
          name="TMK"
          id="TMK-label-input"
          InputProps={{
            inputComponent: TMKMaskInput,
          }}
          error={alert.TMK ? true : false}
          helperText={alert.TMK ? alert.TMK : null}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        {/* <TextField
          select
          fullWidth
          label="Location"
          value={postData.location}
          onChange={handleChangeInput}
          helperText={alert.location ? alert.location : null}
          error={alert.location ? true : false}
          variant="outlined"
          size="small"
        >
          {locationOptions.map((option) => (
            <MenuItem key={option} value={option} dense>
              {option}
            </MenuItem>
          ))}
        </TextField> */}
        <FormControl
          required
          fullWidth
          size="small"
          variant="outlined"
          error={alert.location ? true : false}
        >
          <InputLabel id="select-location-label">Location</InputLabel>
          <Select
            labelId="select-location-label"
            id="select-location"
            value={postData.location}
            name="location"
            onChange={handleChangeInput}
            label="Location"
          >
            {locationOptions.map((option) => (
              <MenuItem key={option} value={option} dense>
                {option}
              </MenuItem>
            ))}
          </Select>
          {alert.location && <FormHelperText>{alert.location}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={5}>
        <TextField
          required
          fullWidth
          variant="outlined"
          value={postData.propertyOwner}
          name="propertyOwner"
          onChange={handleChangeInput}
          size="small"
          label="Property Owner"
          placeholder="Property Owner"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon fontSize="small" className={classes.startIcon} />
              </InputAdornment>
            ),
          }}
          helperText={alert.propertyOwner ? alert.propertyOwner : null}
          error={alert.propertyOwner ? true : false}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          label="Phone"
          value={postData.propertyOwnerPhone}
          onChange={handleChangeInput}
          id="property-owner-phone-input"
          name="propertyOwnerPhone"
          InputProps={{
            startAdornment: (
              <PhoneIcon
                fontSize="small"
                className={classes.startIconPhoneInput}
              />
            ),
            inputComponent: PhoneMaskInput,
          }}
          error={alert.propertyOwnerPhone ? true : false}
          helperText={
            alert.propertyOwnerPhone ? alert.propertyOwnerPhone : null
          }
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          fullWidth
          variant="outlined"
          value={postData.propertyOwnerEmail}
          name="propertyOwnerEmail"
          onChange={handleChangeInput}
          size="small"
          label="Email"
          placeholder="Email"
          helperText={
            alert.propertyOwnerEmail ? alert.propertyOwnerEmail : null
          }
          error={alert.propertyOwnerEmail ? true : false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon fontSize="small" className={classes.startIcon} />
              </InputAdornment>
            ),
          }}
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
          value={postData.projectAddress}
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setPostData({
              ...postData,
              projectAddress: newValue
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
              label="Project Address"
              variant="outlined"
              size="small"
              fullWidth
              required
              helperText={alert.projectAddress ? alert.projectAddress : null}
              error={alert.projectAddress ? true : false}
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
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          value={postData.engineer}
          name="engineer"
          onChange={handleChangeInput}
          size="small"
          label="Engineer"
          variant="outlined"
          placeholder="Engineer"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon fontSize="small" className={classes.startIcon} />
              </InputAdornment>
            ),
          }}
          helperText={alert.engineer ? alert.engineer : null}
          error={alert.engineer ? true : false}
        />
      </Grid>
      {/* <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          value={postData.contractor}
          name="contractor"
          onChange={handleChangeInput}
          size="small"
          label="Contractor"
          variant="outlined"
          placeholder="Contractor"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon fontSize="small" className={classes.startIcon} />
              </InputAdornment>
            ),
          }}
          helperText={alert.contractor ? alert.contractor : null}
          error={alert.contractor ? true : false}
        />
      </Grid> */}
    </Grid>
  );
};

export default HeaderSection;
