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
import AppAuthToken from '../lib/AppAuthToken';

export type UserInfo = {
	username:'',
	email:'',
	phone:'',
};

export type User = {
	userId:'',
	password:'',
	token:'',
	timestamp:'',
	info:UserInfo,
};

type State = {
  auth:User;
  loading:bool;
  token:string;
};

const initialState: State = { user: {},loading:false};

function user(state: State = initialState, action: Action): State {
	switch(action.type){
		case 'SIGNUP_SUCCESS':
		case 'LOGIN_SUCCESS':
			return {...state,user:action.data,loading:false};
		case 'SIGNUP_REQUEST':
		case 'LOGIN_REQUEST':
			return {...state,loading:true};
		case 'LOGIN_FAILED':
		case 'SIGNUP_FAILED':
			return {...state,loading:false};
		case 'SAVE_TOKEN':
			new AppAuthToken().storeSessionToken(action.token);
			return {...state,token:action.token};
	}
  
  return state;
}

module.exports = user;
