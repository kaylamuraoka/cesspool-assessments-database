import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

// Material UI Components
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import TextField from "@material-ui/core/TextField";
import HomeIcon from "@material-ui/icons/Home";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    border: "2px solid #ddd",
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  input: {
    display: "none",
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const EditProfile = ({ onEdit, setOnEdit }) => {
  const classes = useStyles();

  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const [userData, setUserData] = useState(initialState);

  const { name, email, phone, address } = userData;

  const [avatar, setAvatar] = useState("");

  const { auth, theme, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const handleChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);

    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  return (
    <Dialog
      open={onEdit}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOnEdit(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        id="form-dialog-title"
        style={{ paddingBottom: "0", paddingTop: "30px", textAlign: "center" }}
      >
        Edit Profile
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOnEdit(false)}
        style={{ position: "absolute", right: "5px", top: "3px" }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent style={{ paddingTop: "0" }} dividers>
        <DialogContentText
          style={{ textAlign: "center", fontWeight: "500", opacity: "0.8" }}
        >
          Add information about yourself to share on your profile
        </DialogContentText>
        <form>
          <Box display="flex" mb={3} bgcolor="background.paper">
            <Avatar
              alt="avatar"
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              className={classes.largeAvatar}
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
            <span style={{ marginLeft: "8px", marginTop: "65px" }}>
              <input
                accept="image/*"
                className={classes.input}
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
              <label htmlFor="file_up">
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="upload picture"
                  startIcon={<PhotoCamera />}
                  component="span"
                  size="small"
                >
                  Upload Avatar
                </Button>
              </label>
            </span>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChangeInput}
                autoComplete="name"
                helperText={alert.name ? alert.name : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                error={alert.name ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                autoComplete="email"
                name="email"
                variant="outlined"
                placeholder="Email address"
                value={email}
                onChange={handleChangeInput}
                helperText={alert.email ? alert.email : null}
                fullWidth
                id="email"
                label="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                error={
                  alert.email ||
                  alert.error ===
                    "An account with this email address already exists. Please sign in."
                    ? true
                    : false
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                variant="outlined"
                id="phone"
                fullWidth
                label="Phone Number"
                placeholder="Phone number"
                value={phone}
                onChange={handleChangeInput}
                helperText={alert.phone ? alert.phone : null}
                name="phone"
                autoComplete="phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <PhoneIcon />
                      +1
                    </InputAdornment>
                  ),
                }}
                error={
                  alert.phone ||
                  alert.error ===
                    "An account with this phone number already exists. Please sign in." ||
                  alert.error === "Please enter a valid phone number."
                    ? true
                    : false
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                id="address"
                fullWidth
                label="Address"
                placeholder="Address"
                value={address}
                onChange={handleChangeInput}
                helperText={alert.address ? alert.address : null}
                name="address"
                autoComplete="address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.icon}>
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
                error={alert.address ? true : false}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOnEdit(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
