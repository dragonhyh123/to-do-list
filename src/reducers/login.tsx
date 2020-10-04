import {Set_UserName, Set_PassWord, Clear_Information} from '../actions';

function login(state:{userName:string,passWord:string}={userName:"",passWord:""}, action:{type:string,value:string}) {
    switch (action.type) {
        case Set_UserName:
            debugger;
            state.userName = action.value;
            return state;
        case Set_PassWord:
            state.passWord = action.value;
            return state;
        case Clear_Information:
            debugger;
            state.userName = "";
            state.passWord = "";
            return state;
        default:
            return {userName:"",passWord:""};
    }
}

export default login;