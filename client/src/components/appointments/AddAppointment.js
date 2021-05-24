import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { googleMapsApiKey } from "../../utils/config";
import throttle from "lodash/throttle";
import parse from "autosuggest-highlight/parse";

// Material UI Components
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const customStyle = {
  width: "300px",
  margin: "0 auto",
};

const initialState = {
  title: "",
  notes: "",
  status: "",
  location: "",
  startDateTime: "",
  endDateTime: "",
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

const autocompleteService = { current: null };

const AddAppointment = () => {
  const classes = useStyles();

  const [appointment, setAppointment] = useState(initialState);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // When value changes of the fields
  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
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
      setOptions(appointment.location ? [appointment.location] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (appointment.location) {
          newOptions = [appointment.location];
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
  }, [appointment.location, inputValue, fetch]);

  // To add new appointment when user submits the form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(appointment);

    axios
      .post(
        "/api/addAppointment",
        { appointment },
        {
          headers: { Authorization: auth.token },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  };

  // const res = postDataAPI("addAppointment", appointment, auth.token);

  // console.log(res); // axios
  //   .post("/api/addAppointment", appointment, {
  //     headers: { Authorization: auth.token },
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     // history.push("/");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // };

  return (
    <Grid container spacing={3}>
      <h2>Add Appointment</h2>
      <form style={customStyle} onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            type="text"
            value={appointment.title}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Description
          <input
            name="notes"
            type="text"
            value={appointment.notes}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        {/* <label>
          Status
          <input
            type="text"
            value={appointment.status}
            onChange={handleChange}
            className="form-control"
          />
        </label> */}
        <FormLabel component="legend">
          Status:
          <Select
            label="Status"
            variant="outlined"
            value={appointment.status}
            name="status"
            onChange={handleChange}
            defaultValue="Available"
          >
            <MenuItem value="Booked" dense>
              Booked
            </MenuItem>
            <MenuItem value="Available" dense>
              Available
            </MenuItem>
          </Select>
        </FormLabel>
        <br />

        {/* <label>
          Location
          <input
            name="location"
            type="text"
            value={appointment.location}
            onChange={handleChange}
            className="form-control"
          />
        </label> */}

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
            value={appointment.location}
            onChange={(event, newValue) => {
              setOptions(newValue ? [newValue, ...options] : options);
              setAppointment({
                ...appointment,
                location: newValue ? newValue.description : event.target.value,
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
              let matches = "";
              if (
                option.structured_formatting.main_text_matched_substrings
                  .length > 0
              ) {
                matches =
                  option.structured_formatting.main_text_matched_substrings;
              }

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

        <br />
        {/* <label>
          Start Date/Time
          <input
            name="startDateTime"
            type="text"
            value={appointment.startDateTime}
            onChange={handleChange}
            className="form-control"
          />
        </label> */}
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            id="datetime-local"
            label="Start Date/Time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            name="startDateTime"
            value={appointment.startDateTime}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <br />
        {/* <label> */}
        {/* End Date/Time */}
        {/* <input
            name="endDateTime"
            type="text"
            value={appointment.endDateTime}
            onChange={handleChange}
            className="form-control"
          /> */}
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            id="datetime-local"
            label="End Date/Time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            name="endDateTime"
            value={appointment.endDateTime}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* </label> */}
        <input type="submit" value="submit" className="btn btn-primary" />
      </form>
    </Grid>
  );
};

export default AddAppointment;
