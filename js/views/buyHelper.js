'use strict';

import _ from 'underscore';

function randomPick(defaultGame) {
    try {
        let methods = defaultGame.methods;
        let choice = {}
        if (methods) {
            for (var j in methods) {
                if (!choice[j]) {
                    choice[j] = [];
                }

                let method = methods[j];
                let range = method.list.slice();
                // let eachPick = "";
                for (var eachTime = 0; eachTime < method.num; eachTime++) {
                    let onePickIndex = _.random(0, range.length - 1);
                    console.log(onePickIndex);
                    console.log(range);
                    choice[j].push(range[onePickIndex]);
                    if (method.num > 1) {
                        range.splice(onePickIndex, 1);
                    }
                }
                choice[j] = choice[j].sort();
            }

        }
        if (defaultGame.layout && defaultGame.layout == 2) {
            //Todo
        }
        console.log(choice);
        return choice
    } catch ( err ) {
        console.log(err)
        return {};
    }

}

//check how many times had pay.
function checkHowManyNumOfChipsAndAddToPackage(defaultGame, choice) {

    let methods = defaultGame.methods;
    // console.log(methods);
    let result = "";
    let numOfChips = 1;
    console.log(defaultGame.num);
    let numLen = Object.keys(choice).length;
    //bu quan xuan
    let choiceLen = 1;
    for (let i in methods) {
        if ((choice[i] && choice[i].length >= methods[i].num) || (defaultGame.num && numLen >= defaultGame.num)) {
            if (choice[i]) {
                choiceLen = choice[i].length;
            }
            numOfChips = countNum(choiceLen, methods[i].num) * numOfChips;

            if (methods[i].each_num_represent_chips_num) {
                numOfChips = numOfChips * methods[i].each_num_represent_chips_num;
            }
            if (methods[i].extra) {
                numOfChips = 0
            }
            ;
            if (choice[i]) {
                choice[i].map((n, index) => {
                    if (methods[i].startOne) {
                        n = n + 1;
                    }
                    result = result + n;

                    if (methods[i].extra) {
                        numOfChips = methods[i].extra[n] + numOfChips;
                    }
                })

                if(defaultGame.type.includes("zhixuan.hezhi") ||
                   defaultGame.type.includes("zhixuanhezhi")  ||
                   defaultGame.type.includes("zuxuan.hezhi")  ||
                   defaultGame.type.includes("zuxuanhezhi")   ||
                   defaultGame.type.includes("qianerhezhi")   ||
                   defaultGame.type.includes("houerhezhi")   ||
                   defaultGame.type.includes("wuxing.hezhi")
                ){
                  if (!methods[i].startOne) {
                      result = choice[i].join("|");
                  }

                }
            }

            result = result + "|";
        } else {
            console.log('not choice all key')
            numOfChips = 0;
            break;
        }
    }

    if (defaultGame.each_method_represent_chips_num) {
        numOfChips = numOfChips * defaultGame.each_method_represent_chips_num
    }

    if (result.length >= 1) {
        result = result.slice(0, result.length - 1);
    }
    if( numOfChips > 0 && (defaultGame.type.includes("zuxuan.zuxuan") || defaultGame.type.includes("renxuan4")) ){
        //todo
        numOfChips = zuxuanCount(defaultGame,choice,numOfChips);
    }
    //一星特殊处理
    if( numOfChips > 0 && (defaultGame.type.includes("yixing.dingweidan.fushi"))){
        //todo
        numOfChips = 0;
        for (let i in choice) {
        numOfChips = numOfChips + choice[i].length;
        }
    }
    //单式特殊处理
    if (defaultGame.layout == 2) {

        if (!checkIsValidDansi(choice, defaultGame.num)) {
            return {
                "numOfChips": 0
            };
        }

        if(_.isArray(choice)){//fix renxuan.zhixuandanshi
           numOfChips = choice.length;
           result = choice.join(',');
           // console.log(choice);
           // numOfChips = danshiCount(defaultGame,choice,numOfChips);
        }else{
            numOfChips = 0
        }

    }

    //Todo 任选直选复式需要计算选了多少位
    if(defaultGame.positions && defaultGame.num){
        let sum = _.reduce(defaultGame.positions,(memo,num)=>{return memo + num;},0);
        numOfChips = countNum(sum, defaultGame.num) * numOfChips;
    }
    if( numOfChips > 0 && defaultGame.type.includes("zhixuanfushi")){
        //todo
        numOfChips = zhixuanfushiCount(defaultGame,choice,numOfChips);
    }
    //only for wuxing hezhi 24 numbers bug
    numOfChips = Math.round(numOfChips);

    console.log("choice result:" + result);
    console.log("numOfChips:" + numOfChips);
    return {
        result,
        numOfChips
    };
}

