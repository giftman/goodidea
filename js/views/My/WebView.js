
'use strict';

import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, WebView} from 'react-native';
// import Util from '../utils/Util';
import F8Header from '../../common/F8Header';

class PayWebView extends React.Component {

    render() {
        let {data} = this.props;
        var leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };
        return (
          <View style={styles.container}>
            <F8Header style={{
                backgroundColor: "#323245"
              }}
              title=""
              leftItem={leftItem}
              />
              <WebView
                ref={(ref) => { this.webview = ref; }}
                automaticallyAdjustContentInsets={false}
                style={styles.base}
                source={{ uri: data }}
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
                scalesPageToFit
                decelerationRate="normal"
                onShouldStartLoadWithRequest={() => {
                  const shouldStartLoad = true;
                  return shouldStartLoad;
                }}
                // onNavigationStateChange={this.onNavigationStateChange}
                // renderLoading={this.renderLoading}
              />

            </View>


        )
    }
}


var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  base: {
    flex: 1,
    backgroundColor:'#fff',
  }
});


module.exports = PayWebView;
