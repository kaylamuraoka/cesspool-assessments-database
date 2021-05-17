import React, { useState } from "react";

import HeaderSection from "./sections/HeaderSection";
import EngineerSection from "./sections/EngineerSection";
import HomeownerSection from "./sections/HomeownerSection";
import FooterSection from "./sections/FooterSection";

// Material UI Components
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import teal from "@material-ui/core/colors/teal";

const useStyles = makeStyles((theme) => ({
  // container: {
  //   margin: theme.spacing(0),
  //   // paddingTop: theme.spacing(2),
  //   // paddingBottom: theme.spacing(2),
  //   // backgroundColor: teal[100],
  // },
  paper: {
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    // padding: theme.spacing(2),
    // display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const OsdsForm = ({ postData, setPostData }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <HeaderSection postData={postData} setPostData={setPostData} />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <EngineerSection postData={postData} setPostData={setPostData} />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <Typography variant="subtitle1" gutterBottom align="center">
            Questions for Homeowner to Answer
          </Typography>

          <HomeownerSection postData={postData} setPostData={setPostData} />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <FooterSection postData={postData} setPostData={setPostData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OsdsForm;