function updatePackage(defaultGame, numOfChips, multNum, buyPackage, result) {
    if (numOfChips >= 1) {
        let oneChoice = {};
            // "balls[0][jsId]": "1",
            // "balls[0][wayId]": "203",
            // "balls[0][ball]": "6|8|6|7|8",
            // "balls[0][viewBalls]": "",
            // "balls[0][num]": "10",
            // "balls[0][type]": "renxuan.renxuan2.zhixuanfushi",
            // "balls[0][onePrice]": "2",
            // "balls[0][moneyunit]": "1",
            // "balls[0][multiple]": "1",
            // "balls[0][is_dekaron]": "false",
            oneChoice["jsId"] = defaultGame.jsId;
            oneChoice["wayId"] = defaultGame.series_way_id;
            oneChoice["onePrice"] = defaultGame.price;
            oneChoice["ball"] = result;
            if(defaultGame.type.includes('danshi') || defaultGame.type.includes('hunhezuxuan')){
                oneChoice["ball"] = result.replace(/,/g,'|');
            }
            oneChoice["viewBalls"] = defaultGame.viewBalls||"";
            oneChoice["num"]  = numOfChips;
            oneChoice["type"] = defaultGame.type;
            oneChoice["moneyunit"] = "1";//todo
            oneChoice["multiple"] = multNum;
            let is_dekaron = numOfChips > defaultGame.dekaron.dekaron_count ? false:true;
            oneChoice["is_dekaron"] = is_dekaron;
            oneChoice["numShow"] = result.replace(/\|/g, ",");
            let amount = defaultGame.price * multNum * numOfChips;
            oneChoice["des"] = defaultGame.name_cn + " " + numOfChips + "注 X " + multNum + "倍="
            + amount + "元";
            oneChoice["amount"] = amount;
            if(defaultGame.positions){
                oneChoice["position"] = defaultGame.positions;
            }
            if(defaultGame.type.includes('zhixuanfushi')){
                let tmp = result.split('|');
                oneChoice["position"] = _.map(tmp, function(num){ if(num != ''){
                    return 1;
                }else{
                    return 0;
                } });
            }
        buyPackage.push(oneChoice);
    }
    return buyPackage
}

function checkIsValidDansi(choice, num) {
    let result = true;
    for (let i in choice) {
        console.log(choice[i].length);
        if (choice[i].length === num) {

        } else {
            result = false;
            break;
        }
    }
    return result;
}

function zhixuanfushiCount(defaultGame,choice,numOfChips) {
    console.log(choice);
    let cLength = _.map(choice,(c) =>{return c.length})
    console.log(cLength);
    numOfChips = 0;
    if(defaultGame.type.includes("renxuan2")){
        for(var i=0;i<cLength.length;i++){
             for(var j=0;j<cLength.length;j++){
                  if(i < j){
                    numOfChips = cLength[i]*cLength[j] + numOfChips;
                  }
            }
        }
    }else if(defaultGame.type.includes("renxuan3")){
        for(var i=0;i<cLength.length;i++){
             for(var j=0;j<cLength.length;j++){
                for(var k=0;k<cLength.length;k++){
                  if(i < j && j < k){
                    numOfChips = cLength[i]*cLength[j]*cLength[k] + numOfChips;
                  }
                }
            }
        }

    }else if(defaultGame.type.includes("renxuan4")){
           for(var i=0;i<cLength.length;i++){
             for(var j=0;j<cLength.length;j++){
                for(var k=0;k<cLength.length;k++){
                  for(var l=0;l<cLength.length;l++){
                  if(i < j && j < k && i < l && j < l && k < l){
                    numOfChips = cLength[i]*cLength[j]*cLength[k]*cLength[l] + numOfChips;
                  }
                }
                }
            }
        }
    }
    return numOfChips;
}

