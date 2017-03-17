'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Util from '../../utils/Util';
const StyleSheet  = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import  PureListView from '../../common/PureListView';
import { connect } from 'react-redux';
import {updateSetting} from '../../actions';
import { getGameTypeConfig } from '../ssc'
import TipPadding from '../TipPadding';

type Props = {
  data: Array<any>;
  navigator: Navigator;
  renderEmptyList?: () => ReactElement;
};

class ReadingListView extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);
     this.state = {
      tSetting:this.props.tSetting,
    };

  }


  render() {
    console.log(this.props.tSetting)
    const boxes = this.props.data.map((cell, index) => {
     //Text position can be justify to its parent then it easy to align Center.
      return(
       <TouchableOpacity  key={index} onPress={() => this._click(cell.lottery_id, index)}>
       <View style={styles.cell}>
        <Text style={styles.title}>{getGameTypeConfig[cell.lottery_id]?getGameTypeConfig[cell.lottery_id].title : '没开彩种' }</Text>
        {this.state.tSetting.includes(cell.lottery_id) ? <Icon name="md-checkmark-circle" size={25} color="#4CAF50"></Icon> :<View />}
        </View>
      </TouchableOpacity>
      );
    })
    return (
      <ScrollView
        style={{flex:1,backgroundColor:'white'}}
        {...this.props}
      >
      {boxes}
      </ScrollView>
    );
  }

  _click(id, index){
    console.log(id);
    let {tSetting}= this.state;
    console.log(tSetting);
    if(tSetting){
      if (tSetting.includes(id)) {
          console.log("del " + id);
          let where = tSetting.indexOf(id);
          tSetting.splice(where, 1);
      } else {
          tSetting.push(id);
      }
      this.props.updateSetting(tSetting);
      this.setState({
        tSetting
      })
    }

  }



}

class TwitterFlow extends Component{

  constructor(props) {
    super(props);

    this.state = {
      data : this.props.data,
      rowId:0,
    };

  }

  render() {

    var rightItem = {
      layout:'text',
      title:'完成',
      onPress: () => this.done(),
    }

    return(
      <View style={{flex:1,backgroundColor:'#fff'}}>
      <F8Header
      style={{backgroundColor:"#100118"}}
      title="自定义开奖走势"
      rightItem={rightItem}
      >
      </F8Header>
      <TipPadding content="将你关心的彩种添加到开奖走势" icon="md-heart"></TipPadding>
     <ReadingListView data={this.props.trendData} updateSetting={(data)=>this.props.updateSetting(data)} tSetting={this.props.tSetting}></ReadingListView>
     </View>
    )
  }

  done() {
    //  this.props.applyTopicsFilter(this.state.data);
     this.props.navigator.pop();
  }

}


const styles = StyleSheet.create({

  cell:{
   height:60,alignItems:'center',justifyContent:'space-between',paddingLeft:20,paddingRight:20,flexDirection:'row'
  },
  title:{
    fontSize:18,
    fontWeight:'400',
  },
  leftIcon:{
    color:'green',
  },
});

function select(store) {
  return {
    trendData: store.trend.latestTrend,
    tSetting: store.trend.tSetting,
  };
}

function actions(dispatch) {
  return {
    updateSetting: (data) => dispatch(updateSetting(data)),
  };
}

module.exports = connect(select, actions)(TwitterFlow);
