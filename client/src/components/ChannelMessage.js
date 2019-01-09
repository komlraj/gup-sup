import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

class ChannelMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      listOfUser: [],
    };

    this.socket = io('localhost:8000');

    this.socket.emit('ONLINE', { userId: this.props.currentUser._id })

    this.socket.on('RECEIVE_CHANNEL_MESSAGE', function(data){
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
      this.socket.emit('SEND_CHANNEL_MESSAGE', {
        author: this.props.currentUser.username,
        message: this.state.message
      });
      this.setState({message: ''});
    }
  }

  render() {

    return (
      <div className='chatArea'>
        <div className='chatContainer'>
        <h1 className='center name'>{this.props.currentChannel.name}</h1>
          {
            this.state.messages.map((msg, i) => {
              console.log(msg, "msg")
              return <div key={i}>{msg.author} : {msg.message} </div>
            })
          }
        </div>
        <form onSubmit={this.handleSendMessage} className='sendMsgForm'>
          <input name='userName' className='input' value={this.state.userName} onChange={this.handleChange} placeholder='User Name' />
          <input name='message' className='input' value={this.state.message} onChange={this.handleChange} placeholder='Message' />
          <button onClick={this.handleSendMessage} className='btn'>send</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentChannel: state.selectedChannelInfo,
  }
}

export default connect(mapStateToProps)(ChannelMessage);
