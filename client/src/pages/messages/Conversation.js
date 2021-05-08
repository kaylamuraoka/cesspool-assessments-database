import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

// Material UI Components
import Grid from "@material-ui/core/Grid";

const Messages = () => {
  return (
    <div className="message">
      <Grid container>
        <Grid
          xs={12}
          sm={4}
          md={4}
          style={{ borderRight: "1px solid #E0DDDD" }}
        >
          <LeftSide />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <RightSide />
        </Grid>
      </Grid>
    </div>
  );
};

export default Messages;
