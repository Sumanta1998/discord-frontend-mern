const initialState = {
  user: null
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return (state.user = action.payload);
    case "logout":
      return (state.user = {});
    default:
      return state;
  }
};

export const selectUser = (state) => state.user.user;

export default userReducer;
