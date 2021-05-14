import React from "react";
import { useSelector } from "react-redux";

// Material UI Components
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

const DistanceToGrade = ({ postData, setPostData, classes }) => {
  const { alert } = useSelector((state) => state);

  return (
    <Box display="flex" flexDirection="row" p={1} bgcolor="grey.200">
      <Box bgcolor="grey.200">
        <FormControl className={classes.formControl} size="small">
          <span>
            If
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
              placeholder="Select ..."
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
              onChange={(e) =>
                setPostData({
                  ...postData,
                  liquidDistanceToFinishedGrade: e.target.value,
                })
              }
              value={postData.liquidDistanceToFinishedGrade}
              name="distance"
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
          </span>
        </FormControl>
      </Box>
    </Box>
  );
};

export default DistanceToGrade;
