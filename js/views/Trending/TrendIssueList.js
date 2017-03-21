'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';

import Util from '../../utils/Util';
import F8Header from '../../common/F8Header';
import PureListView from '../../common/PureListView';
import { headerBG } from '../../common/F8Colors';
import Icon from 'react-native-vector-icons/Ionicons';

class TrendIssueList extends Component {
    constructor(props: Props) {
        super(props);
        this.data = [{
            'code': '95655',
            'number': '170317073',
            'time': '01月12日',
        }, {
          'code': '95655',
          'number': '170317073',
          'time': '01月12日',
        }]

    }
    render() {
        var leftItem = this.props.leftItem;

        leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };


        return (
            <View style={{
                backgroundColor: 'white',
                flex: 1
            }}>
      <F8Header
            style={{
                backgroundColor: "#323245"
            }}
            title="记录"
            leftItem={leftItem}
            >

      </F8Header>
      <ReadingListView data={this.props.data} navigator={this.props.navigator}></ReadingListView>
      </View>
        )
    }
}

class ReadingListView extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = {
            data: this.props.data,
            isRefreshing: false,
        };

        this.renderRow = this.renderRow.bind(this);
        this.renderEmptyList = this.renderEmptyList.bind(this);
    }

    _onRefresh() {
        this.setState({
            isRefreshing: true
        });
        setTimeout(() => {
            this.setState({
                isRefreshing: false
            });
        }, 2000);
    }

    render() {
        return (
            <PureListView
            data={this.props.data}
            renderRow={this.renderRow}
            {...this.props}
            renderEmptyList={this.renderEmptyList}
            refreshControl = {
            <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh ={this._onRefresh.bind(this)}
            tintColor="#ddd"
            />
            }
            />
            );
    }


    renderRow(article: any, typeId: number) {
      var balls = <View />
      if(article.code){
        balls = article.code.split("").map((ele,index)=>{
          return (
            <Image key={index} source={require('../../img/ball_bg.png')} style={styles.balls} resizeMode='contain'>
                <Text style={styles.ballText}>{ele}</Text>
            </Image>
          )
        })
      }
        return (
            <TouchableOpacity key={article.serial_number} style={styles.container} onPress={()=>this._onPress(article)}>
              <View style={{width:Util.size.width,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={[styles.time,{backgroundColor:'transparent'}]}>{'第' + article.number +'期'}</Text>
                <Text style={[styles.time,{backgroundColor:'transparent'}]}>{'1月6号'}</Text>
              </View>
              <View style={{width:Util.size.width,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',flex:1}}>
                    {balls}
                </View>
                <Icon  style={{alignSelf:'flex-end',paddingRight:10}}name="ios-arrow-forward" size={30} color="#A0A0A0" />
              </View>
            </TouchableOpacity>
            );
    }

    _onPress(article){
      // this.props.navigator.push({"my":"GameRecordDetail","data":article});
    }

    renderEmptyList(): ?ReactElement {
        return <View style={{flex:1,paddingTop:10,width:Util.size.width,justifyContent:'center',alignItems:'center'}}><Text>暂无数据</Text></View>
    }


}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        padding: 8,
        width:Util.size.width,
        // backgroundColor:'#eee',
        // borderBottomWidth:0.2,
        // borderColor:'#666'
    },
    balls:{
      flexDirection:'row',justifyContent:'center',alignItems:'center',width:34,height:34,marginLeft:10,
    },
    ballText:{
      backgroundColor:'transparent',color:'white',fontWeight:'700',fontSize:18
    },
    title: {
        fontWeight: '300',
        fontSize: 16,
        paddingBottom:5,
    },
    time: {
        paddingLeft:10,
        paddingRight:20,
        color: '#ACACAC',
        fontSize: 14,
    },
    money: {
        fontSize: 10,
        fontWeight: '300',
        color: 'green'
    },
    money2: {
        fontSize: 12,
        fontWeight: '300',
        color: 'red'
    }
});


export default TrendIssueList;
