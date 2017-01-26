'use strict';

import React ,{Component} from 'react';
import {
  Dimensions,
  Image,
  View,
  InteractionManager,
  Text,
  StyleSheet,
  Navigator,
} from 'react-native';
var F8Colors = require('./F8Colors');
class SplashView extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        this.props.checkToken()
        .then((token) => {
          if(token){
          this.props.navigator.resetTo({ twitterTab:123 });
        }else{
          this.props.navigator.resetTo({ login:123 });
        }
        })
      });
    }, 1500);
  }

componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return (


      <Image
        style={styles.container}
      source={require('../img/logo2.png')}
      />

    );
  }
}

const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.round(74 * scale),
    color: F8Colors.darkText,
    backgroundColor: 'transparent',
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    color: F8Colors.darkText,
    marginVertical: 20,
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    color: F8Colors.lightText,
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    color: F8Colors.darkText,
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
});

module.exports = SplashView;
