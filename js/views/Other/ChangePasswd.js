'use strict';

import React, { Component } from 'react';

import { View, Text,ScrollView, TouchableOpacity,TextInput} from 'react-native';

import Util from '../../utils/Util';
import { toastShort } from '../../utils/ToastUtil';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import EasyButton from '../../common/EasyButton';
import {normalize,headerBG} from '../../common/F8Colors';
import { resetPasswordA} from '../../actions';

import { connect } from 'react-redux';
class ChangePasswd extends Component {
  constructor(props) {
    super(props);

    this.state={
      passwd:'',
      newPasswd:'',
      newPasswd2:'',
    }
    // this.renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    // this.openSharingSettings = this.openSharingSettings.bind(this);
    // this.handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }


  _resetClick(){
    console.log("_resetClick");
    if(this.state.newPasswd === this.state.newPasswd2){
      let new_password = this.state.newPasswd;
      let old_password = this.state.passwd;
      let data = {"new_password":new_password,"old_password":old_password};
      this.props.resetPasswordA(this.props.username,data);
    }else{
      this.setState({
        newPasswd:'',
        newPasswd2:'',
      })
      toastShort("两次密码输入不一致，请重新输入")
    }

  }

    render() {

        var leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };

        return (
          <View style={styles.container}>
            <F8Header
              style={{
                backgroundColor: "#323245"
              }}
              title="修改登录密码"
              leftItem={leftItem}
              >
            </F8Header>
            <View style={{
                flex: 1,
                justifyContent:'flex-start',
                alignItems:'center',
              }}>
              <View style={styles.paddingHeight}/>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={(passwd) => this.passwd = passwd}
                  onFocus={() => this.passwd.focus()}
                  style={styles.input}
                  onChangeText={(passwd) => {this.setState({passwd})}}
                  underlineColorAndroid={'transparent'}
                  password={true}
                  placeholder='当前密码'/>
              </View>
              <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(newPasswd) => {this.setState({newPasswd})}}
                underlineColorAndroid={'transparent'}
                password={true}
                placeholder='新密码'/>
            </View>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(newPasswd2) => {this.setState({newPasswd2})}}
              underlineColorAndroid={'transparent'}
              password={true}
              placeholder='确认新密码'/>
          </View>
              <View style={styles.paddingHeight}/>
              <Text style={{fontSize:16,color:'#666',paddingBottom:10}}>(由字母和数字组成6-16个字符，且必须包含数字和字母，不允许连续三位相同。)</Text>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                  style={[styles.confirmBtn, {
                    backgroundColor: 'red'
                  }]}
                  onPress={() => this._resetClick()}>
                  <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '400'
                    }}>确认修改</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eaeaea',
        flex:1
    },
    inputContainer: {
      // marginTop: normalize(5),
      height: normalize(50),
      width:Util.size.width * 0.9,
      // borderRadius: 5,
      // borderWidth: 0.11,
      borderColor: headerBG,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor:'#fff',
      padding:5,
    },
    input:{
      flex:1,
      fontSize: 16,
    },
    paddingHeight: {
        width: Util.size.width,
        height: 15,
        backgroundColor: '#eee'
    },
     confirmBtn: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: Util.size.width*.9,
        height: 50,
    },

});

function select(store) {
    return {
        username:store.user.username,
    };
}

function actions(dispatch) {
    return {
        clearPackage:()=>dispatch(clearPackage()),
        resetPasswordA:(user,data)=>dispatch(resetPasswordA(user,data)),
    };
}
module.exports = connect(select,actions)(ChangePasswd);
