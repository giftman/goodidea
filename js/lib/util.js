

'use strict';


/**
   * ### _fetch
   * A generic function that prepares the request to Parse.com
   */  
  function async _fetch(opts) {
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
    if (this._sessionToken) {
      reqOpts.headers['X-Parse-Session-Token'] = this._sessionToken;
    }
    
    if (this._masterKey) {
      reqOpts.headers['X-Parse-Master-Key'] = this.masterKey;
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
      // {"interface_version":"v1.0","charset":"utf-8",app_version:"v1.0","app_type":1}
      opts.body["interface_version"] = "v1.0";
      opts.body["charset"] = "utf-8";
      opts.body["app_version"] = "v1.0";
      opts.body["app_type"] = 1;
      opts.body = this._addToken(opts.body);
      let formBody = [];
      for (var property in opts.body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(opts.body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      };
      reqOpts.body = formBody.join("&");
      console.log("request body:" + reqOpts.body);
    }
    console.log(this.API_BASE_URL + opts.url);
    return await fetch(this.API_BASE_URL + opts.url, reqOpts);
  }

  _addToken(body){
    let tmp = "";
    Object.keys(body).sort().map((elem,index)=>{
        tmp = tmp + body[elem]
    })
    tmp = tmp;
    console.log(tmp);
    var md5 = require("./md5");
    body["sign"] = md5(tmp);
    return body;
  }
module.exports = {
    _fetch,
};
