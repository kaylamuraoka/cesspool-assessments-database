import React from "react";

import Weather from "../../formInput/engineer/Weather";
import LotOccupied from "../../formInput/engineer/LotOccupied";
import OsdsFound from "../../formInput/engineer/OsdsFound";
import OsdsIs from "../../formInput/engineer/OsdsIs";
import InletPiping from "../../formInput/engineer/InletPiping";
import OutletPiping from "../../formInput/engineer/OutletPiping";
import DistanceToGrade from "../../formInput/engineer/DistanceToGrade";
import OsdsLocation from "../../formInput/engineer/OsdsLocation";
import RightOfEntry from "../../formInput/engineer/RightOfEntry";

const EngineerSection = ({
  postData,
  setPostData,
  classes,
  handleChangeInput,
}) => {
  return (
    <>
      <div className={classes.inputDiv}>
        <Weather
          postData={postData}
          setPostData={setPostData}
          classes={classes}
          handleChangeInput={handleChangeInput}
        />
      </div>
      <div className={classes.inputDiv}>
        <LotOccupied
          postData={postData}
          setPostData={setPostData}
          classes={classes}
          handleChangeInput={handleChangeInput}
        />
      </div>
      <div className={classes.inputDiv}>
        <OsdsFound
          postData={postData}
          setPostData={setPostData}
          classes={classes}
        />
      </div>
      <div className={classes.inputDiv}>
        <OsdsIs
          postData={postData}
          setPostData={setPostData}
          classes={classes}
        />
      </div>
      <div className={classes.inputDiv}>
        <InletPiping
          postData={postData}
          setPostData={setPostData}
          classes={classes}
        />
      </div>

      <div className={classes.inputDiv}>
        <OutletPiping
          postData={postData}
          setPostData={setPostData}
          classes={classes}
        />
      </div>
      <div className={classes.inputDiv}>
        <DistanceToGrade
          postData={postData}
          setPostData={setPostData}
          classes={classes}
        />
      </div>
      <div className={classes.inputDiv}>
        <OsdsLocation postData={postData} setPostData={setPostData} />
      </div>

      <div className={classes.inputDiv}>
        <RightOfEntry postData={postData} setPostData={setPostData} />
      </div>
    </>
  );
};

export default EngineerSection;
