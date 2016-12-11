'use strict';

import React, { Component } from 'react';

import { View, ScrollView, ActivityIndicator, TextInput } from 'react-native';

import Util from '../utils/Util';
const StyleSheet = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import F8Header from '../common/F8Header';
import { HEADER_HEIGHT } from '../common/F8Colors';
import BuyCell from './BuyCell';
type Props = {
data:any;
navigator: Navigator;
count:number;
limit:number;
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
        this.setState({
            number
        });
    }

    render() {
        let boxes = <View />
        console.log(this.props.data);
        if (this.props.data && this.props.data.methods) {
            boxes = Object.keys(this.props.data.methods).map((name, index) => {
                // console.log(name);
                return (
                    <BuyCell  key={index} name={name} list={this.props.data.methods[name].list} choice={this.props.choice} onToggle={(name, index) => this.props.onToggle(name, index)}/>
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
        if (this.props.data && this.props.data.layout == 2) {
            boxes = <TextInput
            ref={(number) => this.number = number}

            onFocus={() => this.number.focus()}
            onChangeText={(number) => this._onChangeText(number)}
            multiline={true}
            style={styles.input}
            placeholder='输入命中注定的号码吧，每一个号码之间请用一个空格[ ]或者逗号[,]或者[;]分开'
            underlineColorAndroid={'transparent'}
            />
        }

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
});


export default BuyList;