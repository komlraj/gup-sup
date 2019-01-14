import React, { Component } from 'react';
import { signupAction } from '../actions/index';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  };

  hanldeChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSignup =(e) => {
    e.preventDefault();
    const { password, confirmPassword , name, username, email} = this.state;

    if(password === confirmPassword) {
      this.props.signup({ name, username, email, password });
    }

  };

  render() {
    if(this.props.msg) this.props.history.push('/');
    return (
      <div className='signup'>
        <div className='signup-form'>
          <div className='signup-form-inner'>
            <form onSubmit={this.handleLogin}>
              <input name='username' type='text' className='input' placeholder='User Name' onChange={this.hanldeChange} />
              <input name='name' type='text' className='input' placeholder='Name' onChange={this.hanldeChange} />
              <input name='email' type='email' className='input' placeholder='Email' onChange={this.hanldeChange} />
              <input name='password' type='password' className='input' placeholder='Password' onChange={this.hanldeChange} />
              <input name='confirmPassword' type='password' className='input' placeholder='Confirm Password' onChange={this.hanldeChange} />
              <p className='center'><button className='btn signup-btn' onClick={this.handleSignup}>Sing Up</button></p>
            </form>
            <p className='form-msg center'> Registered User Please <Link to='/' className='link-text'>Login</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dipatch) {
  return {
    signup : (data) => dipatch(signupAction(data))
  }
}

function mapStateToProps(state) {
  return {
    msg: state ? state.message : null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

