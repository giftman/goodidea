'use strict';

import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableOpacity,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import Util from '../../utils/Util';
import { toastShort } from '../../utils/ToastUtil';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import EasyButton from '../../common/EasyButton';
import {normalize,headerBG} from '../../common/F8Colors';
import TipPadding from '../TipPadding';
import { resetMoneyPass} from '../../actions';

import { connect } from 'react-redux';
class WithdrawalInfo extends Component {
  constructor(props) {
    super(props);

    this.state={
      bank:{},
      amount:'0',
    }
    // this.renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    // this.openSharingSettings = this.openSharingSettings.bind(this);
    // this.handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }


  _resetClick(){
    console.log("_resetClick");
    if(this.state.bank
      && parseInt(this.state.amount)
      && parseInt(this.state.amount) >= parseInt(this.props.data.withdraw_default_min_amount)
    ){
      this.props.navigator.push({
        my:'withdrawApply',
        data:this.props.data,
        bank:this.state.bank,
        amount:this.state.amount,
      })
    }else{
      toastShort('请选择银行并且输入正确金额')
    }

  }

    render() {

        var leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };
        var {
          withdraw_one_fee,
          day_withdraw_limit,
          day_withdraw_count,
          day_free_count,
          balance,
          withdraw_default_min_amount,
          withdraw_default_max_amount,
          bankcards ,
          is_user_security_questions,
          user_security_questions
       } = this.props.data
       var tip = '每日限提20次，今天您已经发起了0次提现申请，每日免费提现3次，今日已经免费提现0次';
       var info = '单笔最低提现金额 100 元，最高 50000 元，超过免费提现次数，则单次提现将收取2元手续费';
        if(day_withdraw_limit){
          tip = `每日限提${day_withdraw_limit}次，今天您已经发起了${day_withdraw_count}次提现申请，
                 每日免费提现${day_free_count}次，今日已经免费提现${day_withdraw_count}次`
          info = `单笔最低提现金额 ${withdraw_default_min_amount} 元，最高 ${withdraw_default_max_amount} 元，超过免费提现次数，则单次提现将收取${withdraw_one_fee}元手续费`
        }
      var options = []
      if(bankcards){
        bankcards.forEach((i)=>{
          var des = '至' + i.account_name + ' ' + i.account + ' [' + i.bank + ']'
          options.push(des)
        })
      }

        return (
          <View style={styles.container}>
            <F8Header
              style={{
                backgroundColor: "#323245"
              }}
              title="提现"
              leftItem={leftItem}
              >
            </F8Header>

            <View style={{
                flex: 1,
                justifyContent:'flex-start',
                alignItems:'center',
              }}>
              <TipPadding style={{height:60}} content={tip} />
              <View style={[styles.inputContainer,{backgroundColor:'#eaeaea'}]}>
                <Text style={{fontSize:16,paddingRight:5}}> 用户名:</Text>
                <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> {this.props.username}</Text>
              </View>
              <View style={[styles.inputContainer,{backgroundColor:'#eaeaea'}]}>
                <Text style={{fontSize:16,paddingRight:5}}> 可提现金额:</Text>
                <Text style={{fontSize:16,paddingRight:5,color:'#DC5341'}}>
                  {balance} 元
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}> 到账银行卡: </Text>
                <ModalDropdown
                    defaultValue={' 请选择收款银行卡'}
                    style={{padding:5,alignItems:'flex-start',backgroundColor:'transparent'}}
                    options={options}
                    textStyle={{color:'#666',fontSize:16,textAlign:'left',width:Util.size.width*.8}}
                    onSelect={(i,value) => this.setState({bank:bankcards[i]})}
                    />
              </View>
              <View style={styles.paddingHeight}/>

              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}> 提现金额:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(amount) => {this.setState({amount})}}
                  underlineColorAndroid={'transparent'}
                  password={false}
                  placeholder='请在此输入金额'/>
              </View>
              <View style={styles.paddingHeight}/>
              <Text style={{fontSize:16,color:'#666',padding:10}}>
                {info}
              </Text>
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
                    }}>下一步</Text>
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
        resetMoneyPass:(user,data)=>dispatch(resetMoneyPass(user,data)),
    };
}
module.exports = connect(select,actions)(WithdrawalInfo);
