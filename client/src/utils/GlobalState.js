import React, { createContext, useState, useEffect } from "react";
import UserAPI from "./api/UserAPI";

import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.post("/user/refresh_token", null);

        setToken(res.data.access_token);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    userAPI: UserAPI(token),
  };

  console.log(state);

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
