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

import Util from '../../utils/Util';
const StyleSheet  = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import TrendList from './TrendList';
import TipPadding from '../TipPadding';
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
      <TrendList style={{backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height-90,
    }}  navigator={this.props.navigator}
        data = {this.state.data}
        refreshControl = {
          <RefreshControl 
            refreshing={this.state.isRefreshing}
            onRefresh ={this._onRefresh.bind(this)}
            tintColor="#ddd"
          />
      }>
      </TrendList>
      )
  }
}

class TwitterFlow extends Component{
  render() {
    
    var rightItem = {
      layout:'title',
      title:'md-menu',
      onPress: () => this.props.navigator.push({'trendSet':'123'}),
    }
    return(
      <View>
         <F8Header
      style={{backgroundColor:"#100118"}}
      title="Trending"
      rightItem={rightItem}
      >
      </F8Header>
      <TipPadding content="H" icon="md-menu"></TipPadding>
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