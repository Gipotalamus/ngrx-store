import {Message} from "./message";
export function reducer(state: Message = {owner: '', content: ''}, action) {switch (action.type) {
  case 'post': {
    // console.log(state);
    // console.log(action.payload);
    // console.log(Object.assign({}, state, action.payload));
    return Object.assign({}, state, action.payload); }
  default: return state;
}}
