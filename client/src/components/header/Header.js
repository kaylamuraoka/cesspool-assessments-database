import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";

// Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";

import ActiveAvatar from "../ActiveAvatar";
import SearchBar from "./SearchBar";
import NotifyModal from "../NotifyModal";
import DrawerMenu from "./DrawerMenu";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  avatarSize: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  menuDropdownIcon: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
}));

const Header = () => {
  const classes = useStyles();

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifyMenuOpen = (event) => {
    setNotifyAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        component="a"
        href={`/profile/${auth.user._id}`}
        underline="none"
        variant="inherit"
        color="textPrimary"
      >
        <MenuItem dense>
          <AccountCircleIcon
            fontSize="small"
            className={classes.menuDropdownIcon}
          />
          Profile
        </MenuItem>
      </Link>

      <Link
        component="a"
        underline="none"
        variant="inherit"
        color="textPrimary"
        onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}
      >
        <MenuItem dense>
          <Brightness4Icon
            fontSize="small"
            className={classes.menuDropdownIcon}
          />
          {theme ? "Light mode" : "Dark Mode"}
        </MenuItem>
      </Link>

      <Divider />
      <MenuItem dense onClick={() => dispatch(logout())}>
        <ExitToAppIcon fontSize="small" className={classes.menuDropdownIcon} />
        Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem dense onClick={() => (window.location.href = "/messages")}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={3} color="secondary">
            <ChatBubbleRoundedIcon />
          </Badge>
        </IconButton>
        Messages
      </MenuItem>

      <MenuItem dense onClick={handleNotifyMenuOpen}>
        <IconButton
          aria-label={`show ${notify.data.length} new notifications`}
          color="inherit"
        >
          <Badge
            badgeContent={notify.data.length}
            color={
              notify.data.length > 0 && notify.data.length < 5
                ? "secondary"
                : "error"
            }
          >
            {notify.sound ? <NotificationsIcon /> : <NotificationsOffIcon />}
          </Badge>
        </IconButton>
        Notifications
      </MenuItem>
      <MenuItem dense onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ActiveAvatar
            class={classes.avatarSize}
            alt={auth.user.name}
            src={auth.user.avatar}
          />
        </IconButton>
        Profile
      </MenuItem>
    </Menu>
  );

  const renderNotifyMenu = (
    <Menu
      anchorEl={notifyAnchorEl}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      open={Boolean(notifyAnchorEl)}
      onClose={() => {
        setNotifyAnchorEl(null);
        handleMobileMenuClose();
      }}
    >
      <NotifyModal />
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Dashboard
          </Typography>
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              href="/messages"
            >
              <Badge badgeContent={4} color="secondary">
                <ChatBubbleRoundedIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label={`show ${notify.data.length} new notifications`}
              color="inherit"
              aria-haspopup="true"
              onClick={handleNotifyMenuOpen}
            >
              <Badge
                badgeContent={notify.data.length}
                color={
                  notify.data.length > 0 && notify.data.length < 5
                    ? "secondary"
                    : "error"
                }
              >
                {notify.sound ? (
                  <NotificationsIcon />
                ) : (
                  <NotificationsOffIcon />
                )}
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ActiveAvatar
                class={classes.avatarSize}
                alt={auth.user.name}
                src={auth.user.avatar}
              />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotifyMenu}

      <DrawerMenu open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
    </div>
  );
};

export default Header;
