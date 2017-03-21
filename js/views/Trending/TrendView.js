'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, } from 'react-native';

import Util from '../../utils/Util';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import TrendList from './TrendList';
import TipPadding from '../TipPadding';
import { connect } from 'react-redux';
import { getTrendData } from '../../actions';
import _ from 'underscore';
import {TIP_HEIGHT} from '../../common/F8Colors';

class TwitterPost extends Component {

    _onRefresh() {
        // this.setState({
        //     isRefreshing: true
        // });
        this.props.getTrendData('',this.props.navigator);
        // setTimeout(() => {
        //     this.setState({
        //         isRefreshing: false
        //     });
        // }, 2000);
    }

    _getTrendDataById(id){
      this.props.getTrendData(id,this.props.navigator);
    }
    render() {
        return (
            <TrendList style={{
                backgroundColor: '#eee',
                width: Util.size.width,
                height: Util.size.height - 90,
                // paddingTop:TIP_HEIGHT
            }} navigator={this.props.navigator}
            data = {this.props.trendData}
            renderEmptyList={()=><View />}
            onclick={(lottery_id)=> this._getTrendDataById(lottery_id)}
            refreshControl = {
            <RefreshControl
            refreshing={this.props.isRefreshing}
            onRefresh ={this._onRefresh.bind(this)}
            tintColor="#ddd"
            />
            }>
      </TrendList>
        )
    }
}

class TwitterFlow extends Component {
    render() {

        var rightItem = {
            layout: 'title',
            title: 'md-menu',
            onPress: () => this.props.navigator.push({
                'trendSet': '123'
            }),
        }

        var displayData = this.props.trendData;
        var setting = this.props.setting;
        if(this.props.setting !== []){
          displayData = _.filter(displayData, function(num){ return setting.includes(num.lottery_id); });
        }
        console.log(displayData);
        return (
          <View>
            <F8Header
                  style={{
                      backgroundColor: "#323245"
                  }}
                  title="开奖走势"
                  rightItem={rightItem}
                  >
            </F8Header>
            <TipPadding content="正点游戏已累计中奖 2亿5122万元" icon="md-clock"></TipPadding>
            <TwitterPost isRefreshing={this.props.isRefreshing} trendData={displayData} getTrendData={(lottery_id,nav)=>this.props.getTrendData(lottery_id,nav)} navigator={this.props.navigator}></TwitterPost>
          </View>
        )
    }
}



const styles = StyleSheet.create({
    postImg: {
        width: Util.size.width,
        height: Util.size.height - 110,
        ios: {
            top: -20,
        },
        android: {
            top: 5,
        },
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
        ios: {
            paddingTop: 30,
        },
        android: {
            paddingTop: 5,
        }
    },
    navLeft: {
        flex: 1,
        // backgroundColor:'green',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    navMid: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navRight: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});

function select(store) {
    return {
        trendData: store.trend.latestTrend,
        isRefreshing: store.trend.isRefreshing,
        setting: store.trend.tSetting,
    };
}

function actions(dispatch) {
    return {
        getTrendData: (lottery_id,nav)=>dispatch(getTrendData(lottery_id,nav)),
    };
}

module.exports = connect(select, actions)(TwitterFlow);
