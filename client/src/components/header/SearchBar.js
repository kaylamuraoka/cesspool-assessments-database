import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";
import Button from "@material-ui/core/Button";

// Material UI Components
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    position: "relative",
    display: "inline-block",
    direction: "ltr",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchBar: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    maxHeight: 37,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
  optionsDropdown: {
    position: "absolute",
    top: "100%",
    backgroundColor: "#fff",
    zIndex: "100",
    left: "0px",
    right: "auto",
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "auto",
    // },
  },
  loading: {},
}));

const SearchBar = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?name=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.mag },
      });
    }
  };

  useEffect(() => {
    if (search) {
      setLoad(true);
      getDataAPI(`search?name=${search}`, auth.token)
        .then((res) => {
          setUsers(res.data.users);
          setLoad(false);
        })
        .catch((err) => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
              error: err.response.data.msg,
            },
          });
        });
    } else {
      setUsers([]);
    }
  }, [search, auth.token, dispatch]);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <>
      <form className={classes.searchContainer} onSubmit={handleSearch}>
        <div className={classes.searchBar}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            endAdornment={
              <>
                <Button type="submit" style={{ display: "none" }}>
                  Search
                </Button>
                {load ? <CircularProgress color="inherit" size={20} /> : null}
                <IconButton
                  aria-label="close"
                  component="span"
                  onClick={handleClose}
                >
                  <CloseIcon
                    fontSize="small"
                    color="action"
                    style={{ opacity: "0.6" }}
                  />
                </IconButton>
              </>
            }
            value={search}
            id="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div
          className={classes.optionsDropdown}
          // style={{
          //   display: !users.length && "none",
          // }}
        >
          {search && (
            <List
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                width: "100%",
              }}
            >
              {load && (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <img
                    className={classes.loading}
                    src={LoadIcon}
                    alt="Loading..."
                    style={{ height: 70 }}
                  />
                </Grid>
              )}
              {!users.length && (
                <Typography
                  align="center"
                  variant="subtitle2"
                  color="textSecondary"
                  style={{ paddingTop: "13px" }}
                >
                  No matches found...
                </Typography>
              )}
              {users.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  href={`/profile/${user._id}`}
                />
              ))}
            </List>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchBar;
