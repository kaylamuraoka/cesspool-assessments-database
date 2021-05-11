import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";

const OsdsFound = ({ postData, setPostData, classes }) => {
  const { alert } = useSelector((state) => state);

  return (
    <>
      <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
        <Box bgcolor="grey.200">
          <FormLabel component="legend" style={{ marginTop: "10px" }}>
            OSDS Found?
            <FormHelperText>
              If yes, you will be asked more questions
            </FormHelperText>
          </FormLabel>
        </Box>
        <Box>
          <FormControl
            component="fieldset"
            className={classes.formControl}
            size="small"
            error={alert.osdsFound ? true : false}
          >
            <RadioGroup
              row
              name="osdsFound"
              value={postData.osdsFound}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  osdsFound: e.target.value,
                  accessPortProvided: "No",
                  numOfAccessPorts: "",
                  portSize: "",
                });
              }}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio size="small" color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio size="small" color="primary" />}
                label="No"
              />
            </RadioGroup>
            {alert.osdsFound && (
              <FormHelperText>{alert.osdsFound}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>

      {postData.osdsFound === "Yes" && (
        <Box
          display="flex"
          bgcolor="grey.200"
          style={{
            paddingTop: "0px",
            marginTop: "0px",
            paddingLeft: 40,
          }}
          p={1}
        >
          <Box bgcolor="grey.200">
            <FormLabel component="legend" style={{ marginTop: "10px" }}>
              Access Port Provided?
              <FormHelperText>
                If yes, you will be asked more questions
              </FormHelperText>
            </FormLabel>
          </Box>
          <Box bgcolor="grey.200" flexGrow={1} style={{ marginLeft: "5px" }}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              size="small"
              error={alert.accessPortProvided ? true : false}
            >
              <RadioGroup
                row
                name="accessPortProvided"
                value={postData.accessPortProvided}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    accessPortProvided: e.target.value,
                    numOfAccessPorts: "",
                    portSize: "",
                  });
                }}
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio size="small" color="primary" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio size="small" color="primary" />}
                  label="No"
                />
              </RadioGroup>
              {alert.accessPortProvided && (
                <FormHelperText>{alert.accessPortProvided}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      )}

      {postData.accessPortProvided === "Yes" && (
        <>
          <Box
            display="flex"
            bgcolor="grey.200"
            style={{
              paddingTop: "0px",
              marginTop: "0px",
              paddingLeft: 40,
            }}
            p={1}
          >
            <Box bgcolor="grey.200" style={{ marginTop: "9px" }}>
              <Typography variant="subtitle2" color="textSecondary">
                Number of Access Ports:
              </Typography>
            </Box>
            <Box bgcolor="grey.200" flexGrow={1} style={{ marginLeft: "5px" }}>
              <TextField
                variant="outlined"
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    numOfAccessPorts: e.target.value,
                  })
                }
                value={postData.numOfAccessPorts}
                name="numOfAccessPorts"
                size="small"
                style={{ width: 100 }}
                helperText={
                  alert.numOfAccessPorts ? alert.numOfAccessPorts : null
                }
                label="Count"
                error={alert.numOfAccessPorts ? true : false}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            bgcolor="grey.200"
            style={{
              paddingTop: "0px",
              marginTop: "0px",
              paddingLeft: 40,
            }}
            p={1}
          >
            <Box bgcolor="grey.200" style={{ marginTop: "9px" }}>
              <Typography variant="subtitle2" color="textSecondary">
                Port Size:
              </Typography>
            </Box>
            <Box bgcolor="grey.200" flexGrow={1} style={{ marginLeft: "5px" }}>
              <TextField
                variant="outlined"
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    portSize: e.target.value,
                  })
                }
                value={postData.portSize}
                name="portSize"
                size="small"
                style={{ width: 120 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">in</InputAdornment>
                  ),
                }}
                helperText={alert.portSize ? alert.portSize : null}
                label="Size"
                error={alert.portSize ? true : false}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default OsdsFound;
