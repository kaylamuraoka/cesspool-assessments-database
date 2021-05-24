import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/actions/postAction";
import { postDataInitialState } from "../utils/formData";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

// Components
import HeaderSection from "../components/form/sections/HeaderSection";
import EngineerSection from "../components/form/sections/EngineerSection";
import HomeownerSection from "../components/form/sections/HomeownerSection";
import OsdsForm from "../components/form/OsdsForm";
import FooterSection from "../components/form/sections/FooterSection";

const useStyles = makeStyles((theme) => ({
  layout: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const steps = [
  "General Information",
  "OSDS Information",
  "Homeowner Questions",
  "Add Photos & Notes",
  "Review",
];

const currDateTime = moment().utcOffset("-10:00").format("YYYY-MM-DDThh:mm");

const Surveys = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { auth, socket, alert } = useSelector((state) => state);

  const [activeStep, setActiveStep] = useState(0);
  const [postData, setPostData] = useState(postDataInitialState);
  const [images, setImages] = useState([]);
  const [tracks, setTracks] = useState("");

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <HeaderSection postData={postData} setPostData={setPostData} />;
      case 1:
        return (
          <EngineerSection postData={postData} setPostData={setPostData} />
        );
      case 2:
        return (
          <HomeownerSection postData={postData} setPostData={setPostData} />
        );
      case 3:
        return (
          <FooterSection
            postData={postData}
            setPostData={setPostData}
            images={images}
            setImages={setImages}
            tracks={tracks}
            setTracks={setTracks}
          />
        );
      case 4:
        return <OsdsForm postData={postData} setPostData={setPostData} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ postData, images, auth, socket }));

    // setPostData(postDataInitialState);
    // setImages([]);

    if (tracks) tracks.stop();
  };

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Existing On-Site Sewer Disposal System (OSDS) Field Survey
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length &&
            alert.success === "Added New Field Survey!" ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
};

export default Surveys;
