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

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SecondaryListItems = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(true);

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" inset>
          Saved Reports
        </ListSubheader>
      }
    >
      <ListItem button component="a" onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Saved Reports" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
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
  );
};

export default SecondaryListItems;
