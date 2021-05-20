import React from "react";

import HeaderSection from "./sections/HeaderSection";
import EngineerSection from "./sections/EngineerSection";
import HomeownerSection from "./sections/HomeownerSection";
import FooterSection from "./sections/FooterSection";

// Material UI Components
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const OsdsForm = ({ postData, setPostData }) => {
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
