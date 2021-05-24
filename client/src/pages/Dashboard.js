import React from "react";

import { Box, Container, Grid } from "@material-ui/core";
import TasksProgress from "../components/dashboard/TasksProgress";
import MapContainer from "../components/maps/MapContainer";
import Stats from "../components/stats/Stats";

const Dashboard = () => {
  return (
    <Box>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>

          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Stats sx={{ height: "100%" }} />
          </Grid>

          <Grid item lg={8} md={12} xl={9} xs={12}>
            <MapContainer />
          </Grid>

          {/*
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
