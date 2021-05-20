import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";

// Material UI Components
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
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
import Messages from "./pages/messages/Messages";
import Conversation from "./pages/messages/Conversation";
import Surveys from "./pages/Surveys";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import RecentActivity from "./pages/RecentActivity";
import EditPost from "./pages/EditPost";

import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

const theme = createMuiTheme({
  overrides: {
    MuiRadio: {
      root: {
        padding: 3,
      },
    },
    MuiCheckbox: {
      root: {
        padding: 3,
      },
    },
  },
});

theme.typography.h1 = {
  "@media (min-width:200px)": {
    fontSize: "28px",
  },
  "@media (min-width:600px)": {
    fontSize: "35px",
  },
  "@media (min-width:801px)": {
    fontSize: "35px",
  },
  "@media (min-width:1025px)": {
    fontSize: "42px",
  },
};

theme.typography.h2 = {
  "@media (min-width:200px)": {
    fontSize: "23px",
  },
  "@media (min-width:600px)": {
    fontSize: "28px",
  },
  "@media (min-width:1025px)": {
    fontSize: "32px",
  },
};

theme.typography.h3 = {
  "@media (min-width:200px)": {
    fontSize: "19px",
  },
  "@media (min-width:600px)": {
    fontSize: "19px",
  },
  "@media (min-width:801px)": {
    fontSize: "21px",
  },
  "@media (min-width:1025px)": {
    fontSize: "25px",
  },
};

theme.typography.h4 = {
  "@media (min-width:200px)": {
    fontSize: "15px",
  },
  "@media (min-width:600px)": {
    fontSize: "17px",
  },
  "@media (min-width:1025px)": {
    fontSize: "19px",
  },
};

theme.typography.h5 = {
  "@media (min-width:200px)": {
    fontSize: "12px",
  },
  "@media (min-width:600px)": {
    fontSize: "14px",
  },
  "@media (min-width:1025px)": {
    fontSize: "15px",
  },
};

theme.typography.h6 = {
  "@media (min-width:200px)": {
    fontSize: "12px",
  },
  "@media (min-width:600px)": {
    fontSize: "14px",
  },
  "@media (min-width:1025px)": {
    fontSize: "15px",
  },
};

theme.typography.subtitle1 = {
  "@media (min-width:200px)": {
    fontSize: "12px",
  },
  "@media (min-width:600px)": {
    fontSize: "14px",
  },
  "@media (min-width:1025px)": {
    fontSize: "15px",
  },
};

theme.typography.subtitle2 = {
  "@media (min-width:200px)": {
    fontSize: "12px",
  },
  "@media (min-width:600px)": {
    fontSize: "14px",
  },
  "@media (min-width:1025px)": {
    fontSize: "15px",
  },
};

theme.typography.body1 = {
  "@media (min-width:200px)": {
    fontSize: "12px",
  },
  "@media (min-width:600px)": {
    fontSize: "12px",
  },
  "@media (min-width:800px)": {
    fontSize: "14px",
  },
  "@media (min-width:1025px)": {
    fontSize: "18px",
  },
};

theme.typography.body2 = {
  "@media (min-width:200px)": {
    fontSize: "11px",
  },
  "@media (min-width:600px)": {
    fontSize: "14px",
  },
  "@media (min-width:1025px)": {
    fontSize: "15px",
  },
};

theme.typography.button = {
  "@media (min-width:200px)": {
    fontSize: "12px",
  },
  "@media (min-width:600px)": {
    fontSize: "15px",
  },
  "@media (min-width:1025px)": {
    fontSize: "17px",
  },
};

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
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          {auth.token && <Header />}
          {auth.token && <SocketClient />}

          <Alert />
          <main className={classes.content}>
            {auth.token && <div className={classes.toolbar} />}
            <Switch>
              <Route
                path="/dashboard"
                component={auth.token ? Dashboard : Login}
                exact
              />

              <Route
                path="/recent_activity"
                component={auth.token ? RecentActivity : Login}
                exact
              />

              <Route path="/map" component={auth.token ? Map : Login} exact />

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
                path="/post/edit/:id"
                component={auth.token ? EditPost : NotFound}
                exact
              />

              <Route
                path="/users"
                component={auth.token ? Users : NotFound}
                exact
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
                component={auth.token ? Surveys : Login}
              />

              <Route
                path="/reports"
                component={auth.token ? Reports : Login}
                exact
              />

              <Route
                path="/appointments"
                component={auth.token ? Appointments : Login}
                exact
              />

              <Route path="*" component={NotFound} exact />
            </Switch>
            {auth.token && <Footer />}
          </main>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
