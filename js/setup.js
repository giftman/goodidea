'use strict';

import React from 'react';

var { Provider } = require('react-redux');
var configureStore = require('./store/configureStore');
import App from './App';
// import {APP_ID,APP_KEY,version,channel} from './env';
class Root extends React.Component {
    constructor() {
      super();
      this.state = {
        store: configureStore(),
      };
    }
    render() {
    	var content = (<App />);
      return (
        <Provider store={this.state.store}>
        {content}
        </Provider>
      );
    }
  };



module.exports = () => Root;
