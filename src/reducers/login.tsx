import {Set_UserName, Set_PassWord} from '../actions';

function login(state:{userName:string,passWord:string}={userName:"",passWord:""}, action:{type:string,value:string}) {
    switch (action.type) {
        case Set_UserName:
            state.userName = action.value;
            return state;
        case Set_PassWord:
            state.passWord = action.value;
            return state;
        default:
            return null;
    }
}

export default login;