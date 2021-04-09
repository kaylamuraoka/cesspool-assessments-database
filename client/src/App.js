import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignUpConfirmation from "./pages/SignUpConfimation";
import ActivateAccount from "./pages/ActivateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetSent from "./pages/PasswordResetSent";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./components/Dashboard";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { DataProvider, GlobalState } from "./utils/GlobalState";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const state = useContext(GlobalState);
  // const [isLoggedIn] = state.userAPI.isLoggedIn;
  // const [isAdmin] = state.userAPI.isAdmin;
  // const [error] = state.notification.error;
  // const [success] = state.notification.success;
  // const [isLoading] = state.notification.isLoading;

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        draggable
        closeOnClick
        transition={Zoom}
        pauseOnHover
      />
      <div>
        <DataProvider>
          <Header />
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />

            <Route exact path="/confirmation" component={SignUpConfirmation} />
            <Route
              path="/user/activate/:activation_token"
              component={ActivateAccount}
              exact
            />

            <Route path="/forgot_password" component={ForgotPassword} exact />
            <Route
              path="/password_reset_sent"
              component={PasswordResetSent}
              exact
            />

            <Route exact path="/" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </DataProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
