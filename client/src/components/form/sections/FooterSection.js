import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const FooterSection = ({ postData, setPostData }) => {
  const handleChangeInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

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
        rows={3}
        placeholder="Additional Notes"
        variant="outlined"
        value={postData.additionalNotes}
        name="additionalNotes"
        onChange={handleChangeInput}
        size="small"
        fullWidth
        helperText={alert.additionalNotes ? alert.additionalNotes : null}
        error={alert.additionalNotes ? true : false}
      />
    </>
  );
};

export default FooterSection;
