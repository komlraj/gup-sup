import React, { Component } from 'react';
import './App.scss';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Chat from './components/Chat';

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
      <div className="App">
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path='/' component={Chat} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
