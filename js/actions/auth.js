'use strict';

import type { Action,ThunkAction } from './types';
import  BackendFactory from '../lib/BackendFactory';
import AppAuthToken from '../lib/AppAuthToken';
import {loadMenu,updateBalance} from './buy';
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
    return new AppAuthToken().getUser()

      .then((token) => {

        console.log(token);
        if(token != null){
          console.log("token exit,go to tabbar" );
          dispatch({
            type:'LOGIN_SUCCESS',
            payload:token,
          })
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
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).login(data);
      })

      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
        if(result.error_code == '00'){
          // dispatch(loadMenu(result));//todo load User Info
          navigator.resetTo({
            "twitterTab":true
          });
          dispatch({
            type:'LOGIN_SUCCESS',
            payload:result.data,
          })
        toastShort(result.message);
      }else{
        toastShort(result.message);
      }
      })

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}
function logout(navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).logout();
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
        if(result.error_code == '00'){
          // dispatch(loadMenu(result));//todo load User Info
          new AppAuthToken().deleteUser();
          //重新获取token
          dispatch(getToken());
          navigator.resetTo({
            "login":true
          });
        toastShort(result.message);
      }else{
        toastShort(result.message);
      }
      })

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function bet(data,betUrl,navigator) {
  return dispatch => {
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).bet(data,betUrl);
      })

      .then((result) => {
        console.log(result);
        if(result.error_code == '00'){
          dispatch(updateBalance(data['amount']));
        }
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
      }else if(result.error_code == '99'){
        toastShort(result.message  + " 请重新登陆");
        dispatch(getToken());
        navigator.push({
            "login":true
          });
      }
      else{
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

function checkSecurityQuestion(navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).checkSecurityQuestion();
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '05'){
        toastShort(result.message);
      }else{
        navigator.push({
          "my":"changeSafeQuestion",
          "data":result.data
        });
      }
      })

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function setSecurityQuestion(questionInfo,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).setSecurityQuestion(questionInfo);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        toastShort(result.message);
        navigator.pop();
      }else{
        toastShort(result.message);
      }
      })
      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function getGameRecord(questionInfo,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).getGameRecord(questionInfo);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        navigator.push({
            "my": 'gameRecord',
            data:result.data
        });
      }else{
        toastShort(result.message);
      }
      })
      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function getTraceRecord(questionInfo,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).getTraceRecord(questionInfo);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        navigator.push({
            "my": 'traceRecord',
            data:result.data
        });
      }else{
        toastShort(result.message);
      }
      })
      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function getMoneyDetail(questionInfo,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).getMoneyDetail(questionInfo);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        navigator.push({
            "my": 'moneyDetail',
            data:result.data
        });
      }else{
        toastShort(result.message);
      }
      })
      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function getGameRecordDetail(id,callback) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).getGameRecordDetail(id);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        callback(result.data);
      }else{
        toastShort(result.message);
      }
      })
      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function resetPasswordA(user,data) {
  return dispatch => {
    // dispatch(showLoading());
    // console.log("reset");
    return new AppAuthToken().getSessionToken()
      .then((token) => {
        console.log(token);
        return BackendFactory(token.sessionToken).resetPassword(user,data);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        toastShort(result.message);
        // navigator.pop();
      }else{
        toastShort(result.message);
      }
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


module.exports = {
  getMoneyDetail,
  getTraceRecord,
  getGameRecordDetail,
  getGameRecord,
  setSecurityQuestion,
  getToken,
  login,
  getGameConfig,
  checkToken,
  bet,
  logout,
  checkSecurityQuestion,
  resetPasswordA
};
