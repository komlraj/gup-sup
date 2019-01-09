import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aside from './Aside';
import ChannelMessage from './ChannelMessage';
import PrivateMessage from './PrivateMessage';

class Dashboard extends Component {

  render() {
    const { toUser } = this.props;
    return (
      <div className='dashboard'>
        <Aside />
        {
          toUser ? <PrivateMessage /> : <ChannelMessage />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    toUser: state.toUser ? state.toUser : '' ,
  }
}

export default connect(mapStateToProps)(Dashboard);
