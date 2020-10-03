import * as React from "react";
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../style/App.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

interface propsType{}

interface stateType{
    userName:string,
    passWord:string,
    nextPage:string,
}

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export class Login extends React.Component<propsType,stateType>{
    constructor(props) {
        super(props);
        this.state={
            userName:"",
            passWord:"",
            nextPage:"",
        }
        this.getUserName = this.getUserName.bind(this);
        this.getPassWord = this.getPassWord.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    }

    getUserName(e:Event):void{
        this.setState({userName:e.target.value});
    }

    getPassWord(e:Event):void{
        this.setState({passWord:e.target.value});
    }

    onClickLogin(event:React.MouseEvent<HTMLElement, MouseEvent>):void{
    }

    onClickCancel(event:React.MouseEvent<HTMLElement, MouseEvent>):void{
    }

    render(){
        return(
            <div id="loginInformation">
                <div className="loginLine">
                    <div>用户名</div>
                    <Input onChange={this.getUserName} placeholder="请输入用户名" className="loginInput"/>
                </div>
                <div className="loginLine">
                    <div>密   码</div>
                    <Input.Password onChange={this.getPassWord} placeholder="请输入密码" className="loginInput"
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