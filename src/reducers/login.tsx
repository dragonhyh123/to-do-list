import {Set_UserName, Set_PassWord, Set_Register, Set_Register_Name, Set_Register_Password, Set_Register_Password1} from '../actions';

type state = {
    userName:string,
    passWord:string,
    showRegister:boolean,
    registerName:string,
    registerPassword:string,
    registerPassword1:string
}

function login(state:state={userName:"",passWord:"",showRegister:false,registerName:"",registerPassword:"",registerPassword1:""}, action:{type:string,value:string|boolean}) {
    let currentValue:state = {...state};

    switch (action.type) {
        case Set_UserName:
            currentValue.userName = action.value as string;
        case Set_PassWord:
            currentValue.passWord = action.value as string;
        case Set_Register:
            currentValue.showRegister = action.value as boolean;
        case Set_Register_Name:
            currentValue.registerName = action.value as string;
        case Set_Register_Password:
            currentValue.registerPassword = action.value as string;
        case Set_Register_Password1:
            currentValue.registerPassword1 = action.value as string;
        default:
            return currentValue;
    }
}

export default login;