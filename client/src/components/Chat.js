import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {

  constructor() {
    super();
    this.state = {
      userName: '',
      message: '',
      messages: []
    };

    this.socket = io('localhost:8000');

    this.socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    });
  
    const addMessage = data => {
      console.log(data, "data in chat component");
      this.setState({messages: [...this.state.messages, data]});
    };

    this.handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  
    this.handleSendMessage = (e) => {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.userName,
        message: this.state.message
      });
      this.setState({message: ''});
    }

  }

  

  render() {

    return (
      <div className='chat'>
        <main className='chatArea'>
          <div className='chatContainer'>
            {
              this.state.messages.map(msg => {
                console.log(msg, "msg")
                return <div>{msg.author} : {msg.message} </div>
              })
            }
          </div>
          <form onSubmit={this.handleSendMessage} className='sendMsgForm'>
            <input name='userName' value={this.state.userName} onChange={this.handleChange} placeholder='user NAme' />
            <input name='message' value={this.state.message} onChange={this.handleChange} placeholder='message' />
            <button onClick={this.handleSendMessage}>send</button>
          </form>
        </main>
        <aside className='sideBar'>
          <div>
            <a className='btn' href='/logout' >Log Out</a>
          </div>
        </aside>
      </div>
    )
  }
}

export default Chat;
