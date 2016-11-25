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

var F8Colors = require('./F8Colors');
import React, { Component } from 'react';

import { View, Text,TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class EasyButton extends React.Component {
    props: {
    // type: 'primary' | 'secondary' | 'bordered';
    icon: string;
    iconColor:any;
    captionStyle:any;
    caption: string;
    style: any;
    onPress: () => void;
    };

    render() {
        const caption = this.props.caption;
        let icon;
        if (this.props.icon) {
            icon =<Icon name={this.props.icon} size={25} color="#fff"></Icon>;
        }
        if (this.props.iconColor) {
            icon =<Icon name={this.props.icon} size={25} color={this.props.iconColor}></Icon>;
        }
        let content;
        content = (
        <View style={[styles.button]}>
          {icon}
          <Text style={[styles.caption,this.props.captionStyle]}>
            {caption}
          </Text>
        </View>
            );
        return (
            <TouchableOpacity
            accessibilityTraits="button"
            onPress={this.props.onPress}
            activeOpacity={0.8}
            style={[styles.container, this.props.style]}>
        {content}
      </TouchableOpacity>
            );
    }
}

const HEIGHT = 44;

var styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        marginLeft:10,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        borderWidth: 1,
        borderColor: F8Colors.lightText,
        borderRadius: HEIGHT / 2,
    },
    icon: {
        marginRight: 12,
    },
    caption: {
        letterSpacing: 1,
        fontSize: 12,
        color:'#fff',
        marginLeft:5,
    },
});

module.exports = EasyButton;
