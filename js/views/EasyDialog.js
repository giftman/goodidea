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
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  TextInput,
  Text,
  TouchableOpacity,
  Navigator,
} from 'react-native';
const {connect} = require('react-redux');
import Util from '../utils/Util';
import {login} from '../actions';
import {normalize,headerBG} from '../common/F8Colors';
export type Status = 'login' | 'register';

export type Props = {
  status:Status,
  navigator:Navigator
}

class EasyDialog extends Component{
  props:Props;
  constructor(props) {
    super(props);

    this.state={
      username:'',
      passwd:'',
      status:'login',
    }
    // this.renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    // this.openSharingSettings = this.openSharingSettings.bind(this);
    // this.handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }
  render(){
    let words = ['Cancle','登录'];
      return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor: '#eee',height:Util.size.height}} >
            <View style={[styles.container,this.props.style]} >
            <Text style={styles.header}>Header</Text>
            <View style={styles.content}>
              <Text style={styles.info}>Content:how much</Text>
              <Text style={styles.info}>Content:number of</Text>
              <Text style={styles.info}>Content:des</Text>
              <Text style={styles.info}>Content:detail</Text>
            </View>
          <View style={[styles.inputContainer,{marginTop:0,borderWidth:0,justifyContent:'space-between'}]}>
            <TouchableOpacity style={styles.style_view_commit}  activeOpacity={0.8} onPress={this.leftPress.bind(this)}><Text style={styles.buttonText}>{words[0]}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.style_view_commit,{backgroundColor:'#ff9600'}]} onPress={this.rightPress.bind(this)} activeOpacity={0.8}><Text style={styles.buttonText}>{words[1]}</Text></TouchableOpacity>
           </View>
        </View>
        </View>
        );
      }
    

  leftPress(){
    console.log("leftPress");
}


  rightPress(){
    const {dispatch} = this.props;
     
    
  }
}





const styles = StyleSheet.create({
  baseComponent:{
     alignItems: 'center',
     justifyContent:'center',
     flex:1,
     marginTop:-90,
  },
  logo:{
    width:200,
    height:60,
  },
  content:{
    flex:1,
  },
  inputContainer: {
    margin: normalize(10),
    borderWidth: 1,
    borderColor: headerBG,
    alignItems: 'center',
    flexDirection: 'row',
  },
  info:{
    fontWeight: '200',
    fontSize: 14,
    color: '#666',
    paddingTop:5,
    paddingLeft:10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#a9b7b7',
    textAlign:'center',
    padding:5,
  },
  container: {
    backgroundColor:'white',
    width:normalize(260),
    height:normalize(200),
    borderRadius:normalize(10),
    borderWidth:.2,
    borderColor:'#000'
    
  },
  style_view_commit:{  
    width:normalize(110),
    height:normalize(50),
      backgroundColor:'#666',
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 18,
  },
  
});

module.exports = EasyDialog;


