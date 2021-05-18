import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
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
  );
};

export default SecondaryListItems;
