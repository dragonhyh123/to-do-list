import { combineReducers } from 'redux';
import todolist from './todos';
import login from './login';
// import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
    todolist,login
});

export default reducer;
