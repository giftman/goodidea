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
import {applyTopicsFilter} from '../../actions';

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
      data:this.props.data,
    };
  }

  //  componentWillReceiveProps(nextProps: Props) {
  //   // if (nextProps.data !== this.props.data ||
  //   //     nextProps.rowId !== this.props.rowId) {
  //     this.setState({
  //       data:nextProps.data,
  //     });

  //   // }
  // }

  render() {
    const boxes = this.state.data.map((cell, index) => {
     //Text position can be justify to its parent then it easy to align Center.
      return(
       <TouchableOpacity  key={index} onPress={() => this._click(cell, index)}>
       <View style={styles.cell}>
        <Text style={styles.title}>{cell.title}</Text>
        {cell.checked ? <Icon name="md-checkmark-circle" size={25} color="#4CAF50"></Icon> :<View />}
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

  _click(cell, index){
    console.log(cell);
    // this.props.openSession(cell, index,rowId);
    let {data}= this.state;
    data[index].checked = !data[index].checked;
     this.setState({
      data
     })
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
      title:'Finish',
      onPress: () => this.done(),
    }

    return(
      <View style={{flex:1,backgroundColor:'#fff'}}>
         <F8Header
      style={{backgroundColor:"#100118"}}
      title="TrendingSet"
      rightItem={rightItem}
      >
      </F8Header>

     <ReadingListView data={this.props.data}></ReadingListView>
     </View>
    )
  }

  done() {
    
     this.props.applyTopicsFilter(this.state.data);
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
    data: store.filter.typeData,
  };
}

function actions(dispatch) {
  return {
    applyTopicsFilter: (data,rowId) => dispatch(applyTopicsFilter(data,rowId)),
  };
}

module.exports = connect(select, actions)(TwitterFlow);