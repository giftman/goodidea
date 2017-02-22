/**
 * Created by guguyanhua on 12/11/15.
 */
import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
var TimerMixin = require('react-timer-mixin');

function formatMinutes(minutes){
    var day = parseInt(Math.floor(minutes / 86400));
    var hour = day >0? Math.floor((minutes - day*86400)/3600):Math.floor(minutes/3600);
    var minute = hour > 0? Math.floor((minutes -day*86400 - hour*3600)/60):Math.floor(minutes/60);
    var second = minute > 0? Math.floor(minutes -day*86400 - hour*3600-minute*60):minutes;
    var time="";
    if (day > 0) time += day + "天";
    if (hour > 0) time += hour + "小时";
    if (minute > 0) time += minute + "分钟";
    time += second+"秒";
    return time;
}
var CountDown = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      time: this.props.time ? this.props.time : 60*10,
      countText:'',
      disabled: true
    };
  },
  componentDidMount(){
    this._countdown();
  },
  render(){
    var style = [styles.text];
    var component;
    // style.push({color: 'gray'});
    // style.push(this.props.disabledTextStyle);
      component =
          <View
              style={[styles.wrapper,this.props.buttonStyle]}
              >
              <Text style={[style]}>{this.props.text} <Text style={{color:"yellow"}}>{this.state.countText}</Text></Text>
          </View>

    return (
        component
    )
  },
  _onPress(){
    if (this.state.disabled) {
      //nothing
    } else {
      this.setState({disabled: true});
      this._countdown();
      if(this.props.onPress){
          this.props.onPress();
      }
    }
  },

  _countdown(){
    var timer = function () {
      var time = this.state.time - 1;
      this.setState({time: time});
      this.setState({countText: formatMinutes(time)});
      if (time > 0) {
        this.setTimeout(timer, 1000);
      } else {
        this.props.timesUp();
        var newTime = 60*10;
        if(this.props.changeAfterTen && (new Date().getHours() > 16)){
          newTime = 60*5;
        }
        this.setState({time: newTime});
        this.setState({countText: formatMinutes(newTime)});
        this.setTimeout(timer, 1000);

      }
    };
    this.setTimeout(timer.bind(this), 1000);
  }
});

var styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  wrapper: {
    padding: 10,
    marginRight:10,
    backgroundColor: '#8f8468',
  }
});

module.exports = CountDown;
