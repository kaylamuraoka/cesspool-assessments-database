import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 350,
    display: "block",
    objectFit: "cover",
    overflow: "hidden",
    width: "100%",
    cursor: "pointer",
  },
}));

const ImagesGrid = ({ images, id }) => {
  const classes = useStyles();

  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = React.useState(false);

  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getImageName = (publicId) => {
    return publicId.substring(publicId.lastIndexOf("/") + 1);
  };

  return (
    <div id={`image${id}`}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>
          Image: {getImageName(images[activeStep].public_id)}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((img, index) => (
          <div key={img.publicId}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={img.url}
                alt={getImageName(img.public_id)}
                onClick={handleClickOpen}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next{" "}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Paper square elevation={0} className={classes.header}>
            <Typography>
              Image: {getImageName(images[activeStep].public_id)}
            </Typography>
          </Paper>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: "absolute", right: "5px", top: "3px" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <img
            className={classes.img}
            src={images[activeStep].url}
            alt={images[activeStep].public_id}
          />
        </DialogContent>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next{" "}
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Dialog>
    </div>
  );
};

export default ImagesGrid;
