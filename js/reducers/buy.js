

'use strict';

import type {Action} from '../actions/types';
import _ from 'underscore';
export type UserInfo = {
	username:'',
	email:'',
	phone:'',
};

export type PlayType = {
        layout:number, //(1/null) 2 单式 3 有position
        num:number,//单式可选数量
        each_method_represent_chips_num:number,//每一份代表多少注
        methods: {},//num 第列可选数量 list 每列显示内容  each_num_represent_chips_num 每列num球代表多少注
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
  defaultType:string;
  defaultGame:{};
  choice:{};
  numOfChips:number;
  loading:any;
  buyPackage:[];
  multNum:number;
  traceNum:number;
};

const initialState: State = { allTypes: {},buyPackage:[],loading:false,multNum:1,traceNum:1,choice:{},numOfChips:0,menu:{},defaultType:'renxuan.renxuan3.zhixuanfushi',defaultGame:{}};

function buy(state: State = initialState, action: Action): State {
	switch(action.type){
		case 'LOAD_MENU':
			return {...state,menu:action.menu,loading:true,allTypes:action.allTypes,defaultGame:action.allTypes[state.defaultType]};
		case 'LOAD_REQUEST':
			return {...state,loading:true};
		case 'LOAD_FAILED':
			return {...state,loading:false};
		case 'CHANGE_TYPE':
			return {...state,defaultType:action.defaultType,defaultGame:state.allTypes[action.defaultType],choice:{}};
    case 'UPDATE_CHOICE':
      return {...state,choice:action.choice};
    case 'CLEAR_PACKAGE':
      return {...state,buyPackage:[]};
    // case 'RANDOM_PICK':
    //   return _randomPick(state,action.times);
    case 'UPDATE_NUMOFCHIPS':
      return {...state,numOfChips:action.num};
    case 'UPDATE_PACKAGE':
      return {...state,buyPackage:action.buyPackage};
	}
  
  return state;
}

module.exports = buy;
