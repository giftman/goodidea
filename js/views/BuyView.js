'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, Animated, Easing, } from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import { HEADER_HEIGHT } from '../common/F8Colors';
import BuyList from './BuyList';
import BuyMenu from './BuyMenu';
import BuyControl from './BuyControl';
import { connect } from 'react-redux';
import { loadMenu } from '../actions';
import TipPadding from './TipPadding';

class BuyView extends Component {
    constructor(props) {
        super(props);
        this.minTop = -Util.size.height + 290 + HEADER_HEIGHT;
        this.maxTop = HEADER_HEIGHT;
        this.state = {
            title: "Test",
            data: this.data,
            showMenu: false,
            shift: new Animated.Value(this.minTop),
            choice: {},
        };
        this.props.loadMenu();
    }

    _onToggle(name, index) {
        console.log(name, index);
        let {choice} = this.state;
        if (choice[name]) {
            choice[name].push(index);
        } else {
            choice[name] = [];
            choice[name].push(index);
        }
        this.setState({
            choice
        })
        console.log(this.state.choice);
        return false;

    }

    _onClick() {
        // console.log('_onClick');
        let showMenu = this.state.showMenu;
        if (showMenu) {
            this._popMenu();
        } else {
            this._pushMenu();
        }
    }

    _pushMenu() {
        this.setState({
            showMenu: true
        }); //1 注意这个顺序有讲究，先让看到再执行动画，后面则相反，延迟一点让动画执行完再不显示 2 Touchable控件的子件默认是占满整个父件空间，可以参考NeverMind
        Animated.timing( // 可选的基本动画类型: spring, decay, timing
            this.state.shift, // 将`bounceValue`值动画化
            {
                toValue: this.maxTop, // 将其值以动画的形式改到一个较小值
                duration: 200,
                delay: 100,
                easing: Easing.elastic(1), // Bouncier spring
            }
        ).start();

    // console.log('_pushMenu');
    }
    _popMenu() {
        Animated.timing( // 可选的基本动画类型: spring, decay, timing
            this.state.shift, // 将`bounceValue`值动画化
            {
                toValue: this.minTop, // 将其值以动画的形式改到一个较小值
                duration: 200,
                delay: 100,
                easing: Easing.elastic(1), // Bouncier spring
            }
        ).start();
        setTimeout(() => {
            this.setState({
                showMenu: false
            });
        }, 500);
    }

    render() {
        console.log(this.props.allTypes["14"]);
        var leftItem = this.props.leftItem;

        leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };

        var rightItem = {
            icon: require('../common/img/hamburger.png'),
            onPress: () => this.props.navigator.pop(),
        }
        var helpItem = {
            layout: 'title',
            title: 'ios-help-circle-outline',
            onPress: () => this.props.navigator.pop(),
        }
        let headerImg = this.state.showMenu ? <Icon name="ios-arrow-down" size={25} color="#616161" /> : <Icon name="ios-arrow-up" size={25} color="#616161" />;
        return (
            <View>
      <F8Header
            style={{
                backgroundColor: "#100118",
                zIndex: 2
            }}
            title={this.state.title}
            leftItem={leftItem}
            rightItem={rightItem}
            helpItem={helpItem}
            >
      <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center'
            }} onPress={() => this._onClick()}>
        <Text style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 20,
                paddingRight: 5
            }}>Test</Text>
        {headerImg}
      </TouchableOpacity>
      </F8Header>
       <TipPadding content="remain time:-"></TipPadding>
      {this.state.showMenu ? <Animated.View style={{
                zIndex: 1,
                position: 'absolute',
                top: this.state.shift
            }}>
        <BuyMenu menu={this.props.menu}/>
      </Animated.View>
                : <View/>
            }
      <BuyList data={this.props.allTypes["14"]} onToggle={(name, index) => this._onToggle(name, index)}/>
      <BuyControl price={2} numOfChips={0}/>
      </View>
        )
    }
}



const styles = StyleSheet.create({

});


function select(store) {
    return {
        menu: store.buy.menu,
        allTypes: store.buy.allTypes,
    };
}

function actions(dispatch) {
    return {
        loadMenu: (tab) => dispatch(loadMenu()),
    };
}

module.exports = connect(select, actions)(BuyView);