/**
 *
 * Copyright 2015-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  Switch,
  Dimensions,
  Picker,
} from 'react-native';
const PickerView = (props) => (
  <View style={styles.container} >
    <View style={{flex:1,opacity:0.7,backgroundColor:'#666'}}></View>
    <Picker
      style={{backgroundColor:'#fff'}}
      selectedValue={props.bank}
      onValueChange={(bank) => props.pick(bank)}>
      {props.data.map((item,index) => {
        return <Picker.Item label={item.name} value={item} key={index}/>
      })}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    bottom: 0,
    // margin: 10,
    // paddingVertical: 10,
    //  alignItems: 'center',
    // justifyContent: 'center',
  },
  loading: {
    width:150,
    height:70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
    borderRadius:30,
    flexDirection: 'row',
  },
  loadingText: {
    marginLeft: 10,
    textAlign: 'center',
    color:'#fff',
  }
});

export default PickerView;
