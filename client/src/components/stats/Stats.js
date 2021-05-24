import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import {
  ArgumentScale,
  Stack,
  Animation,
  EventTracker,
  HoverState,
  SelectionState,
} from "@devexpress/dx-react-chart";
import { scaleBand } from "@devexpress/dx-chart-core";
import { withStyles } from "@material-ui/core/styles";

import { olympicMedals } from "../../data/data";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);

const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

const Stats = () => {
  const [hover, setHover] = useState(null);
  const [selection, setSelection] = useState([
    {
      series: "USA",
      point: 3,
    },
  ]);

  const changeHover = (hover) => {
    setHover({ hover });
  };

  return (
    <Paper>
      <Chart data={olympicMedals}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
          name="Gold Medals"
          valueField="gold"
          argumentField="country"
          color="#ffd700"
        />
        <BarSeries
          name="Silver Medals"
          valueField="silver"
          argumentField="country"
          color="#c0c0c0"
        />
        <BarSeries
          name="Bronze Medals"
          valueField="bronze"
          argumentField="country"
          color="#cd7f32"
        />
        <Animation />
        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        <HoverState hover={hover} setHover={changeHover} />
        <SelectionState selection={selection} />
        <Title text="Olympic Medals in 2008" />
        <Stack />
      </Chart>
    </Paper>
  );
};

export default Stats;
