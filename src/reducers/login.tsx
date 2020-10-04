import {Set_UserName, Set_PassWord, Clear_Information} from '../actions';

function login(state:{userName:string,passWord:string}={userName:"",passWord:""}, action:{type:string,value:string}) {
    switch (action.type) {
        case Set_UserName:
            // state.userName = action.value;

            return{userName:action.value,passWord:state.passWord};
        case Set_PassWord:
            // state.passWord = action.value;

            return{userName: state.userName,passWord: action.value};
        case Clear_Information:
            // state.userName = "";
            // state.passWord = "";

            return{userName: "",passWord: ""};
        default:
            return {userName:"",passWord:""};
    }
}

export default login;