// function danshiCount(defaultGame,choice,numOfChips) {
//     var reg2 = /(\d)\d?\1/;
//     var reg3 = /(\d)\1\1/;
//     // console.log(choice);
//     if(defaultGame.type.includes("zusandanshi")){
//             let clone = clearRepeatChoice(choice);
//             numOfChips = clone.length;
//             console.log(clone);
//             for(let c in clone){
//                     if((!reg2.test(clone[c])) || reg3.test(clone[c])){
//                         numOfChips = numOfChips - 1;
//                     }
//                 }
//     }else if(defaultGame.type.includes("zuliudanshi")){
//             let clone = clearRepeatChoice(choice);
//             numOfChips = clone.length;
//             for(let c in clone){
//                     if(reg2.test(clone[c])){
//                         numOfChips = numOfChips - 1;
//                     }
//                 }
//     }else if(defaultGame.type.includes("zuxuandanshi")){
//             for(let c in choice){
//                     if(reg2.test(choice[c])){
//                         numOfChips = numOfChips - 1;
//                     }
//                 }
//     }else if(defaultGame.type.includes("hunhezuxuan")){
//         let clone = clearRepeatChoice(choice);
//             numOfChips = clone.length;
//             for(let c in clone){
//                     if(reg3.test(clone[c])){
//                         numOfChips = numOfChips - 1;
//                     }
//                 }
//     }else if(defaultGame.type.includes("zuxuan.houerdanshi")
//         || defaultGame.type.includes("zuxuan.qianerdanshi")
//         ){
//             let clone = clearRepeatChoice(choice);
//             numOfChips = clone.length;
//             console.log(clone);
//             for(let c in clone){
//                     if(reg2.test(clone[c])){
//                         numOfChips = numOfChips - 1;
//                     }
//                 }
//     }
//     return numOfChips;
// }

function clearValidChoice(defaultGame,choice){
    let newChoice = _.clone(choice);

    var reg2 = /(\d)\d?\1/;
    var reg3 = /(\d)\1\1/;
    // console.log(choice);
    if(defaultGame.type.includes("zusandanshi")){
           newChoice = clearRepeatChoice(choice);
           newChoice = _.filter(newChoice,function(num){return reg3.test(num) == false && reg2.test(num) == true})
    }else if(defaultGame.type.includes("zuliudanshi")){
           newChoice = clearRepeatChoice(choice);
           newChoice = _.filter(newChoice,function(num){return reg2.test(num) == false})
    }else if(defaultGame.type.includes("zuxuandanshi")){
           newChoice = clearRepeatChoice(choice);
           newChoice = _.filter(newChoice,function(num){return reg2.test(num) == false})
    }else if(defaultGame.type.includes("hunhezuxuan")){
        newChoice = clearRepeatChoice(choice);
        newChoice = _.filter(newChoice,function(num){return reg3.test(num) == false})
    }else if(defaultGame.type.includes("zuxuan.houerdanshi")
        || defaultGame.type.includes("zuxuan.qianerdanshi")
        ){
           newChoice = clearRepeatChoice(choice);
           newChoice = _.filter(newChoice,function(num){return reg2.test(num) == false})
    }else if(defaultGame.type.includes("zhixuandanshi")
        || defaultGame.type.includes("zhixuan.danshi")
        || defaultGame.type.includes("zhixuan.qianerdanshi")
        || defaultGame.type.includes("zhixuan.houerdanshi")
        ){
           newChoice = clearZhiXuanRepeatChoice(choice);
    }

    return newChoice;
}

//有些玩法(zuxuan)89,98类似这种当成一种的
function clearRepeatChoice(choice){
    let newChoice = [];
    let choiceSet = new Set();
    // for(let c in choice){
    //     choiceSet.add(choice[c].toString().split('').sort().toString());
    // }
    choice.map(x => choiceSet.add(x.toString().split('').sort().toString()));
    for(var p of choiceSet){
        newChoice.push(p.replace(/,/g,''));
    }
    return newChoice;
}

