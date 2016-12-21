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
  Dimensions
} from 'react-native';
const LoadingView = () => (
  <View style={styles.container} >
  <View style={styles.loading}>
    <ActivityIndicator
      size="large"
      color="#3e9ce9"
    />
    <Text style={styles.loadingText}>努力加载中...</Text>
  </View>
  </View>
);

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    bottom: 10,
    margin: 10,
    paddingVertical: 10,
     alignItems: 'center',
    justifyContent: 'center',
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

export default LoadingView;
