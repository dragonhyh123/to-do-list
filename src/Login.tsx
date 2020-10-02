import * as React from "react";
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../style/App.scss';

interface propsType{}

interface stateType{
    userName:string,
    passWord:string
}

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export class Login extends React.Component<propsType,stateType>{
    constructor(props) {
        super(props);
        this.state={
            userName:"",
            passWord:"",
        }
        this.getUserName = this.getUserName.bind(this);
        this.getPassWord = this.getPassWord.bind(this);
    }

    getUserName(e:Event):void{
        // this.setState((state,props)=>({userName:e.target.value}));
        this.setState({userName:e.target.value});
    }

    getPassWord(e:Event):void{
        // this.setState((state,props)=>({passWord:e.target.value}));
        this.setState({passWord:e.target.value});
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
                    <Button type="primary">登录</Button>
                    <Button>取消</Button>
                </div>
            </div>
        );
    }
}