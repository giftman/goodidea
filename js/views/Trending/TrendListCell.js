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
 
 * @flow
 */

'use strict';

import {normalize} from '../../common/F8Colors';
var F8Touchable = require('../../common/F8Touchable');
var { connect } = require('react-redux');
import React,{Component} from 'react';
import {Image,View,StyleSheet,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ReadingCell extends React.Component {
  props: {
    session: any;
    onPress: ?() => void;
    style: any;
  };

  render() {
    var article = this.props.session;
    var title = article.title;
    var cell =
        <View style={styles.containerItem}>
          <Image
            style={{width: 90, height: 80}}
            source={{uri: article.img}}
            resizeMode='cover'
          />

          <View style={{flex: 1, flexDirection: 'column',paddingLeft:20}} >
            <View style={{flexDirection:'row'}} >
              <Text numberOfLines={2} tyle={styles.title}>
                {article.title}
              </Text>
              <Text style={styles.des}>
                  {article.numOf}
              </Text>
            </View>
            <View style={styles.bolls}>
              <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
            </View>
          </View>
          <Icon name="ios-arrow-forward" size={25} color="#616161" />
        </View>;

    if (this.props.onPress) {
      cell =
        <F8Touchable onPress={this.props.onPress}>
          {cell}
        </F8Touchable>;
    }

    return cell;
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 15,
    paddingLeft:20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    fontSize: normalize(24),
    fontWeight:'500',
    textAlign: 'left',
    color: 'black',
    backgroundColor:'green'
  },
  des:{
    flex:1,fontSize: normalize(12), color: '#9E9E9E',paddingLeft:10
  },
  bolls:{
    // backgroundColor:'grey',
    flex:1,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:'row',
    paddingRight:15,
  },
  boll:{
    width:28,
    height:28,
    borderRadius:14,
    backgroundColor:"#F44336",
    alignItems:"center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  bollText:{
    fontSize:14,
    color:'white',
    fontWeight:'300',
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
});


module.exports = connect()(ReadingCell);
