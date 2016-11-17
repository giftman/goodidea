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
import BuyList from './BuyList';
class Menu extends Component {
  constructor(props) {
    super(props);
    
    this.data = require('./_mock_/buyNo.json');
    // console.log(this.data);
    this.menu={};
    this.data.gameMethods['1800'].map((article, index) => {
        renderCells(article,"",this.menu);
    })
    console.log(this.menu);
    this.state = {
      menu : this.menu,
    };
  }


  render(){

    const boxes = Object.keys(this.state.menu).map((article, index) => {
      console.log(article);
      return(
      <View key={article} style={styles.containerMenu}>
          <Text style={styles.menuTitle}>article</Text>
          <View style={styles.menuBtContain}>
                {this.state.menu[article].map((menu,index)=>{
                  return(
                      <Text key={index} style={styles.menuBtn}>menu</Text>
                      )
                })}
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

function renderCells(cells,name,menu){
  if(cells.children){
    if(cells.name_cn){
      name = name + cells.name_cn;
    }
    cells.children.map((children) => renderCells(children,name,menu));
  }else{
      if(menu[name]){
        menu[name].push(cells.name_cn);
      }else{
        menu[name]=[];
        menu[name].push(cells.name_cn);
      }
      
  }
}
class TwitterFlow extends Component{
  constructor(props) {
    super(props);
    this.minTop = -Util.size.height + 290 + HEADER_HEIGHT;
    this.maxTop = HEADER_HEIGHT;
    this.state = {
      title:"Test",
      data : this.data,
      showMenu:false,
      shift: new Animated.Value(this.minTop),
    };
  }

  _onClick(){
    console.log('_onClick');
    let showMenu = this.state.showMenu;
    if(showMenu){
      this._popMenu();
    }else{
      this._pushMenu();
    }
  }

  _pushMenu() {
    this.setState({showMenu:true});     //1 注意这个顺序有讲究，先让看到再执行动画，后面则相反，延迟一点让动画执行完再不显示 2 Touchable控件的子件默认是占满整个父件空间，可以参考NeverMind
    Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
      this.state.shift,                 // 将`bounceValue`值动画化
      {
        toValue: this.maxTop,                         // 将其值以动画的形式改到一个较小值
        duration: 200,
        delay:100,
        easing: Easing.elastic(1),                          // Bouncier spring
      }
    ).start();  
    
    console.log('_pushMenu');
  }
  _popMenu() {
    Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
      this.state.shift,                 // 将`bounceValue`值动画化
      {
        toValue: this.minTop,                         // 将其值以动画的形式改到一个较小值
        duration: 200,
        delay:100,
        easing: Easing.elastic(1),                          // Bouncier spring
      }
    ).start();
    setTimeout(() => {
        this.setState({showMenu:false});
    },500);  
  }

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
    let headerImg = this.state.showMenu ? <Icon name="ios-arrow-down" size={25} color="#616161" />:<Icon name="ios-arrow-up" size={25} color="#616161" /> ;
    return(
      <View>
      <F8Header
      style={{backgroundColor:"#100118",zIndex:2}}
      title={this.state.title}
      leftItem={leftItem}
      rightItem={rightItem}
      helpItem={helpItem}
      >
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>this._onClick()}>
        <Text style={{color:'white',fontWeight:'500',fontSize:20,paddingRight:5}}>Test</Text>
        {headerImg}
      </TouchableOpacity>
      </F8Header>
      {this.state.showMenu?<Animated.View style={{zIndex:1,position:'absolute',top:this.state.shift}}>
        <Menu />
      </Animated.View>
      :<View/>
      }
      
      <BuyList />
      </View>
    )
  }
}



const styles = StyleSheet.create({
  postContainer:{
    backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height,
  },
  container:{
    backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height-290,
  },
  menuTitle:{
    fontSize: 16,
    fontWeight:'300',
    textAlign: 'left',
    color: 'black',
    paddingRight:10,
  },
  menuBtContain:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',

  },
  menuBtn:{
    borderRadius:8,
    borderWidth:Util.pixel,
    borderColor:'#666',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
    marginBottom:5,
    padding:5,
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


export default TwitterFlow;