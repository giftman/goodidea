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
import { logout} from '../../actions';

import { connect } from 'react-redux';
class ChangePasswd extends Component {
  constructor(props) {
    super(props);

    this.state={
      passwd:'a123456',
      newPasswd:'',
      newPasswd2:'',
    }
    // this.renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    // this.openSharingSettings = this.openSharingSettings.bind(this);
    // this.handleSegmentChanged = this.handleSegmentChanged.bind(this);
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
                  placeholder='当前密码'/>
              </View>
              <View style={styles.inputContainer}>
              <TextInput
                ref={(newPasswd) => this.newPasswd = newPasswd}
                onFocus={() => this.newPasswd.focus()}
                style={styles.input}
                onChangeText={(newPasswd) => {this.setState({newPasswd})}}
                underlineColorAndroid={'transparent'}
                placeholder='新密码'/>
            </View>
              <View style={styles.paddingHeight}/>
              <Text style={{fontSize:16,color:'#666',paddingBottom:10}}>(由字母和数字组成6-16个字符，且必须包含数字和字母，不允许连续三位相同。)</Text>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                  style={[styles.confirmBtn, {
                    backgroundColor: 'red'
                  }]}
                  onPress={() => this.props.logout(this.props.navigator)}>
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
        logout:(nav)=>dispatch(logout(nav)),
    };
}
module.exports = connect(select,actions)(ChangePasswd);
