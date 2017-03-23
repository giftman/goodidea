'use strict';
import React, { Component } from "react";
import { StyleSheet, Clipboard, View, Image, Text, Platform, ScrollView, TouchableOpacity } from "react-native";
import Util from '../../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../common/F8Colors'
import F8Header from '../../common/F8Header';
import TipPadding from '../TipPadding';
import CountDown from '../../common/CountDown';
import { toastShort } from '../../utils/ToastUtil';



class PayOneResult extends Component {

    _resetClick(tab) {
      Clipboard.setString(tab);
      toastShort('已复制<' + tab + '>')
    }

    render() {
      var {data} = this.props;
      var leftItem = {
          layout: 'title',
          title: 'ios-arrow-back',
          onPress: () => this.props.navigator.pop(),
      };
      var bankAccount = data.deposit.accept_email === '' ? data.deposit.accept_card_num:data.deposit.accept_email;

        return (
          <View style={styles.container}>
            <F8Header style={{
                backgroundColor: "#323245"
              }}
              title="充值"
              leftItem={leftItem}
              />
              <TipPadding >
                <CountDown
                  text={'此次充值申请的有效时间为15分钟  仅剩:'}
                  time={15*60}
                  changeAfterTen={false}
                  stop={true}
                  />
              </TipPadding>
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}> 充值附言号: </Text>
                <Text style={{fontSize:16,paddingRight:5,color:'red'}}>{data.deposit.company_order_num}</Text>
                <View style={{flex:1}} />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    style={[styles.confirmBtn]}
                    onPress={() => this._resetClick(data.deposit.mownecum_order_num)}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '400'
                      }}>复制</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.paddingHeight}/>
              <Text style={{fontSize:14,padding:5,color:'#666'}}>  <Icon name='ios-alert-outline' size={16}/> 附言区分大小写，请正确输入 </Text>
              <Text style={{fontSize:14,padding:5,color:'#666'}}>  收款方信息</Text>

              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5,color:'#959595'}}> 订单金额: </Text>
                <Text style={{fontSize:16,paddingRight:5}}>{data.deposit.amount} 元</Text>
                <View style={{flex:1}} />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    style={[styles.confirmBtn]}
                    onPress={() => this._resetClick(data.deposit.amount)}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '400'
                      }}>复制</Text>
                    </TouchableOpacity>
                </View>
              </View>
              {
                (data.oCollectionBank && data.oCollectionBank.Name)?
                <View style={styles.inputContainer}>
                  <Text style={{fontSize:16,paddingRight:5,color:'#959595'}}> 收款银行: </Text>
                  <Text style={{fontSize:16,paddingRight:5}}>{data.oCollectionBank.Name}</Text>
                </View>
                :<View />
              }

              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5,color:'#959595'}}> 开户城市: </Text>
                <Text style={{fontSize:16,paddingRight:5}}>{data.deposit.accept_bank_address}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5,color:'#959595'}}> 收款户名: </Text>
                <Text style={{fontSize:16,paddingRight:5}}>{data.deposit.accept_acc_name}</Text>
                <View style={{flex:1}} />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    style={[styles.confirmBtn]}
                    onPress={() => this._resetClick(data.deposit.accept_acc_name)}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '400'
                      }}>复制</Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5,color:'#959595'}}> 收款帐号: </Text>
                <Text style={{fontSize:16,paddingRight:5}}>{bankAccount}</Text>
                <View style={{flex:1}} />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    style={[styles.confirmBtn]}
                    onPress={() => this._resetClick(bankAccount)}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '400'
                      }}>复制</Text>
                    </TouchableOpacity>
                </View>
              </View>
              {
                (data.oCollectionBank && data.oCollectionBank.Notice)?
                <Text style={{fontSize:14,padding:20,color:'#666'}}>{data.oCollectionBank.Notice}</Text>
                :<View />
              }

            </View>



            );
    }

}
let CONTENT_HEIGHT = Platform.OS === 'ios' ? 41 : 73;
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
      backgroundColor: '#8F8468',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      width: Util.size.width*.15,
      height: 30,
  },
})


module.exports = PayOneResult;
