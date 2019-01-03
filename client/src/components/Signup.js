import React, { Component } from 'react'

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      userName: '',
      email: '',
      password: ''
    };
  };

  hanldeChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSignup =(e) => {
    e.preventDefault();

  };

  render() {
    return (
      <div className='login-form'>
        <form onSubmit={this.handleLogin}>
          <input name='userName' type='text' className='input' placeholder='User Name' onChange={this.hanldeChange} />
          <input name='name' type='text' className='input' placeholder='Name' onChange={this.hanldeChange} />
          <input name='email' type='email' className='input' placeholder='Email' onChange={this.hanldeChange} />
          <input name='password' type='password' className='input' placeholder='Password' onChange={this.hanldeChange} />
          <button className='btn' onClick={this.handleSignup}>Sing Up</button>
        </form>
      </div>
    )
  }
}

export default Signup;

