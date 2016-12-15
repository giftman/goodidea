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
                    console.log(n);
                    if (methods[i].startOne) {
                        n = n + 1;
                    }
                    // if(n){
                    result = result + n;
                    // }
                    if (methods[i].extra) {
                        numOfChips = methods[i].extra[n] + numOfChips;
                    }
                })
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
           numOfChips = danshiCount(defaultGame,choice,numOfChips);
        }else{
            numOfChips = 0
        }
        
    }

    //Todo 任选直选复式需要计算选了多少位
    if(defaultGame.positions && defaultGame.num){
        let sum = _.reduce(defaultGame.positions,(memo,num)=>{return memo + num;},0);
        numOfChips = countNum(sum, defaultGame.num) * numOfChips;
    }

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
        oneChoice["num"] = result.replace(/\|/g, ",");
        oneChoice["des"] = defaultGame.name_cn + " " + numOfChips + "注 X " + multNum + "倍="
            + defaultGame.price * multNum * numOfChips + "元";
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

function danshiCount(defaultGame,choice,numOfChips) {
    var reg2 = /(\d)\d?\1/;
    var reg3 = /(\d)\1\1/;
    if(defaultGame.type.includes("zusandanshi")){
            for(let c in choice){
                    if(!reg2.test(choice[c]) || reg3.test(choice[c])){
                        numOfChips = numOfChips - 1;
                    }
                }
    }else if(defaultGame.type.includes("zuliudanshi")){
            for(let c in choice){
                    if(reg2.test(choice[c])){
                        numOfChips = numOfChips - 1;
                    }
                }
    }else if(defaultGame.type.includes("zuliudanshi") 
        || defaultGame.type.includes("houerdanshi") 
        || defaultGame.type.includes("qianerdanshi")
        || defaultGame.type.includes("zuxuandanshi")
        ){
            for(let c in choice){
                    if(reg2.test(choice[c])){
                        numOfChips = numOfChips - 1;
                    }
                }
    }
    return numOfChips;
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
    }else if(defaultGame.type.includes("zuxuan12")){
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
    updatePackage
};