'use strict';
import React, { Component } from "react";
import { StyleSheet, View, Text, Platform, ScrollView, TouchableOpacity } from "react-native";
import Util from '../../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
export default class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fund: 0,
        }
    }


    onClick(tab) {
        console.log(tab);
        this.props.navigator.push({
            "my": tab
        })
    }


    render() {
        return (
            <View style={styles.container}>
            <View style={{
                width: Util.size.width,
                height: 50,
                backgroundColor: '#323245',
            }} />

    <View style={{
                width: Util.size.width,
                height: 70,
                backgroundColor: 'green',
                flexDirection: 'row',
                alignItems: 'center'
            }} >
        <View style={{
                flex: 1
            }}/>
        <View style={{
                flex: 2,
                borderLeftWidth: 1,
                borderColor: '#eee',
                borderRightWidth: 1,
                height: 70,
                alignItems: 'center',
                justifyContent: 'center'
            }} >
        <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '300'
            }}>余额:￥12.5元</Text>
        </View>
        <View style={{
                flex: 1
            }} />
    </View>

    <ScrollView style={{
                flex: 1
            }}>
        <View style={styles.paddingHeight}/>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("moneyDetail")}>
            <Icon name='md-cash' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>资金明细</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("detail")}>
            <Icon name='md-card' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>记录</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("detail")}>
            <Icon name='md-albums' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>记录</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>

        <View style={styles.paddingHeight}/>

        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("detail")}>
            <Icon name='md-mail' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>站内信</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("detail")}>
            <Icon name='md-alarm' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>公告</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>

        <View style={styles.paddingHeight}/>

        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("detail")}>
            <Icon name='md-settings' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>设置</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
    </ScrollView>

            </View>



            );
    }

}
let CONTENT_HEIGHT = Platform.OS === 'ios' ? 41 : 73;
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: Util.size.width,
        height: Util.size.height - CONTENT_HEIGHT,
    },
    itemContain: {
        backgroundColor: 'white',
        height: 50,
        width: Util.size.width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15
    },
    item: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        paddingRight: 20,
        borderBottomWidth: .5,
        borderColor: '#bbb'
    },
    itemTitle: {
        fontWeight: '500',
        fontSize: 18,
        color: 'gray'
    },
    paddingHeight: {
        width: Util.size.width,
        height: 15,
        backgroundColor: '#eee'
    }
})