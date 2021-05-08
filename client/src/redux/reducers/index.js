import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import profile from "./profileReducer";
import homePosts from "./postReducer";
import detailPost from "./detailPostReducer";
import discover from "./discoverReducer";
import suggestions from "./suggestionsReducer";
import socket from "./socketReducer";
import notify from "./notifyReducer";
import message from "./messageReducer";
import online from "./onlineReducer";
import status from "./statusReducer";

export default combineReducers({
  auth,
  alert,
  profile,
  homePosts,
  detailPost,
  discover,
  suggestions,
  socket,
  notify,
  message,
  online,
  status,
});
