'use strict';

import React, { Component } from 'react';

import { View, ScrollView, ActivityIndicator, TextInput,Text} from 'react-native';

import Util from '../../utils/Util';
const StyleSheet = require('../../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../../common/F8Header';
import { HEADER_HEIGHT } from '../../common/F8Colors';
import EasyCheckBox from '../../common/EasyCheckBox';
import { connect } from 'react-redux';
// import { getGameRecordDetail} from '../../actions';

type Props = {
data:any;
navigator: Navigator;
};
class GameRecordDetail extends Component {
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
        boxes = <View><Text>{data.id}</Text></View>


        return (
            <ScrollView style={styles.postContainer}>
        {boxes}
      </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    input: {
        fontSize: 14,
        flex: 1,
        borderWidth: Util.pixel,
        borderColor: '#666',
        padding: 15,
        height: 335,
        margin: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    postContainer: {
        backgroundColor: '#eee',
        width: Util.size.width,
        height: Util.size.height,
    },
    checkBoxContainer: {
        backgroundColor: 'white',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

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

module.exports = connect(select, actions)(GameRecordDetail);

// export default BuyList;
