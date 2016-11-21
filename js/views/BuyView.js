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
import { loadMenu,changeType } from '../actions';
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
            numOfChips:0,
        };
        this.props.loadMenu();
    }

    _onToggle(name, index) {
        // console.log(name, index);
let {choice} = this.state;
if (choice[name]) {
    if (choice[name].includes(index)) {
        choice[name].splice(index, 1);
    } else {
        choice[name].push(index);
    }
} else {
    choice[name] = [];
    choice[name].push(index);
}
this._checkChipsCount(choice);
this.setState({
    choice
})
console.log(this.state.choice);
    // return false;
    }

    //check how many times had pay.
    _checkChipsCount(choice){
      let {defaultGame} = this.props;
      let {numOfChips} = this.state;
      let methods = defaultGame.methods;
      console.log(methods);
      let pass = false;
      let result = "";
      let times = 1;
      for (let i in methods){
        console.log(i);
        console.log(choice[i]);
        console.log(methods[i])
        if(choice[i] && choice[i].length >= methods[i].num){
            numOfChips = countNum(choice[i],methods[i].num) * numOfChips;
              choice[i].map((n,index)=>{
              console.log("NNNNN");
              console.log(n);
                result = result + n.toString()
            })
            result = result + "|";
        }else{
          console.log('not choice all key')
          numOfChips = 0;
           break;
        }
      }
      this.setState({
        numOfChips
      })
      console.log(result);
    }

    //update the buy result for post
    _udateBuyBolls(){

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
        // console.log(this.props.allTypes["14"]);
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
      <BuyMenu menu={this.props.menu} changeType={(type)=>this.props.changeType(type)}/>
      </Animated.View>
                : <View/>
            }
      <BuyList data={this.props.defaultGame} onToggle={(name, index) => this._onToggle(name, index)}/>
      <BuyControl price={2} numOfChips={this.state.numOfChips}/>
      </View>
        )
    }
}

function countNum(n,m){
  return mathDouble(n)/(mathDouble(n-m)*mathDouble(m));
}

function mathDouble(num){
  if(num > 1){
   return num*mathDouble(num-1)
  }else{
    return 1
  }
}

const styles = StyleSheet.create({

});


function select(store) {
    return {
        menu: store.buy.menu,
        allTypes: store.buy.allTypes,
        defaultGame:store.buy.defaultGame,
        defaultTypes:store.buy.defaultTypes,
    };
}

function actions(dispatch) {
    return {
        loadMenu: (tab) => dispatch(loadMenu()),
        changeType:(type)=> dispatch(changeType(type)),
    };
}

module.exports = connect(select, actions)(BuyView);