'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, Animated, Easing, } from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import { HEADER_HEIGHT,LAYER ,TIP_HEIGHT} from '../common/F8Colors';
import BuyList from './BuyList';
import BuyMenu from './BuyMenu';
import BuyControl from './BuyControl';
import { connect } from 'react-redux';
import { loadMenu,changeType } from '../actions';
import TipPadding from './TipPadding';
import CoverView from './CoverView';

class BuyView extends Component {
    constructor(props) {
        super(props);
        this.minTop = -Util.size.height + 290 + HEADER_HEIGHT;
        this.tipMinTop = HEADER_HEIGHT - TIP_HEIGHT
        this.maxTop = HEADER_HEIGHT;
        this.state = {
            title: "Test",
            data: this.data,
            showMenu: false,
            showTip:false,
            shift: new Animated.Value(this.minTop),
            tipShift: new Animated.Value(this.tipMinTop),
            choice: {},
            numOfChips:0,
        };
        this.props.loadMenu();
    }

    _onToggle(name, index) {
        // console.log(name, index);
        
let {choice} = this.state;
if (choice[name] && !this.props.defaultGame.only_one) {
    if (choice[name].includes(index)) {
        console.log("del "  + index);
        let where = choice[name].indexOf(index);
        choice[name].splice(where, 1);
    } else {
        choice[name].push(index);
    }
} else {
    choice[name] = [];
    choice[name].push(index);
}
choice[name] = choice[name].sort();
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
      let result = "";
      numOfChips = 1;
      for (let i in methods){
        console.log("log for in methods i :" + i);
        console.log(choice[i]);
        console.log(methods[i])
        if(choice[i] && choice[i].length >= methods[i].num){
            numOfChips = countNum(choice[i].length,methods[i].num) * numOfChips;
            if(methods[i].each_num_represent_chips_num){
              numOfChips = numOfChips*methods[i].each_num_represent_chips_num;
            }
            if(methods[i].extra){ numOfChips = 0};
            choice[i].map((n,index)=>{
                console.log(n);
                if(methods[i].extra){
                    n = n + 1;
        }
                result = result + n.toString();
                if(methods[i].extra){
                    numOfChips = methods[i].extra[n] + numOfChips;
                }
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
      console.log("choice result:" + result);
      console.log("numOfChips:" + numOfChips);
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

    _changeType(type){
      this.props.changeType(type);
      this._popMenu();
      this.setState({
        choice:{}
      })
    }

    _tipClick(){
         let showTip = this.state.showTip;
        if (showTip) {
            this._popTip();
        } else {
            this._pushTip();
        }
    }

    _popTip(){
        Animated.timing( // 可选的基本动画类型: spring, decay, timing
            this.state.tipShift, // 将`bounceValue`值动画化
            {
                toValue: this.tipMinTop, // 将其值以动画的形式改到一个较小值
                duration: 200,
                delay: 100,
                easing: Easing.elastic(1), // Bouncier spring
            }
        ).start();
        setTimeout(() => {
            this.setState({
                showTip: false
            });
        }, 500);
    }

    _pushTip(){
         this.setState({
            showTip: true
        }); //1 注意这个顺序有讲究，先让看到再执行动画，后面则相反，延迟一点让动画执行完再不显示 2 Touchable控件的子件默认是占满整个父件空间，可以参考NeverMind
        Animated.timing( // 可选的基本动画类型: spring, decay, timing
            this.state.tipShift, // 将`bounceValue`值动画化
            {
                toValue: this.maxTop, // 将其值以动画的形式改到一个较小值
                duration: 200,
                delay: 100,
                easing: Easing.elastic(1), // Bouncier spring
            }
        ).start();
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
            onPress: () => this._tipClick(),
        }
        let headerImg = this.state.showMenu ? <Icon name="ios-arrow-down" size={25} color="#616161" /> : <Icon name="ios-arrow-up" size={25} color="#616161" />;
        return (
            <View>
            {this.state.showTip ?<CoverView layer={LAYER.MIDDLE}/>:<View/>}
           {this.state.showTip ? <Animated.View style={{
                zIndex: LAYER.TOP,
                position: 'absolute',
                top: this.state.tipShift
            }}>
      <TipPadding content={this.props.defaultGame.bet_note}></TipPadding>
      </Animated.View>

                : <View/>
            }
            
      <F8Header
            style={{
                backgroundColor: "#100118",
                zIndex: LAYER.TOP
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
      {this.state.showMenu ?<CoverView layer={LAYER.BOTTOM}/>:<View/>}
      {this.state.showMenu ? <Animated.View style={{
                zIndex: LAYER.BOTTOM,
                position: 'absolute',
                top: this.state.shift
            }}>
      <BuyMenu menu={this.props.menu} changeType={(type)=>this._changeType(type)}/>
      </Animated.View>
                : <View/>
            }
      <BuyList data={this.props.defaultGame} onToggle={(name, index) => this._onToggle(name, index)} choice={this.state.choice}/>
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