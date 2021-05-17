import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "../../utils/fetchData";

export const USER_TYPES = {
  LOADING: "LOADING_USERS",
  GET_ALL_USERS: "GET_ALL_USERS",
};

export const getAllUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_TYPES.LOADING, payload: true });

    const res = await getDataAPI("users/all", token);
    console.log(res);
    dispatch({
      type: USER_TYPES.GET_ALL_USERS,
      payload: {
        users: res.data.users,
        total: res.data.total,
      },
    });

    dispatch({ type: USER_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
