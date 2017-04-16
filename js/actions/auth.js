'use strict';

import type { Action,ThunkAction } from './types';
import  BackendFactory from '../lib/BackendFactory';
import AppAuthToken from '../lib/AppAuthToken';
import {loadMenu,updateBalance} from './buy';
import {updateTrend,showRefresh,closeRefresh} from './trend';
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

function loadSetting(){
  return dispatch => {
    return new AppAuthToken().getSetting()

      .then((token) => {
        console.log(token);
        if(token != null){
          dispatch({
            type:'LOAD_SETTING',
            payload:token,
          })
          return true;
        }

      })

      .catch((error) => {
        console.log(error);
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

function withdraw(navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).withdraw();
      })
      .then((result) => {
         dispatch(closeLoading());
         console.log(result);
        if(result.error_code == '00'){
          navigator.push({
            my:'withdraw',
            data:result.data,
          })
        }else{
          toastShort(result.message);
          if(result.error_code == '95'){
                dispatch(getBankCardStatus('bind',{},navigator));
           }
        }
      })

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function withdrawApply(data,navigator) {
  return dispatch => {
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).withdrawApply(data);
      })

      .then((result) => {
        console.log(result);
        if(result.error_code == '00'){
          navigator.push({
            my:'withdrawResult'
          })
        }
        toastShort(result.message);
      })

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function createOrder(navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).createOrder();
      })
      .then((result) => {
         dispatch(closeLoading());
         console.log(result);
        if(result.error_code == '00'){
          navigator.push({
            my:'pay',
            data:result.data,
          })
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

function confirmPayTwo(data,navigator) {
  return dispatch => {
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).confirmPayTwo(data);
      })

      .then((result) => {
        console.log(result);
        if(result.error_code == '00'){
          navigator.push({
            my:'webview',
            data:result.data.deposit.break_url
          })
        }else{
          toastShort(result.message);
          if(result.error_code == '95'){
                dispatch(getBankCardStatus('bind',{},navigator));
           }
        }
      })

      .catch((error) => {
        console.log(error);
        // dispatch(getToken());
      });
  };
}

function confirmPayOne(data,navigator) {
  return dispatch => {
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).confirmPayOne(data);
      })

      .then((result) => {
        console.log(result);
        if(result.error_code == '00'){
          navigator.push({
            my:'payOneResult',
            data:result.data
          })
        }else{
          toastShort(result.message);
          if(result.error_code == '95'){
                dispatch(getBankCardStatus('bind',{},navigator));
           }
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
          dispatch(updateBalance(result.data.balance));
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
          if(navigator){
            navigator.push({
            game,
          });
          }
          
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

function getTrendData(lottery_id,navigator) {
  return dispatch => {
    dispatch(showRefresh());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).getTrendData(lottery_id);
      })

      .then((result) => {
        console.log(result);
        dispatch(closeRefresh());
      if(result.error_code == '00'){

            var data = result.data
            var dataList = [];
            Object.keys(result.data).forEach((item)=>{
              if(item != 'balance'){
                dataList.push(data[item])
              }
            })
          if(result.data['1'].winNumber){
            dispatch(updateTrend(dataList));
          }else{
            navigator.push({
              'TrendIssueList':true,
              data:dataList
            })
          }

          // navigator.push({
          //   game,
          // });
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

function resetMoneyPass(user,data) {
  return dispatch => {
    // dispatch(showLoading());
    // console.log("reset");
    return new AppAuthToken().getSessionToken()
      .then((token) => {
        console.log(token);
        return BackendFactory(token.sessionToken).resetMoneyPass(user,data);
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

function getBankCardStatus(action,data,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).getBankCardStatus(action,data);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        if(action === 'bind'){
          if(navigator){
            navigator.push({
                "my": 'bankSetting',
                data:result.data
            });
          }else{
            //更新balance
            dispatch(updateBalance(result.data.balance));
          }
        }else if(action === 'lock'){
          navigator.push({
              "my": 'bankActionConfirm',
              data:result.data,
              title:'锁定银行卡',
              type:'lock'
          });
        }else if(action === 'delete'){
          navigator.push({
              "my": 'bankDelete',
              data:result.data,
              title:'删除银行卡',
              type:'delete'
          });
        }else if(action === 'modify'){
          navigator.push({
              "my": 'bankDelete',
              data:result.data,
              title:'验证老银行卡',
              type:'modify'
          });
          // navigator.push({
          //     "my": 'bankDelete',
          //     data:result.data,
          //     title:'修改',
          //     type:'modify'
          // });
        }
        // navigator.push({
        //     "my": 'gameRecord',
        //     data:result.data
        // });
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



function modifyBankCard(data,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).modifyBankCard(data);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        toastShort(result.message);
        navigator.resetTo({ twitterTab:123 });
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
function bindBankCard(data,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).bindBankCard(data);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        toastShort(result.message);
        navigator.resetTo({ twitterTab:123 });
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

function lockBankCard(data,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).lockBankCard(data);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        toastShort(result.message);
        navigator.resetTo({ twitterTab:123 });
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

function delBankCard(data,navigator) {
  return dispatch => {
    dispatch(showLoading());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        return BackendFactory(token.sessionToken).delBankCard(data);
      })
      .then((result) => {
        console.log(result);
         dispatch(closeLoading());
      if(result.error_code == '00'){
        toastShort(result.message);
        navigator.resetTo({ twitterTab:123 });
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
  bindBankCard,
  modifyBankCard,
  loadSetting,
  getTrendData,
  delBankCard,
  lockBankCard,
  getBankCardStatus,
  confirmPayOne,
  confirmPayTwo,
  createOrder,
  withdraw,
  withdrawApply,
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
  resetPasswordA,
  resetMoneyPass
};
