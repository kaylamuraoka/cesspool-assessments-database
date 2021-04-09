import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg, showInfoMsg } from "../components/Alerts";

const ActivateAccount = () => {
  const { activation_token } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          showSuccessMsg(res.data.msg);
          history.push("/signin");
        } catch (err) {
          if (
            err.response.data.msg ===
            "You've already confirmed your email. Sign in to your account."
          ) {
            history.push("/signin");
            showInfoMsg(err.response.data.msg);
          } else {
            history.push("/signup");
            showErrMsg(err.response.data.msg);
          }
        }
      };
      activationEmail();
    }
  }, [history, activation_token]);

  return <div></div>;
};

export default ActivateAccount;
