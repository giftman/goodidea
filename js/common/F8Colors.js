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
 * @providesModule F8Colors
 * @flow
 */

'use strict';

import Dimensions from 'Dimensions';

const LOCATION_COLORS = {
    'HERBST': '#00E3AD',
    'HERBST A': '#00E3AD',
    'HERBST B': '#00E3AD',
    'HACKER X': '#4D99EF',
    'HACKER Y': '#CF72B1',
    'COWELL': '#6A6AD5',
    'COWELL C': '#6A6AD5',
    'FOOD TENT': '#FFCD3B',
};

function colorForLocation(location: ?string): string {
    if (!location) {
        return 'black';
    }

    var color = LOCATION_COLORS[location.toUpperCase()];
    if (!color) {
        console.warn(`Location '${location}' has no color`);
        color = 'black';
    }
    return color;
}

function colorForTopic(count: number, index: number): string {
    const hue = Math.round(360 * index / (count + 1));
    return `hsl(${hue}, 74%, 65%)`;
}

function getScale(){
    return Dimensions.get('window').width /375;
}
function normalize(size:number){
    return Math.round(getScale() * size);
}

const GAME_TYPE = {
    '1': '重庆时时彩',
    '3': '黑龙江时时彩',
    '5': '江西时时彩',
    '6': '新疆时时彩',
    '7': '天津时时',
    '11': '正点1分彩',
    '13': '正点3分彩',
};
import { Platform } from 'react-native';
let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
let HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;
let LAYER = {
    DEFAULT: 0,
    BOTTOM: 1,
    MIDDLE: 2,
    TOP: 3,
    DIALOG: 4,
}

module.exports = {
    actionText: '#3FB4CF',
    inactiveText: '#9B9B9B',
    darkText: '#032250',
    lightText: '#7F91A7',
    cellBorder: '#EEEEEE',
    darkBackground: '#183E63',
    colorForLocation,
    colorForTopic,
    headerBG: '#323245',
    HEADER_HEIGHT,
    STATUS_BAR_HEIGHT,
    LAYER,
    TIP_HEIGHT:36,
    getScale,
    normalize,
    GAME_TYPE
};
