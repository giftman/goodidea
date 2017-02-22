'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';

import Util from '../../utils/Util';
import F8Header from '../../common/F8Header';
import PureListView from '../../common/PureListView';
import { headerBG } from '../../common/F8Colors';
import { gameMoneyDetailType } from '../ssc';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
class TwitterFlow extends Component {
    constructor(props: Props) {
        super(props);
        this.data = this.props.data.data
        // [{
        //     'title': '加入游戏',
        //     'timestamp': 123123,
        //     'money': -1231
        // }, {
        //     'title': '派发现金',
        //     'timestamp': 123123,
        //     'money': +1231
        // }, {
        //     'title': '加入游戏',
        //     'timestamp': 123123,
        //     'money': 1231
        // }]
        let moneyGet = [];
        let moneyPay = [];
        this.data.map((elem, index) => {
            if (elem.type_id === 7) {
                moneyGet.push(elem);
            } else if(elem.type_id === 11) {
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
            title="资金明细"
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
      <ReadingListView tabLabel='游戏投注' data={this.state.pay}>game</ReadingListView>
      <ReadingListView tabLabel='奖金派送' data={this.state.get}>reword</ReadingListView>
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
              <View>
                <Text style={styles.title}>{gameMoneyDetailType(article.type_id)}</Text>
                <Text style={styles.time}>{article.created_at}</Text>
              </View>
              {parseInt(article.amount) > 0 ? <Text style={styles.money2} > + {article.amount}</Text> : <Text style={styles.money}>{article.amount}</Text>}
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
    },
    title: {
        fontWeight: '300',
        fontSize: 20
    },
    time: {
        color: '#eee',
        fontSize: 14
    },
    money: {
        fontSize: 14,
        fontWeight: '300',
        color: 'green'
    },
    money2: {
        fontSize: 16,
        fontWeight: '300',
        color: 'red'
    }
});


export default TwitterFlow;
