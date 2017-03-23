/**
 * # AppAuthToken.js
 * 
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict';
/**
 * ## Imports
 * 
 * Redux  & the config file
 */ 
import store from 'react-native-simple-store';
import CONFIG from './config';


export default class AppAuthToken {
  /**
   * ## AppAuthToken
   *
   * set the key from the config
   */
  constructor () {
    this.SESSION_TOKEN_KEY = CONFIG.PARSE.SESSION_TOKEN_KEY;
    this.USER_INFO_KEY = 'user_info';
    this.SETTING = 'setting';
  }

  /**
   * ### storeSessionToken
   * Store the session key 
   */
  storeSessionToken(sessionToken) {
    return store.save(this.SESSION_TOKEN_KEY,{
      sessionToken: sessionToken
    });

  }
  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object from Parse.com
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSessionToken(sessionToken) {
    if (sessionToken) {
      return store.save(this.SESSION_TOKEN_KEY,{
          sessionToken: sessionToken
      }).then(() => {
        return store.get(this.SESSION_TOKEN_KEY);
      });
    }
    return store.get(this.SESSION_TOKEN_KEY);
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return store.delete(this.SESSION_TOKEN_KEY);
  }

  /**
   * ### storeSessionToken
   * Store the session key 
   */
  storeUser(json) {
    return store.save(this.USER_INFO_KEY,json);

  }
  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object from Parse.com
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getUser() {
    return store.get(this.USER_INFO_KEY);
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteUser() {
    return store.delete(this.USER_INFO_KEY);
  }

  /**
   * ### storeSessionToken
   * Store the session key 
   */
  storeSetting(json) {
    return store.save(this.SETTING,json);

  }
  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object from Parse.com
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSetting() {
    return store.get(this.SETTING);
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSetting() {
    return store.delete(this.SETTING);
  }
}

