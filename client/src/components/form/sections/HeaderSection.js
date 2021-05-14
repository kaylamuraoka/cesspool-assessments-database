import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    width: "100%",
  },
}));

const HeaderSection = ({ postData, setPostData }) => {
  const classes = useStyles();
  const { alert } = useSelector((state) => state);

  return (
    <div className={classes.container}>
      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <TextField
            id="datetime-local"
            label="Date/Time"
            type="datetime-local"
            value={postData.dateTime}
            onChange={(e) => {
              setPostData({ ...postData, dateTime: e.target.value });
            }}
            name="dateTime"
            style={{ width: 228 }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={alert.dateTime ? alert.dateTime : null}
            error={alert.dateTime ? true : false}
          />
        </Box>
        <Box>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">Record No: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    recordNum: e.target.value,
                  })
                }
                value={postData.recordNum}
                name="recordNum"
                style={{ maxWidth: 140 }}
                size="small"
                label="Record No"
                helperText={alert.recordNum ? alert.recordNum : null}
                error={alert.recordNum ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">TMK: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    TMK: e.target.value,
                  })
                }
                value={postData.TMK}
                name="TMK"
                style={{ maxWidth: 140 }}
                size="small"
                label="TMK"
                helperText={alert.TMK ? alert.TMK : null}
                error={alert.TMK ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">Location: </Typography>
            </Grid>
            <Grid item>
              <Select
                placeholder="Select"
                helperText={alert.location ? alert.location : null}
                error={alert.location ? true : false}
                value={postData.location}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    location: e.target.value,
                  });
                }}
                name="location"
                style={{
                  minWidth: 80,
                  marginLeft: "8px",
                  marginRight: "8px",
                }}
              >
                <MenuItem value="Waianae" dense>
                  Waianae
                </MenuItem>
                <MenuItem value="Nanakuli" dense>
                  Nanakuli
                </MenuItem>
                <MenuItem value="Waimanalo" dense>
                  Waimanalo
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">Property Owner: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    propertyOwner: e.target.value,
                  })
                }
                value={postData.propertyOwner}
                name="propertyOwner"
                style={{ maxWidth: 190 }}
                size="small"
                label="Property Owner"
                helperText={alert.propertyOwner ? alert.propertyOwner : null}
                error={alert.propertyOwner ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">Contact Info: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    contactInfo: e.target.value,
                  })
                }
                value={postData.contactInfo}
                name="contactInfo"
                style={{ maxWidth: 140 }}
                size="small"
                label="Contact Info"
                helperText={alert.contactInfo ? alert.contactInfo : null}
                error={alert.contactInfo ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">Project Address: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    projectAddress: e.target.value,
                  })
                }
                value={postData.projectAddress}
                name="projectAddress"
                style={{ width: 300 }}
                size="small"
                label="Project Address"
                helperText={alert.projectAddress ? alert.projectAddress : null}
                error={alert.projectAddress ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">City: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    city: e.target.value,
                  })
                }
                value={postData.city}
                name="city"
                style={{ maxWidth: 100 }}
                size="small"
                label="City"
                helperText={alert.city ? alert.city : null}
                error={alert.city ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">Engineer: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    engineer: e.target.value,
                  })
                }
                value={postData.engineer}
                name="engineer"
                style={{ width: 300 }}
                size="small"
                label="Engineer"
                helperText={alert.engineer ? alert.engineer : null}
                error={alert.engineer ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Typography variant="subtitle1">Contractor: </Typography>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    contractor: e.target.value,
                  })
                }
                value={postData.contractor}
                name="contractor"
                style={{ maxWidth: 200 }}
                size="small"
                label="Contractor"
                helperText={alert.contractor ? alert.contractor : null}
                error={alert.contractor ? true : false}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default HeaderSection;
