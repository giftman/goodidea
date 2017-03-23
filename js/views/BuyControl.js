'use strict';

import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import { HEADER_HEIGHT } from '../common/F8Colors';
import F8Button from '../common/F8Button';
class BuyControl extends Component {
    props:{
    clearBtn:()=> void,
    maxMultNum:number,
    confirmBtn:() =>void,
    numOfChips:number,
    price:number,
    type:"buy" | "package",
    }

    constructor(props) {
        super(props);


        this.state = {
            multNum: 1,
            traceNum:1,
        };
    }

    _updateTextNum(text) {
        console.log(text);
        this.setState({
            multNum: text,
        });
    }
    _updateTraceNum(text) {
        console.log(text);
        this.setState({
            traceNum: text,
        });
        this.props.updateTraceNum(text);
    }
    render() {
        let des = this.props.numOfChips + "注 X" + this.state.multNum + "倍=" + parseFloat(this.props.price * this.state.multNum * this.props.numOfChips).toFixed(2) + "元";
        if(this.props.type == "package"){
            des  = this.props.numOfChips + "注 X" + this.state.traceNum + "期=" + this.props.price * this.state.traceNum * this.props.numOfChips + "元";
        }

        let color = this.props.numOfChips > 0 ? "red" : "#666";
        let confirmText = this.props.type === "package" ? "投注" : "确定";
        let upView = this.props.type === "package"
            ? <View style={styles.upContainer}>
        <View style={styles.multView}>
                        <Icon name="md-thunderstorm" size={28} color="#333333"></Icon>
                        <Text style={styles.clearText}>追号:</Text>
                        <TextInput
            ref="multInput"
            style={styles.multInput}
            keyboardType="numeric"
            maxLength={3}
            defaultValue="1"
            multiline={false}
            selectionColor="#2aa2ef"
            placeholderTextColor="red"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this._updateTraceNum(text)}></TextInput>
                    </View>
                    </View>
            : <View style={styles.upContainer}>
        <TouchableOpacity style={styles.clearBtn} onPress={() => this.props.clearBtn()}>
                        <Icon name="ios-trash-outline" size={15} color="#333333"></Icon>
                        <Text style={styles.clearText}>清空</Text>
                    </TouchableOpacity>
                    <View style={styles.multView}>
                        <Icon name="md-color-wand" size={15} color="#333333"></Icon>
                        <Text style={styles.clearText}>倍投</Text>
                        <TextInput
            ref="multInput"
            style={styles.multInput}
            keyboardType="numeric"
            maxLength={3}
            defaultValue="1"
            multiline={false}
            selectionColor="#2aa2ef"
            placeholderTextColor="#ced8de"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this._updateTextNum(text)}></TextInput>
            </View>
            </View>

        return (
            <View style={styles.container}>
                {upView}
                <View style={styles.downContainer}>
                    <View style={{
                        padding: 5,
                    }}> 
                     <Text style={[styles.des, {
                            color: 'white'
                        }]}>奖金: {this.props.prize * this.state.multNum * this.props.moneyUnit}元</Text>
                        <Text style={[styles.des, {
                            color: '#DEDCA3'
                        }]}>{des}</Text>
                        <Text style={[styles.des, {
                            color: 'white'
                        }]}>可用余额:{parseFloat(this.props.balance).toFixed(2)}</Text>
                    </View>


            <TouchableOpacity style={[styles.confirmBtn, {
                backgroundColor: color
            }]} onPress={() => this.props.confirmBtn()}>
                <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '400'
            }}>{confirmText}</Text>
            </TouchableOpacity>

                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        width: Util.size.width,
        height: 100,
        zIndex: 2,
    },
    upContainer: {
        width: Util.size.width,
        height: 38,
        backgroundColor: '#e7e7e7',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    downContainer: {
        width: Util.size.width,
        height: 62,
        flex: 1,
        backgroundColor: '#101',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    clearBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 26,
        borderWidth: Util.pixel,
        paddingLeft: 10,
        paddingRight: 5,
        marginLeft: 15,
        borderColor: '#BEBFC3',
        backgroundColor: '#D5D5DF',
        marginTop: 5,
        marginBottom: 5,
    },
    clearText: {
        fontSize: 18,
        fontWeight: '200',
        color: '#333333',
        paddingLeft: 5,
    },
    multView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    multInput: {
        padding: 5,
        paddingBottom: 8,
        backgroundColor: "#fff",
        height: 30,
        width: 55,
        textAlign: 'center',
        borderColor: 'gray',
        borderWidth: Util.pixel,
        marginRight: 15,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmBtn: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 98,
        height: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'left',
        color: 'black',
        backgroundColor: 'green'
    },
    des: {
        flex: 1,
        fontSize: 14,
        color: '#9E9E9E',
        paddingLeft: 5
    },
    bolls: {
        // backgroundColor:'grey',
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        paddingRight: 60,
        paddingBottom: 10,
        paddingTop: 10,
    },
    boll: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        }
    },
});


export default BuyControl;
