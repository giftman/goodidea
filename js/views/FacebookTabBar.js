'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  Easing,
  RefreshControl,
  TabBarIOS,
} from 'react-native';

import Util from '../utils/Util';
const StyleSheet  = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
  prop:{
    hideThis: React.PropTypes.func.isRequired,
  }

  constructor(props: any) {
    super(props);
    this.state = {
      transformAnim: new Animated.Value(1),
      opacity:new Animated.Value(1),
      rotateAnim:new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(         
       this.state.transformAnim,    
       {toValue: 50,
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),
      },          
    ).start();
    Animated.timing(         
       this.state.opacity,    
       {toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay:2200,
      },          
     ).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);            
  }

  render () {
    return(
      <Animated.View style={[styles.entrance,{opacity:this.state.opacity}]}>
        <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter"></AnimatedIcon>
      </Animated.View>
    )
  }
}

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
      <View  style={styles.postImg}></View>
      </ScrollView>
      )
  }
}

class TwitterFlow extends Component{
  render() {
    return(
      <View>
        <View style={styles.header}>
          <View style={styles.navLeft}>
            <Icon name="ios-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
          </View>
          <View style={styles.navMid}>
            <Icon name="logo-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
          </View>
          <View style={styles.navRight}>
            <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
            <Icon name="ios-git-compare" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
          </View>
        </View>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
}
class TwitterTab extends Component{
  constructor() {
    super();
    this.state = {
      selectedTab:'主页',
    };
  }

  changeTab(tabName) {
      this.setState({
        selectedTab: tabName
      });
  }

  render(){
    return (
      
      <TabNavigator>
      <TabNavigator.Item
        title="主页"
        renderIcon={()=><Icon name="ios-home-outline" size={30} color="#4F8EF7" />}
        renderSelectedIcon={()=><Icon name="ios-home" size={30} color="#4F8EF7" />}
        // badgeText="1"
        onPress={ () => this.changeTab('主页') }
        selected={ this.state.selectedTab === '主页' }>
          <TwitterFlow/>
        </TabNavigator.Item>
         <TabNavigator.Item
        title="通知"
        renderIcon={()=><Icon name="ios-alert-outline" size={30} color="#4F8EF7" />}
        renderSelectedIcon={()=><Icon name="ios-alert" size={30} color="#4F8EF7" />}
        // badgeText="1"
        onPress={ () => this.changeTab('通知') }
        selected={ this.state.selectedTab === '通知' }>
          <TwitterFlow/>
        </TabNavigator.Item>
         <TabNavigator.Item
        title="我"
        renderIcon={()=><Icon name="ios-person-outline" size={30} color="#4F8EF7" />}
        renderSelectedIcon={()=><Icon name="ios-person" size={30} color="#4F8EF7" />}
        // badgeText="1"
        onPress={ () => this.changeTab('我') }
        selected={ this.state.selectedTab === '我' }>
          <TwitterFlow/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

class Twitter extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      show: true,
    };
  }
    _hide(){
    this.setState({
      show:false,
    })
  }
  render() {
    let launch = this.state.show ? <Entrance hideThis={()=>this._hide()} /> : <View />;
    return (
      <View style={{width:Util.size.width,height:Util.size.height}}>
     <TwitterTab />
      </View>
    );
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


export default Twitter;