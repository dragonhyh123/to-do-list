import * as React from 'react';

'use strict';
/*
 * action 类型
 */
export const Set_UserName = 'Set_UerName';
export const Set_PassWord = 'Set_PassWord';
export const Set_Register = 'Set_Register';
export const Set_Register_Name = 'Set_Register_Name';
export const Set_Register_Password = 'Set_Register_Password';
export const Set_Register_Password1 = 'Set_Register_Password1';

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
/*
 * action 创建函数
 * @method  addTodo添加新事项
 * @param  {String} text 添加事项的内容
 */
export function setValue(type:string,value:string|boolean){
    return {
        type:type,
        value:value
    };
}