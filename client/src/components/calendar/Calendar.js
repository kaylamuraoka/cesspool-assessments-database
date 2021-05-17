import React, { useState } from "react";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";

import {
  Scheduler,
  DayView,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  // ConfirmationDialog,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";

import { connectProps } from "@devexpress/dx-react-core";
// import { KeyboardDateTimePicker } from "@material-ui-pickers";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const currDateTime = moment().utcOffset("-10:00").format("YYYY-MM-DDThh:mm A");

const currentDate = moment().utcOffset("-10:00").format("YYYY-MM-DD");

const calanderEvents = [
  {
    startDate: `${currentDate}T09:45`,
    endDate: `${currentDate}T11:00`,
    title: "Meeting",
    location: "Room 1",
  },
  {
    startDate: `${currentDate}T12:00`,
    endDate: `${currentDate}T13:30`,
    title: "Go to a gym",
    location: "Room 2",
  },
];

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "absolute",
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
}));

const Calendar = () => {
  const classes = useStyles();

  const [scheduleData, setScheduleData] = useState(calanderEvents);
  const [startDayHour, setStartDayHour] = useState(8);
  const [endDayHour, setEndDayHour] = useState(19);

  return (
    <Paper>
      <Scheduler data={scheduleData}>
        <ViewState currentDate={currentDate} />
        {/* <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          /> */}
        <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
        <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />

        <MonthView />
        {/* <ConfirmationDialog /> */}
        <AllDayPanel />
        {/* <EditRecurrenceMenu /> */}
        <Appointments />
        <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
        <AppointmentForm />
        <Toolbar />
        <ViewSwitcher />
        {/* <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          /> */}
        {/* <DragDropProvider /> */}
      </Scheduler>

      <Fab
        color="secondary"
        className={classes.addButton}
        onClick={() => {
          // this.setState({ editingFormVisible: true });
          // this.onEditingAppointmentChange(undefined);
          // this.onAddedAppointmentChange({
          //   startDate: new Date(currentDate).setHours(startDayHour),
          //   endDate: new Date(currentDate).setHours(startDayHour + 1),
          // });
        }}
      >
        <AddIcon />
      </Fab>
    </Paper>
  );
};

export default Calendar;
