const url = 'http://localhost:8000';
const apiUrl = 'http://localhost:8000/api';

// user signup action creator
export function signupAction(data) {
  return (dispatch) => {
    fetch(`${apiUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(data => {
        if(data.message) {
          dispatch({ type: 'SIGNUP_SUCESS', data: data.message })
      } else {
          dispatch({ type : 'SIGNUP_ERR' })
        }
      
      })
  };
}

// auth user login action creator
export function loginAction(data) {
  return (dispatch) => {
    fetch(`http://localhost:8000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if(data.user) {
        dispatch({type: 'LOGIN_SUCCESS', data: data.user })
      } else {
        dispatch({ type: 'LOGIN_ERR', data })
      }    
    });
  };
}

// get login user data action creator
export const getLoggedinUserData = (data) => {
  return(dispatch) => {
    dispatch({ type: 'ISLOGGEDINDATA', data });
  };
};

// set toUser for sending message
export const setToUserAction = (userData) => {
  return(dispatch) => {
    fetch(`http://localhost:8000/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toUser: userData.toUser,
        fromUser: userData.fromUser
      })
      })
      .then(res => res.json())
      .then(messages => {
        dispatch({ type: 'SETTOUSER', data:{messages, toUser: userData.toUser}});
      });
  };
};

// Add sending Private Messages in redux store
export const addMessagesAction = (messageDetails) => {
  return(dispatch) => {
    dispatch({type: 'ADD_MESSAGES', messageDetails})
  }
};

// store openChannelChatRoom id in redus-store
export const openedChannelChatRoomAction = (channelId) => {
  return(dispatch) => {
    fetch(`http://localhost:8000/api/channel/${channelId}`)
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'OPENED_CHANNEL_INFO', data: {data, channelId} })
    })
  }
};

// Add sending Channel Message in redux store.
export const addChannelMessagesAction = (messageDetails) =>{
  console.log(messageDetails,"messageDetails");
  return(dispatch) => {
    fetch(`http://localhost:8000/api/channel/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channelId: messageDetails.channelId,
        messageInfo: messageDetails.messageInfo,
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data, data[0], data[0].messages)
      dispatch({ type: 'UPDATE_CHANNEL_MSG', data: data[0].messages })
    })
  }
};
