import React, { Component } from 'react';
import './App.scss';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Chat from './components/Chat';
import Login from './components/Login';

// Loading = () => {
//   return <div>loading...</div>
// };

// const Chat = Loadable({
//   loader: () => 
//   import('./components/Chat'),
//   loading: Loading
// });

class App extends Component {
  render() {

    return (
      <div className="">
        <BrowserRouter>
          <div className="">
            <Switch>
              <Route path='/' component={Chat} exact />
              <Route path='/login' component={Login} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
