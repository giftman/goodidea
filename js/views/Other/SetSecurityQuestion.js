'use strict';

import React, { Component } from 'react';

import { View, Text,ScrollView, TouchableOpacity,TextInput} from 'react-native';

import Util from '../../utils/Util';
import { toastShort } from '../../utils/ToastUtil';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import EasyButton from '../../common/EasyButton';
import {normalize,headerBG} from '../../common/F8Colors';
import { setSecurityQuestion} from '../../actions';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import _ from 'underscore';

class SetSecurityQuestion extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data
    console.log(this.data);

    this.state={
      questionInfo:{
        "conf-question1":0,
        "conf-question2":0,
        "conf-question3":0,
        "question1":"",
        "question2":"",
        "question3":"",
      }
    }
    // this.renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    // this.openSharingSettings = this.openSharingSettings.bind(this);
    // this.handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }

  _dropDownSelect(question,index){
    let {questionInfo} = this.state;
    questionInfo["conf-question" + question] = index;
    this.setState({
      questionInfo
    })
  }
  _onConfirm(){
    let {questionInfo} = this.state;
    this.props.setSecurityQuestion(questionInfo,this.props.navigator);
  }

    render() {

        var leftItem = {
            layout: 'title',
            title: 'ios-arrow-back',
            onPress: () => this.props.navigator.pop(),
        };

        return (
          <View style={styles.container}>
            <F8Header
              style={{
                backgroundColor: "#323245"
              }}
              title="设置安全问题"
              leftItem={leftItem}
              >
            </F8Header>
            <View style={{
                flex: 1,
                justifyContent:'flex-start',
                alignItems:'center',
              }}>
              {Object.keys(this.data).map((elem,index) => {
                  // console.log(elem);
                  let saveIndex = _.keys(this.data[elem]);
                  let saveOption = _.values(this.data[elem]);
                  return (
                    <View key={index} style={{justifyContent:'center',alignItems:'center'}}>
                      <View style={styles.paddingHeight}/>
                    <ModalDropdown
                        defaultValue={'< 请选择 > 问题' + elem}
                        style={{padding:5,alignItems:'flex-start'}}
                        options={saveOption}
                        textStyle={{color:'#666',fontSize:16,textAlign:'left',width:Util.size.width*.9}}
                        onSelect={(i,value) => this._dropDownSelect(elem,saveIndex[i])}
                        />
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        onChangeText={(passwd) => {let {questionInfo} = this.state;questionInfo["question" + elem]= passwd;this.setState({ questionInfo})}}
                        underlineColorAndroid={'transparent'}
                        placeholder={'答案' + elem}/>
                    </View>
                  </View>)
              })}
              <View style={styles.paddingHeight}/>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                  style={[styles.confirmBtn, {
                    backgroundColor: 'red'
                  }]}
                  onPress={() => this._onConfirm()}>
                  <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '400'
                    }}>确认</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eaeaea',
        flex:1
    },
    inputContainer: {
      // marginTop: normalize(5),
      height: normalize(50),
      width:Util.size.width * 0.9,
      // borderRadius: 5,
      // borderWidth: 0.11,
      borderColor: headerBG,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor:'#fff',
      padding:5,
    },
    input:{
      flex:1,
      fontSize: 16,
    },
    paddingHeight: {
        width: Util.size.width,
        height: 15,
        backgroundColor: '#eee'
    },
     confirmBtn: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: Util.size.width*.9,
        height: 50,
    },

});

function select(store) {
    return {
        username:store.user.username,
    };
}

function actions(dispatch) {
    return {
        clearPackage:()=>dispatch(clearPackage()),
        setSecurityQuestion:(que,nav)=>dispatch(setSecurityQuestion(que,nav)),
    };
}
module.exports = connect(select,actions)(SetSecurityQuestion);
