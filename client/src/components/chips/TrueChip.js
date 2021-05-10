import React from "react";

// MAterial UI Components
import DoneIcon from "@material-ui/icons/Done";
import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";

const TrueChip = ({ label }) => {
  return (
    <Chip
      size="small"
      label={label}
      icon={<DoneIcon />}
      style={{
        backgroundColor: green[100],
        marginRight: 7,
      }}
    />
  );
};

export default TrueChip;
