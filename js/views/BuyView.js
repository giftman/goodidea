'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import Util from '../utils/Util';
const StyleSheet  = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import MainList from './MainList';
class TwitterPost extends Component {
  constructor(props) {
    super(props);
    
    this.data = [{'title':'Happy fun','img':'https://facebook.github.io/react/img/logo_og.png'},{'title':'Happy fun','img':'https://facebook.github.io/react/img/logo_og.png'},{'title':'Happy fun','img':'https://facebook.github.io/react/img/logo_og.png'},{'title':'Happy fun','img':'https://facebook.github.io/react/img/logo_og.png'}]
   
    this.state = {
      isRefreshing:false,
      data : this.data,
    };
  }

  _onRefresh() {
    this.setState({isRefreshing:true});
    setTimeout(()=> {
      this.setState({isRefreshing:false});
    },2000);
  }

  render(){
    return(
      <MainList style={{backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height-90,
    }}
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

class TwitterFlow extends Component{
  render() {
    var leftItem = this.props.leftItem;
    
    leftItem = {
        layout: 'title',
        title:'ios-arrow-back',
        onPress: () => this.props.navigator.pop(),
      };
    
    var rightItem = {
      icon:require('../common/img/hamburger.png'),
      onPress: () => this.props.navigator.pop(),
    }
    var helpItem = {
      layout:'title',
      title:'ios-help-circle-outline',
      onPress: () => this.props.navigator.pop(),
    }
    return(
      <View>
      <F8Header
      style={{backgroundColor:"#100118"}}
      title="Test"
      leftItem={leftItem}
      rightItem={rightItem}
      helpItem={helpItem}
      >
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'white',fontWeight:'500',fontSize:20,paddingRight:5}}>Test</Text>
        <Image style={{transform:[{rotate:'-90deg'},{scale:0.7}]}} source={require('../common/img/back_white.png')} />
      </View>
      </F8Header>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  
});


export default TwitterFlow;