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

import React,{Component} from 'React';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from 'react-native';

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
        onPress:false,
        isChecked:false,
    }
       
  }
  onPressIn(){
    // console.log("onPressIn");
    if(!this.state.isChecked){
      this.setState({
      onPress:true
    })
    }
  }

  onPressOut(){
    // console.log("onPressOut");
    this.setState({
      onPress:false
    })
  }

  _onToggle(){
    this.props.onToggle();
    let {isChecked} = this.state;
    this.setState({
      isChecked:!isChecked
    })
  }
  render() {
    const {topic, coloronToggle} = this.props;
    const isChecked = this.state.isChecked;
    const style = isChecked
      ? {backgroundColor: "red",borderWidth: 0}
      : {borderColor: "#000", borderWidth: 1};
    const numColor = isChecked
      ? {color:'#fff'}
      : {color:'#000'};
    const accessibilityTraits = ['button'];
    if (isChecked) {
      accessibilityTraits.push('selected');
    }
    return (
      <TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        style={[styles.boll,style]}
        onPress={this._onToggle.bind(this)}
        onPressIn={this.onPressIn.bind(this)}
        onPressOut={this.onPressOut.bind(this)}
        >
        <Text style={[styles.bollText,numColor]}>
          {topic}
        </Text>
        {this.state.onPress?<View style={styles.overLayBall}>
          <Text style={[styles.bollText,{color:'white'}]}>
          {topic}
          </Text>
        </View>:<View />
        }
        
      </TouchableOpacity>
    );
  }
}

const SIZE = 28;

var styles = StyleSheet.create({
  title: {
    fontSize: 17,
    color: 'white',
    flex: 1,
  },
  boll:{
    width:SIZE,
    height:SIZE,
    borderRadius:SIZE /2,
    borderWidth:1,
    marginLeft:8,
    marginRight:8,
    marginTop:10,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  bollText:{
    fontSize:18,
    color:'#000',
    fontWeight:'600',
  },
  overLayBall:{
    zIndex:2,width:40,height:40,borderRadius:20,alignItems:"center",justifyContent:"center",position:'absolute',left:-6,top:-38,backgroundColor:'red'
  },
});

module.exports = TopicItem;
