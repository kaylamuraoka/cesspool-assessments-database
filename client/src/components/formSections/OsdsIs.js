import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

const OsdsIs = ({ postData, classes, osdsIs, setOsdsIs, removeElement }) => {
  const { alert } = useSelector((state) => state);

  return (
    <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
      <Box bgcolor="grey.200">
        <FormControl error={alert.osdsIs ? true : false} style={{ width: 120 }}>
          <FormLabel component="legend" style={{ marginTop: "10px" }}>
            OSDS Is:
            <FormHelperText>Select all that apply</FormHelperText>
          </FormLabel>
        </FormControl>
      </Box>
      <Box
        bgcolor="grey.200"
        flexGrow={1}
        style={{ marginLeft: "20px", marginTop: 0, paddingTop: 0 }}
      >
        <FormControl
          size="small"
          component="fieldset"
          error={alert.osdsIs ? true : false}
        >
          <FormGroup row>
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsIs.dry}
                  onChange={(e) => {
                    setOsdsIs({
                      ...osdsIs,
                      dry: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.osdsIs.push("Dry");
                    } else {
                      removeElement(postData.osdsIs, "Dry");
                    }
                  }}
                  name="dry"
                />
              }
              label="Dry"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsIs.wet_water_scum}
                  onChange={(e) => {
                    setOsdsIs({
                      ...osdsIs,
                      wet_water_scum: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.osdsIs.push("Wet (water/scum)");
                    } else {
                      removeElement(postData.osdsIs, "Wet (water/scum)");
                    }
                  }}
                  name="wet_water_scum"
                />
              }
              label="Wet (water/scum)"
              style={{}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsIs.wet_sludge}
                  onChange={(e) => {
                    setOsdsIs({
                      ...osdsIs,
                      wet_sludge: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.osdsIs.push("Wet (sludge)");
                    } else {
                      removeElement(postData.osdsIs, "Wet (sludge)");
                    }
                  }}
                  name="wet_sludge"
                />
              }
              label="Wet (sludge)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsIs.odorous}
                  onChange={(e) => {
                    setOsdsIs({
                      ...osdsIs,
                      odorous: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.osdsIs.push("Odorous");
                    } else {
                      removeElement(postData.osdsIs, "Odorous");
                    }
                  }}
                  name="odorous"
                />
              }
              label="Odorous"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={osdsIs.unknown}
                  onChange={(e) => {
                    setOsdsIs({
                      ...osdsIs,
                      unknown: e.target.checked,
                    });
                    if (e.target.checked) {
                      postData.osdsIs.push("Unknown");
                    } else {
                      removeElement(postData.osdsIs, "Unknown");
                    }
                  }}
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
      </Box>
    </Box>
  );
};

export default OsdsIs;
