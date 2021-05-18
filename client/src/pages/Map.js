import React from "react";
import MapContainer from "../components/maps/MapContainer";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const Map = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MapContainer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Map;
