'use strict';

import React, { Component } from 'react';
import { Navigator,Image} from 'react-native';
import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';

import { changeTab,bet,getToken,login} from '../actions';

import type { Tab } from '../reducers/navigation';

import Main from './Main';
import TrendView from './Trending/TrendView';
import MyPage from './My/MyPage';
class TwitterTab extends Component {
    props:{
    tab:Tab;
    onTabSelect:(tab:Tab) => void;
    navigator:Navigator;
    }

    constructor(props) {
        super(props);
    // this.state={
    //   selectedTab:'主页'
    // }
    // this.props.getToken();
    // this.props.login();
    // this.props.bet();

    // this.props.getGameConfig();
    }

    changeTab(tab) {
        if (this.props.selectedTab != tab) {
            this.props.changeTab(tab);
        }
    // this.setState({
    //   selectedTab:tab
    // })

    }

    render() {
        return (
            <TabNavigator
              tabBarStyle={{overflow: 'hidden',backgroundColor:'#323335' }}
              >
      <TabNavigator.Item
            title="主页"
            renderIcon={() => <Image style={styles.tabBar} source={require('../img/goucaidating2.png')} resizeMode='contain' />}
            renderSelectedIcon={() => <Image style={styles.tabBar} source={require('../img/goucaidating.png')} resizeMode='contain' />}
            onPress={ () => this.changeTab('主页')}
            selectedTitleStyle={{color:'#AC9B65'}}
            selected={this.props.selectedTab === '主页'}>
          <Main navigator={this.props.navigator}/>
        </TabNavigator.Item>
         <TabNavigator.Item
            title="开奖走势"
            renderIcon={() => <Image style={styles.tabBar} source={require('../img/kaijiang1.png')} resizeMode='contain' />}
            renderSelectedIcon={() => <Image style={styles.tabBar} source={require('../img/kaijiang2.png')} resizeMode='contain' />}
            // badgeText="1"
            selectedTitleStyle={{color:'#AC9B65'}}

            onPress={ () => this.changeTab('通知')}
            selected={this.props.selectedTab === '通知'}>
          <TrendView navigator={this.props.navigator}/>
        </TabNavigator.Item>
         <TabNavigator.Item
            title="我的正点"
            renderIcon={() => <Image style={styles.tabBar} source={require('../img/wodezhengdian1.png')} resizeMode='contain' />}
            renderSelectedIcon={() => <Image style={styles.tabBar} source={require('../img/wodezhengdian2.png')} resizeMode='contain' />}
            // badgeText="1"
            selectedTitleStyle={{color:'#AC9B65'}}

            onPress={ () => this.changeTab('我')}
            selected={this.props.selectedTab === '我'}>
          <MyPage navigator={this.props.navigator}/>
        </TabNavigator.Item>
      </TabNavigator>
            );
    }
}



const styles = StyleSheet.create({
  tabBar:{
    // height:30,
  }
});

function select(store) {
    return {
        selectedTab: store.navigation.selectedTab,
    };
}

function actions(dispatch) {
    return {
        changeTab: (tab) => dispatch(changeTab(tab)),
        getToken:()=>dispatch(getToken()),
        bet:()=>dispatch(bet({"username":"ceshi001","password":"a123456"})),
        login:()=>dispatch(login({"username":"ceshi001","password":"a123456"})),
        // getGameConfig: ()=>dispatch(getGameConfig(1)),
    };
}

module.exports = connect(select, actions)(TwitterTab);
