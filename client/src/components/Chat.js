import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      message: '',
      messages: [],
      listOfUser: [],
    };

    this.socket = io('localhost:8000');

    this.socket.emit('ONLINE', { userId: this.props.currentUser._id })

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

  componentWillMount = () => {
    fetch('http://localhost:8000/api/allUser')
    .then(res => res.json())
    .then(data => {
      this.setState({
        listOfUser: data.listOfUser
      })
    })
  }

  componentDidMount = () => {
    fetch('http://localhost:8000/api/allUser')
    .then(res => res.json())
    .then(data => {
      this.setState({
        listOfUser: data.listOfUser
      })
    })
  } 

  render() {

    return (
      <div className='chatArea'>
        <div className='chatContainer'>
          {
            this.state.messages.map((msg, i) => {
              console.log(msg, "msg")
              return <div key={i}>{msg.author} : {msg.message} </div>
            })
          }
        </div>
        <form onSubmit={this.handleSendMessage} className='sendMsgForm'>
          <input name='userName' value={this.state.userName} onChange={this.handleChange} placeholder='user NAme' />
          <input name='message' value={this.state.message} onChange={this.handleChange} placeholder='message' />
          <button onClick={this.handleSendMessage}>send</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Chat);
