/**
 * # Parse.js
 * 
 * This class interfaces with Parse.com using the rest api
 * see [https://parse.com/docs/rest/guide](https://parse.com/docs/rest/guide)
 *
 */
'use strict';

import Parse from './Parse';

export default function BackendFactory(token = null) {
    return new Parse(token);
}
