import {Set_UserName, Set_PassWord, Set_Register} from '../actions';

function login(state:{userName:string,passWord:string,showRegister:boolean}={userName:"",passWord:"",showRegister:false}, action:{type:string,value:string}) {
    switch (action.type) {
        case Set_UserName:
            return{userName:action.value,passWord:state.passWord,showRegister:state.showRegister};
        case Set_PassWord:
            return{userName:state.userName,passWord:action.value,showRegister:state.showRegister};
        case Set_Register:
            return{userName:state.userName,passWord:state.passWord,showRegister:action.value};
        default:
            return {userName:"",passWord:"",showRegister:false};
    }
}

export default login;