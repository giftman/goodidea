

'use strict';

import type {Action} from '../actions/types';

export type UserInfo = {
	username:'',
	email:'',
	phone:'',
};

export type PlayType = {
	    singleLimit: number,
        allLimit: number,
        chips:number, 
        layout:number, 
        methods: {},
        bet_note: string,
        bonus_note: string,
        dekaron: {},
        gameId: number,
        id: number,
        is_enable_extra: null,
        jsId: number,
        max_multiple: number,
        name_cn: string,
        name_en: string,
        pid: number,
        price: number,
        prize: string,
        series_way_id: number,
        total_count: number,
        type: string
};

type State = {
  allTypes:{};
  menu:{};
  defaultType:number;
  defaultGame:{};
  loading:any;
};

const initialState: State = { allTypes: {},loading:false ,menu:{},defaultType:32,defaultGame:{}};

function buy(state: State = initialState, action: Action): State {
	switch(action.type){
		case 'SIGNUP_SUCCESS':
		case 'LOAD_MENU':
			return {...state,menu:action.menu,loading:false,allTypes:action.allTypes,defaultGame:action.allTypes[state.defaultType]};
		case 'LOAD_REQUEST':
		case 'LOGIN_REQUEST':
			return {...state,loading:true};
		case 'LOAD_FAILED':
		case 'SIGNUP_FAILED':
			return {...state,loading:false};
		case 'CHANGE_TYPE':
			return {...state,defaultType:action.defaultType,defaultGame:state.allTypes[action.defaultType]};
	}
  
  return state;
}

module.exports = buy;
