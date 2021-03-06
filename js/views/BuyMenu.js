
'use strict';

import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, } from 'react-native';

import Util from '../utils/Util';
class BuyMenu extends Component {

     constructor(props) {
        super(props);
    }

    render() {
        let boxes = <View />
        if (this.props.menu) {
            boxes = Object.keys(this.props.menu).map((article, index) => {
                return (
                    <View key={article} style={styles.containerMenu}>
          <Text style={styles.menuTitle}>{article}</Text>
          <View style={styles.menuBtContain}>
                {this.props.menu[article].map((menu, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.menuBtn} onPress={()=>this.props.changeType(menu.type)} >
                            <Text style={{backgroundColor:'transparent'}}>{menu.name_cn}</Text>
                            </TouchableOpacity>
                        )
                    })}
          </View>
        </View>
                    );
            })
        }


        return (
            <ScrollView style={styles.container} ref="scrollview" 
            onScroll={this.props.menuScroll} >
      {boxes}
      </ScrollView>
        )
    }
    scrollTo(...args: Array<any>) {
    this.refs.scrollview.scrollTo(...args);
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        width: Util.size.width,
        height: Util.size.height - 290,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'left',
        color: 'black',
        paddingRight: 10,
    },
    menuBtContain: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    menuBtn: {
        borderRadius: 8,
        borderWidth: Util.pixel,
        borderColor: '#666',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        padding: 5,
    },
    containerMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
        paddingLeft: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
});


export default BuyMenu;