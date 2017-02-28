'use strict';

import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableOpacity,TextInput} from 'react-native';

import Util from '../../utils/Util';
import { toastShort } from '../../utils/ToastUtil';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import EasyButton from '../../common/EasyButton';
import {normalize,headerBG} from '../../common/F8Colors';
import { withdrawApply} from '../../actions';

import { connect } from 'react-redux';
class WithdrawalApply extends Component {
  constructor(props) {
    super(props);

    this.state={
      answers: '',
      passwd: '',
    }
    // this.renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    // this.openSharingSettings = this.openSharingSettings.bind(this);
    // this.handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }


  _resetClick(){
    console.log("_resetClick");
    if(this.state.passwd && this.state.answers ){
      var data = {
          'bankcard_id':this.props.bank.id,
          'fund_password':this.state.passwd,
          'amount':this.props.amount,
          'question':this.state.answers,
      }
      this.props.withdrawApply(data,this.props.navigator)
    }else{
      toastShort('请先填写内容')
    }

  }

    render() {

        var leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };
        // var bank = {//当前绑定的银行卡,多条数据 用户可以动态选择
        //     "id": 4,//银行卡ID
        //     "account": "**** **** **** *** 1232",//银行账户
        //     "account_name": "ddd",//开户人姓名
        //     "bank": "中国工商银行",//开户行
        //     "province": "北京",//省
        //     "city": "东城区"//市
        // }
        var {bank,amount} = this.props
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
          user_security_questions,
       } = this.props.data
  //      {
  //       "is_withdrawal_fee_flg": true, //当前系统是否开启了提现手续费
  //       "withdraw_one_fee": "3",//单笔提现收费金额
  //       "day_withdraw_limit": "20",//每日最大提现笔数
  //       "day_withdraw_count": 0,//今日提现笔数(已用)
  //       "day_free_count": "3",//今日剩余免费提现笔数
  //       "balance": "80808.788800",//当前账户余额
  //       "withdraw_default_min_amount": "1",//最小提现金额(动态)
  //       "withdraw_default_max_amount": "49999",//最大提现金额(动态)
  //       "bankcards": [{//当前绑定的银行卡,多条数据 用户可以动态选择
  //           "id": 4,//银行卡ID
  //           "account": "**** **** **** *** 1232",//银行账户
  //           "account_name": "ddd",//开户人姓名
  //           "bank": "中国工商银行",//开户行
  //           "province": "北京",//省
  //           "city": "东城区"//市
  //       },],
  //       "is_user_security_questions": true,//当前是否需要验证密保问题
  //      "user_security_questions": "你的问题"//如果当前需要验证密保问题 则此处会出现 类似:您最喜欢的数字?之类的文字
  //  }
      var tipPay = day_withdraw_count >= day_free_count ? withdraw_one_fee : 0;


        return (
          <View style={styles.container}>
            <F8Header
              style={{
                backgroundColor: "#323245"
              }}
              title="提现申请"
              leftItem={leftItem}
              >
            </F8Header>

            <View style={{
                flex: 1,
                justifyContent:'flex-start',
                alignItems:'center',
              }}>
              <View style={styles.paddingHeight}/>

              <View style={[styles.inputContainer,{backgroundColor:'#fff'}]}>
                <Text style={{fontSize:16,paddingRight:5}}> 用户名:</Text>
                <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> {this.props.username}</Text>
              </View>
              <View style={styles.paddingHeight}/>

              <View style={[styles.inputContainer]}>
                <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> 可提现金额:</Text>
                <Text style={{fontSize:16,paddingRight:5,color:'#DC5341'}}>
                  {balance} 元
                </Text>
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> 提现金额:</Text>
                <Text style={{fontSize:16,paddingRight:5,color:'#DC5341'}}>
                  {amount} 元
                </Text>
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> 手续费:</Text>
                <Text style={{fontSize:16,paddingRight:5,color:'#DC5341'}}>
                  {tipPay} 元
                </Text>
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> 实际到账金额:</Text>
                <Text style={{fontSize:16,paddingRight:5,color:'#DC5341'}}>
                  {amount - tipPay} 元
                </Text>
              </View>
              <View style={{backgroundColor:'#eaeaea',paddingLeft:10,paddingRight:10,paddingTop:10}}>
                  <View style={[styles.inputContainer,{backgroundColor:'#eaeaea',padding:0,height:normalize(30)}]}>
                      <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> 开户银行名称: </Text>
                      <Text style={{fontSize:16,paddingRight:5,color:'#000'}}>
                        {bank.bank}
                      </Text>
                  </View>
                  <View style={[styles.inputContainer,{backgroundColor:'#eaeaea',padding:0,height:normalize(30)}]}>
                      <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> 开户城市: </Text>
                      <Text style={{fontSize:16,paddingRight:5,color:'#000'}}>
                        {bank.province + ' ' + bank.city}
                      </Text>
                  </View>
                  <View style={[styles.inputContainer,{backgroundColor:'#eaeaea',padding:0,height:normalize(30)}]}>
                      <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> 开户人姓名: </Text>
                      <Text style={{fontSize:16,paddingRight:5,color:'#000'}}>
                        {bank.account_name}
                      </Text>
                  </View>
                  <View style={[styles.inputContainer,{backgroundColor:'#eaeaea',padding:0,height:normalize(30)}]}>
                      <Text style={{fontSize:16,paddingRight:5,color:'#666'}}> 银行卡号: </Text>
                      <Text style={{fontSize:16,paddingRight:5,color:'#000'}}>
                        {bank.account}
                      </Text>
                  </View>
              </View>
              <View style={styles.paddingHeight}/>
              {is_user_security_questions === true?
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}>{user_security_questions}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(answers) => {this.setState({answers})}}
                  underlineColorAndroid={'transparent'}
                  password={false}
                  placeholder='请填写安全问题'/>
              </View> : <View />}
              <View style={styles.paddingHeight}/>
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}>确认资金密码:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(passwd) => {this.setState({passwd})}}
                  underlineColorAndroid={'transparent'}
                  password={true}
                  placeholder='请输入密码'/>
              </View>
              <View style={styles.paddingHeight}/>
              <Text style={{fontSize:16,color:'#666',padding:10}}>
              </Text>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                  style={[styles.confirmBtn, {
                    backgroundColor: '#DA543F'
                  }]}
                  onPress={() => this._resetClick()}>
                  <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '400'
                    }}>点击提现</Text>
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
      height: normalize(40),
      width:Util.size.width,
      // borderRadius: 5,
      // borderWidth: 0.11,
      borderColor: headerBG,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor:'#fff',
      padding:5,
      paddingLeft:10,
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
        withdrawApply:(data,nav)=>dispatch(withdrawApply(data,nav)),
    };
}
module.exports = connect(select,actions)(WithdrawalApply);
