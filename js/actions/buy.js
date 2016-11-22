'use strict';

import type { Action,ThunkAction } from './types';

function loadMenu(): ThunkAction {
	 
     return (dispatch) => {
     	let data = require('./_mock_/buyNo.json');
      let buyCell = require('./_mock_/buyCell.json');
	 let menu = {};
	 let allTypes = {};
     data.gameMethods['1800'].map((article, index) => {
        renderCells(article,"","",article.id,data.gameId,menu,allTypes,buyCell);
    })
     
     for(let i in buyCell){
     	if(allTypes[i]){
     		// allTypes[i].singleLimit = buyCell[i].singleLimit;
     		// allTypes[i].allLimit = buyCell[i].allLimit;
     		// allTypes[i].chips = buyCell[i].chips;
        allTypes[i].only_one = buyCell[i].only_one;
     		allTypes[i].layout = buyCell[i].layout;
     		allTypes[i].methods = buyCell[i].methods;
     	}
     }
     	dispatch({type:"LOAD_MENU",menu,allTypes})
     }
     
  // return (dispatch) => {
  //   return query.find({
  //     success: (list) => {
  //       // We don't want data loading to interfere with smooth animations
  //       InteractionManager.runAfterInteractions(() => {
  //         // Flow can't guarantee {type, list} is a valid action
  //         dispatch(({type, list}: any));
  //       });
  //     },
  //     error: logError,
  //   });
  // };
}

function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  };
}

function changeType(defaultType):Action{
	return{
		type:'CHANGE_TYPE',
		defaultType
	}
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
      if(menu[name] && buyCell[cells.id]){
        menu[name].push(cells);

      }else if(buyCell[cells.id]){
        menu[name]=[];
        menu[name].push(cells);
      }
      cells.jsId = jsId;
      cells.type = en_name;
      cells.gameId = gameId;
      allTypes[cells.id] = cells;
  }
}

module.exports = {loadMenu,changeType};
