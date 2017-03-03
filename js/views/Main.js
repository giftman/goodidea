'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, } from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import MainList from './MainList';
import LoadingView from '../common/LoadingView';
import { connect } from 'react-redux';
class TwitterPost extends Component {
    constructor(props) {
        super(props);

        this.data = [
        {
            'gameId':1,
            'title': '重庆时时彩',
            'name':'cqssc',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/51097921-file_1484231264295_15a2f.png'
        },
        {
            'gameId':3,
            'title': '黑龙江时时彩',
            'name':'hljssc',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/21928558-file_1484231261373_15017.png'
        },
        {
            'gameId':6,
            'title': '新疆时时彩',
            'name': 'xjssc',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/59140739-file_1484231261706_15b50.png'
        },
        {
            'gameId':7,
            'title': '天津时时彩',
            'name': 'tjssc',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/5286450-file_1484231264628_1d5c.png'
        },
        {
            'gameId':11,
            'title': '正点1分彩',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-26/15041077-file_1485410586273_1788f.png'
        },
        {
            'gameId':13,
            'title': '正点3分彩',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-26/54381966-file_1485410586164_a676.png'
        },
        {
            'gameId':14,
            'title': '正点5分彩',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-26/30418472-file_1485410586052_1221f.png'
        },
          // {
          //     'gameId':17,
          //     'title': '云南时时彩',
          //     'time':'销售时间:10:00~23:00',
          //     'des':'每10分钟一期  ',
          //     'img': 'https://facebook.github.io/react/img/logo_og.png'
          // },
        {
            'gameId':25,
            'title': '北京五分彩',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-26/4446956-file_1485410585890_e872.png'
        },
        {
            'gameId':26,
            'title': '台湾五分彩',
            'time':'销售时间:10:00~23:00',
            'des':'每10分钟一期  ',
            'img': 'https://facebook.github.io/react/img/logo_og.png'
        },
        // {
        //     'gameId':27,
        //     'title': '韩国1-5分彩',
        //     'time':'销售时间:10:00~23:00',
        //     'des':'每10分钟一期  ',
        //     'img': 'https://facebook.github.io/react/img/logo_og.png'
        // }
        ]

        this.state = {
            isRefreshing: false,
            data: this.data,
        };
    }

    _onRefresh() {
        this.setState({
            isRefreshing: true
        });
        setTimeout(() => {
            this.setState({
                isRefreshing: false
            });
        }, 2000);
    }

    render() {
        return (
            <MainList style={{
                backgroundColor: '#eee',
                width: Util.size.width,
                height: Util.size.height - 90,
            }}  navigator={this.props.navigator}
            data = {this.state.data}
            refreshControl = {
            <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh ={this._onRefresh.bind(this)}
            tintColor="#ddd"
            />
            }>

      </MainList>
        )
    }
}

class TwitterFlow extends Component {
    render() {
        var leftItem = this.props.leftItem;

        leftItem = {
            layout: 'title',
            title: 'md-notifications',
            onPress: () => this.props.navigator.pop(),
        };

        var rightItem = {
            icon: require('../img/lianxikefu1.png'),
            // title: 'kefu',
            onPress: () => this.props.navigator.push({
              'my':'webview',
              data:'https://chat6.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=632777&configID=48959&jid=7175212580&s=1'
            }),
        };

        return (
            <View>
         <F8Header
            style={{
                backgroundColor: "#323245"
            }}
            leftItem={leftItem}
            rightItem={rightItem}
            >

      </F8Header>
        <TwitterPost navigator={this.props.navigator}></TwitterPost>
        {this.props.loading?<LoadingView />:<View />}
      </View>
        )
    }
}



const styles = StyleSheet.create({

});


function select(store) {
    return {
        loading:store.buy.loading,
    };
}

function actions(dispatch) {
    return {
    };
}
module.exports = connect(select, actions)(TwitterFlow);
