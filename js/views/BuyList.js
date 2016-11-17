'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Easing,
} from 'react-native';

import Util from '../utils/Util';
const StyleSheet  = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import {HEADER_HEIGHT} from '../common/F8Colors';
import BuyCell from './BuyCell';
type Props = {
  list:any;
  navigator: Navigator;
  count:number;
  limit:number;
};
class TwitterPost extends Component {
  props:Props;

  constructor(props) {
    super(props);
    
    this.data = {"210":{"name":"fiveStart","id":210,"singleLimit":1,"allLimit":2,"methods":[{"ten":[3,4,3,2,4,3]},{"bai":[1,2,3,4,3]}]},"211":{"name":"fiveStart","id":210,"singleLimit":1,"allLimit":2,"methods":[{"ten":[3,4,3,2,4,3]},{"bai":[1,2,3,4,3]}]}}
    this.data=[1,2,3]
    this.state = {
      isRefreshing:false,
      data:this.data
    };
  }

  _onRefresh() {
    this.setState({isRefreshing:true});
    setTimeout(()=> {
      this.setState({isRefreshing:false});
    },2000);
  }

  render(){
    const boxes = this.state.data.map((article, index) => {
     //Text position can be justify to its parent then it easy to align Center.
      return(
          <BuyCell  key={index} name="Article" cell={[0,1,2,3,4,5,6,7,8,9]} />
      );
    })
    return(
      <ScrollView style={styles.postContainer}>
        {boxes}
      </ScrollView>
      )
  }
}



const styles = StyleSheet.create({
  postContainer:{
    backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height,
  },
  
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 15,
    paddingLeft:20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  containerMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    paddingLeft:15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 24,
    fontWeight:'500',
    textAlign: 'left',
    color: 'black',
    backgroundColor:'green'
  },
  des:{
    flex:1,fontSize: 14, color: '#9E9E9E',paddingLeft:10
  },
  bolls:{
    // backgroundColor:'grey',
    flex:1,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:'row',
    paddingRight:60,
    paddingBottom:10,
    paddingTop:10,
  },
  boll:{
    width:28,
    height:28,
    borderRadius:14,
    borderWidth:1,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  bollText:{
    fontSize:18,
    color:'#000',
    fontWeight:'600',
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
});


export default TwitterPost;