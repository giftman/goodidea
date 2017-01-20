'use strict';

import React, { Component } from 'react';

import { View, ScrollView, ActivityIndicator,Image,TouchableOpacity,Text} from 'react-native';

import Util from '../../utils/Util';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import { HEADER_HEIGHT,normalize} from '../../common/F8Colors';
import { getGameTypeConfig } from '../ssc';
import EasyCheckBox from '../../common/EasyCheckBox';
import { connect } from 'react-redux';
// import { getGameRecordDetail} from '../../actions';

type Props = {
data:any;
navigator: Navigator;
};
class TraceRecordDetail extends Component {
    props:Props;

    constructor(props) {
        super(props);

        // this.state = {
        //     info: "",
        // };
        // this.props.getGameRecordDetail(this.props.data,(info)=>this._callback(info));
    }

    _callback(info){
      console.log(info);
    }
    render() {
        let boxes = <View />
        let data = this.props.data;
        var leftItem = {
              layout: 'title',
              title: 'ios-arrow-back',
              onPress: () => this.props.navigator.pop(),
          };
        var game_config = {}
        if(data && data.lottery_id){
            game_config = getGameTypeConfig(data.lottery_id)
        }
        // console.log(game_config);
        boxes = (
          <View style={styles.container}>
            <View style={styles.main}>
              <View style={styles.mainLogo}>
                <Image
                  style={{paddingLeft:20,width: 60, height: 55}}
                  source={{uri: game_config.img}}
                  resizeMode='cover'
                />
              <Text style={{fontSize:18,fontWeight:'400'}} >  追号共{data.finished_issues}期</Text>
              </View>
              <View style={styles.mainMoney}>
                  <View style={styles.mainMoneyEle}>
                      <Text style={styles.mainMoneyEleText}>{data.amount}元</Text>
                      <Text style={[styles.mainMoneyEleText,{fontSize:18}]}>支付金额</Text>
                </View>
                  <View style={{height:normalize(80),width:1,backgroundColor:'white'}}></View>
                  <View style={styles.mainMoneyEle}>
                    <Text style={styles.mainMoneyEleText}>{data.prize}元</Text>
                    <Text style={[styles.mainMoneyEleText,{fontSize:18}]}>中奖金额</Text>
                    </View>
              </View>
              <View style={styles.mainInfo}>
                <View style={styles.mainInfoEle}>
                  <Text style={styles.mainInfoText}>订单状态:</Text>
                  <Text style={[styles.mainInfoText,{color:'black'}]}>已完成</Text>
                </View>
                <View style={styles.mainInfoEle}>
                  <Text style={styles.mainInfoText}>追停条件:</Text>
                  <Text style={[styles.mainInfoText,{color:'black'}]}>中奖后停止</Text>
                </View>
                <View style={styles.mainInfoEle}>
                  <Text style={styles.mainInfoText}>购买时间:</Text>
                  <Text style={[styles.mainInfoText,{color:'black'}]}>{data.bought_at}</Text>
                </View>
                <View style={styles.mainInfoEle}>
                  <Text style={styles.mainInfoText}>注意编号:</Text>
                  <Text style={[styles.mainInfoText,{color:'black',fontSize:12}]}>{data.serial_number}</Text>
                </View>

              </View>
            </View>
            <TouchableOpacity
              accessibilityTraits="button"
              onPress={() => this._callback(1)}
              activeOpacity={0.8}
              style={[styles.button]}>
              <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>投注</Text>
            </TouchableOpacity>
          </View>
        )


        return (
            <View style={styles.postContainer}>
              <F8Header
                    style={{
                        backgroundColor: "#323245"
                    }}
                    title=""
                    leftItem={leftItem}
                    >
              </F8Header>
              {boxes}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
      flex:1
    },
    postContainer: {
        backgroundColor: '#eee',
        width: Util.size.width,
        height: Util.size.height,
    },
    button: {
        backgroundColor: 'red',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:normalize(44),
    },
    main:{
      flex:1,
      backgroundColor:'#eee',

    },
    mainLogo:{
      height:normalize(70),
      backgroundColor:'#56B7A4',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      borderBottomWidth:Util.pixel*2,
      borderColor:'white',
      paddingLeft:20,
    },
    mainMoney:{
      height:normalize(80),
      backgroundColor:'#56B7A4',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      borderBottomWidth:Util.pixel*2,
      borderColor:'white'
    },
    mainMoneyEle:{
      flex:1,
      height:normalize(80),
      justifyContent:'center',
      alignItems:'center',
    },
    mainMoneyEleText:{
      fontSize:normalize(24),fontWeight:'500',color:'white',width:140
    },
    mainInfo:{
      flex:1,
      paddingLeft:normalize(20),
      paddingTop:normalize(20),
    },
    mainInfoText:{
      fontSize:normalize(18),fontWeight:'300',color:'#959595',
      paddingRight:20,
    },
    mainInfoEle:{
      flexDirection:'row',
      paddingTop:10,
    }
});

function select(store) {
    return {
        defaultGame: store.buy.defaultGame,
    };
}

function actions(dispatch) {
    return {
      // getGameRecordDetail:(id,callback)=>dispatch(getGameRecordDetail(id,callback))
    };
}

module.exports = connect(select, actions)(TraceRecordDetail);

// export default BuyList;
