import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToUserAction, openedChannelChatRoomAction } from '../actions/index';
class Aside extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOfUser: [],
      listOfChannel: [],
    };

  }

  componentWillMount = () => {
    // fetch all user data from database
    fetch('http://localhost:8000/api/allUser')
    .then(res => res.json())
    .then(data => {
      this.setState({
        listOfUser: data.listOfUser
      })
    });
    // fetch all channel data from database
    fetch('http://localhost:8000/api/allChannel')
    .then(res => res.json())
    .then(data => {
      this.setState({
        listOfChannel: data.listOfChannel
      })
    })
  }

  // handled click action on channel
  handleChannel = (e) => {
    this.props.openedChannelChatRoom(e.target.id);
  }

  // handled click action on users
  handleUser = (e) => {
    this.props.setToUser({toUser: e.target.id, fromUser: this.props.currentUser._id});
  }

  render() {
    const { listOfChannel, listOfUser } = this.state;
    const  username  = this.props.currentUser ? this.props.currentUser.username : '' ;

    return (
      <aside className='side-bar'>
        <p className='title-container'>
          <span className='user-name'>{username}</span>
          <a href='/logout' className='right logout'>logout</a>
        </p>
        <div>
          <input type='text' className='searchBox' placeholder='Jump to ...'></input>
        </div>
        <div>
          <div>
            <p className='title-container'>
              <span className='title'>Channels</span>
              <a title='Create a channel' href='/create' className='right add-channel'>+</a>
            </p>
            {
            listOfChannel.length && listOfChannel.map((channel, i) => {
              return <p key={i} className={this.props.toChannel == channel._id ? 'selected channel-list' : 'channel-list'} 
                id={channel._id} onClick={this.handleChannel}><span className='channel-logo'>$</span> {channel.name}
              </p>
            })
          }
          </div>
        </div>
        <div>
          <p className='title-container'>
            <span className='title'>Direct Messages</span>
          </p>
          {
            listOfUser && listOfUser.map((user, i) => {
              if(user.username === username) {
                return <p key={i} className={this.props.toUser == user._id ? 'selected username-list' : 'username-list'} 
                id={user._id} onClick={this.handleUser}><span className='online-user'></span>{user.username}(you)
                </p>
              } else return <p key={i} className={this.props.toUser == user._id ? 'selected username-list' : 'username-list'} 
                id={user._id} onClick={this.handleUser}><span className='offline-user'></span>{user.username}
                </p>
            })
          }
        </div>
      </aside>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    toUser: state.toUser,
    toChannel: state.toChannel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setToUser: (userId) => dispatch(setToUserAction(userId)),
    openedChannelChatRoom: (channelId) => dispatch(openedChannelChatRoomAction(channelId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
