import React, { Component } from 'react';
import Aside from './Aside';
import Chat from './Chat';

class Dashboard extends Component {

  render() {
    return (
      <div className='dashboard'>
        <Aside />
        <Chat />
      </div>
    )
  }
}

export default Dashboard;
