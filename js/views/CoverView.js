
'use strict';

import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import Util from '../utils/Util';
class CoverView extends React.Component {
    props: {
    layer: number;
    opacity:number;
    };

    render() {
        let {layer,opacity} = this.props;

        return (
            <View style={[styles.containerItem,{zIndex:layer,opacity:opacity}]}></View>
        )
    }
}


var styles = StyleSheet.create({
    containerItem: {
        height: Util.size.height,
        width: Util.size.width,
        position:'absolute',
        top:0,
        left:0,
        backgroundColor:'#666',
    },
});


module.exports = CoverView;
