const initialState2 = {
  channelId: null,
  channelName: null
};

const channelReducer = (state = initialState2, action) => {
  switch (action.type) {
    case "setChannelInfo":
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    default:
      return state;
  }
};

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;

export default channelReducer;
