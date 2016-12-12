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
  TouchableHighlight,
  Navigator,
  NativeModules,
  Alert,
  Modal
} from 'react-native';
// import {signup,login} from '../actions';
const {connect} = require('react-redux');
import EasyCheckBox from '../common/EasyCheckBox';
// import {toastShort} from '../utils/ToastUtil'
export type Status = 'login' | 'register';

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
      show:false,
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
         <Modal
           animationType='slide'
           transparent={true}
           visible={this.state.show}
           onShow={() => {}}
           onRequestClose={() => {}} >
           <View style={styles.modalStyle}>
             <View style={styles.subView}>
               <Text style={styles.titleText}>
                 提示
               </Text>
               <Text style={styles.contentText}>
                 Modal显示的View 多行了超出一行了会怎么显示，就像这样显示了很多内容该怎么显示，看看效果
               </Text>
               <View style={styles.horizontalLine} />
               <View style={styles.buttonView}>
                 <TouchableHighlight underlayColor='transparent'
                   style={styles.buttonStyle}
                   onPress={this.rightPress.bind(this)}>
                   <Text style={styles.buttonText}>
                     取消
                   </Text>
                 </TouchableHighlight>
                 <View style={styles.verticalLine} />
                 <TouchableHighlight underlayColor='red'
                   style={[styles.buttonStyle,{backgroundColor:'red'}]}
                   onPress={this.rightPress.bind(this)}>
                   <Text style={styles.buttonText}>
                     确定
                   </Text>
                 </TouchableHighlight>
               </View>
             </View>
           </View>
        </Modal>
        <View style={[styles.container,this.props.style]} >
         <EasyCheckBox icon="md-checkbox"/>
          <View style={[styles.baseComponent]}>
            <View style={styles.toolbar} />
            <Image source={require('../img/logo.png')} style={styles.logo} />
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
    console.log("leftPress");
    console.log(this.state.passwd);
    if(this.state.status === 'login'){
      this.setState({status:'register'})
    }else{
      this.setState({status:'login'});
    }
// var RNBridgeModule=NativeModules.RNBridgeModule;
// RNBridgeModule.RNInvokeOCCallBack(
//             {'name':'jiangqq','description':'http://www.lcode.org'},
//             (error,events)=>{
//                 if(error){
//                   console.error(error);
//                 }else{
//                   // this.setState({events:events});
//                   // console.log("success");
//                   console.log(events);
//                 }
//           }
//         )


}

 // async _updateEvents(){
 //    var RNBridgeModule=NativeModules.RNBridgeModule;
 //  //获取Promise对象处理
 //    try{
 //        var events=await RNBridgeModule.RNInvokeOCPromise({'name':'jiangqq'});
 //        console.log(events);
 //    }catch(e){
 //        console.log(e.message);
 //        // this.setState({events:e.message});
 //    }
 //  } 

  rightPress(){
    // const {dispatch} = this.props;
    //  if(this.state.status === 'login'){
    //    console.log(this.state.username);
    //    console.log(this.state.passwd);
    //    dispatch(login(this.state.username,this.state.passwd));
    
    // }else{
    //   console.log(this.state.username);
    //   console.log(this.state.passwd);
    //   dispatch(signup(this.state.username, this.state.passwd));
    // }
    let isShow = this.state.show;
    this.setState({
      show:!isShow,
    });
    // Alert.alert(
    //         'Alert Title',
    //         "alertMessage",
    //       );
    // Alert.alert(
    //         'Alert Title',
    //         alertMessage,
    //         [
    //           {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
    //           {text: 'OK', onPress: () => console.log('OK Pressed!')},
    //         ]
    //       )
    
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
  // modal的样式
  modalStyle: {
    // backgroundColor:'#ccc',
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
  },
  // modal上子View的样式
  subView:{
    marginLeft:60,
    marginRight:60,
    backgroundColor:'#fff',
    alignSelf: 'stretch',
    justifyContent:'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor:'#ccc',
  },
  // 标题
  titleText:{
    marginTop:10,
    marginBottom:5,
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center',
  },
  // 内容
  contentText:{
    margin:8,
    fontSize:14,
    textAlign:'center',
  },
  // 水平的分割线
  horizontalLine:{
    marginTop:5,
    height:0.5,
    backgroundColor:'#ccc',
  },
  // 按钮
  buttonView:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle:{
    flex:1,
    height:44,
    alignItems: 'center',
    justifyContent:'center',
  },
  // 竖直的分割线
  verticalLine:{
    width:0.5,
    height:44,
    backgroundColor:'#ccc',
  },
  buttonText:{
    fontSize:16,
    color:'#3393F2',
    textAlign:'center',
  },
  
});

function select(store) {
  return {
    loading: store.user.loading,
  };
}
module.exports = connect(select)(LoginView);


