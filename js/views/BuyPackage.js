'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import EasyButton from '../common/EasyButton';
import BuyControl from './BuyControl';

import { connect } from 'react-redux';
import { clearPackage,updatePackageProps} from '../actions';
import {checkHowManyNumOfChipsAndAddToPackage,updatePackage,randomPick} from './buyHelper';
class BuyPackage extends Component {
    constructor(props) {
        super(props);
        // this.data = [{"num":'2,2,2,2',"des":"五星直选 1注 x 2.0元 = 2.00元"},{"num":'2,2,2,2',"des":"五星直选 1注 x 2.0元 = 2.00元"}]
        this.state={
            "data":this.props.buyPackage
        }
    }
    

    _onclick(type){
        // console.log(type);
        let {defaultGame,multNum,buyPackage} = this.props;

      for(var i=0;i<type;i++){
        let choice = randomPick(defaultGame);
        let {result,numOfChips} = checkHowManyNumOfChipsAndAddToPackage(defaultGame,choice);
        buyPackage = updatePackage(defaultGame,numOfChips,multNum,buyPackage,result);
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
        this.props.navigator.push({"dialog":true})
    }
    render() {

        var leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };
        let list = this.state.data.map((elem,index) => {
            return (
                    <View key={index} style={styles.listContain}>
                        <TouchableOpacity style={{paddingLeft:10}}>
                            <Icon name="md-remove-circle" size={30} color="#B50708"></Icon>
                        </TouchableOpacity>
                        <View style={styles.listContent}>
                                <Text style={[styles.listText,{color:'#000'}]}>{elem.num}</Text>
                                <Text style={[styles.listText,{color:'#B50708'}]}>{elem.des}</Text>
                            </View>
                    </View>
                )
        })
        let clearBtn = (
                <EasyButton style={styles.clearBtn} caption="清空号码篮" captionStyle={{fontSize:18,color:'#979797'}} icon="ios-trash-outline" onPress={()=> this._clearBtn()} iconColor="#979797" />
            )
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
                <EasyButton style={styles.randomButton} caption="Luck one" icon="md-add-circle" onPress={()=>this._onclick(1)}/>
                <EasyButton style={styles.randomButton} caption="Luck five" icon="md-add-circle" onPress={()=>this._onclick(5)}/>
                <EasyButton style={styles.randomButton} caption="继续选号" icon="md-add-circle" onPress={()=>this.props.navigator.pop()}/>
            </View>
            <ScrollView style={{flex:1}}>
                {list}
                {clearBtn}
            </ScrollView>
            <BuyControl price={2} numOfChips={1} type="package" confirmBtn={()=>this._onConfirmBtn()}/>
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
    };
}

function actions(dispatch) {
    return {
        clearPackage:()=>dispatch(clearPackage()),
        randomPick:(num)=>dispatch(randomPick(num)),
        updatePackageProps:(buyPackage)=>dispatch(updatePackageProps(buyPackage)),
    };
}
module.exports = connect(select, actions)(BuyPackage);