// import * as React from "react";
import React = require('react');
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../style/App.scss';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import {connect} from "react-redux";
import {setUserName,setPassWord} from '../src/actions/index';
import {ChangeEventHandler} from "react";
import {browserHistory} from 'react-router';

interface propsType{
    getUserName:ChangeEventHandler,
    getPassWord:ChangeEventHandler,
    userName:string,
    passWord:string,
    history:any;
}

interface stateType{
}

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

//mapStateToProps函数：参数是容器组件的state对象，用于将容器组件（在例子中是Container）的state对象值映射到对应显示组件
// （在例子中是LoginComponent组件）的props属性上，因此后续LoginComponent组件可以通过props.userName直接获取到容器组件的state.userName
const mapStateToProps = (state) => {
    return {
        userName:state.login.userName,
        passWord:state.login.passWord,
    }
}

// 如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator,
// 返回的 Action 会由 Redux 自动发出。举例来说，上面的mapDispatchToProps写成对象就是下面这样。
const mapDispatchToProps = (dispatch:Function):{getUserName:Function,getPassWord:Function} => {
    return{
        getUserName:(e:Event)=>{let value = e.target.value;dispatch(setUserName(e))},
        getPassWord:(e:Event)=>{let value = e.target.value;dispatch(setPassWord(e))},
    }
}

class LoginComponent extends React.Component<propsType,stateType>{
    constructor(props) {
        super(props);
        // this.state={
        //     userName:"",
        //     passWord:"",
        // }
        // this.getUserName = this.getUserName.bind(this);
        // this.getPassWord = this.getPassWord.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    }

    // getUserName(e:Event):void{
    //     this.setState({userName:e.target.value});
    // }
    //
    // getPassWord(e:Event):void{
    //     this.setState({passWord:e.target.value});
    // }

    onClickLogin(event:React.MouseEvent<HTMLElement, MouseEvent>):void{
        const path = '/Board Hello World';
        this.props.history.block("test");
        this.props.history.push(path);
    }

    onClickCancel(event:React.MouseEvent<HTMLElement, MouseEvent>):void{
    }

    render(){
        const {getUserName,getPassWord,userName} = this.props;
        return(
            <div id="loginInformation">
                <div className="loginLine">
                    <div>用户名</div>
                    <Input onChange={getUserName} placeholder="请输入用户名" className="loginInput"/>
                </div>
                <div className="loginLine">
                    <div>密   码</div>
                    <Input.Password onChange={getPassWord} placeholder="请输入密码" className="loginInput"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>
                <div className="loginButton">
                    <Button type="primary" onClick={this.onClickLogin}>登录</Button>
                    <Button onClick={this.onClickCancel}>取消</Button>
                </div>
            </div>
        );
    }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);