

'use strict';

import type {Action} from '../actions/types';

type State = {
  typeData: [];
};

const initialState: State = {typeData:[{'title':'Happyun','checked':true},{'title':'Happy fun','checked':false},{'title':'Ha fun','checked':true}]};

function typecheck(state: State = initialState, action: Action): State {
  if (action.type === 'CHECK_TYPE') {
    return {...state, typeData: action.typeData};
  }
  return state;
}

module.exports = typecheck;
