'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import EasyButton from '../common/EasyButton';

class BuyPackage extends Component {

    _onclick(type){
        console.log(type);
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
            title="号码篮"
            leftItem={leftItem}
            >
      </F8Header>
            <View style={styles.randomContain}>
                <EasyButton style={styles.randomButton} caption="Luck one" icon="md-add-circle" onPress={()=>this._onclick(1)}/>
                 <EasyButton style={styles.randomButton} caption="Luck one" icon="md-add-circle" onPress={()=>this._onclick(5)}/>
                  <EasyButton style={styles.randomButton} caption="Luck one" icon="md-add-circle" onPress={()=>this.props.navigator.pop()}/>
            </View>
      </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eaeaea'
    },
    randomContain:{
        width:Util.size.width,
        flexDirection:'row',
        paddingRight:10,
        paddingBottom:10,
        paddingTop:10,

    },
    randomButton:{
        flex:1,
        backgroundColor:'#8F8468',
    },
    postImg: {
        width: Util.size.width,
        height: Util.size.height - 110,
        ios: {
            top: -20,
        },
        android: {
            top: 5,
        },
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
        ios: {
            paddingTop: 30,
        },
        android: {
            paddingTop: 5,
        }
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


export default BuyPackage;