import React from "react";

import HeaderSection from "./sections/HeaderSection";
import EngineerSection from "./sections/EngineerSection";
import HomeownerSection from "./sections/HomeownerSection";

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
      <HomeownerSection />
    </>
  );
};

export default OsdsForm;
