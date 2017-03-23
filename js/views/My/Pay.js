'use strict';
import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Platform, ScrollView, TouchableOpacity } from "react-native";
import Util from '../../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../common/F8Colors'
import F8Header from '../../common/F8Header';

class Pay extends Component {

    onClick(tab) {
      if(tab){
        this.props.navigator.push({
          my:'payChoice',
          data:tab
        })
      }

    }

    render() {
      var {data} = this.props;
      var leftItem = {
          layout: 'title',
          title: 'ios-arrow-back',
          onPress: () => this.props.navigator.pop(),
      };
      var type1 = [];
      var type2 = [];
      data.pay_list.forEach((item) => {
        if(item.status){
          if(item.deposit_mode === 2){
            type2.push(item)
          }else{
            type1.push(item)
          }
        }
      })
      console.log(type2);
      console.log(type1);
      var type1View = type1.map((item,index)=>{
        return (
          <TouchableOpacity
            style={styles.itemContain}
            key={index}
            onPress={() => this.onClick(item)}>
          <Image source={require('../../img/youxijilu.png')} resizeMode='contain' />
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Icon
                name='ios-arrow-forward'
                size={25}
                color="#eee">
              </Icon>
            </View>
          </TouchableOpacity>
        )
      })

      var type2View = type2.map((item,index)=>{
        return (
          <TouchableOpacity
            style={styles.itemContain}
            key={index}
            onPress={() => this.onClick(item)}>
          <Image source={require('../../img/youxijilu.png')} resizeMode='contain' />
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Icon
                name='ios-arrow-forward'
                size={25}
                color="#eee">
              </Icon>
            </View>
          </TouchableOpacity>
        )
      })

        return (
          <View style={styles.container}>
            <F8Header style={{
                backgroundColor: "#323245"
              }}
              title="充值"
              leftItem={leftItem}
              />
                    <ScrollView style={{
                        flex: 1
                      }}>
                      <View style={styles.paddingHeight}/>
                      {type2View}
                      <View style={styles.paddingHeight}/>
                      {type1View}
                      <View style={styles.paddingHeight}/>

              </ScrollView>

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
        borderBottomWidth: .5,
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
})


module.exports = Pay;
