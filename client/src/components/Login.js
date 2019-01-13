import React, { Component } from 'react';
import {loginAction} from '../actions/index';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  };

  handleChange = (e) => {
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
      <div className='login-container'>
        <div className='col-1-2 login-logo'>
          <div className='clip-container'>
          <div className='clip'>
            <p className='gup'>Gup</p>
            <p className='sup right'>Sup</p>
          </div>
        </div>
        </div>
        <div className='col-1-2'>
          <div className='login-form'>
            <div className='login-form-inner'>
              <h3 className='center logo-container'><span className='logo'>$</span></h3>
              <form onSubmit={this.handleLogin}>
                <input name='username' type='text' className='input' placeholder='User Name' onChange={this.handleChange} />
                <input name='password' type='password' className='input' placeholder='Password' onChange={this.handleChange} />
                <p className='center'><button className='btn login-btn' onClick={this.handleLogin}>login</button></p>
                <p><i className="fas fa-arrow-circle-right" fa='10x'></i></p>
              </form>
              <p className='form-msg center'>New User <Link to='/signup'><span className='link-text'>Sign Up</span>  </Link></p>
            </div>
          </div>
        </div>
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
