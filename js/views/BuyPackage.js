'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import Util from '../utils/Util';
import { toastShort } from '../utils/ToastUtil';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import EasyButton from '../common/EasyButton';
import BuyControl from './BuyControl';

import { connect } from 'react-redux';
import { clearPackage,updatePackageProps,bet,updateTraceWinStop} from '../actions';
import {checkHowManyNumOfChipsAndAddToPackage,updatePackage,randomPick,Fractional} from './buyHelper';
import EasyDialog from './EasyDialog';
class BuyPackage extends Component {
    constructor(props) {
        super(props);
        this.traceNum = 1;
        // this.data = [{"numShow":'2,2,2,2',"des":"五星直选 1注 x 2.0元 = 2.00元"},{"numShow":'2,2,2,2',"des":"五星直选 1注 x 2.0元 = 2.00元"}]
        this.state={
            "data":this.props.buyPackage,
            "showDialog":false,
        }
    }


    _onclick(type){
        // console.log(type);
        let {defaultGame,multNum,buyPackage,moneyUnit} = this.props;
        if(defaultGame.type.includes("renxuan") || defaultGame.type.includes("danshi")){
            toastShort("此玩法精妙之处机器无法模拟，请主人亲自挑选");
            return;
        }
        for(var i=0;i<type;i++){
        let choice = randomPick(defaultGame);
        let {result,numOfChips} = checkHowManyNumOfChipsAndAddToPackage(defaultGame,choice);
        buyPackage = updatePackage(defaultGame,numOfChips,multNum,buyPackage,moneyUnit,result);
        }
        this.setState({
            "data":buyPackage
        })
        this.props.updatePackageProps(buyPackage);
    }
    _clearBtn(){
        console.log("clear");
        this.props.clearPackage();
        this.setState({
            "data":[]
        })
    }
    _onConfirmBtn(){
        // this.props.navigator.push({"dialog":true})
        this.setState({
            "showDialog":!this.state.showDialog
        })
    }
    _traceBtnClick(){
        this.props.updateTraceWinStop();
    }
    _confirmBet(){
        // data = {
        //     "gameId": "1",
        //     "isTrace": "0",
        //     "traceWinStop": "1",
        //     "traceStopValue": "1",
        //     "balls[0][jsId]": "1",
        //     "balls[0][wayId]": "203",
        //     "balls[0][ball]": "6|8|6|7|8",
        //     "balls[0][viewBalls]": "",
        //     "balls[0][num]": "10",
        //     "balls[0][type]": "renxuan.renxuan2.zhixuanfushi",
        //     "balls[0][onePrice]": "2",
        //     "balls[0][moneyunit]": "1",
        //     "balls[0][multiple]": "1",
        //     "balls[0][is_dekaron]": "false",
        //     "orders[161219096]": "1",
        //     "amount": "2.00",
        //     "prize": "1950"
        // }
        this._onConfirmBtn();
        let {defaultGame,buyPackage,orderNum,traceWinStop} = this.props;
        let data = {};
        let positions = {};
        let allAmount = 0;
        data["gameId"] = defaultGame.gameId + "";
        if(this.traceNum > 1){
          data["isTrace"] = "1";//todo
        }else{
          data["isTrace"] = "0";//todo
        }
        console.log(traceWinStop)
        data["traceWinStop"] = traceWinStop? "1" :"0";//todo
        data["traceStopValue"] = traceWinStop? "1" :"-1";//todo
        data["prize"] = this.props.prize//todo

        buyPackage.map((elem,index)=>{
            allAmount = allAmount + elem.amount;
            data["balls[" + index + "]jsId]"] = elem.jsId + "";
            data["balls[" + index + "][wayId]"]      = elem.wayId + "";
            data["balls[" + index + "][ball]"]       = elem.ball;
            data["balls[" + index + "][viewBalls]"]  = "";
            data["balls[" + index + "][num]"]        = elem.num + "";
            data["balls[" + index + "][type]"]       = elem.type
            data["balls[" + index + "][onePrice]"]   = elem.onePrice + "";
            data["balls[" + index + "][moneyunit]"]  = elem.moneyunit + "";
            data["balls[" + index + "][multiple]"]   = elem.multiple + "";
            data["balls[" + index + "][is_dekaron]"] = elem.is_dekaron + "";
            if(elem.position){
                positions[index] = elem.position;
            }
        });

        data["amount"] = parseFloat(allAmount).toFixed(2);
        //追号
        if(this.traceNum > 1){
          for(var i = 0;i< this.traceNum;i++){
            let temOrderNum = parseInt(orderNum) + i ;
            data["orders[" + temOrderNum + "]" ] = "1";
          }
        }else{
          data["orders[" + orderNum + "]" ] = "1";
        }
        data["positions"] = positions;

        console.log(data)
        let betUrl = `/phone/bet/${defaultGame.gameId}`;
        this.props.bet(data,betUrl,this.props.navigator);
        this.props.updatePackageProps([]);
        this.setState({
            "data":[]
        })

    }
    render() {

        var leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };
        let allNumOfChips = 0;
        let list = this.state.data.map((elem,index) => {
            allNumOfChips = allNumOfChips + elem.num;
            return (
                    <View key={index} style={styles.listContain}>
                        <TouchableOpacity style={{paddingLeft:10}}>
                            <Icon name="md-remove-circle" size={30} color="#B50708"></Icon>
                        </TouchableOpacity>
                        <View style={styles.listContent}>
                                <Text style={[styles.listText,{color:'#000'}]}>{elem.numShow}</Text>
                                <Text style={[styles.listText,{color:'#B50708'}]}>{elem.des}</Text>
                            </View>
                    </View>
                )
        })
        let clearBtn = (
                <EasyButton style={styles.clearBtn} caption="清空号码篮" captionStyle={{fontSize:18,color:'#979797'}} icon="ios-trash-outline" onPress={()=> this._clearBtn()} iconColor="#979797" />
            )
        let {defaultGame} = this.props;
        let orderInfo = {};
        orderInfo["name"] = this.props.gameName;
        // orderInfo["amount"] = Fractional(allNumOfChips * defaultGame.price * this.traceNum * this.props.moneyUnit);
        orderInfo["orderNum"] = this.props.orderNum;
        orderInfo["des"] = this.traceNum  + "期" + allNumOfChips + "注";
        var tmpAll = allNumOfChips * defaultGame.price * this.traceNum * this.props.moneyUnit
        console.log(tmpAll)
        orderInfo["amount"] = parseFloat(tmpAll).toFixed(2);

