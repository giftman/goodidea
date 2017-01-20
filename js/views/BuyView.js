'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, Animated, Easing } from 'react-native';

import Util from '../utils/Util';
import { toastShort } from '../utils/ToastUtil';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import CountDown from '../common/CountDown';
import { HEADER_HEIGHT, LAYER, TIP_HEIGHT } from '../common/F8Colors';
import BuyList from './BuyList';
import BuyMenu from './BuyMenu';
import BuyControl from './BuyControl';
import { connect } from 'react-redux';
import { updateOrderNum,getGameConfig, changeType, loadMenu,
  updateChoice, updateNumOfChips,
  updatePackageProps,updateDefaultGame } from '../actions';
import TipPadding from './TipPadding';
import CoverView from './CoverView';
import { checkHowManyNumOfChipsAndAddToPackage, updatePackage,clearValidChoice } from './buyHelper';
import _ from 'underscore';

class BuyView extends Component {
    constructor(props) {
        super(props);
        this.minTop = -Util.size.height + 290 + HEADER_HEIGHT;
        this.tipMinTop = HEADER_HEIGHT - TIP_HEIGHT
        this.maxTop = HEADER_HEIGHT;
        this.menuY = 0;
        this.result = "";
        this.state = {
            data: this.data,
            showMenu: false,
            showTip: false,
            shift: new Animated.Value(this.minTop),
            tipShift: new Animated.Value(this.tipMinTop),
            choice: {},
        };
        // if (this.props.article && this.props.article.gameId) {
        //     this.props.getGameConfig(this.props.article.gameId);
        // }
        // this.props.loadMenu(null);
    }

