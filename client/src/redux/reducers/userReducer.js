import { USER_TYPES } from "../actions/usersAction";

const initialState = {
  loading: false,
  users: [],
  total: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_TYPES.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.users,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export default userReducer;
