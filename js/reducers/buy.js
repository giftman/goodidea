

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
        layout:number, //(1/null) 2 单式 3 有position
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
  defaultType:string;
  defaultGame:{};
  choice:{};
  numOfChips:number;
  loading:any;
  buyPackage:[];
  multNum:number;
  traceNum:number;
};

const initialState: State = { allTypes: {},buyPackage:[],loading:false,multNum:1,traceNum:1,choice:{},numOfChips:0,menu:{},defaultType:'qiansan.zuxuan.zuliudanshi',defaultGame:{}};

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
      return _checkChipsCount(state,action.choice);
	}
  
  return state;
}

//check how many times had pay.
function  _checkChipsCount(state,choice){
      let {defaultGame,numOfChips,buyPackage,multNum} = state;
      let methods = defaultGame.methods;
      console.log(methods);
      let result = "";
      numOfChips = 1;
      for (let i in methods){
        if(choice[i] && choice[i].length >= methods[i].num){
            numOfChips = countNum(choice[i].length,methods[i].num) * numOfChips;
            if(methods[i].each_num_represent_chips_num){
              numOfChips = numOfChips*methods[i].each_num_represent_chips_num;
            }
            if(methods[i].extra){ numOfChips = 0};
            choice[i].map((n,index)=>{
                console.log(n);
                if(methods[i].extra){
                    n = n + 1;
        }
                result = result + n.toString();
                if(methods[i].extra){
                    numOfChips = methods[i].extra[n] + numOfChips;
                }
            })
            result = result + "|";
        }else{
          console.log('not choice all key')
          numOfChips = 0;
           break;
        }
      }
      
      if(defaultGame.each_method_represent_chips_num){
        numOfChips = numOfChips*defaultGame.each_method_represent_chips_num
      }

      if(result.length >= 1){
        result = result.slice(0,result.length -1);
      }
      if(defaultGame.layout == 2){
        if(!checkIsValidDansi(choice,defaultGame.num)){
           return {...state,numOfChips:0};
        }
        numOfChips = choice.length;
        console.log(numOfChips);
        result = choice.join(',');
        buyPackage = [];
      }

      
      let oneChoice = {};
      oneChoice["num"] = result.replace("|",",");
      // this.props.numOfChips + "注 X" + this.state.multNum + "倍=" + this.props.price * this.state.multNum * this.props.numOfChips + "元";
      oneChoice["des"] = defaultGame.name_cn + " " + numOfChips + "注 X " + multNum + "倍=" + defaultGame.price * multNum * numOfChips + "元";
      buyPackage.push(oneChoice);
      console.log("choice result:" + result);
      console.log("numOfChips:" + numOfChips);
      return {...state,numOfChips,buyPackage,choice}
    }

function checkIsValidDansi(choice,num){
  let result = true;
  for(let i in choice){
    console.log(choice[i].length);
    if(choice[i].length === num){

    }else{
      result = false;
      break;
    }
  }
  return result;
}

function countNum(n,m){
  return mathDouble(n)/(mathDouble(n-m)*mathDouble(m));
}

function mathDouble(num){
  if(num > 1){
   return num*mathDouble(num-1)
  }else{
    return 1
  }
}

module.exports = buy;
