import React, { Component } from 'react';
import {loginAction} from '../actions/index';
import {connect} from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  };

  hanldeChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin =(e) => {
    e.preventDefault();
    this.props.login(this.state)
  };

  render() {
    return (
      <div className='login-form'>
        <form onSubmit={this.handleLogin}>
          <input name='username' type='text' className='input' placeholder='User Name' onChange={this.hanldeChange} />
          <input name='password' type='password' className='input' placeholder='Password' onChange={this.hanldeChange} />
          <button className='btn' onClick={this.handleLogin}>Login</button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login : (data) => dispatch(loginAction(data))
  }
}
export default connect(null, mapDispatchToProps)(Login);
