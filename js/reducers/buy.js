

'use strict';

import type {Action} from '../actions/types';
import _ from 'underscore';
import AppAuthToken from '../lib/AppAuthToken';

export type UserInfo = {
	username:'',
	email:'',
	phone:'',
};

export type PlayType = {
        layout:number, //(1/null) 2 单式 3 有position
        num:number,//单式可选数量 任选数量
        position:[],//任选位置信息
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
  gameName:string;
  orderNum:string;
  currentTime:number;
  orderNumberEndTime:number;
  currentPrice:string;
	moneyUnit:string;
	prize:string;//'1950'
  minPrize:string;
  maxPrize:string;
  tracewinStop:any;
};

const initialState: State = { allTypes: {},buyPackage:[],loading:false,
                            multNum:1,choice:{},numOfChips:0,menu:{},
                            defaultType:'qiansan.zuxuan.hezhi',
                            defaultGame:{},gameName:"",orderNum:"",moneyUnit:1,prize:'1950',tracewinStop:true};

function buy(state: State = initialState, action: Action): State {
	switch(action.type){
		case 'LOAD_MENU':
			return {...state,menu:action.payload.menu,
        allTypes:action.payload.allTypes,
        defaultGame:action.payload.allTypes[state.defaultType],
        currentPrice:action.payload.currentPrice,
          gameName:action.payload.gameName,
          orderNum:action.payload.orderNum,
          currentTime:action.payload.currentTime,
          orderNumberEndTime:action.payload.orderNumberEndTime,
          minPrize:action.payload.minPrize,
          maxPrize:action.payload.maxPrize,
          prize:action.payload.maxPrize,
          methods:action.payload.methods,
      };
			break;
    case 'CHANGE_METHOD':
			return {...state,menu:action.payload.menu,
        allTypes:action.payload.allTypes,
        defaultGame:action.payload.allTypes[state.defaultType],
      };
			break;
		case 'LOAD_REQUEST':
			return {...state,loading:true};
			break;
		case 'LOAD_FAILED':
			return {...state,loading:false};
			break;
		case 'CHANGE_TYPE':
			return {...state,defaultType:action.defaultType,defaultGame:state.allTypes[action.defaultType],choice:{}};
			break;
    case 'UPDATE_CHOICE':
      return {...state,choice:action.choice};
			break;
    case 'CLEAR_PACKAGE':
      return {...state,buyPackage:[]};
    // case 'RANDOM_PICK':
    //   return _randomPick(state,action.times);
		break;
    case 'UPDATE_NUMOFCHIPS':
      return {...state,numOfChips:action.num};
			break;
    case 'UPDATE_PACKAGE':
      return {...state,buyPackage:action.buyPackage};
			break;
    case 'UPDATE_GAME':
      return {...state,defaultGame:action.game};
			break;
    case 'SHOW_LOADING':
      return {...state,loading:true};
			break;
    case 'CLOSE_LOADING':
      return {...state,loading:false};
			break;
		case 'UPDATE_ORDERNUM':
			return {...state,orderNum:action.payload};
			break;
		case 'UPDATE_MONEYUNIT':
        new AppAuthToken().storeSetting({moneyUnit:action.payload,prize:state.prize});
				return {...state,moneyUnit:action.payload};
				break;
		case 'UPDATE_PRIZE':
        new AppAuthToken().storeSetting({moneyUnit:state.moneyUnit,prize:action.payload});
						return {...state,prize:action.payload};
						break;
    case 'LOAD_SETTING':
        return {...state,...action.payload};
        break;
    case 'UPDATE_TRACE_WIN_STOP':
        return {...state,tracewinStop:!state.tracewinStop};
        break;
   
	}

  return state;
}

module.exports = buy;
