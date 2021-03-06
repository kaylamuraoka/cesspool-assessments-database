import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://fukunagaengineers.com/"
        target="_blank"
      >
        Fukunaga & Associates, Inc.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
