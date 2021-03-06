'use strict';

const getGameTypeConfig = {
  '1':{
      'gameId':1,
      'title': '重庆时时彩',
      'name':'cqssc',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/51097921-file_1484231264295_15a2f.png'
  },
  '3':{
      'gameId':3,
      'title': '黑龙江时时彩',
      'name':'hljssc',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/21928558-file_1484231261373_15017.png'
  },
  '6':{
      'gameId':6,
      'title': '新疆时时彩',
      'name': 'xjssc',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/59140739-file_1484231261706_15b50.png'
  },
  '7':{
      'gameId':7,
      'title': '天津时时彩',
      'name': 'tjssc',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-12/5286450-file_1484231264628_1d5c.png'
  },
  '11':{
      'gameId':11,
      'title': '正点1分彩',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-26/15041077-file_1485410586273_1788f.png'
  },
  '13':{
      'gameId':13,
      'title': '正点3分彩',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-26/54381966-file_1485410586164_a676.png'
  },
  '14':{
      'gameId':14,
      'title': '正点5分彩',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-26/30418472-file_1485410586052_1221f.png'
  },
  '25':{
      'gameId':25,
      'title': '北京五分彩',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'http://oeyxehw3i.bkt.clouddn.com/17-1-26/4446956-file_1485410585890_e872.png'
  },
  '26':{
      'gameId':26,
      'title': '台湾五分彩',
      'time':'销售时间:10:00~23:00',
      'des':'每10分钟一期  ',
      'img': 'https://facebook.github.io/react/img/logo_og.png'
  },
};

const gameStatusType = {
  0:"进行中", 1:"已完成",
2:"用户终止", 3:"平台终止" ,4:"管理终止" 
}

const gameRecordStatusType = {
  0:"待开奖",1:"已撤消",
2:"未中奖",3:"已中奖",4:"已派奖",5:"系统撤消",6:"超额撤单",7:"管理撤单"
}

const moneyDetailType = {
  1:"在线充值",
  2:"提取现金",
  3:"转账转入",
  4:"转账转出",
  5:"追号冻结",
  6:"追号解冻",
  7:"加入游戏",
  8:"撤单返款",
  9:"提现冻结",
  10:"提现解冻",
  11:"派发奖金",
  12:"撤销派奖",
  13:"投注返点",
  14:"撤销佣金",
  15:"追号返款",
  16:"充值费用返还",
  17:"提现手续费",
  18:"人工充值",
  19:"管理员提现",
  20:"分红",//总代可见
  21:"撤销分红",//总代可见
  22:"理赔充值"
}
// function getGameTypeConfig(type){
//   return moneyDetailType[type];
// }

function gameTraceStatus(type){
  return gameStatusType[type];
}
function gameRecordStatus(type){
  return gameRecordStatusType[type];
}

function gameMoneyDetailType(type){
  return moneyDetailType[type];
}


module.exports = {
  getGameTypeConfig,
  gameTraceStatus,
  gameRecordStatus,
  gameMoneyDetailType
}
