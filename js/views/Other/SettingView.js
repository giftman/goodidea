'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import Util from '../../utils/Util';
import { toastShort } from '../../utils/ToastUtil';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import EasyButton from '../../common/EasyButton';
import { checkSecurityQuestion} from '../../actions';

import { connect } from 'react-redux';
class SettingView extends Component {
    constructor(props) {
        super(props);
    }


    onClick(tab) {
        console.log(tab);
        switch (tab) {
          case "changeSafeQuestion":
            this.props.checkSecurityQuestion(this.props.navigator);
            break;
          default:
            this.props.navigator.push({
                "my": tab
            });
        }

    }


    render() {

        var leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };

        return (
            <View style={styles.container}>
      <F8Header
            style={{
                backgroundColor: "#323245"
            }}
            title="设置"
            leftItem={leftItem}
            >
      </F8Header>
           <ScrollView style={{
                flex: 1
            }}>
        <View style={styles.paddingHeight}/>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("changePasswd")}>
            <Icon name='md-cash' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>修改登录密码</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={() => this.onClick("changeSafeQuestion")}>
            <Icon name='md-card' size={30} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>修改密保</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#eee"></Icon>
            </View>
        </TouchableOpacity>

        <View style={styles.paddingHeight}/>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={[styles.confirmBtn, {
                backgroundColor: '#666'
            }]} onPress={() => this.props.logout(this.props.navigator)}>
                <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '400'
            }}>退出登陆</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
      </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eaeaea',
        flex:1
    },
    itemContain: {
        backgroundColor: 'white',
        height: 50,
        width: Util.size.width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15
    },
    item: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        paddingRight: 20,
        borderBottomWidth: .5,
        borderColor: '#bbb'
    },
    itemTitle: {
        fontWeight: '500',
        fontSize: 18,
        color: 'gray'
    },
    paddingHeight: {
        width: Util.size.width,
        height: 15,
        backgroundColor: '#eee'
    },
     confirmBtn: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: Util.size.width*.9,
        height: 50,
    },

});

function select(store) {
    return {
        username:store.user.username,
    };
}

function actions(dispatch) {
    return {
        clearPackage:()=>dispatch(clearPackage()),
        checkSecurityQuestion:(nav)=>dispatch(checkSecurityQuestion(nav)),
    };
}
module.exports = connect(select,actions)(SettingView);
