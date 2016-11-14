'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, } from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import MainList from './MainList';
class TwitterPost extends Component {
    constructor(props) {
        super(props);

        this.data = [{
            'title': 'Happy fun',
            'img': 'https://facebook.github.io/react/img/logo_og.png'
        }, {
            'title': 'Happy fun',
            'img': 'https://facebook.github.io/react/img/logo_og.png'
        }, {
            'title': 'Happy fun',
            'img': 'https://facebook.github.io/react/img/logo_og.png'
        }, {
            'title': 'Happy fun',
            'img': 'https://facebook.github.io/react/img/logo_og.png'
        }]

        this.state = {
            isRefreshing: false,
            data: this.data,
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
        return (
            <MainList style={{
                backgroundColor: '#eee',
                width: Util.size.width,
                height: Util.size.height - 90,
            }}  navigator={this.props.navigator}
            data = {this.state.data}
            refreshControl = {
            <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh ={this._onRefresh.bind(this)}
            tintColor="#ddd"
            />
            }>
      </MainList>
        )
    }
}

class TwitterFlow extends Component {
    render() {
        var leftItem = this.props.leftItem;

        leftItem = {
            layout: 'title',
            title: 'md-notifications',
            onPress: () => this.props.navigator.pop(),
        };

        return (
            <View>
         <F8Header
            style={{
                backgroundColor: "#323245"
            }}
            leftItem={leftItem}
            >
     
      </F8Header>
        <TwitterPost navigator={this.props.navigator}></TwitterPost>
      </View>
        )
    }
}



const styles = StyleSheet.create({

});


export default TwitterFlow;