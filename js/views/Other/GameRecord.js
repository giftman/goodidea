'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';

import Util from '../../utils/Util';
import F8Header from '../../common/F8Header';
import PureListView from '../../common/PureListView';
import { headerBG } from '../../common/F8Colors';
import Icon from 'react-native-vector-icons/Ionicons';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
class GameRecord extends Component {
    constructor(props: Props) {
        super(props);
        this.data = [{
            'title': '重庆时时彩',
            'money': '2.00元',
            'time': '01月12日',
            'status':0,
            'statusDes':'待开奖' //0待开 1中 2不中
        }, {
          'title': '重庆时时彩',
          'money': '2.00元',
          'time': '01月12日',
          'status':1,
          'statusDes':'中奖' //0待开 1中 2不中
        }, {
          'title': '重庆时时彩',
          'money': '2.00元',
          'time': '01月12日',
          'status':2,
          'statusDes':'未中奖' //0待开 1中 2不中
        }]
        let moneyGet = [];
        let moneyPay = [];
        this.data.map((elem, index) => {
            switch (elem.status) {
              case 1:
                moneyGet.push(elem);
                break;
              default:
                moneyPay.push(elem);
            }
        });
        this.state = {
            data: this.data,
            pay: moneyPay,
            get: moneyGet,
            isRefreshing: false,
        };

    }
    render() {
        var leftItem = this.props.leftItem;

        leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };


        return (
            <View style={{
                backgroundColor: 'white',
                flex: 1
            }}>
      <F8Header
            style={{
                backgroundColor: "#323245"
            }}
            title="游戏记录"
            leftItem={leftItem}
            >

      </F8Header>
      <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={headerBG}
            tabBarActiveTextColor='#fff'
            tabBarInactiveTextColor='#fff'
            tabBarUnderlineStyle={{
                backgroundColor: '#fff'
            }}
            renderTabBar={() => <ScrollableTabBar />}
            >
      <ReadingListView tabLabel='全部' data={this.state.data}>All</ReadingListView>
      <ReadingListView tabLabel='中奖' data={this.state.get}>game</ReadingListView>
      <ReadingListView tabLabel='待开奖' data={this.state.pay}>reword</ReadingListView>
    </ScrollableTabView>
      </View>
        )
    }
}

class ReadingListView extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = {
            data: this.props.data,
            isRefreshing: false,
        };

        this.renderRow = this.renderRow.bind(this);
        this.renderEmptyList = this.renderEmptyList.bind(this);
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
            <PureListView
            data={this.props.data}
            renderRow={this.renderRow}
            {...this.props}
            renderEmptyList={this.renderEmptyList}
            refreshControl = {
            <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh ={this._onRefresh.bind(this)}
            tintColor="#ddd"
            />
            }
            />
            );
    }


    renderRow(article: any, typeId: number) {
        return (
            <View style={styles.container}>
              <Text style={styles.title}>{article.time}</Text>
              <View >
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.time}>{article.money}</Text>
              </View>
              <Text style={styles.title}>{article.statusDes}</Text>
              <Icon  name="ios-arrow-forward" size={30} color="#eee" />
            </View>
            );
    }

    renderEmptyList(): ?ReactElement {
        return <View />
    }


}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        padding: 8,
        // backgroundColor:'#eee',
        // borderBottomWidth:0.2,
        // borderColor:'#666'
    },
    title: {
        fontWeight: '300',
        fontSize: 16,
        paddingBottom:5,
    },
    time: {
        color: '#666',
        fontSize: 10
    },
    money: {
        fontSize: 10,
        fontWeight: '300',
        color: 'green'
    },
    money2: {
        fontSize: 12,
        fontWeight: '300',
        color: 'red'
    }
});


export default GameRecord;
