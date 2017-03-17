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
 * @flow
 */

'use strict';

import type {Action} from '../actions/types';

type State = {
  latestTrend: array;
  isRefreshing:boolean;
  tSetting:array;
};

const initialState: State = { latestTrend: [],isRefreshing:true,tSetting:[1,2,3,11]};

function trend(state: State = initialState, action: Action): State {
  switch(action.type){
		case 'UPDATE_TREND':
      return {...state, latestTrend: action.payload};
      break;
    case 'SHOW_REFRESH':
      return {...state,isRefreshing:true};
			break;
    case 'CLOSE_REFRESH':
      return {...state,isRefreshing:false};
			break;
    case 'UPDATE_SETTING':
      return {...state,tSetting:action.payload};
			break;


	}

  return state;
}

module.exports = trend;
