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