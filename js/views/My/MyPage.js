'use strict';
import React, { Component } from "react";
import { StyleSheet, View, Text, Platform, ScrollView, TouchableOpacity } from "react-native";
import Util from '../../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../common/F8Colors'
import { getGameRecord , getTraceRecord , getMoneyDetail} from '../../actions';
import { connect } from 'react-redux';

function formatMinutes(minutes){
    var day = parseInt(Math.floor(minutes / 86400));
    var hour = day >0? Math.floor((minutes - day*86400)/3600):Math.floor(minutes/3600);
    var minute = hour > 0? Math.floor((minutes -day*86400 - hour*3600)/60):Math.floor(minutes/60);
    var second = minute > 0? Math.floor(minutes -day*86400 - hour*3600-minute*60):minutes;
    var time="";
    if (day > 0) time += day + "天";
    if (hour > 0) time += hour + "小时";
    if (minute > 0) time += minute + "分钟";
    time += second+"秒";
    return time;
}
class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fund: 0,
        }
    }


    onClick(tab) {
        console.log(tab);
        var gameInfo = {};
        gameInfo['page']=1;
        var timestamp = new Date().getTime()

        var todate=new Date(timestamp).getDate();
        var tomonth=new Date(timestamp).getMonth()+1;
        var toyear=new Date(timestamp).getFullYear();
        var bought_at_to=toyear + '-' + tomonth + '-'+todate;
        //查询一个星期内订单
        var from_timestamp = new Date().getTime() - 60*60*24*7*1000
        var fromdate=new Date(from_timestamp).getDate();
        var frommonth=new Date(from_timestamp).getMonth()+1;
        var fromyear=new Date(from_timestamp).getFullYear();
        var bought_at_from=fromyear + '-' + frommonth + '-'+fromdate;

        console.log(gameInfo);
        switch (tab) {
          case "gameRecord":
          // gameInfo['bought_at_from']=new Date();
          gameInfo['bought_at_from']=bought_at_from + ' 00:00:00';
          // gameInfo['bought_at_to']=new Date();
          gameInfo['bought_at_to']= bought_at_to + ' 23:59:59';
            this.props.getGameRecord(gameInfo,this.props.navigator);
            break;
          case "traceRecord":
          // gameInfo['bought_at_from']=new Date();
          gameInfo['bought_at_from']=bought_at_from + ' 00:00:00';
          // gameInfo['bought_at_to']=new Date();
          gameInfo['bought_at_to']= bought_at_to + ' 23:59:59';
            this.props.getTraceRecord(gameInfo,this.props.navigator);
            break;
          case "moneyDetail":
          // gameInfo['bought_at_from']=new Date();
          gameInfo['created_at_from']=bought_at_from + ' 00:00:00';
          // gameInfo['bought_at_to']=new Date();
          gameInfo['created_at_to']= bought_at_to + ' 23:59:59';
            this.props.getMoneyDetail(gameInfo,this.props.navigator);
            break;
          default:
            this.props.navigator.push({
                "my": tab
            });
        }
    }

//
    render() {
        return (
            <View style={styles.container}>
            <View style={{
                width: Util.size.width,
                height: normalize(100),
                backgroundColor: '#323245',
            }} />

    <View style={{
                width: Util.size.width,
                height: normalize(82),
                backgroundColor: '#3DAAA4',
                flexDirection: 'row',
                alignItems: 'center'
            }} >
        <View style={{
                flex: 1
            }}/>
        <View style={{
                flex: 2,
                borderLeftWidth: 1,
                borderColor: '#eee',
                borderRightWidth: 1,
                height: normalize(70),
                alignItems: 'center',
                justifyContent: 'center'
            }} >
        <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '300'
            }}>余额:￥{this.props.balance}元</Text>
        </View>
        <View style={{
                flex: 1
            }} />
    </View>

    <ScrollView style={{
                flex: 1
            }}>
        <View style={styles.paddingHeight}/>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("moneyDetail")}>
            <Icon name='md-cash' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>资金明细</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("gameRecord")}>
            <Icon name='md-card' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>游戏记录</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("traceRecord")}>
            <Icon name='md-albums' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>追号记录</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>

        <View style={styles.paddingHeight}/>
        {/*
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("detail")}>
            <Icon name='md-mail' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>站内信</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("detail")}>
            <Icon name='md-alarm' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>公告</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>

        <View style={styles.paddingHeight}/>
        */}
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("setting")}>
            <Icon name='md-settings' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>设置</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
    </ScrollView>

            </View>



            );
    }

}
let CONTENT_HEIGHT = Platform.OS === 'ios' ? 41 : 73;
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
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
        fontWeight: '500',
        fontSize: 18,
        color: 'gray'
    },
    paddingHeight: {
        width: Util.size.width,
        height: 15,
        backgroundColor: '#eee'
    }
})

function select(store) {
    return {
        username:store.user.username,
        balance:store.user.balance,
    };
}

function actions(dispatch) {
    return {
      getGameRecord:(game,nav)=>dispatch(getGameRecord(game,nav)),
      getTraceRecord:(game,nav)=>dispatch(getTraceRecord(game,nav)),
        getMoneyDetail:(game,nav)=>dispatch(getMoneyDetail(game,nav)),
    };
}
module.exports = connect(select,actions)(MyPage);
