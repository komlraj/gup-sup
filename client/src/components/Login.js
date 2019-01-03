import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
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

  };

  render() {
    return (
      <div className='login-form'>
        <form onSubmit={this.handleLogin}>
          <input name='userName' type='text' className='input' placeholder='User Name' onChange={this.hanldeChange} />
          <input name='password' type='password' className='input' placeholder='Password' onChange={this.hanldeChange} />
          <button className='btn' onClick={this.handleLogin}>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;
