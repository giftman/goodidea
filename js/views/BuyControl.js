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
    price:number
    }

    constructor(props) {
        super(props);


        this.state = {
            multNum: 1,
        };
    }

    _updateTextNum(text) {
        console.log(text);
        this.setState({
            multNum: text,
        });
    }
    render() {
        let des = this.props.numOfChips + "chips X" + this.state.multNum + "倍=" + this.props.price * this.state.multNum * this.props.numOfChips + "yuan";

        return (
            <View style={styles.container}>
                <View style={styles.upContainer}>
                    <TouchableOpacity style={styles.clearBtn}>
                        <Icon name="ios-trash-outline" size={15} color="#fff"></Icon>
                        <Text style={styles.clearText}>Clear</Text> 
                    </TouchableOpacity>
                    <View style={styles.multView}>
                        <Icon name="md-color-wand" size={15} color="#fff"></Icon>
                        <Text style={styles.clearText}>BT</Text>
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
                <View style={styles.downContainer}>
                    <View style={{
                padding: 5,
            }}>
                        <Text style={{
                color: 'yellow'
            }}>{des}</Text>
                        <Text style={{
                color: 'white'
            }}>可用余额:12.5</Text>
                    </View>

                
            <TouchableOpacity style={styles.confirmBtn} >
                <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '400'
            }}>确定</Text>
            </TouchableOpacity>


                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        width: Util.size.width,
        height: 80,
        zIndex: 2,
    },
    upContainer: {
        width: Util.size.width,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    downContainer: {
        width: Util.size.width,
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
        padding: 1,
        borderWidth: Util.pixel,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 15,
        borderColor: '#eee',
        marginTop: 5,
        marginBottom: 5,
    },
    clearText: {
        fontSize: 14,
        fontWeight: '200',
        color: '#fff',
        paddingLeft: 5,
    },
    multView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    multInput: {
        padding: 5,
        paddingBottom:8,
        backgroundColor: "#fff",
        height: 25,
        width:39,
        textAlign:'center',
        borderColor: 'gray',
        borderWidth: 1,
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
        width: 60,
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
        paddingLeft: 10
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