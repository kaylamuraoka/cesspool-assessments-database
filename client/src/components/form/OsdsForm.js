import React from "react";

import HeaderSection from "./sections/HeaderSection";
import EngineerSection from "./sections/EngineerSection";
import HomeownerSection from "./sections/HomeownerSection";
import FooterSection from "./sections/FooterSection";

import Typography from "@material-ui/core/Typography";

const OsdsForm = ({ postData, setPostData, classes }) => {
  const handleChangeInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <HeaderSection
        postData={postData}
        setPostData={setPostData}
        classes={classes}
      />
      <EngineerSection
        postData={postData}
        setPostData={setPostData}
        classes={classes}
        handleChangeInput={handleChangeInput}
      />
      <Typography variant="subtitle1" gutterBottom align="center">
        Questions for Homeowner to Answer
      </Typography>
      <HomeownerSection
        postData={postData}
        setPostData={setPostData}
        classes={classes}
      />
      <FooterSection postData={postData} setPostData={setPostData} />
    </>
  );
};

export default OsdsForm;
