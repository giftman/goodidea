'use strict';

import React from 'react';

var { Provider } = require('react-redux');
var configureStore = require('./store/configureStore');
// import {APP_ID,APP_KEY,version,channel} from './env';
import LoginView from './views/LoginView';
import FacebookTabBar from './views/FacebookTabBar';
class Root extends React.Component {
    constructor() {
      super();
      this.state = {
        store: configureStore(),
      };
    }
    render() {
    	var content = (<FacebookTabBar />);
      return (
        <Provider store={this.state.store}>
        {content}
        </Provider>
      );
    }
  };



module.exports = () => Root;
