'use strict';

import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';

import { changeTab} from '../actions';

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
            <TabNavigator>
      <TabNavigator.Item
            title="主页"
            renderIcon={() => <Icon  name="md-home" size={30} color="#666" />}
            renderSelectedIcon={() => <Icon name="md-home" size={30} color="#4F8EF7" />}
            // badgeText="1"
            onPress={ () => this.changeTab('主页')}
            selected={this.props.selectedTab === '主页'}>
          <Main navigator={this.props.navigator}/>
        </TabNavigator.Item>
         <TabNavigator.Item
            title="通知"
            renderIcon={() => <Icon name="md-aperture" size={30} color="#666" />}
            renderSelectedIcon={() => <Icon name="md-aperture" size={30} color="#4F8EF7" />}
            // badgeText="1"
            onPress={ () => this.changeTab('通知')}
            selected={this.props.selectedTab === '通知'}>
          <TrendView navigator={this.props.navigator}/>
        </TabNavigator.Item>
         <TabNavigator.Item
            title="我"
            renderIcon={() => <Icon name="md-person" size={30} color="#666" />}
            renderSelectedIcon={() => <Icon name="md-person" size={30} color="#4F8EF7" />}
            // badgeText="1"
            onPress={ () => this.changeTab('我')}
            selected={this.props.selectedTab === '我'}>
          <MyPage navigator={this.props.navigator}/>
        </TabNavigator.Item>
      </TabNavigator>
            );
    }
}



const styles = StyleSheet.create({

});

function select(store) {
    return {
        selectedTab: store.navigation.selectedTab,
    };
}

function actions(dispatch) {
    return {
        changeTab: (tab) => dispatch(changeTab(tab)),
        // getToken:()=>dispatch(getToken()),
        // login:()=>dispatch(login({"username":"ceshi001","password":"a123456"})),
        // getGameConfig: ()=>dispatch(getGameConfig(1)),
    };
}

module.exports = connect(select, actions)(TwitterTab);