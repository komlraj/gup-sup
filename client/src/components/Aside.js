import React, { Component } from 'react';
import { connect } from 'react-redux';

class Aside extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOfUser: []
    };

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
      <aside className='sideBar'>
        <div>
          <input type='text'></input>
        </div>
        <div>
          <div>
            <span>Channels</span>
            <a href='/create' className='right'>+</a>
            {
            this.state.listOfUser.map((user, i) => {
              return <p key={i}>{user.username}</p>
            })
          }
          </div>
        </div>
        <div>
          <p>Direct Messages</p>
        </div>
      </aside>
    )
  }
}

export default Aside;
