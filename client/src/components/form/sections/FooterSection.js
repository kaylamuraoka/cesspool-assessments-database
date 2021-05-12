import React from "react";

import TextField from "@material-ui/core/TextField";

const FooterSection = ({ postData, setPostData }) => {
  return (
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
  );
};

export default FooterSection;
