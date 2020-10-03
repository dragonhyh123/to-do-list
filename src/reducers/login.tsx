import {SetUserName, SetPassWord} from '../actions';

function login(state, action) {
    switch (action.type) {
        case SetUserName:
            state.userName = action.state;
            return state;
        case SetPassWord:
            state.passWord = action.password;
            return state;
        default:
            return null;
    }
}

export default login;