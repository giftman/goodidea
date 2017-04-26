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
  Modal,
} from 'react-native';
const {connect} = require('react-redux');
import Util from '../utils/Util';
import {login} from '../actions';
import {normalize,headerBG} from '../common/F8Colors';


class Dialog extends Component{
  
  render(){
    let words = ['取消','确定'];
    // let {orderInfo} = this.props;
      return (
        <Modal
           animationType='slide'
           transparent={true}
           visible={this.props.show}
           onShow={() => {}}
           onRequestClose={() => {}} >
        <View style={styles.mainContainer} >
            <View style={[styles.container,this.props.style]} >
            {/*<Text style={styles.header}>注单付款确认</Text>*/}
            <View style={styles.content}>
              <Text style={styles.info}>{this.props.content}</Text>
              
            </View>
          <View style={[styles.inputContainer,{marginTop:0,borderWidth:0,justifyContent:'space-between'}]}>
            <TouchableOpacity style={styles.style_view_commit}  activeOpacity={0.8} onPress={this.leftPress.bind(this)}><Text style={styles.buttonText}>{words[0]}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.style_view_commit,{backgroundColor:'#666'}]} onPress={this.rightPress.bind(this)} activeOpacity={0.8}><Text style={styles.buttonText}>{words[1]}</Text></TouchableOpacity>
           </View>
          </View>
          <View style={styles.cover} />
        </View>
        </Modal>
        );
      }
    

  leftPress(){
    console.log("leftPress");
    this.props.cancleBtn();
}


  rightPress(){
    this.props.confirmBet();
  }
}





const styles = StyleSheet.create({
  mainContainer:{
    flex:1,alignItems:'center',justifyContent:'center',backgroundColor: 'transparent',height:Util.size.height
  },
  cover:{
    position:'absolute',
    top:0,
    left:0,
    width:Util.size.width,
    height:Util.size.height,
    backgroundColor:'#666',
    opacity:0.2,
  },
  content:{
    flex:1,
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems:'center'
  },
  inputContainer: {
    margin: normalize(10),
    borderWidth: 1,
    borderColor: headerBG,
    alignItems: 'center',
    flexDirection: 'row',
  },
  info:{
    fontWeight: '300',
    fontSize: 16,
    color: '#666',
    paddingTop:5,
    paddingLeft:20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#a9b7b7',
    textAlign:'center',
    padding:5,
    paddingTop:10,
    backgroundColor:'transparent',
  },
  container: {
    backgroundColor:'white',
    width:normalize(260),
    height:normalize(200),
    borderRadius:normalize(10),
    borderWidth:.2,
    borderColor:'#000',
    zIndex:1
  },
  style_view_commit:{  
    width:normalize(110),
    // flex:1,
    height:normalize(50),
      backgroundColor:'#666',
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  
});

module.exports = Dialog;


