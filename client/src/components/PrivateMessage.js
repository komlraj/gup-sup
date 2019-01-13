import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { addMessagesAction } from '../actions/index';

class PrivateMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      listOfUser: [],
      messages: [],
      listOfUser: [],
    };

    this.socket = io('localhost:8000');

    this.socket.emit('ONLINE', { userId: this.props.currentUser._id })

    this.socket.on('RECEIVE_PRIVATE_MESSAGE', function(data){
      addMessage(data);
    });
  
    const addMessage = data => {
      this.props.addMessage(data);
    };

    this.handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    };
  
    this.handleSendMessage = (e) => {
      e.preventDefault();
      const { message } = this.state;
      const { currentUser, toUser } = this.props;
      this.socket.emit('SEND_PRIVATE_MESSAGE', {
        toUser,
        fromUser: currentUser._id,
        message: message
      });
      this.setState({message: ''});
    }
  }

  componentWillMount = () => {
    fetch('http://localhost:8000/api/allUser')
    .then(res => res.json())
    .then(users => {
      this.setState({
        listOfUser: users.listOfUser
      })
    })
  }

  render() {
    const { currentUser, toUser, messages } = this.props;
    return (
      <div className='chatArea'>
        <div>
          {
            this.state.listOfUser.map((user, i) => {
              if(user._id === toUser) {
                return <h1 key={i} className='center name'>{user.name}</h1>
              }
            })
          }
          
          {
            messages.map((message, i) => {
              if(message.fromUser === currentUser._id) {
                return <div key={i} className='currentUser-msg-wrap'><span className='right currentUser-msg'>{message.message} </span></div>
              } else {
                return <div key={i} className='anotherUser-msg-wrap'><span className='anotherUser-msg'>{message.message} </span></div>
              }
            })
          }
        </div>
        <form onSubmit={this.handleSendMessage} className='sendMsgForm'>
          <input name='message' className='input' value={this.state.message} onChange={this.handleChange} placeholder='Message' />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    toUser: state.toUser,
    messages: state.selectedUserMessages,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: (data) => dispatch(addMessagesAction(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateMessage);
