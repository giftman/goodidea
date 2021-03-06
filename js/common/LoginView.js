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
} from 'react-native';
import { Text } from 'F8Text';
import TouchableOpacity from 'TouchableOpacity';
import {signup,login} from '../actions';
import  LoadingView  from './LoadingView';
const {connect} = require('react-redux');
import {toastShort} from '../utils/ToastUtil'
export type Status = 'login' | 'register';
var Navigator = require('Navigator');

export type Props = {
  status:Status,
  loading:bool,
  navigator:Navigator
}

class LoginView extends Component{
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
    let loadingView =this.props.loading === true ? <LoadingView /> : <View />;
    let words = ['一键注册','登录'];
    let content = (
      <View style={[styles.inputContainer,{marginTop:0,borderWidth:0,justifyContent:'space-between'}]}>
           <Text style={[styles.text,{}]}>第三方登陆:</Text>
           <Image source={require('../img/wechat.png')} style={{width:32,height:32,margin:5}} />
           <Image source={require('../img/QQ.png')} style={{width:32,height:32,margin:5}} />
           <View style={{flex:1}} />
           <Text style={[styles.text,{justifyContent:'flex-end'}]}>忘记密码？</Text>
           </View>
          
      );

    if(this.state.status === 'register'){
      words = ['返回','确定注册']
      content = (
         <View style={[styles.inputContainer,{marginTop:0,borderWidth:0,justifyContent:'flex-start'}]}>
          <Text style={[styles.text]}>继续注册即同意网络协议</Text>
          </View>
        );
    }
      return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor: 'transparent'}} >
        <View style={[styles.container,this.props.style]} >
          <View style={[styles.baseComponent]}>
            <View style={styles.toolbar} />
            <Image source={{uri:'http://www.i9133.com/static/img/logo.png?20150205001'}} style={styles.logo} />
           <View style={styles.inputContainer}>
           <Image source={{uri:'https://d17oy1vhnax1f7.cloudfront.net/items/2A2i1S1m3t3S2H1P2C2j/user.png?v=cec82b32'}} style={{width:30,height:30,margin:5}} />
           <TextInput
            ref={(username) => this.username = username}
            onFocus={() => this.username.focus()}
            style={styles.input}
            onChangeText={(username) => {this.setState({username})}}
             underlineColorAndroid={'transparent'}  
            placeholder='帐号'/>
           </View>
           <View style={styles.inputContainer}>
           <Image source={{uri:'https://d17oy1vhnax1f7.cloudfront.net/items/0c0O292N1H2U1g0c363O/pass.png?v=4e698746'}} style={{width:30,height:30,margin:5}} />
           <TextInput
            ref={(password) => this.password = password}
            onFocus={() => this.password.focus()}
            onChangeText={(passwd) => {this.setState({passwd})}}
            style={styles.input}
            placeholder='密码'
            underlineColorAndroid={'transparent'}  
            password={true}/>
           </View>
           {content}
          <View style={[styles.inputContainer,{marginTop:0,borderWidth:0,justifyContent:'space-between'}]}>
            <TouchableOpacity style={styles.style_view_commit}  activeOpacity={0.8} onPress={this.leftPress.bind(this)}><Text style={styles.buttonText}>{words[0]}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.style_view_commit,{backgroundColor:'#ff9600'}]} onPress={this.rightPress.bind(this)} activeOpacity={0.8}><Text style={styles.buttonText}>{words[1]}</Text></TouchableOpacity>
           </View>
          </View>
        </View>
        {loadingView}
        </View>
        );
      }
    

  leftPress(){
    console.log(this.state.username);
    console.log(this.state.passwd);
    if(this.state.status === 'login'){
      this.setState({status:'register'})
    }else{
      this.setState({status:'login'});
    }
  }

  rightPress(){
    const {dispatch} = this.props;
     if(this.state.status === 'login'){
       console.log(this.state.username);
       console.log(this.state.passwd);
       dispatch(login(this.state.username,this.state.passwd));
    
    }else{
      console.log(this.state.username);
      console.log(this.state.passwd);
      dispatch(signup(this.state.username, this.state.passwd));
    }
    
  }
}



const scale = Dimensions.get('window').width / 731;

function normalize(size: number): number {
  return Math.round(scale * size);
}

const styles = StyleSheet.create({
  toolbar: {
    height: normalize(35),
    width:normalize(600),
     alignSelf:'flex-start',
    backgroundColor:'#0890d6',
    borderTopLeftRadius:normalize(30),
    borderTopRightRadius:normalize(30),
    // color:'#000'
  },
  baseComponent:{
     alignItems: 'center',
     flex:1,
  },
  logo:{
    width:133,
    height:60,
  },
  inputContainer: {
    marginTop: normalize(5),
    height: normalize(92),
    width:normalize(530),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0fa0cf',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input:{
    flex:1,
    fontSize: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#a9b7b7'
  },
  container: {
    // flexDirection: 'row',
    backgroundColor:'white',
    width:normalize(600),
    height:normalize(545),
    borderRadius:normalize(30),
    borderWidth:.2,
    borderColor:'#0890d6'
  },
  style_view_commit:{  
    width:normalize(225),
    height:normalize(86),
      backgroundColor:'#63B8FF',
      borderRadius:15,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 18,
  },
  
});

function select(store) {
  return {
    loading: store.user.loading,
  };
}
module.exports = connect(select)(LoginView);
module.exports.__cards__ = (define) => {
  const menuItem = {
    title: 'Menu',
    icon: require('./img/hamburger.png'),
    onPress: () => alert('Menu button pressed!'),
  };
  const filterItem = {
    title: 'Filter',
    icon: require('./img/filter.png'),
    onPress: () => alert('Filter button pressed!'),
  };

  // define('Simple', () => <Header title="Hello, world" />);
  // define('With items', () => (
  //   <Header
  //     title="Default"
  //     leftItem={menuItem}
  //     rightItem={filterItem}
  //   />
  // ));
  
};

