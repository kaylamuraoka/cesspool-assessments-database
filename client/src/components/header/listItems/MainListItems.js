import React from "react";
import { useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import RoomIcon from "@material-ui/icons/Room";
import FiberNewIcon from "@material-ui/icons/FiberNew";

const MainListItems = () => {
  const { pathname } = useLocation();

  return (
    <List component="nav">
      <ListItem
        button
        component="a"
        href="/"
        selected={pathname === "/" ? true : false}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        component="a"
        href="/surveys"
        selected={pathname === "/surveys" ? true : false}
      >
        <ListItemIcon>
          <PermDataSettingIcon />
        </ListItemIcon>
        <ListItemText primary="Surveys" />
      </ListItem>
      <ListItem
        button
        component="a"
        href="/users"
        selected={pathname === "/users" ? true : false}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem
        button
        component="a"
        href="/reports"
        selected={pathname === "/reports" ? true : false}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>

      <ListItem
        button
        component="a"
        href="/map"
        selected={pathname === "/map" ? true : false}
      >
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary="Map" />
      </ListItem>

      <ListItem
        button
        component="a"
        href="/recent_activity"
        selected={pathname === "/recent_activity" ? true : false}
      >
        <ListItemIcon>
          <FiberNewIcon />
        </ListItemIcon>
        <ListItemText primary="Recent Activity" />
      </ListItem>
    </List>
  );
};

export default MainListItems;
