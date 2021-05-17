import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createPost, updatePost } from "../../redux/actions/postAction";

// Material UI Components
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import blueGrey from "@material-ui/core/colors/blueGrey";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

// Material UI Icons
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: "right",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: "100%",
  },
}));

const AppointmentFormPopup = () => {
  const classes = useStyles();
  const { auth, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    title: "",
    description: "",
    status: "Available",
    startDateTime: "",
    endDateTime: "",
  };

  // const handleLoadMore = async () => {
  //   setLoad(true);
  //   const res = await getDataAPI(
  //     `post_discover?num=${discover.page * 9}`,
  //     auth.token
  //   );
  //   console.log(res);
  //   dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
  //   setLoad(false);
  // };

  const [appointment, setAppointment] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (images.length === 0)
    //   return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: "Please add your photo." },
    //   });

    // if (status.onEdit) {
    //   dispatch(updatePost({ postData, images, auth, status }));
    // } else {
    //   dispatch(createPost({ postData, images, auth }));
    // }

    // setPostData(initialState);
    // setImages([]);
  };

  // const handleChangeInput = (e) => {
  //   setPostData({ ...postData, [e.target.name]: e.target.value });
  // };

  // useEffect(() => {
  //   if (status.onEdit) {
  //     setPostData(status.postData);
  //     setImages(status.images);
  //   }
  // }, [status]);

  return (
    <Container>
      {/* <form onSubmit={handleSubmit}> */}
      {/* <AppointmentForm.Overlay></AppointmentForm.Overlay> */}
      {/* <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                textAlign: "center",
                marginBottom: "8px",
                fontWeight: "800",
              }}
            >
              Add an Appointment
            </Typography>
            <Divider variant="middle" />
            <Typography
              variant="body2"
              color="textSecondary"
              style={{
                marginTop: "15px",
                fontWeight: "500",
              }}
            >
              You may add available times for future visit
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3}>
              <FormControl
                variant="outlined"
                required
                className={classes.formControl}
                size="small"
              >
                <InputLabel id="weather-label">Weather</InputLabel>
                <Select
                  labelId="weather-label"
                  id="weather-select"
                  value={postData.weather}
                  onChange={(e) => {
                    setPostData({
                      ...postData,
                      weather: e.target.value,
                      weatherOtherValue: "",
                    });
                  }}
                  name="weather"
                  style={{ minWidth: 140 }}
                  label="Weather"
                >
                  {weatherOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {postData.weather === "Other" && (
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item style={{ paddingTop: "8px" }}>
                      Other:{"  "}
                      <TextField
                        required
                        onChange={handleChangeInput}
                        value={postData.weatherOtherValue}
                        name="weatherOtherValue"
                        size="small"
                        style={{ width: "65%" }}
                        helperText={
                          postData.weatherOtherValue.length === 0
                            ? "Please provide a value."
                            : null
                        }
                        error={
                          postData.weatherOtherValue.length === 0 ? true : false
                        }
                      />
                    </Grid>
                  </Grid>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <FormControl
                variant="outlined"
                required
                className={classes.formControl}
                size="small"
              >
                <InputLabel id="lot-occupied-label">Lot Occupied?</InputLabel>
                <Select
                  labelId="lot-occupied-label"
                  id="lot-occupied-select"
                  value={postData.lotOccupied}
                  onChange={(e) => {
                    setPostData({
                      ...postData,
                      lotOccupied: e.target.value,
                      lotOccupiedOtherValue: "",
                    });
                  }}
                  name="lotOccupied"
                  style={{ minWidth: 160 }}
                  label="Lot Occupied?"
                >
                  {lotOccupiedOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {postData.lotOccupied === "Other" && (
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item style={{ paddingTop: "8px" }}>
                      Other:{"  "}
                      <TextField
                        required
                        value={postData.lotOccupiedOtherValue}
                        onChange={handleChangeInput}
                        name="lotOccupiedOtherValue"
                        size="small"
                        style={{ width: "65%" }}
                        helperText={
                          postData.lotOccupiedOtherValue.length === 0
                            ? "Please provide a value."
                            : null
                        }
                        error={
                          postData.lotOccupiedOtherValue.length === 0
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  </Grid>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
                size="small"
              >
                <FormLabel component="legend">OSDS Found?</FormLabel>
                <Typography variant="caption" color="textSecondary">
                  If yes, you will be asked more questions
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={postData.osdsFound}
                        onChange={(e) => {
                          setPostData({
                            ...postData,
                            osdsFound: e.target.checked,
                            accessPortProvided: false,
                            numOfAccessPorts: "",
                            portSize: "",
                          });
                        }}
                        name="found"
                      />
                    }
                    label="OSDS Found?"
                  />

                  {postData.osdsFound && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={postData.accessPortProvided}
                          onChange={(e) => {
                            setPostData({
                              ...postData,
                              accessPortProvided: e.target.checked,
                              numOfAccessPorts: "",
                              portSize: "",
                            });
                          }}
                          name="accessPortProvided"
                        />
                      }
                      label="Access Port Provided?"
                    />
                  )}

                  {postData.accessPortProvided && (
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item style={{ paddingTop: "8px" }}>
                        Number of Access Ports:{"  "}
                        <TextField
                          variant="outlined"
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              numOfAccessPorts: e.target.value,
                            })
                          }
                          value={postData.numOfAccessPorts}
                          name="numOfAccessPorts"
                          size="small"
                          style={{ width: "25%" }}
                          helperText={
                            postData.numOfAccessPorts.length === 0
                              ? "Please provide a value."
                              : null
                          }
                          error={
                            postData.numOfAccessPorts.length === 0
                              ? true
                              : false
                          }
                        />
                      </Grid>

                      <Grid item style={{ paddingTop: "8px" }}>
                        Port Size:{"  "}
                        <TextField
                          variant="outlined"
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              portSize: e.target.value,
                            })
                          }
                          value={postData.portSize}
                          name="portSize"
                          size="small"
                          style={{ width: "50%" }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">in</InputAdornment>
                            ),
                          }}
                          helperText={
                            postData.portSize.length === 0
                              ? "Please provide a value."
                              : null
                          }
                          error={postData.portSize.length === 0 ? true : false}
                        />
                      </Grid>
                    </Grid>
                  )}
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
                size="small"
              >
                <FormLabel component="legend">OSDS is</FormLabel>
                <Typography variant="caption" color="textSecondary">
                  Select all that apply
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsIs.dry}
                        onChange={(e) => {
                          setOsdsIs({
                            ...osdsIs,
                            dry: e.target.checked,
                          });
                          if (e.target.checked) {
                            postData.osdsIs.push("Dry");
                          } else {
                            removeElement(postData.osdsIs, "Dry");
                          }
                        }}
                        name="dry"
                      />
                    }
                    label="Dry"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsIs.wet_water_scum}
                        onChange={(e) => {
                          setOsdsIs({
                            ...osdsIs,
                            wet_water_scum: e.target.checked,
                          });
                          if (e.target.checked) {
                            postData.osdsIs.push("Wet (water/scum)");
                          } else {
                            removeElement(postData.osdsIs, "Wet (water/scum)");
                          }
                        }}
                        name="wet_water_scum"
                      />
                    }
                    label="Wet (water/scum)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsIs.wet_sludge}
                        onChange={(e) => {
                          setOsdsIs({
                            ...osdsIs,
                            wet_sludge: e.target.checked,
                          });
                          if (e.target.checked) {
                            postData.osdsIs.push("Wet (sludge)");
                          } else {
                            removeElement(postData.osdsIs, "Wet (sludge)");
                          }
                        }}
                        name="wet_sludge"
                      />
                    }
                    label="Wet (sludge)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsIs.odorous}
                        onChange={(e) => {
                          setOsdsIs({
                            ...osdsIs,
                            odorous: e.target.checked,
                          });
                          if (e.target.checked) {
                            postData.osdsIs.push("Odorous");
                          } else {
                            removeElement(postData.osdsIs, "Odorous");
                          }
                        }}
                        name="odorous"
                      />
                    }
                    label="Odorous"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsIs.unknown}
                        onChange={(e) => {
                          setOsdsIs({
                            ...osdsIs,
                            unknown: e.target.checked,
                          });
                          if (e.target.checked) {
                            postData.osdsIs.push("Unknown");
                          } else {
                            removeElement(postData.osdsIs, "Unknown");
                          }
                        }}
                        name="unknown"
                      />
                    }
                    label="Unknown"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
                size="small"
              >
                <FormLabel component="legend">Inlet Piping Found?</FormLabel>
                <Typography variant="caption" color="textSecondary">
                  If yes, you will be asked more questions
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={postData.inletPipingFound}
                        onChange={(e) => {
                          setPostData({
                            ...postData,
                            inletPipingFound: e.target.checked,
                            inletPipingDistance: "",
                          });
                        }}
                        name="found"
                      />
                    }
                    label="Inlet Piping Found?"
                  />

                  {postData.inletPipingFound && (
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item style={{ paddingTop: "8px" }}>
                        Distance to finished ground:{"  "}
                        <TextField
                          variant="outlined"
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              inletPipingDistance: e.target.value,
                            })
                          }
                          value={postData.inletPipingDistance}
                          name="distance"
                          size="small"
                          style={{ width: "50%" }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">ft</InputAdornment>
                            ),
                          }}
                          helperText={
                            postData.inletPipingDistance.length === 0
                              ? "Please provide a value."
                              : null
                          }
                          error={
                            postData.inletPipingDistance.length === 0
                              ? true
                              : false
                          }
                        />
                      </Grid>
                    </Grid>
                  )}
                </FormGroup>
              </FormControl>
            </Grid>

            
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<SaveIcon />}
            type="submit"
          >
            Submit
          </Button>
        </Grid> */}
      {/* </form> */}
    </Container>
  );
};

export default AppointmentFormPopup;
