/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';

import {normalize} from '../common/F8Colors';
var F8Touchable = require('../common/F8Touchable');
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Util from '../utils/Util';
import Ball from './Ball';

class BuyCell extends React.Component {
    props: {
    name:any;
    list: any;
    style: any;
    chips:number;
    };

    _isChecked(name,index){
      let {choice} = this.props;
      if(choice[name]){
        return choice[name].includes(index);
      }
      return false
    }

    render() {
        const {name, list, color, isChecked, onToggle} = this.props;

        const style = isChecked
            ? {
                backgroundColor: color
            }
            : {
                borderColor: color,
                borderWidth: 1
            };

        var cell = <View key={name} style={styles.containerItem}>
          <Image
        style={styles.img}
        source={require('../img/tangle.png')}
        resizeMode='contain'
        >
          <Text style={styles.title}>{name}</Text>
          </Image>

          <View style={{
            flex: 1,
            flexDirection: 'column',
            paddingLeft: 20
        }} >
            <View style={styles.bolls}>
            {
        list.map((num, index) => {
            return (
                <Ball key={index} topic={num} color="green" isChecked={this._isChecked(name,index)} onToggle={() => this.props.onToggle(name, index)} />
            )
        })
        }
            </View>
          </View>
          
        </View>

        return cell;
    }
}


var styles = StyleSheet.create({
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
    img: {
        width: 65,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'flex-start',
        marginTop:10,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        backgroundColor: 'transparent',
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
        justifyContent: "flex-start",
        flexDirection: 'row',
        paddingRight: normalize(40),
        paddingBottom: 10,
        paddingTop: 10,
        flexWrap: 'wrap',
    },
});


module.exports = BuyCell;
