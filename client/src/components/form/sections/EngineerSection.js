import React from "react";
import { useSelector } from "react-redux";

import StyledCheckbox from "../../inputs/StyledCheckbox";
import StyledRadio from "../../inputs/StyledRadio";
// import { weatherOptions, lotOccupiedOptions } from "../../../utils/formData";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormGroup from "@material-ui/core/FormGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export const weatherOptions = ["Sunny", "Clear", "Cloudy", "Shower"];

export const lotOccupiedOptions = ["Yes", "Vacant", "No House"];

const EngineerSection = ({ postData, setPostData }) => {
  const { alert } = useSelector((state) => state);

  const handleChangeInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  function handleOsdsIsChange(e) {
    setPostData({
      ...postData,
      osdsIs: { ...postData.osdsIs, [e.target.name]: e.target.checked },
    });
  }

  return (
    <Grid container spacing={2}>
      {/* Weather Section */}
      <Grid item xs={12}>
        <FormControl required fullWidth error={alert.weather ? true : false}>
          <FormLabel component="legend">
            Weather:{" "}
            <FormHelperText component="span">(Select one)</FormHelperText>
          </FormLabel>
          <RadioGroup
            row
            name="weather"
            value={postData.weather}
            onChange={(e) => {
              setPostData({
                ...postData,
                weather: e.target.value,
                weatherOtherValue: "",
              });
            }}
          >
            {weatherOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<StyledRadio />}
                color="primary"
                label={option}
              />
            ))}
            <Box display="flex">
              <FormControlLabel
                value="Other"
                control={<StyledRadio />}
                label="Other"
              />
              <TextField
                required
                onChange={handleChangeInput}
                value={postData.weatherOtherValue}
                name="weatherOtherValue"
                size="small"
                error={
                  postData.weather === "Other" &&
                  postData.weatherOtherValue.length === 0
                    ? true
                    : false
                }
                disabled={postData.weather === "Other" ? false : true}
              />
            </Box>
          </RadioGroup>
          {alert.weather && <FormHelperText>{alert.weather}</FormHelperText>}
        </FormControl>
      </Grid>
      {/* Lot Occupied Section */}
      <Grid item xs={12}>
        <FormControl
          required
          fullWidth
          error={alert.LotOccupied ? true : false}
        >
          <FormLabel component="legend">
            Lot Occupied?{" "}
            <FormHelperText component="span">(Select one)</FormHelperText>
          </FormLabel>

          <RadioGroup
            row
            name="lotOccupied"
            value={postData.lotOccupied}
            onChange={(e) => {
              setPostData({
                ...postData,
                lotOccupied: e.target.value,
                lotOccupiedOtherValue: "",
              });
            }}
          >
            {lotOccupiedOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<StyledRadio />}
                color="primary"
                label={option}
              />
            ))}
            <Box display="flex">
              <FormControlLabel
                value="Other"
                control={<StyledRadio />}
                label="Other"
              />
              <TextField
                required
                onChange={handleChangeInput}
                value={postData.lotOccupiedOtherValue}
                name="lotOccupiedOtherValue"
                size="small"
                style={{ maxWidth: 150 }}
                error={
                  postData.lotOccupied === "Other" &&
                  postData.lotOccupiedOtherValue.length === 0
                    ? true
                    : false
                }
                disabled={postData.lotOccupied === "Other" ? false : true}
              />
            </Box>
          </RadioGroup>
          {alert.lotOccupied && (
            <FormHelperText>{alert.lotOccupied}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {/* Osds Found Section */}
      <Grid item xs={12}>
        <FormControl
          required
          fullWidth
          error={alert.LotOccupied ? true : false}
        >
          <FormLabel component="legend">
            OSDS Found?{" "}
            <FormHelperText component="span">
              (If found, you will be asked more questions)
            </FormHelperText>
          </FormLabel>
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
              control={<StyledRadio />}
              label="Yes"
            />
            <FormControlLabel value="No" control={<StyledRadio />} label="No" />
          </RadioGroup>
          {alert.osdsFound && (
            <FormHelperText>{alert.osdsFound}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {/* Access Port Provided Section */}
      {postData.osdsFound === "Yes" && (
        <Grid item xs={12}>
          <FormControl
            disabled={postData.osdsFound === "Yes" ? false : true}
            required
            fullWidth
            error={alert.accessPortProvided ? true : false}
          >
            <FormLabel component="legend">
              Access Port Provided?{" "}
              <FormHelperText component="span">
                (If found, you will be asked more questions)
              </FormHelperText>
            </FormLabel>
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
                control={<StyledRadio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<StyledRadio />}
                label="No"
              />
            </RadioGroup>
            {alert.accessPortProvided && (
              <FormHelperText>{alert.accessPortProvided}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      )}
      {postData.accessPortProvided === "Yes" && (
        <>
          <Grid item xs={6}>
            <TextField
              disabled={postData.accessPortProvided === "Yes" ? false : true}
              fullWidth
              value={postData.numOfAccessPorts}
              name="numOfAccessPorts"
              onChange={handleChangeInput}
              size="small"
              helperText={
                alert.numOfAccessPorts ? alert.numOfAccessPorts : null
              }
              label="Number of Access Ports"
              error={alert.numOfAccessPorts ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={postData.accessPortProvided === "Yes" ? false : true}
              fullWidth
              value={postData.portSize}
              name="portSize"
              onChange={handleChangeInput}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">in</InputAdornment>
                ),
              }}
              helperText={alert.portSize ? alert.portSize : null}
              label="Port Size"
              error={alert.portSize ? true : false}
            />
          </Grid>
        </>
      )}

      {/* OSDS Is Section */}
      <Grid item xs={12}>
        <FormControl error={alert.osdsIs ? true : false} required fullWidth>
          <FormLabel component="legend">
            OSDS Is:{" "}
            <FormHelperText component="span">
              (Select all that apply)
            </FormHelperText>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.osdsIs.dry}
                  onChange={handleOsdsIsChange}
                  name="dry"
                />
              }
              label="Dry"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.osdsIs.wet_water_scum}
                  onChange={handleOsdsIsChange}
                  name="wet_water_scum"
                />
              }
              label="Wet (water/scum)"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.osdsIs.wet_sludge}
                  onChange={handleOsdsIsChange}
                  name="wet_sludge"
                />
              }
              label="Wet (sludge)"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.osdsIs.odorous}
                  onChange={handleOsdsIsChange}
                  name="odorous"
                />
              }
              label="Odorous"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.osdsIs.unknown}
                  onChange={handleOsdsIsChange}
                  name="unknown"
                />
              }
              label="Unknown"
            />
          </FormGroup>
          {alert.osdsIs && (
            <FormHelperText style={{ marginLeft: 0, marginTop: 0 }}>
              {alert.osdsIs}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/* Inlet Piping */}
      <Grid item xs={12}>
        <FormControl
          required
          fullWidth
          component="fieldset"
          error={alert.inletPipingFound ? true : false}
        >
          <FormLabel component="legend">
            Inlet Piping Found?{" "}
            <FormHelperText component="span">
              (If found, you will be asked more questions)
            </FormHelperText>
          </FormLabel>

          <RadioGroup
            row
            name="inletPipingFound"
            value={postData.inletPipingFound}
            onChange={(e) => {
              setPostData({
                ...postData,
                inletPipingFound: e.target.value,
                inletPipingDistance: "",
              });
            }}
          >
            <FormControlLabel
              value="Yes"
              control={<StyledRadio />}
              label="Yes"
            />
            <FormControlLabel value="No" control={<StyledRadio />} label="No" />
          </RadioGroup>
          {alert.inletPipingFound && (
            <FormHelperText>{alert.inletPipingFound}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {postData.inletPipingFound === "Yes" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={postData.inletPipingDistance}
            name="inletPipingDistance"
            onChange={handleChangeInput}
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            helperText={
              alert.inletPipingDistance ? alert.inletPipingDistance : null
            }
            label="Distance to finished ground"
            error={alert.inletPipingDistance ? true : false}
          />
        </Grid>
      )}

      {/* Outlet Piping */}
      <Grid item xs={12}>
        <FormControl
          required
          fullWidth
          component="fieldset"
          error={alert.outletPipingFound ? true : false}
        >
          <FormLabel component="legend">
            Outlet Piping Found?{" "}
            <FormHelperText component="span">
              (If found, you will be asked more questions)
            </FormHelperText>
          </FormLabel>
          <RadioGroup
            row
            name="outletPipingFound"
            value={postData.outletPipingFound}
            onChange={(e) => {
              setPostData({
                ...postData,
                outletPipingFound: e.target.value,
                outletPipingDistance: "",
              });
            }}
          >
            <FormControlLabel
              value="Yes"
              control={<StyledRadio />}
              label="Yes"
            />
            <FormControlLabel value="No" control={<StyledRadio />} label="No" />
          </RadioGroup>
          {alert.outletPipingFound && (
            <FormHelperText>{alert.outletPipingFound}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      {postData.outletPipingFound === "Yes" && (
        <Grid item xs={12}>
          <TextField
            value={postData.outletPipingDistance}
            name="outletPipingDistance"
            onChange={handleChangeInput}
            size="small"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            label="Distance to finished ground"
            helperText={
              alert.outletPipingDistance ? alert.outletPipingDistance : null
            }
            error={alert.outletPipingDistance ? true : false}
          />
        </Grid>
      )}

      {/* Distance to Grade */}
      <Grid item xs={12}>
        <FormControl
          fullWidth
          error={
            alert.liquid || alert.liquidDistanceToFinishedGrade ? true : false
          }
        >
          <FormLabel component="legend">
            If{" "}
            <FormHelperText component="span">
              <Select
                value={postData.liquid}
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    liquid: e.target.value,
                    liquidDistanceToFinishedGrade: "",
                  });
                }}
                name="liquid"
                style={{
                  minWidth: 80,
                  maxWidth: 115,
                  marginLeft: "6px",
                  marginRight: "6px",
                }}
              >
                <MenuItem value="water/scum" dense>
                  water/scum
                </MenuItem>
                <MenuItem value="sludge" dense>
                  sludge
                </MenuItem>
              </Select>
              found in OSDS, its distance to finished grade:{" "}
              <TextField
                value={postData.liquidDistanceToFinishedGrade}
                name="liquidDistanceToFinishedGrade"
                onChange={handleChangeInput}
                type="number"
                style={{ minWidth: 50, maxWidth: 70 }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ft</InputAdornment>
                  ),
                }}
                helperText={
                  alert.liquidDistanceToFinishedGrade
                    ? alert.liquidDistanceToFinishedGrade
                    : null
                }
                error={alert.liquidDistanceToFinishedGrade ? true : false}
              />
            </FormHelperText>
          </FormLabel>
        </FormControl>
      </Grid>

      {/* OSDS Location */}
      <Grid item xs={12}>
        <FormControl
          error={alert.osdsLocation ? true : false}
          required
          fullWidth
        >
          <FormLabel component="legend">
            OSDS Location:{" "}
            <FormHelperText component="span">
              (Select all that apply)
            </FormHelperText>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.osdsLocation.frontyard}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsLocation: {
                        ...postData.osdsLocation,
                        frontyard: e.target.checked,
                      },
                    }));
                  }}
                  name="frontyard"
                />
              }
              label="Frontyard"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.osdsLocation.backyard}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsLocation: {
                        ...postData.osdsLocation,
                        backyard: e.target.checked,
                      },
                    }));
                  }}
                  name="backyard"
                />
              }
              label="Backyard"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.osdsLocation.nextToBldg}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      osdsLocation: {
                        ...postData.osdsLocation,
                        nextToBldg: e.target.checked,
                      },
                    }));
                  }}
                  name="nextToBldg"
                />
              }
              label="Next to Bldg"
            />
            <Box display="flex">
              <FormControlLabel
                control={
                  <StyledCheckbox
                    checked={postData.osdsLocation.other}
                    onChange={(e) => {
                      setPostData((postData) => ({
                        ...postData,
                        osdsLocation: {
                          ...postData.osdsLocation,
                          other: e.target.checked,
                          otherValue: "",
                        },
                      }));
                    }}
                    name="other"
                  />
                }
                label="Other"
              />
              <TextField
                onChange={(e) => {
                  setPostData((postData) => ({
                    ...postData,
                    osdsLocation: {
                      ...postData.osdsLocation,
                      otherValue: e.target.value,
                    },
                  }));
                }}
                value={postData.osdsLocation.otherValue}
                name="otherValue"
                size="small"
                style={{
                  maxWidth: 150,
                }}
                error={
                  postData.osdsLocation.other &&
                  postData.osdsLocation.otherValue.length === 0
                    ? true
                    : false
                }
                disabled={postData.osdsLocation.other ? false : true}
              />
            </Box>
          </FormGroup>
          {alert.osdsLocation && (
            <FormHelperText>{alert.osdsLocation}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/* Right of Entry Issue */}
      <Grid item xs={12}>
        <FormControl
          component="fieldset"
          error={alert.rightOfEntryIssue ? true : false}
          required
          fullWidth
        >
          <FormLabel component="legend">
            Right of Entry Issue:{" "}
            <FormHelperText component="span">
              (Select all that apply)
            </FormHelperText>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.rightOfEntryIssue.none}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
                        none: e.target.checked,
                      },
                    }));
                  }}
                  name="none"
                />
              }
              label="None"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.rightOfEntryIssue.fenced}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
                        fenced: e.target.checked,
                      },
                    }));
                  }}
                  name="fenced"
                />
              }
              label="Fenced"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.rightOfEntryIssue.gated}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
                        gated: e.target.checked,
                      },
                    }));
                  }}
                  name="gated"
                />
              }
              label="Gated"
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={postData.rightOfEntryIssue.dogs}
                  onChange={(e) => {
                    setPostData((postData) => ({
                      ...postData,
                      rightOfEntryIssue: {
                        ...postData.rightOfEntryIssue,
                        dogs: e.target.checked,
                      },
                    }));
                  }}
                  name="dogs"
                />
              }
              label="Dogs"
            />
            <Box display="flex">
              <FormControlLabel
                control={
                  <StyledCheckbox
                    checked={postData.rightOfEntryIssue.other}
                    onChange={(e) => {
                      setPostData((postData) => ({
                        ...postData,
                        rightOfEntryIssue: {
                          ...postData.rightOfEntryIssue,
                          other: e.target.checked,
                          otherValue: "",
                        },
                      }));
                    }}
                    name="other"
                  />
                }
                label="Other"
              />
              <TextField
                required
                onChange={(e) =>
                  setPostData((postData) => ({
                    ...postData,
                    rightOfEntryIssue: {
                      ...postData.rightOfEntryIssue,
                      otherValue: e.target.value,
                    },
                  }))
                }
                value={postData.rightOfEntryIssue.otherValue}
                name="otherValue"
                size="small"
                style={{
                  maxWidth: 150,
                }}
                error={
                  postData.rightOfEntryIssue.other &&
                  postData.rightOfEntryIssue.otherValue.length === 0
                    ? true
                    : false
                }
                disabled={postData.rightOfEntryIssue.other ? false : true}
              />
            </Box>
          </FormGroup>
          {alert.rightOfEntryIssue && (
            <FormHelperText style={{ marginLeft: 0, marginTop: 0 }}>
              {alert.rightOfEntryIssue}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default EngineerSection;
