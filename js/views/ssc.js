'use strict';

const GAME_TYPE = {
    '1': {
        'gameId':1,
        'title': '重庆时时彩',
        'name':'cqssc',
        'time':'销售时间:10:00~23:00',
        'des':'每10分钟一期  总期数:72期',
        'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/51097921-file_1484231264295_15a2f.png'
    },
    '3': {
        'gameId':3,
        'title': '黑龙江时时彩',
        'name':'hljssc',
        'time':'销售时间:10:00~23:00',
        'des':'每10分钟一期  总期数:72期',
        'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/21928558-file_1484231261373_15017.png'
    },
    '5': '江西时时彩',
    '6': {
        'gameId':6,
        'title': '新缰时时彩',
        'name': 'xjssc',
        'time':'销售时间:10:00~23:00',
        'des':'每10分钟一期  总期数:72期',
        'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/59140739-file_1484231261706_15b50.png'
    },
    '7': {
        'gameId':7,
        'title': '天津时时彩',
        'name': 'tjssc',
        'time':'销售时间:10:00~23:00',
        'des':'每10分钟一期  总期数:72期',
        'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/5286450-file_1484231264628_1d5c.png'
    },
    '11': '正点1分彩',
    '13': '正点3分彩',
};

const gameStatusType = {
  0:"进行中", 1:"已完成",
2:"用户终止", 3:"平台终止" ,4:"管理终止" 
}

const gameRecordStatusType = {
  0:"待开奖", 1:"已撤消",
2:"未中奖", 3:"已中奖" ,4:"已派奖" ,5:"系统撤消", 6:"超额撤单" ,7:"管理撤单"
}
function getGameTypeConfig(type){
  return GAME_TYPE[type];
}

function gameTraceStatus(type){
  return gameStatusType[type];
}
function gameRecordStatus(type){
  return gameRecordStatusType[type];
}


module.exports = {
  getGameTypeConfig,
  gameTraceStatus,
  gameRecordStatus
}