        return (
            <View style={styles.container}>
      <F8Header
            style={{
                backgroundColor: "#323245"
            }}
            title="号码篮"
            leftItem={leftItem}
            >
      </F8Header>
            <View style={styles.randomContain}>
                <EasyButton style={styles.randomButton} caption="机选一注" icon="md-add-circle" onPress={()=>this._onclick(1)}/>
                <EasyButton style={styles.randomButton} caption="机选五注" icon="md-add-circle" onPress={()=>this._onclick(5)}/>
                <EasyButton style={styles.randomButton} caption="继续选号" icon="md-add-circle" onPress={()=>this.props.navigator.pop()}/>
            </View>
            <ScrollView style={{flex:1}}>
                {list}
                {clearBtn}
            </ScrollView>
            <BuyControl 
                moneyUnit={this.props.moneyUnit} 
                prize={this.props.defaultGame.prize} 
                price={this.props.defaultGame.price * this.props.moneyUnit} 
                balance={this.props.balance} numOfChips={allNumOfChips} 
                type="package" 
                confirmBtn={()=>this._onConfirmBtn()} 
                updateTraceNum={(text)=> {this.traceNum = text}}
                traceBtnClick={()=>this._traceBtnClick()}
            />
            <EasyDialog show={this.state.showDialog} cancleBtn={()=>this._onConfirmBtn()} orderInfo={orderInfo} confirmBet={()=>this._confirmBet()}/>
      </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eaeaea',
        flex:1
    },
    randomContain:{
        width:Util.size.width,
        flexDirection:'row',
        paddingRight:10,
        paddingBottom:10,
        paddingTop:10,
        backgroundColor:'#fff',
    },
    randomButton:{
        flex:1,
        backgroundColor:'#8F8468',
    },
    listContain:{
        margin:10,
        marginBottom:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        height:70,
        backgroundColor:'#fff',
        borderWidth:Util.pixel,
        borderColor:'#979797',
    },
    clearBtn:{
        width:137,
        height:40,
        borderColor:'#979797',
        borderWidth:Util.pixel,
        alignSelf:'center',
        margin:10
    },
    listText:{
        fontSize:18,
        fontWeight:'100',
        padding:5,
        paddingLeft:15,
    },

});

function select(store) {
    return {
        defaultGame:store.buy.defaultGame,
        multNum:store.buy.multNum,
        numOfChips:store.buy.numOfChips,
        buyPackage:store.buy.buyPackage,
        gameName:store.buy.gameName,
        orderNum:store.buy.orderNum,
        balance:store.user.balance,
        prize:store.buy.prize,
        moneyUnit:store.buy.moneyUnit,
        traceWinStop:store.buy.tracewinStop,
    };
}

function actions(dispatch) {
    return {
        clearPackage:()=>dispatch(clearPackage()),
        updateTraceWinStop:()=>dispatch(updateTraceWinStop()),
        randomPick:(num)=>dispatch(randomPick(num)),
        updatePackageProps:(buyPackage)=>dispatch(updatePackageProps(buyPackage)),
        bet:(data,betUrl,navigator)=>dispatch(bet(data,betUrl,navigator)),
    };
}
module.exports = connect(select, actions)(BuyPackage);
