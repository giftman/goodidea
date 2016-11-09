'use strict';
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    ScrollView,
    TouchableOpacity
} from "react-native";
import Util from '../../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
export default class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fund: 0,
        }
    }


    onClick(tab) {
        console.log(tab);
    }

  
    render() {
        return (
            <View style={{backgroundColor:'white',width: Util.size.width,
    height:Util.size.height,
    }}>
            <View style={{width: Util.size.width,
    height:130,backgroundColor:'#101010',}} />

    <View style={{width: Util.size.width,
    height:70,backgroundColor:'green',flexDirection:'row',alignItems:'center'}} >
        <View style={{flex:1}}/>
        <View style={{flex:2,borderLeftWidth:1,borderColor:'#eee',borderRightWidth:1,height:70,alignItems:'center',justifyContent:'center'}} >
        <Text>12.5</Text>
        </View>
        <View style={{flex:1}} />
    </View>

    <ScrollView style={{flex:1}}>
        <View style={styles.paddingHeight}/>

        <TouchableOpacity style={styles.itemContain} onPress={()=>this.onClick("detail")}>
            <Icon name='md-settings' size={35} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>Setting</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#666"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={()=>this.onClick("detail")}>
            <Icon name='md-settings' size={35} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>Setting</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#666"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={()=>this.onClick("detail")}>
            <Icon name='md-settings' size={35} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>Setting</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#666"></Icon>
            </View>
        </TouchableOpacity>

        <View style={styles.paddingHeight}/>

        <TouchableOpacity style={styles.itemContain} onPress={()=>this.onClick("detail")}>
            <Icon name='md-settings' size={35} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>Setting</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#666"></Icon>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContain} onPress={()=>this.onClick("detail")}>
            <Icon name='md-settings' size={35} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>Setting</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#666"></Icon>
            </View>
        </TouchableOpacity>

        <View style={styles.paddingHeight}/>

        <TouchableOpacity style={styles.itemContain} onPress={()=>this.onClick("detail")}>
            <Icon name='md-settings' size={35} color="#666"></Icon>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>Setting</Text>
                 <Icon name='ios-arrow-forward' size={25} color="#666"></Icon>
            </View>
        </TouchableOpacity>
    </ScrollView>

            </View>


            
        );
    }

}
const styles = StyleSheet.create({
    itemContain:{
        backgroundColor:'white',height:50,width:Util.size.width,alignItems:'center',justifyContent:'center',flexDirection:'row',paddingLeft:15
    },
    item: {
        height:50,flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:20,paddingRight:20,borderBottomWidth:.5,borderColor:'#cc3'
    },
    itemTitle: {
        fontWeight:'500',
        fontSize: 18,
        color: 'gray'
    },
    paddingHeight:{
        width: Util.size.width,
        height:15,
        backgroundColor:'#eee'
    }
})