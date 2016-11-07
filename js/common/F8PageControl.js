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
 * @providesModule F8PageControl
 * @flow
 */
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

let PropTypes = React.PropTypes;

class F8PageControl extends Component {
  propTypes = {
    count: PropTypes.number.isRequired,
    selectedIndex:PropTypes.number.isRequired,
    style:View.propTypes.style,
  }
  render() {
    let images = [];
    for (let i = 0;i<=this.props.count;i++){
      let isSelected = this.props.selectedIndex === i;
      images.push(<Circle key={i} isSelected={isSelected} />);
    }
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {images}
        </View>
      </View>
    );
  }
}

class Circle extends Component {
  render(){
    let extractStyle = this.props.isSelected ? styles.full :styles.empty;
    return <View style={[styles.circle,extractStyle]} />
  }
}
let CIRCLE_SIZE=35;
const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#f445'
  },
  innerContainer:{
    flexDirection:'row',
    backgroundColor:'#4b235a',
    borderRadius:CIRCLE_SIZE,
  },
  circle:{
    width:CIRCLE_SIZE,
    height:CIRCLE_SIZE,
    borderRadius:CIRCLE_SIZE/2,
    margin:12,
  },
  full:{
    backgroundColor:'#fe455c',
  },
  empty:{
    backgroundColor:'#ffc1b0'
  }

});


export default F8PageControl;

module.exports.__cards__ = (define) => {
  define('Simple 5', () => <F8PageControl count={5} selectedIndex={2} />);
};
