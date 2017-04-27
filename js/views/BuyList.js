'use strict';

import React, { Component } from 'react';

import { View, ScrollView, ActivityIndicator, TextInput } from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import { HEADER_HEIGHT } from '../common/F8Colors';
import EasyCheckBox from '../common/EasyCheckBox';
import BuyCell from './BuyCell';
import { connect } from 'react-redux';
type Props = {
    data:any;
    navigator: Navigator;
    choice:{};
};
class BuyList extends Component {
    props:Props;

    constructor(props) {
        super(props);


        this.state = {
            numbers: "",
        };
    }


    _onChangeText(number) {
        this.props.onToggle(number, 0);
        // this.setState({
        //     number
        // });
    }

    render() {
        let boxes = <View />
        let {defaultGame, choice, onToggle} = this.props;
        var displayChoice = choice == {} ? '':choice;
        console.log(defaultGame);
        if (defaultGame && defaultGame.methods) {
            boxes = Object.keys(defaultGame.methods).map((name, index) => {
                // console.log(name);
                return (
                    <BuyCell  key={index} name={name} list={defaultGame.methods[name].list} choice={choice} onToggle={(name, index) => onToggle(name, index)}/>
                    );
            })
        } else {
            boxes = <ActivityIndicator
            style={{
                backgroundColor: '#eee',
                marginTop: 20
            }}
            size="large"
            color="#666"
            />
        }
        if (defaultGame && defaultGame.layout == 2) {
            boxes = <TextInput
            ref={(number) => this.number = number}
            onFocus={() => this.number.focus()}
            onChangeText={(number) => this._onChangeText(number)}
            keyboardType={"numbers-and-punctuation"}
            multiline={true}
            style={styles.input}
            value={displayChoice}
            placeholder='请输入命中注定的号码，每一个号码之间请用一个空格[ ]或者逗号[,]或者[;]分开，尾末不需要分割符'
            underlineColorAndroid={'transparent'}
            />
        }
        const positionName = ["万位","千位","百位","十位","个位"]
        let positions = <View />;
        if (defaultGame.positions) {
            positions = <View style={styles.checkBoxContainer}>
                            {defaultGame.positions.map((name, index) => {
                return (
                    <EasyCheckBox key={index} icon="md-checkbox" name={positionName[index]} index={index} onPress={() => this.props.onCheckBoxClick(index)} isChecked={defaultGame.positions[index]}/>
                )
            })}
                        </View>;
        }


        return (
            <ScrollView style={styles.postContainer}>
        {positions}
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
        choice: store.buy.choice,
    };
}

function actions(dispatch) {
    return {
    };
}

module.exports = connect(select, actions)(BuyList);

// export default BuyList;