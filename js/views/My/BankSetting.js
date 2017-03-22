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
import { getBankCardStatus} from '../../actions';
import { connect } from 'react-redux';


class BankSetting extends Component {

    _bind(){
      this.props.navigator.push({
              "my": 'bankAdd',
              data:this.props.data,
              title:'绑定银行卡',
              type:'add'
          });
    }

    _modify(card){
      this.props.getBankCardStatus('modify',{'card_id':card.id},this.props.navigator)
    }

    _lock(){
      this.props.getBankCardStatus('lock',{},this.props.navigator)
    }

    _del(card){
      this.props.getBankCardStatus('delete',{'card_id':card.id},this.props.navigator)
    }

    render() {
      var {old_card,bIsFirst} = this.props.data;
    // var   old_card = [{
    //     account:"**** **** **** 3219",
    //     bank:"中国工商银行",
    //     id:8
    //   }]
    // var   bIsFirst = false;
    if(old_card && old_card.length === 0){
      bIsFirst = true;
    }
      var leftItem = {
          layout: 'title',
          title: 'ios-arrow-back',
          onPress: () => this.props.navigator.pop(),
      };
      var haveCards = old_card.length;
      var tip = `你还可以绑定${4-haveCards}张卡`;
      var button = bIsFirst
      ? <View style={{paddingTop:20,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity
            style={[styles.confirmBtn]}
            onPress={() => this._bind()}>
            <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '400'
              }}>添加银行卡</Text>
            </TouchableOpacity>
      </View>
        :<View style={{flexDirection:'row',marginLeft:Util.size.width*.05,paddingTop:20,width:Util.size.width*.9,justifyContent:'space-around',alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.confirmBtn,{width:Util.size.width*.35}]}
              onPress={() => this._bind()}>
              <Text style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: '400'
                }}>增加绑定</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn,{width:Util.size.width*.35}]}
                onPress={() => this._lock()}>
                <Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '400'
                  }}>锁定银行卡</Text>
                </TouchableOpacity>
        </View>;
        var content = old_card.map((card,index)=>{
          return (
            <View style={styles.contentContainer} key={index}>
                <View style={[styles.left]}>
                  <Image style={styles.img} source={require('../../img/zhongguogongshangyinhang.png')} resizeMode='contain'/>
                  <View>
                    <Text style={styles.leftText}>{card.bank}</Text>
                    <Text style={styles.leftText}>{card.account}</Text>
                  </View>
                </View>
                <View style={styles.right}>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => this._modify(card)}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '400'
                      }}>修改</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button]}
                      onPress={() => this._del(card)}>
                      <Text style={{
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: '400'
                        }}>删除</Text>
                      </TouchableOpacity>
                </View>
            </View>
          )
        })
        return (
          <View style={styles.container}>
            <F8Header style={{
                backgroundColor: "#323245"
              }}
              title="我的银行卡"
              leftItem={leftItem}
              />
            <TipPadding content={tip} />
            {content}
            {button}
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
  contentContainer:{
    flexDirection:'row',
    padding:10,
    height:normalize(93),
    borderBottomWidth:.4,
    borderColor:'#666'
  },
  img:{
    width:normalize(50),
    height:normalize(50),
    // backgroundColor:'green',
    marginLeft:10,
    padding:10,
    borderRadius:normalize(25),
    backgroundColor:'white'
  },
  left:{
    flex:1,
    backgroundColor:'#CA5B5A',
    borderRadius:5,
    alignItems:'center',
    flexDirection:'row'
  },
  leftText:{
    fontSize:18,
    fontWeight:'400',
    color:'white',
    paddingLeft:10,
    paddingTop:10,
  },
  button:{
    width:normalize(59),
    height:normalize(30),
    backgroundColor:'#8F8468',
    marginTop:5,
    justifyContent:'center',
    alignItems:'center',
  },
  right:{
    width:normalize(80),
    paddingLeft:5,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'green'
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
      backgroundColor: '#DA543F',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      width: Util.size.width*.9,
      height: 40,
  },

})

function select(store) {
    return {
        username:store.user.username,
    };
}

function actions(dispatch) {
    return {
        getBankCardStatus:(action,data,nav)=>dispatch(getBankCardStatus(action,data,nav))
    };
}
module.exports = connect(select,actions)(BankSetting);
