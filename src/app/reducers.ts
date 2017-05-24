import {Message} from "./message";
export function publicReducer(state: Message = {owner: '', adresat: '', content: ''}, action) {switch (action.type) {
  case 'public': {
    return Object.assign({}, state, action.payload); }
  default: return state;
}}

export function privateReducer(state: Message = {owner: '', adresat: '', content: ''}, action) {switch (action.type) {
  case 'private': {
    return Object.assign({}, state, action.payload); }
  default: return state;
}}
