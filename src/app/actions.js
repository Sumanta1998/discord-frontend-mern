export const logIn = (user) => {
  return {
    type: "login",
    payload: { user }
  };
};
export const logOut = () => {
  return {
    type: "logout"
  };
};
export const setChannelInfo = ({ channelId, channelName }) => {
  return {
    type: "setChannelInfo",
    payload: { channelId, channelName }
  };
};
