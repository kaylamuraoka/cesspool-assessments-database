import React from "react";
import LeftSide from "../../components/message/LeftSide";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
        <Grid item xs={false} sm={8} md={8}>
          <div className="messenger_icon_div">
            <i
              className="fab fa-facebook-messenger"
              style={{ fontSize: "4rem", color: "#4285F4" }}
            ></i>
            <Typography
              variant="subtitle1"
              align="center"
              style={{ fontWeight: 500 }}
            >
              Messenger
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Messages;
