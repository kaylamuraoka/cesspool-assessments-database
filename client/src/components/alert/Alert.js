import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

import Loading from "./Loading";
import Toast from "./Toast";

const Alert = () => {
  const { alert } = useSelector((state) => state);

  const dispatch = useDispatch();

  const bgError = {
    backgroundColor: "#d9534f",
  };
  const bgSuccess = {
    backgroundColor: "#5cb85c",
  };

  return (
    <div>
      {alert.loading && <Loading />}

      {alert.error && (
        <Toast
          type="error"
          msg={{ title: "Error", body: alert.error }}
          handleClose={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor={bgError}
        />
      )}

      {alert.success && (
        <Toast
          type="success"
          msg={{ title: "Success", body: alert.success }}
          handleClose={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor={bgSuccess}
        />
      )}
    </div>
  );
};

export default Alert;
