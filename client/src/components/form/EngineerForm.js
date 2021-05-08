import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createPost, updatePost } from "../../redux/actions/postAction";
import { weatherOptions, lotOccupiedOptions } from "../../utils/formData";

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

// Material UI Icons
import SaveIcon from "@material-ui/icons/Save";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
  input: {
    display: "none",
  },
  icon: {
    opacity: "0.6",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formRow: {
    padding: theme.spacing(1),
    background: blueGrey[50],
  },
}));

const EngineerForm = () => {
  const classes = useStyles();
  const { auth, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    weather: "",
    weatherOtherValue: "",
    lotOccupied: "",
    lotOccupiedOtherValue: "",
    osdsFound: false,
    accessPortProvided: false,
    numOfAccessPorts: "",
    portSize: "",
    osdsIs: [],
    inletPipingFound: false,
    inletPipingDistance: "",
    outletPipingFound: false,
    outletPipingDistance: "",
    liquid: "",
    liquidDistanceToFinishedGrade: "",
    osdsLocation: [],
    osdsLocationOtherValue: "",
    rightOfEntryIssue: [],
    rightOfEntryIssueOtherValue: "",
  };
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

  const [postData, setPostData] = useState(initialState);

  const [osdsIs, setOsdsIs] = useState({
    dry: false,
    wet_water_scum: false,
    wet_sludge: false,
    odorous: false,
    unknown: false,
  });

  const [osdsLocation, setOsdsLocation] = useState({
    frontyard: false,
    backyard: false,
    nextToBldg: false,
    other: false,
  });

  const [rightOfEntryIssue, setRightOfEntryIssue] = useState({
    none: false,
    fenced: false,
    gated: false,
    dogs: false,
    other: false,
  });

  function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024)
        err =
          "The file that you are trying to upload exceeds the 1 MB size limit. Please select a file less than 1 MB.";

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        err = "Invalid File format. You may only upload JPG, JPEG, PNG files.";

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (images.length === 0)
    //   return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: "Please add your photo." },
    //   });

    if (status.onEdit) {
      dispatch(updatePost({ postData, images, auth, status }));
    } else {
      dispatch(createPost({ postData, images, auth }));
    }

    setPostData(initialState);
    setImages([]);
    setOsdsIs({
      dry: false,
      wet_water_scum: false,
      wet_sludge: false,
      odorous: false,
      unknown: false,
    });

    setOsdsLocation({
      frontyard: false,
      backyard: false,
      nextToBldg: false,
      other: false,
    });

    setRightOfEntryIssue({
      none: false,
      fenced: false,
      gated: false,
      dogs: false,
      other: false,
    });

    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  const handleChangeInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  useEffect(() => {
    if (status.onEdit) {
      setPostData(status.postData);
      setImages(status.images);
    }
  }, [status]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              Existing On-Site Sewer Disposal System (OSDS) Field Survey
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
              Please fill out the following form in as much detail as possible:
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

            <Grid item xs={6} sm={6} md={4}>
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
                size="small"
              >
                <FormLabel component="legend">Outlet Piping Found?</FormLabel>
                <Typography variant="caption" color="textSecondary">
                  If yes, you will be asked more questions
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={postData.outletPipingFound}
                        onChange={(e) => {
                          setPostData({
                            ...postData,
                            outletPipingFound: e.target.checked,
                            outletPipingDistance: "",
                          });
                        }}
                        name="found"
                      />
                    }
                    label="Outlet Piping Found?"
                  />

                  {postData.outletPipingFound && (
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item style={{ paddingTop: "8px" }}>
                        Distance to finished ground:{"  "}
                        <TextField
                          variant="outlined"
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              outletPipingDistance: e.target.value,
                            })
                          }
                          value={postData.outletPipingDistance}
                          name="distance"
                          size="small"
                          style={{ width: "50%" }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">ft</InputAdornment>
                            ),
                          }}
                          helperText={
                            postData.outletPipingDistance.length === 0
                              ? "Please provide a value."
                              : null
                          }
                          error={
                            postData.outletPipingDistance.length === 0
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

            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                size="small"
              >
                <span>
                  If
                  <Select
                    value={postData.liquid}
                    onChange={(e) => {
                      setPostData({
                        ...postData,
                        liquid: e.target.value,
                        liquidDistanceToFinishedGrade: "",
                      });
                    }}
                    name="liquid"
                    style={{
                      minWidth: 120,
                      marginLeft: "8px",
                      marginRight: "8px",
                    }}
                  >
                    <MenuItem value="water/scum">water/scum</MenuItem>
                    <MenuItem value="sludge">sludge</MenuItem>
                  </Select>
                  found in OSDS, its distance to finished grade:{" "}
                  <TextField
                    variant="outlined"
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        liquidDistanceToFinishedGrade: e.target.value,
                      })
                    }
                    value={postData.liquidDistanceToFinishedGrade}
                    name="distance"
                    size="small"
                    style={{ width: "12%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">ft</InputAdornment>
                      ),
                    }}
                    helperText={
                      postData.liquidDistanceToFinishedGrade.length === 0
                        ? "Please provide a value."
                        : null
                    }
                    error={
                      postData.liquidDistanceToFinishedGrade.length === 0
                        ? true
                        : false
                    }
                  />
                </span>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
                size="small"
              >
                <FormLabel component="legend">OSDS Location</FormLabel>
                <Typography variant="caption" color="textSecondary">
                  Select all that apply
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsLocation.frontyard}
                        onChange={(e) => {
                          setOsdsLocation({
                            ...osdsLocation,
                            frontyard: e.target.checked,
                          });
                          if (e.target.checked) {
                            postData.osdsLocation.push("Frontyard");
                          } else {
                            removeElement(postData.osdsLocation, "Frontyard");
                          }
                        }}
                        name="frontyard"
                      />
                    }
                    label="Frontyard"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsLocation.backyard}
                        onChange={(e) => {
                          setOsdsLocation({
                            ...osdsLocation,
                            backyard: e.target.checked,
                          });
                          if (e.target.checked) {
                            postData.osdsLocation.push("Backyard");
                          } else {
                            removeElement(postData.osdsLocation, "Backyard");
                          }
                        }}
                        name="backyard"
                      />
                    }
                    label="Backyard"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsLocation.nextToBldg}
                        onChange={(e) => {
                          setOsdsLocation({
                            ...osdsLocation,
                            nextToBldg: e.target.checked,
                          });
                          if (e.target.checked) {
                            postData.osdsLocation.push("Next to Bldg");
                          } else {
                            removeElement(
                              postData.osdsLocation,
                              "Next to Bldg"
                            );
                          }
                        }}
                        name="nextToBldg"
                      />
                    }
                    label="Next to Bldg"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={osdsLocation.other}
                        onChange={(e) => {
                          setOsdsLocation({
                            ...osdsLocation,
                            other: e.target.checked,
                          });
                          setPostData({
                            ...postData,
                            osdsLocationOtherValue: "",
                          });
                          if (e.target.checked) {
                            postData.osdsLocation.push("Other");
                          } else {
                            removeElement(postData.osdsLocation, "Other");
                          }
                        }}
                        name="other"
                      />
                    }
                    label="Other"
                  />

                  {osdsLocation.other && (
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item style={{ paddingTop: "8px" }}>
                        Other:{"  "}
                        <TextField
                          required
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              osdsLocationOtherValue: e.target.value,
                            })
                          }
                          value={postData.osdsLocationOtherValue}
                          name="otherValue"
                          size="small"
                          style={{ width: "65%" }}
                          helperText={
                            postData.osdsLocationOtherValue.length === 0
                              ? "Please provide a value."
                              : null
                          }
                          error={
                            postData.osdsLocationOtherValue.length === 0
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

            <Grid item xs={6} sm={4} md={3}>
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
                size="small"
              >
                <FormLabel component="legend">Right of Entry Issue</FormLabel>
                <Typography variant="caption" color="textSecondary">
                  Select all that apply
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
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
                  <FormControlLabel
                    control={
                      <Checkbox
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

                  {rightOfEntryIssue.other && (
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item style={{ paddingTop: "8px" }}>
                        Other:{"  "}
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
                          style={{ width: "65%" }}
                          helperText={
                            postData.rightOfEntryIssueOtherValue.length === 0
                              ? "Please provide a value."
                              : null
                          }
                          error={
                            postData.rightOfEntryIssueOtherValue.length === 0
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

            <Box display="flex" mt={1} mb={3} bgcolor="background.paper">
              {stream ? (
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={handleCapture}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              ) : (
                <>
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={handleStream}
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </label>
                  <span style={{ marginLeft: "8px", marginTop: "65px" }}>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*"
                      className={classes.input}
                      onChange={handleChangeImages}
                    />
                    <label htmlFor="file">
                      <Button
                        variant="contained"
                        color="primary"
                        aria-label="upload picture"
                        startIcon={<CloudUploadIcon />}
                        component="span"
                        size="small"
                      >
                        {images.length === 0 ? "Upload Images" : "Add Image"}
                      </Button>
                    </label>
                  </span>
                </>
              )}
            </Box>
            {images.map((image, index) => (
              <div key={index} style={{ padding: "15px" }}>
                <Badge
                  badgeContent={
                    <IconButton
                      aria-label="close"
                      size="small"
                      style={{ height: "100%" }}
                      onClick={() => deleteImages(index)}
                    >
                      <CloseIcon fontSize="default" color="action" />
                    </IconButton>
                  }
                  color="error"
                >
                  <img
                    src={
                      image.camera
                        ? image.camera
                        : image.url
                        ? image.url
                        : URL.createObjectURL(image)
                    }
                    alt="images"
                    style={{
                      maxHeight: "150px",
                      objectFit: "contain",
                      width: "auto",
                      overflowY: "auto",
                    }}
                  />
                </Badge>
              </div>
            ))}

            {stream && (
              <Dialog open={stream} keepMounted onClose={handleStopStream}>
                <IconButton
                  aria-label="close"
                  onClick={handleStopStream}
                  style={{ position: "absolute", right: "5px", top: "3px" }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent style={{ padding: "50px" }}>
                  <div className="stream">
                    <video
                      autoplay
                      muted
                      ref={videoRef}
                      style={{ width: "100%", height: "100%" }}
                    />

                    <canvas ref={refCanvas} style={{ display: "none" }} />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleStopStream} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleCapture} color="primary">
                    Capture
                  </Button>
                </DialogActions>
              </Dialog>
            )}
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
        </Grid>
      </form>
    </Container>
  );
};

export default EngineerForm;
