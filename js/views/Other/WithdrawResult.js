'use strict';

import React, { Component } from 'react';

import { View, Text, TouchableOpacity,TextInput} from 'react-native';

import Util from '../../utils/Util';
import { toastShort } from '../../utils/ToastUtil';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import EasyButton from '../../common/EasyButton';
import {normalize,headerBG} from '../../common/F8Colors';

class WithdrawalResult extends Component {

  _resetClick(){
      this.props.navigator.resetTo({
        "twitterTab":true
      });
  }

    render() {
        return (
          <View style={styles.container}>
            <F8Header
              style={{
                backgroundColor: "#323245"
              }}
              title="提现结果"
              >
            </F8Header>



            <View style={styles.paddingHeight}/>
            <View style={styles.body}>
              <Icon  name="md-checkmark-circle" size={60} color="green" />
              <Text >提取成功</Text>
              <Text style={{paddingTop:10,color:'#666'}}>请耐心等待几分钟，查看是否到帐。</Text>

            </View>
            <View style={styles.paddingHeight}/>
            <View style={{paddingLeft:Util.size.width*.1,paddingRight:Util.size.width*.1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'transparent',}}>
              <TouchableOpacity
                style={[styles.confirmBtn, {
                  backgroundColor: '#DA543F'
                }]}
                onPress={() => this._resetClick()}>
                <Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '400'
                  }}>继续提现</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmBtn, {
                    backgroundColor: '#DA543F'
                  }]}
                  onPress={() => this._resetClick()}>
                  <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '400'
                    }}>查看提现记录</Text>
                  </TouchableOpacity>
                </View>

              </View>
        )
    }
}



const styles = StyleSheet.create({
    body:{
      height:Util.size.width*.6,
      borderWidth:1,
      borderColor:'#eee',
      width:Util.size.width,
      justifyContent:'center',
      alignItems:'center',
    },
    container:{
        backgroundColor:'#F7F7F7',
        flex:1
    },
    paddingHeight: {
        width: Util.size.width,
        height: 15,
        backgroundColor: '#eee'
    },
     confirmBtn: {
        backgroundColor: '#DA543F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: Util.size.width*.35,
        height: 50,
    },

});

module.exports = WithdrawalResult;
