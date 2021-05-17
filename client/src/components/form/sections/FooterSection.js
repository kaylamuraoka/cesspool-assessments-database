import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const FooterSection = ({ postData, setPostData }) => {
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

      <TextField
        label="Additional Notes"
        multiline
        rows={4}
        placeholder="Additional Notes"
        variant="outlined"
        onChange={(e) =>
          setPostData({
            ...postData,
            additionalNotes: e.target.value,
          })
        }
        value={postData.additionalNotes}
        name="additionalNotes"
        size="small"
        fullWidth
        helperText={alert.additionalNotes ? alert.additionalNotes : null}
        error={alert.additionalNotes ? true : false}
      />
    </>
  );
};

export default FooterSection;