    _onToggle(name, index) {
        // console.log(name, index);
        let {choice, defaultGame, buyPackage, multNum} = this.props;
        console.log(name);
        //单式特殊读取choice
        if (defaultGame.layout == 2) {
            let splitText = " ";
            if(name.includes(" ")){
                splitText = " ";
            }else if(name.includes(",")){
                splitText = ",";
            }else if(name.includes(";")){
                splitText = ";";
            }
            choice = name.trim().split(splitText);
        } else {
            if (choice[name] && !this.props.defaultGame.only_one) {
                if (choice[name].includes(index)) {
                    console.log("del " + index);
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
        }
        choice = clearValidChoice(defaultGame,choice);
        let {result, numOfChips} = checkHowManyNumOfChipsAndAddToPackage(defaultGame, choice);
        this.result = result;
        this.props.updateChoice(choice);
        // if(numOfChips >= 1){
        this.props.updateNumOfChips(numOfChips);
        // }
        this.setState({
            choice
        })
    //这里用props 的choice BuyList 没有重绘，只可以在state设置，props 更新保存一份..估计numberOfChips也是这样
    // console.log(this.props.choice);
    // return false;
    }

    //update the buy result for post
    _onCheckBoxClick(index) {
        // {"num":'2,2,2,2',"des":"五星直选 1注 x 2.0元 = 2.00元"}
        console.log(index);
        let {defaultGame,choice} = this.props;
        let positions = defaultGame.positions;
        let sum = _.reduce(positions,(memo,num)=>{return memo + num;},0);
        if(positions[index] == 1 && sum > defaultGame.num){
           positions[index] = 0;
        }else{
           positions[index] = 1;
        }
        defaultGame.positions = positions;
        this.props.updateDefaultGame(defaultGame);
        let {numOfChips} = checkHowManyNumOfChipsAndAddToPackage(defaultGame, choice);
        this.props.updateNumOfChips(numOfChips);
        //defaultGame 数据是更新了，但是BuyList 没有重绘,所以手动setState一下
        this.setState({
            choice:this.state.choice
        })
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
        if (this.menuY != 0) {
            setTimeout(() => {
                this.menu.scrollTo({
                    y: this.menuY
                });
            }, 200);
        }



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

    _changeType(type) {
        this.props.changeType(type);
        this._popMenu();
        this.setState({
            choice: {}
        })
        this.props.updateNumOfChips(0);
        this.props.updateChoice({});
    }

    _tipClick() {
        let showTip = this.state.showTip;
        if (showTip) {
            this._popTip();
        } else {
            this._pushTip();
        }
    }

    _popTip() {
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

    _pushTip() {
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

    _onConfirmBtn() {
        if (this.props.numOfChips > 0) {
            let {defaultGame, numOfChips, multNum, buyPackage} = this.props;
            buyPackage = updatePackage(defaultGame, numOfChips, multNum, buyPackage, this.result);
            this.props.updatePackageProps(buyPackage);
            this.props.navigator.push({
                "addToPackage": true,
            });
            // if(defaultGame.type.includes('danshi')){
            //      toastShort("无效的数字会自动帮助主人过滤，请主人放心投注!");
            // }
            this.setState({
                choice: {}
            });
            this.props.updateNumOfChips(0);
            this.props.updateChoice({});
        } else {
            toastShort(this.props.defaultGame.bet_note);
        }

    }

    _clearBtn() {
        this.setState({
            choice: {}
        });
        this.props.updateChoice({});
        this.props.updateNumOfChips(0);
    }

    _updateCurrentorderNum(){
      let orderNum = parseInt(this.props.orderNum) + 1
      this.props.updateOrderNum(orderNum + '');
    }
    _menuScroll(event:Object) {
        this.menuY = event.nativeEvent.contentOffset.y;
        console.log(this.menuY);
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
        let {currentTime,orderNumberEndTime} = this.props
        let timeMinus = orderNumberEndTime - currentTime

      return (
            <View>
            {this.state.showTip ? <CoverView layer={LAYER.MIDDLE}/> : <View/>}
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
            }}>{this.props.defaultGame.name_cn}</Text>
        {headerImg}
      </TouchableOpacity>
      </F8Header>
      <TipPadding >
        <CountDown
          text={'投注截止:'}
          time={timeMinus}
          timesUp={() => this._updateCurrentorderNum()}
          />
      </TipPadding>
      {this.state.showMenu ? <CoverView layer={LAYER.BOTTOM}/> : <View/>}
      {this.state.showMenu ? <Animated.View style={{
                zIndex: LAYER.BOTTOM,
                position: 'absolute',
                top: this.state.shift
            }}>
      <BuyMenu ref={(menu) => {
                this.menu = menu
            }} menuScroll={(event) => {
                this._menuScroll(event)
            }} menu={this.props.menu} changeType={(type) => this._changeType(type)} />
      </Animated.View>
                : <View/>
            }

      <BuyList onToggle={(name, index) => this._onToggle(name, index)}
      onCheckBoxClick={(index) => this._onCheckBoxClick(index)}
      choice={this.state.choice}
      />

      <BuyControl price={2} numOfChips={this.props.numOfChips}  confirmBtn={() => this._onConfirmBtn()} clearBtn={() => this._clearBtn()}/>

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
        defaultGame: store.buy.defaultGame,
        defaultTypes: store.buy.defaultTypes,
        choice: store.buy.choice,
        multNum: store.buy.multNum,
        numOfChips: store.buy.numOfChips,
        buyPackage: store.buy.buyPackage,
        currentTime:store.buy.currentTime,
        orderNum:store.buy.orderNum,
        orderNumberEndTime:store.buy.orderNumberEndTime,
    };
}

function actions(dispatch) {
    return {
        loadMenu: (tab) => dispatch(loadMenu()),
        changeType: (type) => dispatch(changeType(type)),
        getGameConfig: (gameId) => dispatch(getGameConfig(gameId)),
        updateChoice: (choice) => dispatch(updateChoice(choice)),
        clearPackage: () => dispatch(clearPackage()),
        randomPick: (num) => dispatch(randomPick(num)),
        updateOrderNum: (num) => dispatch(updateOrderNum(num)),
        updateNumOfChips: (num) => dispatch(updateNumOfChips(num)),
        updatePackageProps: (buyPackage) => dispatch(updatePackageProps(buyPackage)),
        updateDefaultGame:(game)=>dispatch(updateDefaultGame(game)),
    };
}

module.exports = connect(select, actions)(BuyView);
