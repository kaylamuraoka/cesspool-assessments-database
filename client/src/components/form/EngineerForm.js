import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createPost, updatePost } from "../../redux/actions/postAction";
import OsdsForm from "./OsdsForm";
import moment from "moment";

import HeaderSection from "./sections/HeaderSection";
import EngineerSection from "./sections/EngineerSection";
import HomeownerSection from "./sections/HomeownerSection";
import FooterSection from "./sections/FooterSection";

// Material UI Components
import Dialog from "@material-ui/core/Dialog";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import blueGrey from "@material-ui/core/colors/blueGrey";
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
import Paper from "@material-ui/core/Paper";

// Material UI Icons
import SaveIcon from "@material-ui/icons/Save";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const steps = [
  "General Information",
  "OSDS Information",
  "Homeowner Questions",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <HeaderSection />;
    case 1:
      return <EngineerSection />;
    case 2:
      return <HomeownerSection />;
    default:
      throw new Error("Unknown step");
  }
}

const EngineerForm = () => {
  const classes = useStyles();
  const { auth, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const currDateTime = moment().utcOffset("-10:00").format("YYYY-MM-DDThh:mm");

  const initialState = {
    dateTime: currDateTime,
    recordNum: "",
    TMK: "",
    location: "",
    propertyOwner: "",
    contactInfo: "",
    projectAddress: "",
    city: "",
    engineer: "",
    contractor: "",
    weather: "",
    weatherOtherValue: "",
    lotOccupied: "",
    lotOccupiedOtherValue: "",
    osdsFound: "No",
    accessPortProvided: "No",
    numOfAccessPorts: "",
    portSize: "",
    osdsIs: {
      dry: false,
      wet_water_scum: false,
      wet_sludge: false,
      odorous: false,
      unknown: false,
    },
    inletPipingFound: "No",
    inletPipingDistance: "",
    outletPipingFound: "No",
    outletPipingDistance: "",
    liquid: "",
    liquidDistanceToFinishedGrade: "",
    osdsLocation: {
      frontyard: false,
      backyard: false,
      nextToBldg: false,
      other: false,
      otherValue: "",
    },
    rightOfEntryIssue: {
      none: false,
      fenced: false,
      gated: false,
      dogs: false,
      other: false,
      otherValue: "",
    },
    propertyLocation: "",
    osdsInService: "",
    numOfBedrooms: "",
    numOfOsdsUnits: "",
    totalVolume: "",
    solidPumpInterval: "",
    solidPumpIntervalOtherValue: "",
    overflowPipeToSewer: "",
    osdsType: "",
    osdsTypeOtherValue: "",
    bestDayTimeForVisit: currDateTime,
    contactName: "",
    contactPhone: "",
    email: "",
    mailingAddress: "",
    additionalNotes: "",
  };

  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

  const [postData, setPostData] = useState(initialState);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
      dispatch(createPost({ postData, images, auth, socket }));
    }

    setPostData(initialState);
    setImages([]);

    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
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
      setPostData({
        ...status,
      });
      setImages(status.images);
    }
  }, [status]);

  return (
    <>
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
                Please fill out the following form in as much detail as
                possible:
              </Typography>
            </Grid>

            <Grid container spacing={2}>
              <OsdsForm postData={postData} setPostData={setPostData} />

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
    </>
  );
};

export default EngineerForm;
