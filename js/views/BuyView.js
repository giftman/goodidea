'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import Util from '../utils/Util';
const StyleSheet  = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
class TwitterPost extends Component {
  constructor(props) {
    super(props);
    
    this.data = [{'title':'Happy fun','img':'https://facebook.github.io/react/img/logo_og.png'},{'title':'Happy fun','img':'https://facebook.github.io/react/img/logo_og.png'},{'title':'Happy fun','img':'https://facebook.github.io/react/img/logo_og.png'},{'title':'Happy fun','img':'https://facebook.github.io/react/img/logo_og.png'}]
   
    this.state = {
      isRefreshing:false,
      data : this.data,
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
      <View key={index} style={styles.containerItem}>
          <Image
            style={{width: 50, height: 40}}
            source={{uri: article.img}}
            resizeMode='cover'
          />

          <View style={{flex: 1, flexDirection: 'column',paddingLeft:20}} >
            <View style={styles.bolls}>
              <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
            </View>

            <View style={styles.bolls}>
              <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
               <View style={styles.boll}>
                <Text style={styles.bollText}>1</Text>
              </View>
            </View>
          </View>
          
        </View>
      );
    })
    return(
      <ScrollView style={styles.container}>
        {boxes}
      </ScrollView>
      )
  }
}

class TwitterFlow extends Component{
  render() {
    var leftItem = this.props.leftItem;
    
    leftItem = {
        layout: 'title',
        title:'ios-arrow-back',
        onPress: () => this.props.navigator.pop(),
      };
    
    var rightItem = {
      icon:require('../common/img/hamburger.png'),
      onPress: () => this.props.navigator.pop(),
    }
    var helpItem = {
      layout:'title',
      title:'ios-help-circle-outline',
      onPress: () => this.props.navigator.pop(),
    }
    return(
      <View>
      <F8Header
      style={{backgroundColor:"#100118"}}
      title="Test"
      leftItem={leftItem}
      rightItem={rightItem}
      helpItem={helpItem}
      >
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'white',fontWeight:'500',fontSize:20,paddingRight:5}}>Test</Text>
        <Image style={{transform:[{rotate:'-90deg'},{scale:0.7}]}} source={require('../common/img/back_white.png')} />
      </View>
      </F8Header>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container:{
    backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height-90,
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
    backgroundColor:"#F44336",
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
    fontSize:14,
    color:'white',
    fontWeight:'300',
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
});


export default TwitterFlow;