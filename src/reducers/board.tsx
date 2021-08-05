import {Set_Current_Tab} from '../actions';

type state = {
    currentTab:string
}

function board(state:state = {currentTab:'overview'},action:{type:string,value:string|boolean}){
    let currentValue:state = {...state};

    switch(action.type){
        case Set_Current_Tab:
            currentValue.currentTab = (action.value) as string;
            return currentValue;
        default:
            return currentValue;
    }
}

export default board;