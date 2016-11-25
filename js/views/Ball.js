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

import React, { Component } from 'React';
import { StyleSheet, View, TouchableOpacity, Text, TouchableHighlight, } from 'react-native';

class TopicItem extends Component {
    props: {
    topic: string;
    color: string;
    isChecked: boolean;
    onToggle: (value: boolean) => void;
    };

    constructor(props) {
        super(props);
        this.state = {
            onPress: false,
        }

    }
    onPressIn() {
        // console.log("onPressIn");
        if (!this.state.isChecked) {
            this.setState({
                onPress: true
            })
        }
    }

    onPressOut() {
        // console.log("onPressOut");
        this.setState({
            onPress: false
        })
    }

    _onToggle() {
        let check = this.props.onToggle();
        if (check) {
            console.log("onToggle ok");
        } else {
            console.log("onToggle not done")
        }
        // let {isChecked} = this.state;
        // this.setState({
        //     isChecked: !isChecked
        // })
    }
    render() {
        const {topic, coloronToggle} = this.props;
        const isChecked = this.props.isChecked;
        const style = isChecked || this.state.onPress
            ? {
                backgroundColor: "red",
                borderWidth: 0
            }
            : {
                borderColor: "#D6D6D6",
                borderWidth: 1
            };
        const numColor = isChecked || this.state.onPress
            ? {
                color: '#fff'
            }
            : {
                color: '#000'
            };
        const accessibilityTraits = ['button'];
        if (isChecked) {
            accessibilityTraits.push('selected');
        }
        return (
            <TouchableOpacity
            accessibilityTraits={accessibilityTraits}
            activeOpacity={0.8}
            underlayColor="red"
            style={[styles.boll, style]}
            onPress={this._onToggle.bind(this)}
            onPressIn={this.onPressIn.bind(this)}
            onPressOut={this.onPressOut.bind(this)}
            >
        <Text style={[styles.bollText, numColor]}>
          {topic}
        </Text>
        {this.state.onPress ? <View style={styles.overLayBall}>
          <Text style={[styles.bollText, {
                color: 'white'
            }]}>
          {topic}
          </Text>
        </View> : <View />
            }
      </TouchableOpacity>
            );
    }
}

const SIZE = 34;

var styles = StyleSheet.create({
    title: {
        fontSize: 17,
        color: 'white',
        flex: 1,
    },
    boll: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 10,
        borderColor:'#D6D6D6',
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
        color: '#58556F',
        fontWeight: '600',
        backgroundColor:'transparent',
    },
    overLayBall: {
        zIndex: 3,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        left: -3,
        top: -43,
        backgroundColor: 'red',
        overflow: 'visible',
    },
});

module.exports = TopicItem;
