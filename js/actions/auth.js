'use strict';

import type { Action,ThunkAction } from './types';
import  BackendFactory from '../lib/BackendFactory';
import AppAuthToken from '../lib/AppAuthToken';
import {loadMenu} from './buy';
import { toastShort } from '../utils/ToastUtil';
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

function getToken():Action {
  return BackendFactory(null).getToken()
  .then((res)=>{
    // console.log(res);
    return {
      type:'SAVE_TOKEN',
      token:res,
    }
  })
  .catch((error) => {console.log(error)});;
}

function checkToken(){
  return dispatch => {
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        
        console.log(token);
        if(token != null){
          console.log("token exit,go to tabbar" );
          return true;
        }else{
          dispatch(getToken());
          console.log("token not exit,go to easyLogin" );
          return false;
          
        }
        
      })            

      .catch((error) => {
        console.log(error);
        dispatch(getToken());
      });
  };
}

function login(data,navigator) {
  return dispatch => {
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).login(data);
      })
    
      .then((result) => {
        console.log(result);
        navigator.resetTo({
            "twitterTab":true
          });
        toastShort(result.message);
      })                

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function bet(data,navigator) {
  return dispatch => {
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).bet(data);
      })
    
      .then((result) => {
        console.log(result);
        toastShort(result.message);
      })                

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function getGameConfig(game,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).getGameConfig(game.gameId);
      })
    
      .then((result) => {
        console.log(result);
        dispatch(closeLoading());
        if(result.error_code == '00'){
          dispatch(loadMenu(result));
        navigator.push({
      game,
    });
      }else{
        toastShort(result.message);
      }
        
        // if(result.is_success){
        //   return result.data;
        // }else{
        //   return result.message;
        // }
      })                

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
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


module.exports = {getToken,login,getGameConfig,checkToken,bet};
