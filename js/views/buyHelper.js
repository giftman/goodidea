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
    for (let i in methods) {
        if ((choice[i] && choice[i].length >= methods[i].num) || (defaultGame.num && choice.length >=defaultGame.num)){
            numOfChips = countNum(choice[i].length, methods[i].num) * numOfChips;
            if (methods[i].each_num_represent_chips_num) {
                numOfChips = numOfChips * methods[i].each_num_represent_chips_num;
            }
            if (methods[i].extra) {
                numOfChips = 0
            }
            ;
            choice[i].map((n, index) => {
                console.log(n);
                if (methods[i].extra) {
                    n = n + 1;
                }
                // if(n){
                result = result + n;
                // }
                if (methods[i].extra) {
                    numOfChips = methods[i].extra[n] + numOfChips;
                }
            })
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
    //单式特殊处理
    if (defaultGame.layout == 2) {
        if (!checkIsValidDansi(choice, defaultGame.num)) {
            return {
                "numOfChips": 0
            };
        }
        numOfChips = choice.length;
        result = choice.join(',');
    }

    //Todo 任选直选复式需要计算选了多少位

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