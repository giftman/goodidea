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
class TwitterPost extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isRefreshing:false,
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
      <ScrollView style={{backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height-90,
    }}
        refreshControl = {
          <RefreshControl 
            refreshing={this.state.isRefreshing}
            onRefresh ={this._onRefresh.bind(this)}
            tintColor="#ddd"
          />
      }>
      <View>
        <Text>Header2</Text>
      </View>
      </ScrollView>
      )
  }
}

class TwitterFlow extends Component{
  render() {
    var leftItem = this.props.leftItem;
    
      leftItem = {
        layout: 'icon',
        icon: require('../common/img/back_white.png'),
        onPress: () => this.props.navigator.pop(),
      };
    
    var rightItem = {
      icon:require('../common/img/filter.png'),
      onPress: () => this.props.navigator.pop(),
    }
    return(
      <View>
         <F8Header
      style={{backgroundColor:"#100118"}}
      title="Test"
      leftItem={leftItem}
      rightItem={rightItem}
      >
      <View style={{flexDirection:'row'}}>
        <Text style={{color:'white',fontWeight:'500',fontSize:20}}>Test</Text>
        <Image style={{transform:[{rotate:'-90deg',scale:0.5}]}} source={require('../common/img/back_white.png')} />
      </View>
      </F8Header>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  postImg:{
    width:Util.size.width, height:Util.size.height-110,
    ios:{
      top:-20,
    },
    android:{
      top:5,
    },
    backgroundColor:'#fff'
  },
  header:{
    flexDirection:'row',paddingBottom:5,borderBottomWidth:2,borderBottomColor:'#eee', 
    backgroundColor:'#fff',
    ios:{
      paddingTop:30,
    },
    android:{
      paddingTop:5,
    }
  },
  navLeft:{
    flex:1,
    // backgroundColor:'green',
    justifyContent:'center',
    alignItems:'flex-start',
  },
  navMid:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  navRight:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    flexDirection:'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});


export default TwitterFlow;