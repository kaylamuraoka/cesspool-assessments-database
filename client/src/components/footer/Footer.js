import React from "react";
import Box from "@material-ui/core/Box";

// Material UI Components
import Copyright from "./Copyright";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Box mt={5} xs={12} align="center">
        <Button color="primary" onClick={() => (document.body.scrollTop = 0)}>
          Back to top
        </Button>
        <Copyright />
      </Box>{" "}
    </footer>
  );
};

export default Footer;
