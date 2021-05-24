import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createPost, updatePost } from "../../redux/actions/postAction";
import OsdsForm from "./../form/OsdsForm";

// Material UI Components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import MuiGrid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

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

const Popup = ({ row, onChange, onApplyChanges, onCancelChanges, open }) => {
  const { auth, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [postData, setPostData] = useState(initialState);
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

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
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your photo." },
      });

    if (status.onEdit) {
      dispatch(updatePost({ postData, images, auth, status }));
    } else {
      dispatch(createPost({ postData, images, auth, socket }));
      setPostData(initialState);
      setImages([]);
    }

    // setPostData(initialState);
    // setImages([]);

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
    <Dialog
      // open={open}
      open={status}
      keepMounted
      // onClose={onCancelChanges}
      onClose={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
      <DialogContent>
        <MuiGrid container spacing={3}>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                margin="normal"
                name="firstName"
                label="First Name"
                value={row.firstName || ""}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                name="prefix"
                label="Title"
                value={row.prefix || ""}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                name="position"
                label="Position"
                value={row.position || ""}
                onChange={onChange}
              />
            </FormGroup>
          </MuiGrid>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                margin="normal"
                name="lastName"
                label="Last Name"
                value={row.lastName || ""}
                onChange={onChange}
              />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  label="Birth Date"
                  margin="normal"
                  value={row.birthDate}
                  onChange={(_, value) =>
                    onChange({
                      target: { name: "birthDate", value },
                    })
                  }
                  format="DD/MM/YYYY"
                />
              </MuiPickersUtilsProvider>
              <TextField
                margin="normal"
                name="phone"
                label="Phone"
                value={row.phone || ""}
                onChange={onChange}
              />
            </FormGroup>
          </MuiGrid>
        </MuiGrid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color="primary">
          Cancel
        </Button>
        <Button onClick={onApplyChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
