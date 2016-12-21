/**
 * # Parse.js
 * 
 * This class interfaces with Parse.com using the rest api
 * see [https://parse.com/docs/rest/guide](https://parse.com/docs/rest/guide)
 *
 */
'use strict';
/**
 * ## Async support
 * 
 */
// require('regenerator/runtime');

/**
 * ## Imports
 * 
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from './config';
import _ from 'underscore';
import Backend from './Backend';

export default class Parse extends Backend {
    /**
     * ## Parse
     *
     * constructor sets the default keys required by Parse.com
     * if a user is logged in, we'll need the sessionToken
     *
     * @throws tokenMissing if token is undefined
     */
    constructor(token) {
        super(token);
        // if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
        //   throw 'TokenMissing';
        // }
        this._sessionToken = _.isNull(token) ? "" : token;

        this._applicationId = CONFIG.PARSE.APP_ID;
        this._restAPIKey = CONFIG.PARSE.REST_API_KEY;
        this._masterKey = null;

        this.API_BASE_URL = 'http://www.zhengdiangame.net';
    }

    async getToken() {
        let data = {
            "app_version": "v1.0",
            "app_type": 1
        };
        return await this._fetch({
                method: 'POST',
                url: '/phone/gettoken',
                body: data,
            })
                .then((response) => {
                    if ( (response.status === 200 || response.status === 201) ) {
                        return response.json();
                    } else {
                        throw (response);
                    }
                })
                .then((json) => {
                    // let resData = JSON.parse(json);
                    console.log(json.data);
                    return json.data;
                })
                .catch((error) => {
                    throw (error);
                });
    }

    /**
     * ### signup
     *
     * @param data object
     *
     * {username: "barton", email: "foo@gmail.com", password: "Passw0rd!"}
     *
     * @return
     * if ok, {createdAt: "2015-12-30T15:17:05.379Z",
     *   objectId: "5TgExo2wBA", 
     *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
     *
     * if error, {code: xxx, error: 'message'}
     */
    async signup(data) {
        return await this._fetch({
                method: 'POST',
                url: '/1/users',
                body: data
            })
                .then((response) => {
                    var json = JSON.parse(response._bodyInit);
                    if (response.status === 200 || response.status === 201) {
                        return json;
                    } else {
                        throw (json);
                    }
                })
                .catch((error) => {
                    throw (error);
                });

    }
    /**
     * ### login
     * encode the data and and call _fetch
     *
     * @param data
     *
     *  {username: "ceshi01", password: "a123456!"}
     *
     * @returns
     *
     * createdAt: "2015-12-30T15:29:36.611Z"
     * email: "barton@foo.com"
     * objectId: "Z4yvP19OeL"
     * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
     * updatedAt: "2015-12-30T16:08:50.419Z"
     * username: "barton"
     *
     */
    async login(data) {
        return await this._fetch({
                method: 'POST',
                url: '/phone/login',
                body: data
            })
                .then((response) => {
                    if ( (response.status === 200 || response.status === 201) ) {
                        return response.json();
                    } else {
                        throw (response);
                    }
                })
                .then((json) => {
                    console.log(json);
                    return json.data;
                })
                .catch((error) => {
                    throw (error);
                });
    }

    /**
     * ### login
     * encode the data and and call _fetch
     *
     * @param data
     *
     *{gameId:1
isTrace:0
traceWinStop:1
traceStopValue:1
balls[0][jsId]:1
balls[0][wayId]:23
balls[0][ball]:0123456789|0123456789
balls[0][viewBalls]:
balls[0][num]:90
balls[0][type]:sixing.zuxuan.zuxuan4
balls[0][onePrice]:2
balls[0][moneyunit]:1
balls[0][multiple]:1
balls[0][is_dekaron]:false
orders[161215070]:1
amount:180.00
prize:1950
_token:VbZVLaUP4rGVBlDIqMlJa6WOnA5P138bJY13KcDx}
     *
     * @returns
     *
     * createdAt: "2015-12-30T15:29:36.611Z"
     * email: "barton@foo.com"
     * objectId: "Z4yvP19OeL"
     * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
     * updatedAt: "2015-12-30T16:08:50.419Z"
     * username: "barton"
     *
     */
    async bet(data) {
        // data = {
        //     "gameId": "1",
        //     "isTrace": "0",
        //     "traceWinStop": "1",
        //     "traceStopValue": "1",
        //     "balls[0][jsId]": "1",
        //     "balls[0][wayId]": "203",
        //     "balls[0][ball]": "6|8|6|7|8",
        //     "balls[0][viewBalls]": "",
        //     "balls[0][num]": "10",
        //     "balls[0][type]": "renxuan.renxuan2.zhixuanfushi",
        //     "balls[0][onePrice]": "2",
        //     "balls[0][moneyunit]": "1",
        //     "balls[0][multiple]": "1",
        //     "balls[0][is_dekaron]": "false",
        //     "orders[161221064]": "1",
        //     "amount": "2.00",
        //     "prize": "1950"
        // }
        return await this._fetch({
                method: 'POST',
                url: '/phone/bet/1',
                body: data
            })
                .then((response) => {
                    if ( (response.status === 200 || response.status === 201) ) {
                        return response.json();

                    } else {
                        throw (response);
                    }
                })
                .catch((error) => {
                    throw (error);
                });
    }

    async getGameConfig(gameId) {
        let data = {};
        data["game_id"] = gameId;
        return await this._fetch({
                method: 'POST',
                url: '/phone/game-configs',
                body: data
            })
                .then((response) => {
                    if ( (response.status === 200 || response.status === 201) ) {
                        return response.json();
                    } else {
                        throw (response);
                    }
                })
                // .then((json) => {
                //     console.log(json);
                //     return json.data;
                // })
                .catch((error) => {
                    throw (error);
                });
    }


    /**
     * ### logout
     * prepare the request and call _fetch
     */
    async logout() {
        return await this._fetch({
                method: 'POST',
                url: '/1/logout',
                body: {}
            })
                .then((response) => {
                    var res = JSON.parse(response._bodyInit);
                    if ((response.status === 200 || response.status === 201)
                            || //invalid session token
                            (response.status === 400 && res.code === 209)) {
                        return {};
                    } else {
                        throw ({
                            code: 404,
                            error: 'unknown error from Parse.com'
                        });
                    }
                })
                .catch((error) => {
                    throw (error);
                });

    }
    /**
     * ### resetPassword
     * the data is already in a JSON format, so call _fetch
     *
     * @param data 
     * {email: "barton@foo.com"}
     *
     * @returns empty object
     *
     * if error:  {code: xxx, error: 'message'}
     */
    async resetPassword(data) {
        return await this._fetch({
                method: 'POST',
                url: '/1/requestPasswordReset',
                body: data
            })
                .then((response) => {
                    if ( (response.status === 200 || response.status === 201) ) {
                        return {};
                    } else {
                        var res = JSON.parse(response._bodyInit);
                        throw (res);
                    }
                })
                .catch((error) => {
                    throw (error);
                });
    }
    /**
     * ### getProfile
     * Using the sessionToken, we'll get everything about
     * the current user.
     *
     * @returns
     *
     * if good:
     * {createdAt: "2015-12-30T15:29:36.611Z"
     *  email: "barton@acclivyx.com"
     *  objectId: "Z4yvP19OeL"
     *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
     *  updatedAt: "2015-12-30T15:29:36.611Z"
     *  username: "barton"}
     *
     * if error, {code: xxx, error: 'message'}
     */
    async getProfile() {
        return await this._fetch({
                method: 'GET',
                url: '/1/users/me'
            })
                .then((response) => {
                    var res = JSON.parse(response._bodyInit);
                    if ( (response.status === 200 || response.status === 201) ) {
                        return res;
                    } else {
                        throw (res);
                    }
                })
                .catch((error) => {
                    throw (error);
                });
    }
    /**
     * ### updateProfile
     * for this user, update their record
     * the data is already in JSON format
     *
     * @param userId  _id of Parse.com
     * @param data object:
     * {username: "barton", email: "barton@foo.com"}
     */
    async updateProfile(userId, data) {
        return await this._fetch({
                method: 'PUT',
                url: '/1/users/' + userId,
                body: data
            })
                .then((response) => {
                    if ( (response.status === 200 || response.status === 201) ) {
                        return {};
                    } else {
                        var res = JSON.parse(response._bodyInit);
                        throw (res);
                    }
                })
                .catch((error) => {
                    throw (error);
                });

    }
    /**
     * ### _fetch
     * A generic function that prepares the request to Parse.com
     */
    async _fetch(opts) {
        opts = _.extend({
            method: 'GET',
            url: null,
            body: null,
            callback: null
        }, opts);

        var reqOpts = {
            method: opts.method,
            headers: {
                'X-Parse-Application-Id': this._applicationId,
                'X-Parse-REST-API-Key': this._restAPIKey
            }
        };

        if (this._masterKey) {
            reqOpts.headers['X-Parse-Master-Key'] = this.masterKey;
        }

        if (opts.method === 'POST' || opts.method === 'PUT') {
            reqOpts.headers['Accept'] = 'application/json';
            reqOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (opts.body) {
            // {"interface_version":"v1.0","charset":"utf-8",app_version:"v1.0","app_type":1}
            if (opts.body["password"]) {
                var md5 = require("./md5")
                opts.body["password"] = md5(md5(md5(opts.body["username"] + opts.body["password"])));
            }
            opts.body["interface_version"] = "v1.0";
            opts.body["charset"] = "utf-8";

            opts.body = this._addToken(opts.body);
            if (this._sessionToken) {
                opts.body["token"] = this._sessionToken;
            }
            console.log("sessionToken: " + this._sessionToken);
            let formBody = [];
            for (var property in opts.body) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(opts.body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            ;
            // let positions = [0, 0, 1, 1, 0];
            // for (var position in positions) {
            //     var encodedKey = encodeURIComponent("balls[0][position][]");
            //     var encodedValue = encodeURIComponent(positions[position]);
            //     formBody.push(encodedKey + "=" + encodedValue);
            // }
            reqOpts.body = formBody.join("&");
            // reqOpts.body = JSON.stringify(opts.body);
            console.log("request body:" + reqOpts.body);
        }
        console.log(this.API_BASE_URL + opts.url);
        return await fetch(this.API_BASE_URL + opts.url, reqOpts);
    }

    _addToken(body) {
        let tmp = "";
        Object.keys(body).sort().map((elem, index) => {
            if (elem.includes('balls') || elem.includes('orders')) {

            } else {
                tmp = tmp + body[elem];
            }
        })
        if (this._sessionToken) {
            tmp = tmp + this._sessionToken;
        }

        console.log(tmp);
        var md5 = require("./md5");
        body["sign"] = md5(tmp);
        return body;
    }



}
;

