import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { addChannelMessagesAction } from '../actions/index';

class ChannelMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      listOfUser: [],
    };

    this.socket = io('localhost:8000');

    this.socket.emit('ONLINE', { userId: this.props.currentUser._id });

    this.socket.on('RECEIVE_CHANNEL_MESSAGE', function(data){
      addMessage(data);
    });
  
    const addMessage = messageInfo => {
      this.props.addMessages(this.props.toChannel);
    };

    this.handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  
    this.handleSendMessage = (e) => {
      e.preventDefault();
      this.socket.emit('SEND_CHANNEL_MESSAGE', {
        toChannel: this.props.toChannel,
        author: this.props.currentUser.username,
        message: this.state.message
      });
      this.setState({message: ''});
    }
  }

  render() {
    const { currentChannel, currentUser } = this.props;
    return (
      <div className='chatArea'>
        <div className='chatContainer'>
          <h1 className='center name'>{this.props.currentChannel.name}</h1>
          { 
            (currentChannel.messages) &&
            currentChannel.messages.map((msg, i) => {
              return <div className='message-info-container' key={i}>
                {
                  (msg.username === currentUser.username) ? 
                  <span className='message-user-img'></span> :
                  <span className="message-user-img msg-usr-background"></span>
                }
                <div className='message-info'>
                  <span className='user-name'>{msg.username}</span> <span>{msg.message}</span>
                </div>
              </div>
            })
          }
        </div>
        <form onSubmit={this.handleSendMessage} className='sendMsgForm'>
          <input name='message' className='input message-box' value={this.state.message} onChange={this.handleChange} placeholder='Message' />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentChannel: state.selectedChannelInfo,
    toChannel: state.toChannel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessages: (data) => dispatch(addChannelMessagesAction(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessage);
