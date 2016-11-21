'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, Animated, Easing, } from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import { HEADER_HEIGHT } from '../common/F8Colors';
import BuyCell from './BuyCell';
type Props = {
data:any;
navigator: Navigator;
count:number;
limit:number;
};
class BuyList extends Component {
    props:Props;

    constructor(props) {
        super(props);


        this.state = {
            isRefreshing: false,
        };
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
        let boxes = <View />
        // console.log(this.props.data);
        if (this.props.data && this.props.data.methods) {
            boxes = Object.keys(this.props.data.methods).map((name, index) => {
                // console.log(name);
                return (
                    <BuyCell  key={index} name={name} list={this.props.data.methods[name].list} onToggle={(name, index) => this.props.onToggle(name, index)}/>
                    );
            })
        }

        return (
            <ScrollView style={styles.postContainer}>
        {boxes}
      </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#eee',
        width: Util.size.width,
        height: Util.size.height,
    },

    containerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 15,
        paddingLeft: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    containerMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
        paddingLeft: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
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
    bollText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
    },
    added: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0,
    },
});


export default BuyList;