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
 * @providesModule F8Navigator
 * @flow
 */

'use strict';

import React from 'react';
import { Platform, BackAndroid, Navigator, StyleSheet, } from 'react-native';

import { connect } from 'react-redux';


import LoginView from './views/LoginView';
import EasyLogin from './views/EasyLogin';
import TwitterTab from './views/TwitterTab';
import BuyView from './views/BuyView';
import TrendSet from './views/Trending/TrendSet';
import MoneyDetail from './views/Other/MoneyDetail';
import GameRecord from './views/Other/GameRecord';
import TraceRecord from './views/Other/TraceRecord';
import GameRecordDetail from './views/Other/GameRecordDetail';
import TraceRecordDetail from './views/Other/TraceRecordDetail';
import ChangePasswd from './views/Other/ChangePasswd';
import ChangeMoneyPass from './views/Other/ChangeMoneyPass';
import WithdrawInfo from './views/Other/WithdrawInfo';
import WithdrawalApply from './views/Other/WithdrawApply';
import WithdrawalResult from './views/Other/WithdrawResult';
import SetSecurityQuestion from './views/Other/SetSecurityQuestion';
import SettingView from './views/Other/SettingView';
import BuyPackage from './views/BuyPackage';
import SplashView from './common/SplashView';
import { checkToken } from './actions';
import EasyDialog from './views/EasyDialog';
var AppNavigator = React.createClass({
    _handlers: ([]: Array<() => boolean>),

    componentDidMount: function() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    },

    componentWillUnmount: function() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    },

    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
        };
    },

    addBackButtonListener: function(listener) {
        this._handlers.push(listener);
    },

    removeBackButtonListener: function(listener) {
        this._handlers = this._handlers.filter((handler) => handler !== listener);
    },

    handleBackButton: function() {
        for (let i = this._handlers.length - 1; i >= 0; i--) {
            if (this._handlers[i]()) {
                return true;
            }
        }

        const {navigator} = this.refs;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        return false;
    },

    render: function() {
        return (
            <Navigator
            ref="navigator"
            style={styles.container}
            configureScene={(route) => {
                if (Platform.OS === 'android') {
                    return Navigator.SceneConfigs.FloatFromBottomAndroid;
                }
                // TODO: Proper scene support
                if (route.trendSet || route.test) {
                    return Navigator.SceneConfigs.FloatFromBottom;
                } else {
                    return Navigator.SceneConfigs.FloatFromRight;
                }
            }}
            initialRoute={{}}
            renderScene={this.renderScene}
            />
            );
    },

    renderScene: function(route, navigator) {
        if (route.game) {
            return (
                <BuyView
                {...route}
                navigator = {navigator}
                />
                );
        }
        if (route.twitterTab) {
            return (
                <TwitterTab
                navigator = {navigator}
                />
                );
        }
        if(route.login){
        return <EasyLogin navigator={navigator} />;
        }

        if (route.trendSet) {
            return <TrendSet navigator={navigator} />;
        }
        if (route.addToPackage) {
            return <BuyPackage navigator={navigator}/>;
        }

         if (route.dialog) {
            return <EasyDialog navigator={navigator} />;
        }
        if (route.my) {
            switch (route.my) {
            case "moneyDetail":
                return <MoneyDetail navigator={navigator} data={route.data}/>;
                break;
            case "setting":
                return <SettingView navigator={navigator} />;
                break;
            case "pay":
                return <SettingView navigator={navigator} />;
                break;
            case "withdraw":
                return <WithdrawInfo navigator={navigator} data={route.data}/>;
                break;
            case "withdrawApply":
                return <WithdrawalApply navigator={navigator} data={route.data} amount={route.amount} bank={route.bank} />;
                break;
            case "withdrawResult":
                return <WithdrawalResult navigator={navigator} />;
                break;
            case "gameRecord":
                return <GameRecord navigator={navigator} data={route.data}/>;
                break;
            case "traceRecord":
                return <TraceRecord navigator={navigator} data={route.data}/>;
                break;
            case "changePasswd":
                return <ChangePasswd navigator={navigator} />;
                break;
            case "changeMoneyPass":
                return <ChangeMoneyPass navigator={navigator} />;
                break;
            case "changeSafeQuestion":
                return <SetSecurityQuestion navigator={navigator} data={route.data}/>;
                break;
            case "GameRecordDetail":
                return <GameRecordDetail navigator={navigator} data={route.data}/>;
                break;
            case "TraceRecordDetail":
                return <TraceRecordDetail navigator={navigator} data={route.data}/>;
                break;
            case 2:
                break;
            default:
            }

        }

        return <SplashView navigator={navigator} checkToken={() => this.props.checkToken()}/>;
    },
});

AppNavigator.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

function select(store) {
    return {
        tab: store.navigation.tab,
    };
}
function actions(dispatch) {
    return {
        checkToken:()=> dispatch(checkToken()),
    };
}
module.exports = connect(select,actions)(AppNavigator);
