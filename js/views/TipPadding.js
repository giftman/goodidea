
'use strict';

var F8Colors = require('../common/F8Colors');
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Util from '../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
class ReadingCell extends React.Component {
    props: {
    content: any;
    icon:any;
    style: any;
    };

    render() {
        let {content, icon} = this.props;

        return (
            <View style={styles.containerItem}>
        {icon ? <Icon name={icon} size={15} color="#fff"></Icon> : <View />}
        <Text style={styles.title}>{content}</Text>
      </View>
        )
    }
}


var styles = StyleSheet.create({
    containerItem: {
        height: 25,
        width: Util.size.width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8f8468',
        flexDirection: 'row'
    },
    title: {
        fontSize: 12,
        color: 'white',
        paddingLeft: 10
    },
});


module.exports = ReadingCell;
