
// set initial state
const initState = {
  currentUser: null,
  fetchedUserData: {},
  allUserInfo: [],
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
        allUserInfo: [...state.allUserInfo, action.data.username],
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
    default:
      break;
  }
};

export default rootReducer;