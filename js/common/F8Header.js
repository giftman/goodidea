/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8Header
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import F8Colors from 'F8Colors';
import Platform from 'Platform';
import {
  StyleSheet,
  View,
  Image,
  ToolbarAndroid,
} from 'react-native';
import { Text } from 'F8Text';
import TouchableOpacity from 'TouchableOpacity';

export type Layout = 
  'default'
| 'icon'
| 'title';

export type Foreground = 'light' | 'dark';

export type Item = {
  title :string;
  icon :number;
  layout :Layout;
  onPress:() => void;
};

export type Props = {
  title:string;
  leftItem:Item;
  rightItem:Item;
  helpItem:Item;
  foreground:Foreground;
  style:any;
  children:any;
}

class F8HeaderAndroid extends Component {
  props:Props;

  render() {
    const {leftItem,rightItem,extralItems} = this.props;
    let actions = [];
    if(rightItem){
      const {title,icon,layout} = rightItem;
      actions.push({
        icon:layout !== 'tilte'?icon:undefined,
        title:title,
        show:'always',
      });
    }
    if(extralItems){
      actions = actions.concat(extralItems.map((item) => ({
        title:item.title,
        show:'never',
      })));
    }

    const textColor = this.props.foreground === 'dark'
    ? F8Colors.darkText
    : 'white';
    let content;
    if(React.Children.count(this.props.children) > 0){
      content = (
        <View style={{flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',}}>
        <Text>Test in the pass</Text>
        </View>
        )
    }
    return (
      <View style={[styles.toolbarContainer,this.props.style]}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title = {this.props.title}
          titleColor={textColor}
          subtitleColor={textColor}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={styles.toolbar}>
          {content}
        </ToolbarAndroid>
      </View>
    );
  }
  handleActionSelected(position:number){
    let items = this.props.extralItems | [];
    if (this.props.rightItem){
      items = [this.props.rightItem,...items];
    }
    const item = items[position];
    item && item.onPress && item.onPress();
  }
}

class F8HeaderIOS extends Component{
  props:Props;
  render(){
    const {leftItem,rightItem,title,foreground,helpItem} = this.props;
    const titleColor = foreground === 'dark' ? F8Colors.darkText : 'white';
    const itemColor = foreground === 'dark' ? F8Colors.lightText : 'white';
    const content = React.Children.count(this.props.children) === 0
    ?<Text style={[styles.titleText,{color:titleColor}]}>
      {title}
      </Text>:this.props.children;

      return (
        <View style={[styles.header,this.props.style]} >
          <View style={styles.leftItem}>
          <ItemWrapperIOS color={itemColor} item={leftItem} />
          </View>
          <View
          accessible = {true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={styles.centerItem}>
          {content}
          </View>
          <View style={styles.rightItem}>
          {helpItem?<ItemWrapperIOS color={itemColor} item={helpItem} />:<View />}
          <ItemWrapperIOS color={itemColor} item={rightItem} />
          </View>
        </View>
        );
  }
}

class ItemWrapperIOS extends Component{
  props:{
    item:Item;
    color:string;
  };
  render(){
    const {item,color} = this.props;
    if(!item){
      return null;
    }
    let content;
    const {title,icon,layout,onPress} = item;
    if(layout !== 'icon' && title){
      content = (
        <Text style={[styles.itemText,{color}]}>
          {title.toUpperCase()}
        </Text>
        )
    }else if (icon){
      content = (
        <Image source={icon} />
        );
    }
    return (
      <TouchableOpacity
      accessibilityLabel={title}
      accessibilityTraits="button"
      onPress = {onPress}
      style={styles.itemWrapper}>
      {content}
      </TouchableOpacity>
      );
  }
}

let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20:25;
let HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT:56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  toolbarContainer: {
    // paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor:'#234',
    // margin: 5
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    // color:'#000'
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent:'space-between',
    // backgroundColor:'green',
    flexDirection:'row',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});


const Header = Platform.OS === 'ios' ? F8HeaderIOS : F8HeaderIOS  ;
Header.height = HEADER_HEIGHT;

module.exports = Header;
module.exports.__cards__ = (define) => {
  const menuItem = {
    title: 'Menu',
    icon: require('./img/hamburger.png'),
    onPress: () => alert('Menu button pressed!'),
  };
  const filterItem = {
    title: 'Filter',
    icon: require('./img/filter.png'),
    onPress: () => alert('Filter button pressed!'),
  };

  // define('Simple', () => <Header title="Hello, world" />);
  // define('With items', () => (
  //   <Header
  //     title="Default"
  //     leftItem={menuItem}
  //     rightItem={filterItem}
  //   />
  // ));
  define('Forcing icons', () => (
    <Header
      title="Forcing icons"
      foreground="white"
      backgroundColor="#fff"
      leftItem={{...menuItem, layout: 'icon'}}
      rightItem={{...filterItem, layout: 'icon'}}
    />
  ));
  define('Forcing title', () => (
    <F8HeaderAndroid
      title="Forcing icons"
      foreground="white"
      backgroundColor="#fff"
      leftItem={{...menuItem, layout: 'icon'}}
      rightItem={{...filterItem, layout: 'icon'}}
    />
  ));
  // define('With content', () => (
  //   <Header leftItem={menuItem} rightItem={menuItem}>
  //     <View style={{flex:1,backgroundColor: '#224488',alignItems:'center',justifyContent:'center'}}>
        
  //       <Text style={{backgroundColor:'white',alignSelf:'center'}}>Test as Title</Text>
  //     </View>
  //   </Header>
  // ));
  // define('With Background', () => (
  //   <Header
  //     title="With Background"
  //     leftItem={{...menuItem, layout: 'title'}}
  //     rightItem={{...filterItem, layout: 'title'}}
  //     style={{backgroundColor: '#224488'}}
  //   />
  // ));
  // define('With light background', () => (
  //   <Header
  //     title="Light Background"
  //     leftItem={{...menuItem, layout: 'title'}}
  //     rightItem={{...filterItem, layout: 'title'}}
  //     style={{backgroundColor: 'white'}}
  //     foreground="dark"
  //   />
  // ));
};
