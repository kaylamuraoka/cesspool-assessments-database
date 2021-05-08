import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import RegisterConfirmation from "./pages/auth/RegisterConfirmation";
import ActivateAccount from "./pages/auth/ActivateAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Discover from "./pages/Discover";
import Messages from "./pages/messages/Messages";
import Conversation from "./pages/messages/Conversation";
import OsdsFieldSurvey from "./pages/OsdsFieldSurvey";
import Reports from "./pages/Reports";

import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 3,
    height: "100vh",
    overflow: "auto",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const classes = useStyles();

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({
      type: GLOBALTYPES.SOCKET,
      payload: socket,
    });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        {auth.token && <Header />}
        {auth.token && <SocketClient />}

        <Alert />
        <main className={classes.content}>
          {auth.token && <div className={classes.toolbar} />}
          <Switch>
            <Route path="/" component={auth.token ? Home : Login} exact />

            <Route
              exact
              path="/register"
              component={auth.token ? Home : Register}
            />

            <Route
              exact
              path="/register_confirmation"
              component={auth.token ? NotFound : RegisterConfirmation}
            />

            <Route
              path="/activate/:activation_token"
              component={auth.token ? NotFound : ActivateAccount}
              exact
            />

            <Route
              path="/forgot_password"
              component={auth.token ? NotFound : ForgotPassword}
              exact
            />

            <Route
              path="/reset_password/:token"
              component={auth.token ? NotFound : ResetPassword}
              exact
            />

            <Route
              path="/profile/:id"
              component={auth.token ? Profile : NotFound}
              exact
            />

            <Route
              path="/post/:id"
              component={auth.token ? Post : NotFound}
              exact
            />

            <Route
              exact
              path="/discover"
              component={auth.token ? Discover : Login}
            />

            <Route
              exact
              path="/messages"
              component={auth.token ? Messages : Login}
            />

            <Route
              path="/messages/:id"
              component={auth.token ? Conversation : NotFound}
              exact
            />

            <Route
              exact
              path="/surveys"
              component={auth.token ? OsdsFieldSurvey : Login}
            />

            <Route
              path="/reports"
              component={auth.token ? Reports : Login}
              exact
            />

            <Route path="*" component={NotFound} exact />
          </Switch>
          {auth.token && <Footer />}
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
