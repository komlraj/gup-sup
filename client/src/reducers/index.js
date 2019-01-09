
// set initial state
const initState = {
  currentUser: null,
  fetchedUserData: {},
  toUser: '',
  selectedUserMessages: [],
  toChannel: '',
  selectedChannelInfo: {},
};

// reducer for set state according to action type
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCESS':
      return {
        ...state,
        message: action.data,
      };
    case 'SIGNUP_ERR':
      return {
        ...state,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.data,
      };
    case 'LOGIN_ERR':
      return {
        ...state,
        message: action.data.message,
      };
    case 'ISLOGGEDINDATA':
      return {
        ...state,
        fetchedUserData: action.data,
      };
    case 'SETTOUSER':
      return {
        ...state, 
        toUser: action.data.toUser, 
        selectedUserMessages: action.data.messages
      };
    case 'ADD_MESSAGES':
      return {
        ...state,
        selectedUserMessages: action.messageDetails
      };
    case 'OPENED_CHANNEL_INFO':
      return {
        ...state,
        toChannel: action.data.channelId,
        selectedChannelInfo: action.data.data,
      };
    default:
      break;
  }
};

export default rootReducer;