import React, { Component } from 'react';
import './App.scss';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { getLoggedinUserData } from './actions';

const Loading = () => {
  return <div>loading...</div>
};

const Chat = Loadable({
  loader: () => 
  import(/* webpackChunkName: 'chat' */ './components/Chat'),
  loading: Loading
});

const Login = Loadable({
  loader: () => 
  import(/* webpackChunkName: 'login' */ './components/Login'),
  loading: Loading
});

const Signup = Loadable({
  loader: () => 
  import(/* webpackChunkName: 'signup' */ './components/Signup'),
  loading: Loading
});

class App extends Component {

  componentWillMount = () => {
    this.setState({ isCheckingUser: true });
      fetch('http://localhost:8000/api/isLoggedin')
      .then(res => res.json())
      .then(data => {
        if(data.user) {
          this.props.dispatch({ type: 'LOGIN_SUCCESS', data: data.user })
        }
        this.props.getData(data);
        this.setState({ isCheckingUser: false })
      })
  }

  // if current user availble then redirect to '/dashboard'
  checkLogin() {
    if(this.props.currentUser) {
      return <Redirect to="/" />
    } else {
      return <Login />
    }
  }

  // Protected route, if loggedin then render or redirect to '/'
  checkAuth(renderComponent) {
    if(this.props.currentUser ) {
      return renderComponent;
    } else {
      if (!this.state.isCheckingUser) {
        return <Redirect to="/login" />
      } else {
        return null;
      }
    }
  }

  render() {
    return (
      <div className="">
        <BrowserRouter>
          <div className="">
            <Switch>
              <Route path='/' render={() => this.checkAuth(<Chat />)} exact />
              <Route path='/login' render={() => this.checkLogin()} />
              <Route path='/signup' component={Signup} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getData : (data) => dispatch(getLoggedinUserData(data))
  }
}

function mapStateToProps(state) {
  return { 
    currentUser: state ? state.currentUser : state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
