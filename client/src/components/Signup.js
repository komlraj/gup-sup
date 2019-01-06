import React, { Component } from 'react';
import { signupAction } from '../actions/index';
import { connect } from 'react-redux';

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
    console.log(this.props.msg);
    return (
      <div className='login-form'>
        <form onSubmit={this.handleLogin}>
          <input name='username' type='text' className='input' placeholder='User Name' onChange={this.hanldeChange} />
          <input name='name' type='text' className='input' placeholder='Name' onChange={this.hanldeChange} />
          <input name='email' type='email' className='input' placeholder='Email' onChange={this.hanldeChange} />
          <input name='password' type='password' className='input' placeholder='Password' onChange={this.hanldeChange} />
          <input name='confirmPassword' type='password' className='input' placeholder='Confirm Password' onChange={this.hanldeChange} />
          <button className='btn' onClick={this.handleSignup}>Sing Up</button>
        </form>
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