//有些玩法(zhixuan)99,99类似这种只是重复的不需要排序后再过滤
function clearZhiXuanRepeatChoice(choice){
    let newChoice = [];
    let choiceSet = new Set();
    // for(let c in choice){
    //     choiceSet.add(choice[c].toString().split('').sort().toString());
    // }
    choice.map(x => choiceSet.add(x.toString()));
    for(var p of choiceSet){
        newChoice.push(p.replace(/,/g,''));
    }
    return newChoice;
}

function zuxuanCount(defaultGame,choice,numOfChips) {
    if(defaultGame.type.includes("zuxuan30")){
        let lenDouble = choice["二重"].length;
        let lenDang = choice["单"].length;
        let minus = lenDouble + lenDang - _.union(choice["二重"],choice["单"]).length;
        console.log("lenDouble: " + lenDouble + " lenDang: " +lenDang + " minus: " + minus);
        numOfChips = numOfChips - minus*countNum(lenDouble - 1,1);
    }else if(defaultGame.type.includes("sixing.zuxuan.zuxuan6")){
        let lenDouble = choice["二重"].length;
        numOfChips = countNum(lenDouble,2);
    }else if(defaultGame.type.includes("zuxuan60")){
        let lenDouble = choice["二重"].length;
        let lenDang = choice["单"].length;
        let minus = lenDouble + lenDang - _.union(choice["二重"],choice["单"]).length;
        console.log("lenDouble: " + lenDouble + " lenDang: " +lenDang + " minus: " + minus);
        numOfChips = numOfChips - minus*countNum(lenDang - 1,2);
    }else if(defaultGame.type.includes("zuxuan12") && !defaultGame.type.includes("zuxuan120")){
        let lenDouble = choice["二重"].length;
        let lenDang = choice["单"].length;
        let minus = lenDouble + lenDang - _.union(choice["二重"],choice["单"]).length;
        console.log("lenDouble: " + lenDouble + " lenDang: " +lenDang + " minus: " + minus);
        numOfChips = numOfChips - minus*countNum(lenDang - 1,1);
    }else if(defaultGame.type.includes("zuxuan20")){
        let lenDouble = choice["三重"].length;
        let lenDang = choice["单"].length;
        let minus = lenDouble + lenDang - _.union(choice["三重"],choice["单"]).length;
        console.log("lenDouble: " + lenDouble + " lenDang: " +lenDang + " minus: " + minus);
        numOfChips = numOfChips - minus*countNum(lenDang - 1,1);
    }else if(defaultGame.type.includes("zuxuan4")){
        let lenDouble = choice["三重"].length;
        let lenDang = choice["单"].length;
        let minus = lenDouble + lenDang - _.union(choice["三重"],choice["单"]).length;
        console.log("lenDouble: " + lenDouble + " lenDang: " +lenDang + " minus: " + minus);
        numOfChips = numOfChips - minus;
    }else if(defaultGame.type.includes("zuxuan10")){
        let lenDouble = choice["三重"].length;
        let lenDang = choice["二重"].length;
        let minus = lenDouble + lenDang - _.union(choice["三重"],choice["二重"]).length;
        console.log("lenDouble: " + lenDouble + " lenDang: " +lenDang + " minus: " + minus);
        numOfChips = numOfChips - minus;
    }else if(defaultGame.type.includes("zuxuan5")){
        let lenDouble = choice["四重"].length;
        let lenDang = choice["单"].length;
        let minus = lenDouble + lenDang - _.union(choice["四重"],choice["单"]).length;
        console.log("lenDouble: " + lenDouble + " lenDang: " +lenDang + " minus: " + minus);
        numOfChips = numOfChips - minus;
    }
    return numOfChips;
}

//组合计算
function countNum(n, m) {
    return mathDouble(n) / (mathDouble(n - m) * mathDouble(m));
}

function mathDouble(num) {
    if (num > 1) {
        return num * mathDouble(num - 1)
    } else {
        return 1
    }
}

module.exports = {
    checkHowManyNumOfChipsAndAddToPackage,
    randomPick,
    updatePackage,
    clearValidChoice
};
