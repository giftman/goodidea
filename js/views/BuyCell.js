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
 * @flow
 */

'use strict';

var F8Colors = require('../common/F8Colors');
var F8Touchable = require('../common/F8Touchable');
import React,{Component} from 'react';
import {Image,View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import Util from '../utils/Util';
import Ball from './Ball';

class ReadingCell extends React.Component {
  props: {
    name:any;
    cell: any;
    style: any;
    chips:number;
  };
  _onToggle(index){
    console.log
  }

  render() {
    var article = this.props.cell;
    var title = article.name;
    const {topic, color, isChecked, onToggle} = this.props;

    const style = isChecked
      ? {backgroundColor: color}
      : {borderColor: color, borderWidth: 1};
    var cell =
        <View key={title} style={styles.containerItem}>
          <Image
            style={{width: 50, height: 40}}
            source={require('../common/img/back.android.png')}
            resizeMode='cover'
          >
          <Text>{title}</Text>
          </Image>

          <View style={{flex: 1, flexDirection: 'column',paddingLeft:20}} >
            <View style={styles.bolls}>
            {
              article.map((num,index)=>{
                return (
                  <Ball key={index} topic={num} color="green" isChecked={false} onToggle={()=>this._onToggle(index)} />
                  )
              })
            }
            </View>
          </View>
          
        </View>

    return cell;
  }
}


var styles = StyleSheet.create({
  postContainer:{
    backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height,
  },
  
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    paddingLeft:20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  containerMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    paddingLeft:15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 24,
    fontWeight:'500',
    textAlign: 'left',
    color: 'black',
    backgroundColor:'green'
  },
  des:{
    flex:1,fontSize: 14, color: '#9E9E9E',paddingLeft:10
  },
  bolls:{
    // backgroundColor:'grey',
    flex:1,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:'row',
    paddingRight:60,
    paddingBottom:10,
    paddingTop:10,
    flexWrap:'wrap',
  },
});


module.exports = ReadingCell;
