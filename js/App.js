/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8App
 * @flow
 */

'use strict';

import  AppNavigator from './AppNavigator';
var CodePush = require('react-native-code-push');
import React from 'react';
import {AppState,StyleSheet,View,StatusBar} from 'react-native';
var { connect } = require('react-redux');
import Playground from './Playground';

var App = React.createClass({
  componentDidMount: function() {
    AppState.addEventListener('change', this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet
  
    CodePush.sync();
  },

  componentWillUnmount: function() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(appState) {
    if (appState === 'active') {
      CodePush.sync();
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = connect()(App);
