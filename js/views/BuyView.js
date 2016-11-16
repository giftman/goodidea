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
          <Text style={styles.menuTitle}>{article}</Text>
          <View style={styles.menuBtContain}>
                {this.state.menu[article].map((menu,index)=>{
                  return(
                      <Text key={index} style={styles.menuBtn}>{menu}</Text>
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
    this.state = {
      title:"Test",
      data : this.data,
      showMenu:false,
    };
  }

  _onClick(){
    console.log('_onClick');
    let showMenu = this.state.showMenu;

    this.setState({
      showMenu:!showMenu
    })
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
    let content = this.state.showMenu ? <Menu />:<TwitterPost />;
    return(
      <View>
      <F8Header
      style={{backgroundColor:"#100118"}}
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
      {content}
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container:{
    backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height-90,
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
    borderRadius:5,
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