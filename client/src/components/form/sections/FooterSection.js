import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";

// Material UI Components
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const FooterSection = ({
  postData,
  setPostData,
  images,
  setImages,
  tracks,
  setTracks,
}) => {
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
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

  return (
    <>
      <Typography
        variant="body1"
        align="center"
        style={{
          marginBottom: 20,
        }}
      >
        PLEASE ATTACH A PHOTO OF THE TOP OF OSDS WITH COVER REMOVED. ALSO TAKE
        PHOTOS TO SHOW AN AREA VIEW OF THE OSDS, FRONT VIEW OF THE PROPERTY AND
        THE STREET ADDRESS VIEW
      </Typography>

      <Box display="flex" mt={1} mb={3} bgcolor="background.paper">
        {stream ? (
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
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
                style={{ display: "none" }}
                onChange={handleChangeImages}
              />
              <label htmlFor="file">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ImageIcon />}
                  component="span"
                  size="small"
                >
                  Upload Images
                </Button>
              </label>
            </span>
          </>
        )}
      </Box>
      {images &&
        images.map((image, index) => (
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

      <TextField
        label="Additional Notes"
        multiline
        rows={3}
        placeholder="Additional Notes"
        variant="outlined"
        value={postData.additionalNotes}
        name="additionalNotes"
        onChange={handleChangeInput}
        size="small"
        fullWidth
        helperText={alert.additionalNotes ? alert.additionalNotes : null}
        error={alert.additionalNotes ? true : false}
      />
    </>
  );
};

export default FooterSection;
