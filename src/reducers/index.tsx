import { combineReducers } from 'redux';
import login from './login';
import board from './board';

const reducer = combineReducers({
    login, board
});

export default reducer;
