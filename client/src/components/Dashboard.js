import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aside from './Aside';
import ChannelMessage from './ChannelMessage';
import PrivateMessage from './PrivateMessage';

class Dashboard extends Component {

  render() {
    const { toUser, toChannel } = this.props;
    return (
      <div className='dashboard'>
        <Aside />
        {
          toUser ? <PrivateMessage /> : toChannel ? <ChannelMessage /> : <h1>hello everyone</h1>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    toUser: state.toUser,
    toChannel: state.toChannel,
  }
}

export default connect(mapStateToProps)(Dashboard);
