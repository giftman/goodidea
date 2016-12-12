
'use strict';

import {normalize} from '../common/F8Colors';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Util from '../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';

class EasyCheckBox extends React.Component {
    props: {
    isChecked:any;
    name:string;
    icon:string;
    onPress: ()=>void;
    index:number;
    style: any;
    };

    constructor(props) {
    super(props);

    this.state={
      isChecked:false,
      name:"位位"
    }
  }


    render() {
        const {name,isChecked,index} = this.props;

        const bgStyle = isChecked
            ? {
                backgroundColor: "#FF6600"
            }
            : {
                borderColor: "#eeeeee",
            };
        const titleColor = isChecked
            ? {
                color: "#fff"
            }
            : {
                color: "#9C9A9C",
            };
        let icon;
        if (isChecked && this.props.icon) {
            icon =<Icon name={this.props.icon} size={20} color="#3B99FC"></Icon>;
        }else{
            icon = <View style={styles.retangle} />
        }

        let content;
        content = (
        <View style={[styles.containerItem]}>
          {icon}
          <Text style={[styles.title,titleColor]}>
            {name}
          </Text>
        </View>
            );
        return (
            <TouchableOpacity
            accessibilityTraits="button"
            onPress={() => this.props.onPress(index)}
            activeOpacity={0.8}
            style={[styles.container, this.props.style,bgStyle]}>
        {content}
      </TouchableOpacity>
            );
    }
}

const HEIGHT = normalize(24);
const WIDTH = normalize(62);
var styles = StyleSheet.create({
    retangle:{
        width:normalize(12),
        height:normalize(12),
        backgroundColor:'#fff',
        marginRight:normalize(5),
    },
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 12,
        fontWeight: '300',
        color: 'white',
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor:'#eeeeee',
        borderWidth: Util.pixel,
        borderColor: '#D1D1D1',
        borderRadius: normalize(18),
        width:normalize(62),
        height:HEIGHT,
    },
});


module.exports = EasyCheckBox;
