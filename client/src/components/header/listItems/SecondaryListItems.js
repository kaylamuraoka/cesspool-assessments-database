import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListSubheader from "@material-ui/core/ListSubheader";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SecondaryListItems = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const [openReports, setOpenReports] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(true);

  return (
    <>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" inset>
            Survey Data
          </ListSubheader>
        }
      >
        <ListItem
          button
          component="a"
          onClick={() => setOpenReports(!openReports)}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Saved Reports" />
          {openReports ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component="a"
              href="/report1"
              selected={pathname === "/report1" ? true : false}
              className={classes.nested}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current month" />
            </ListItem>
            <ListItem
              button
              component="a"
              href="/report2"
              selected={pathname === "/report2" ? true : false}
              className={classes.nested}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Last quarter" />
            </ListItem>
            <ListItem
              button
              component="a"
              href="/report3"
              selected={pathname === "/report3" ? true : false}
              className={classes.nested}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Year-end sale" />
            </ListItem>
          </List>
        </Collapse>
      </List>

      <List component="nav">
        <ListItem
          button
          component="a"
          onClick={() => setOpenCalendar(!openCalendar)}
        >
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
          {openCalendar ? (
            <ExpandLess fontSize="small" />
          ) : (
            <ExpandMore fontSize="small" />
          )}
        </ListItem>

        <Collapse in={openCalendar} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component="a"
              href="/appointments"
              selected={pathname === "/appointments" ? true : false}
              className={classes.nested}
            >
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default SecondaryListItems;
