'use strict';

import type { Action,ThunkAction } from './types';
import  BackendFactory from '../lib/BackendFactory';
import AppAuthToken from '../lib/AppAuthToken';
import {loadMenu} from './buy'
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
      })                

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function getGameConfig(gameId) {
  return dispatch => {
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).getGameConfig(gameId);
      })
    
      .then((result) => {
        console.log(result);
        dispatch(loadMenu(result));
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



module.exports = {getToken,login,getGameConfig,checkToken,bet};
