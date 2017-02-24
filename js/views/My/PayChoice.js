'use strict';
import React, { Component } from "react";
import { StyleSheet, View, Image, Text,TextInput, Platform, ScrollView, TouchableOpacity } from "react-native";
import Util from '../../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../common/F8Colors'
import F8Header from '../../common/F8Header';
import TipPadding from '../TipPadding';
import {confirmPayOne,confirmPayTwo} from '../../actions';
import { connect } from 'react-redux';
class PayChoice extends Component {

  constructor(props) {
    super(props);

    this.state={
      amount:'',
    }
  }

    _onClick(tab) {
      var {data} = this.props;
      if(this.state.amount === ''){
        toastShort('请输入金额')
        return
      }
      if(data.deposit_mode === 2){
          this.props.confirmPayTwo(
          {
            'deposit_type':data.id,
            'bank':data.bank_list[0].id,
            'deposit_mode':2,
            'amount':this.state.amount
          },
          this.props.navigator)
      }else{
        var bank = data.bank_list ? data.bank_list[0].id :data.id;
        var postData = {
          'deposit_type':bank,
          'bank':bank,
          'deposit_mode':1,
          'amount':this.state.amount
        }
        if(data.is_pay_name){
          postData['account_name'] = this.props.username
        }
        this.props.confirmPayOne(
        postData,
        this.props.navigator)
      }

    }

    render() {
      var {data} = this.props;
      // data = {
      //       "id": 1003016,
      //       "status": true,
      //       "name": "微信支付_3",
      //       "deposit_mode": 2,
      //       "bank_list": [
      //           {
      //               "id": 1001102,
      //               "name": "微信",
      //               "code": "WX",
      //               "min_load": 2,
      //               "max_load": 3000
      //           }
      //       ]
      // }
      var leftItem = {
          layout: 'title',
          title: 'ios-arrow-back',
          onPress: () => this.props.navigator.pop(),
      };
      var tip = '单次最低充值2.0元，最高45000.0元';
      if(data.min_load){
        tip = `单次最低充值${data.min_load}元，最高${data.max_load}元`
      }
      if(data.bank_list && data.bank_list[0].min_load){
         tip = `单次最低充值${data.bank_list[0].min_load}元，最高${data.bank_list[0].max_load}元`
       }
        return (
          <View style={styles.container}>
            <F8Header style={{
                backgroundColor: "#323245"
              }}
              title="充值"
              leftItem={leftItem}
              />
            <TipPadding style={{height:50}} content='平台填写金额必须和银行转账金额一致（不包含手续费），否则充值无法到账'/>
            <View style={{
                        flex: 1
                      }}>
            <View style={styles.paddingHeight}/>
                      <TouchableOpacity
                        style={styles.itemContain}
                        onPress={()=>{}}>
                      <Image source={require('../../img/zijinmixi.png')} resizeMode='contain' />
                        <View style={styles.item}>
                          <Text style={styles.itemTitle}>{data.name}</Text>
                          <Icon
                            name='ios-arrow-forward'
                            size={25}
                            color="#eee">
                          </Icon>
                        </View>
                      </TouchableOpacity>

                      <View style={styles.paddingHeight}/>

                      <View style={styles.inputContainer}>
                        <Text style={{fontSize:16,paddingRight:5}}> 充值金额:</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={(amount) => {this.setState({amount})}}
                          underlineColorAndroid={'transparent'}
                          password={false}
                          placeholder='请在此输入金额'/>
                      </View>

                      <View style={styles.paddingHeight}/>
                      <View style={{justifyContent:'center',
                      alignItems:'center',width:Util.size.width}}>
                      <Text style={{color:'#666'}}>{tip}</Text>
                      </View>
                      <View style={styles.paddingHeight}/>

                      <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={[styles.confirmBtn, {
                                backgroundColor: '#DA543F'
                            }]} onPress={() => this._onClick()}>
                                <Text style={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: '400'
                            }}>确认充值</Text>
                            </TouchableOpacity>
                      </View>

              </View>

            </View>



            );
    }

}
let CONTENT_HEIGHT = Platform.OS === 'ios' ? 41 : 73;
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#eee',
        width: Util.size.width,
        height: Util.size.height - CONTENT_HEIGHT,

    },
    itemContain: {
        backgroundColor: 'white',
        height: 50,
        width: Util.size.width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15
    },
    item: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        paddingRight: 20,
        // borderBottomWidth: .5,
        borderColor: '#bbb'
    },
    itemTitle: {
        fontWeight: '400',
        fontSize: 18,
        color: 'gray'
    },
    paddingHeight: {
        width: Util.size.width,
        height: 15,
        backgroundColor: '#eee'
    },
    logo:{
      width:42,
      height:42,
      marginBottom:5,
      borderRadius:20,
      padding:8,
      backgroundColor:'#fff'
    },
    inputContainer: {
      // marginTop: normalize(5),
      height: normalize(40),
      width:Util.size.width ,
      // borderRadius: 5,
      // borderWidth: 0.11,
      borderColor: '#eee',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor:'#fff',
      padding:10,
    },
    input:{
      flex:1,
      fontSize: 16,
    },
    confirmBtn: {
       backgroundColor: 'red',
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 5,
       width: Util.size.width*.9,
       height: 50,
   },
})

function select(store) {
    return {
        username:store.user.username,
        balance:store.user.balance,
    };
}

function actions(dispatch) {
    return {
      confirmPayTwo:(data,nav)=>dispatch(confirmPayTwo(data,nav)),
      confirmPayOne:(data,nav)=>dispatch(confirmPayOne(data,nav)),
    };
}
module.exports = connect(select,actions)(PayChoice);