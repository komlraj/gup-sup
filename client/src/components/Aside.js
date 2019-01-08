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
    return e.target.className += ' selected';
  }

  handleUser = (e) => {
    console.log(e.target.id, e.target.className)
    return e.target.className += ' selected';
  }

  render() {
    const  username  = this.props.currentUser ? this.props.currentUser.username : '' ;

    return (
      <aside className='sideBar'>
        <span>{username}</span>
        <a href='/logout' className='right'>logout</a>
        <div>
          <input type='text' className='searchBox'></input>
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
              if(user.username === username) return;
              else return <p key={i} className='username' id={user._id} onClick={this.handleUser}>{user.username}</p>
            })
          }
        </div>
      </aside>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
