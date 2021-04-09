import React from "react";
import { toast } from "react-toastify";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

const alertText = {
  marginLeft: "7px",
  verticalAlign: "top",
  fontWeight: "600",
  paddingTop: "19px",
};

export const showErrMsg = (msg) => {
  return toast.error(
    <div>
      <ErrorOutlineOutlinedIcon />
      <span style={alertText}>{msg}</span>
    </div>
  );
};

export const showSuccessMsg = (msg) => {
  return toast.success(
    <div>
      <CheckCircleOutlineOutlinedIcon />
      <span style={alertText}>{msg}</span>
    </div>
  );
};

export const showWarningMsg = (msg) => {
  return toast.warning(
    <div>
      <ReportProblemOutlinedIcon />
      <span style={alertText}>{msg}</span>
    </div>
  );
};

export const showInfoMsg = (msg) => {
  return toast.info(
    <div>
      <InfoOutlinedIcon />
      <span style={alertText}>{msg}</span>
    </div>
  );
};

export const showDefaultMsg = (msg) => {
  return toast({ msg });
};
