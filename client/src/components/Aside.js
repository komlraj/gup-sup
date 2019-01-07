import React, { Component } from 'react';
import { connect } from 'react-redux';

class Aside extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOfUser: [],
      listOfChannel: [],
    };

  }

  componentWillMount = () => {
    fetch('http://localhost:8000/api/allUser')
    .then(res => res.json())
    .then(data => {
      this.setState({
        listOfUser: data.listOfUser
      })
    });
    fetch('http://localhost:8000/api/allChannel')
    .then(res => res.json())
    .then(data => {
      this.setState({
        listOfChannel: data.listOfChannel
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
    });
    fetch('http://localhost:8000/api/allChannel')
    .then(res => res.json())
    .then(data => {
      this.setState({
        listOfChannel: data.listOfChannel
      })
    })
  }
  
  handleChannel = (e) => {
    console.log(e)
  }

  render() {
    return (
      <aside className='sideBar'>
        <a href='/logout'>logout</a>
        <div>
          <input type='text'></input>
        </div>
        <div>
          <div>
            <span>Channels</span>
            <a href='/create' className='right'>+</a>
            {
            this.state.listOfChannel.map((channel, i) => {
              return <p key={i} className='channel' onClick={this.handleChannel}>{channel.name}</p>
            })
          }
          </div>
        </div>
        <div>
          <p>Direct Messages</p>
          {
            this.state.listOfUser.map((user, i) => {
              return <p key={i} className='username'>{user.username}</p>
            })
          }
        </div>
      </aside>
    )
  }
}

export default Aside;
