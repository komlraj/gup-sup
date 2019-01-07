import React, { Component } from 'react'

export default class PrivateMessage extends Component {

  constructor() {
    super();
    this.state = {
      username: '' ,
      socketId: '',
      messages: []
    };

    this.socket = io('localhost:8000');

    this.socket.on('RECEIVE_MESSAGE', function(data){
      console.log(data, "check data in private message component")
    });
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
