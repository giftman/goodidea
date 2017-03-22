'use strict';
import React, { Component } from "react";
import { StyleSheet, Picker, View, Image, Text,TextInput, Platform, ScrollView, TouchableOpacity } from "react-native";
import Util from '../../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../common/F8Colors'
import F8Header from '../../common/F8Header';
import PickerView from '../../common/PickerView';
import TipPadding from '../TipPadding';
import {delBankCard,lockBankCard} from '../../actions';
import { toastShort } from '../../utils/ToastUtil';
import { connect } from 'react-redux';

class BankDelete extends Component {

  constructor(props) {
    super(props);
    this.state={
      answers:'',
      passwd:'',
      username:'',
      card:'',
    }
  }


    _onClick() {
      var {type,data} = this.props
      if(this.state.answers != '' && this.state.passwd != ''){
        var sendData = {
          answer:this.state.answers,
          fund_password:this.state.passwd
        }
        if(type === 'lock'){
          this.props.lockBankCard(sendData,this.props.navigator);
        }else{
          sendData['old_card_id'] = data.card.id
          sendData['old_account'] = this.state.card
          sendData['old_account_name'] = this.state.username
          this.props.delBankCard(sendData,this.props.navigator);
        }
      }else{
        toastShort("请输入问题答案并输入密码")
      }
    }

    render() {
      var {data,title,type} = this.props;
      var leftItem = {
          layout: 'title',
          title: 'ios-arrow-back',
          onPress: () => this.props.navigator.pop(),
      };
      var tip = '请填写安全问题的答案';

        return (
          <View style={styles.container}>
            <F8Header
              style={{
                backgroundColor: "#323245"
              }}
              title={title}
              leftItem={leftItem}
              />
            <View style={{
                flex: 1,
                alignItems:'center',
              }}>
              <View style={styles.paddingHeight}/>
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}> 已绑卡</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(answers) => {this.setState({answers})}}
                  underlineColorAndroid={'transparent'}
                  password={false}
                  value={data.card.bank + ' ' + data.card.account}/>
              </View>
              <View style={styles.paddingHeight}/>
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}> 开户人姓名</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(username) => {this.setState({username})}}
                  underlineColorAndroid={'transparent'}
                  password={false}
                  placeholder={'请输入旧银行卡开户人姓名'}/>
              </View>
              <View style={styles.paddingHeight}/>
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}> 银行账号</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(card) => {this.setState({card})}}
                  underlineColorAndroid={'transparent'}
                  password={false}
                  placeholder={'请输入旧银行卡卡号'}/>
              </View>
              <View style={styles.paddingHeight}/>
              {data.question ?
              <View style={styles.inputContainer}>
                <Text style={{fontSize:16,paddingRight:5}}> 安全问题</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(answers) => {this.setState({answers})}}
                  underlineColorAndroid={'transparent'}
                  password={false}
                  placeholder={data.question}/>
              </View>:<View />}


              <View style={styles.paddingHeight}/>

              {data.question ?
                <View style={{justifyContent:'flex-start',
                  alignItems:'center',width:Util.size.width}}>
                  <Text style={{paddingLeft:20,alignSelf:'flex-start',color:'#666'}}>请填写安全问题的答案</Text>
                </View>:<View />}


              <View style={styles.paddingHeight}/>
                {data.need_fund_password == 1 ?
                  <View style={styles.inputContainer}>
                    <Text style={{fontSize:16,paddingRight:5}}> 资金密码:</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(passwd) => {this.setState({passwd})}}
                      underlineColorAndroid={'transparent'}
                      password={true}
                      placeholder=''/>
                  </View>:<View />}

              <View style={styles.paddingHeight}/>

              <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                  style={[styles.confirmBtn, {
                    backgroundColor: '#DA543F'
                  }]}
                  onPress={() => this._onClick()}>
                  <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '400'
                    }}>{type === 'modify'?'确认修改':'确认删除'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.paddingHeight}/>
                <View style={{justifyContent:'center',
                  alignItems:'center',width:Util.size.width}}>
                  <Text style={{color:'#666'}}>{type === 'lock'
                    ?'为了账户的资金安全...'
                    :''}</Text>
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
      height: normalize(50),
      width:Util.size.width*0.9 ,
      borderRadius: 5,
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
    };
}

function actions(dispatch) {
    return {
      lockBankCard:(data,nav)=>dispatch(lockBankCard(data,nav)),
        delBankCard:(data,nav)=>dispatch(delBankCard(data,nav))
    };
}
module.exports = connect(select,actions)(BankDelete);
