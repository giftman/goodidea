'use strict';

import type { Action,ThunkAction } from './types';
function loadMenu(dataA): ThunkAction {

     return (dispatch) => {
     	// let data = require('./_mock_/buyNo.json');
      let data = dataA.data;
         let buyCell = require('./_mock_/gameMethodSet.json');
         let menu = {};
         let allTypes = {};
         let currentPrice = data.currentPrize;
           data.gameMethods["1950"].map((article, index) => {
              renderCells(article,"","",article.id,data.gameId,menu,allTypes,buyCell);
          })

           for(let i in buyCell){
            if(allTypes[i]){
              allTypes[i].only_one = buyCell[i].only_one;
              allTypes[i].layout = buyCell[i].layout;
              allTypes[i].methods = buyCell[i].methods;
              allTypes[i].each_method_represent_chips_num = buyCell[i].each_method_represent_chips_num;
              allTypes[i].num = buyCell[i].num;
              allTypes[i].positions = buyCell[i].positions;
            }
           }
            dispatch(
              {
              type:"LOAD_MENU",
              payload:
              {
                menu,
                allTypes,
                currentPrice,
                gameName:data.gameName_cn,
                orderNum:data.currentNumber,
                currentTime:data.currentTime,
                orderNumberEndTime:data.currentNumberTime,
              }
            })


      }


}

function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  };
}

function showLoading(): Action {
  return {
    type: 'SHOW_LOADING',
  };
}
function closeLoading(): Action {
  return {
    type: 'CLOSE_LOADING',
  };
}
// function randomPick(num): Action {
//   return {
//     type: 'RANDOM_PICK',
//     times:num,
//   };
// }

function changeType(defaultType):Action{
	return{
		type:'CHANGE_TYPE',
		defaultType
	}
}

function updateChoice(choice):Action{
  return{
    type:'UPDATE_CHOICE',
    choice,
  }
}

function updateDefaultGame(game):Action{
  return{
    type:'UPDATE_GAME',
    game,
  }
}

function updateNumOfChips(num):Action{
  return{
    type:'UPDATE_NUMOFCHIPS',
    num,
  }
}

function updateBalance(num):Action{
  return{
    type:'UPDATE_BALANCE',
    payload:num,
  }
}

function updateOrderNum(num):Action{
  return{
    type:'UPDATE_ORDERNUM',
    playload:num,
  }
}

function updatePackageProps(buyPackage):Action{
  return{
    type:'UPDATE_PACKAGE',
    buyPackage,
  }
}

function clearPackage(): Action {
  return {
    type: 'CLEAR_PACKAGE',
  };
}

function renderCells(cells,name,en_name,jsId,gameId,menu,allTypes,buyCell){
  if(en_name != ""){
    en_name = en_name + "." + cells.name_en;
  }else{
    en_name = cells.name_en;
  }
  if(cells.children){
    if(cells.name_cn){
      name = name + cells.name_cn;

    }
    cells.children.map((children) => renderCells(children,name,en_name,jsId,gameId,menu,allTypes,buyCell));
  }else{
      if(menu[name] && buyCell[en_name]){
        menu[name].push(cells);

      }else if(buyCell[en_name]){
        menu[name]=[];
        menu[name].push(cells);
      }
      cells.jsId = jsId;
      cells.type = en_name;
      cells.gameId = gameId;
      allTypes[cells.type] = cells;
  }
}

module.exports = {updateBalance,updateOrderNum,loadMenu,changeType,updateChoice,clearPackage,updateNumOfChips,updatePackageProps,updateDefaultGame,showLoading,closeLoading};
