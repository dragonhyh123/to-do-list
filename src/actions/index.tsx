import * as React from 'react';

'use strict';
/*
 * action 类型
 */
export const Set_UserName = 'Set_UerName';
export const Set_PassWord = 'Set_PassWord';
export const Set_Register = 'Set_Register';

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
/*
 * action 创建函数
 * @method  addTodo添加新事项
 * @param  {String} text 添加事项的内容
 */
export function setUserName(e:Event){
    return {
        type:Set_UserName,
        value:e.target.value,
    }
}

export function setPassWord(e:Event){
    return {
        type:Set_PassWord,
        value:e.target.value,
    }
}

export function setRigister(visible:boolean){
    return {
        type:Set_Register,
        value:visible
    }
}