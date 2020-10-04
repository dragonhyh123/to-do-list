import * as React from "react";
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../style/App.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {connect} from "react-redux";
import * as PropTypes from 'prop-types';
import {setUserName,setPassWord,clearInformation } from '../src/actions/index';
import {ChangeEventHandler} from "react";
import {Store} from 'redux';

interface propsType{
    getUserName:ChangeEventHandler,
    getPassWord:ChangeEventHandler,
    clearInformation:Function,
}

interface stateType{
    // userName:string,
    // passWord:string,
}

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const mapStateToProps = (state) => {
    return {
        userName:state.userName,
        passWord:state.passWord,
    }
}

// 如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator,
// 返回的 Action 会由 Redux 自动发出。举例来说，上面的mapDispatchToProps写成对象就是下面这样。
const mapDispatchToProps = (dispatch:Function):{getUserName:Function,getPassWord:Function,clearInformation:Function} => {
    return{
        getUserName:(e:Event)=>{let value = e.target.value;dispatch(setUserName(e))},
        getPassWord:(e:Event)=>{let value = e.target.value;dispatch(setPassWord(e))},
        clearInformation:()=>{dispatch(clearInformation())},
    }
}

class LoginComponent extends React.Component<propsType,stateType>{
    constructor(props) {
        super(props);
        // this.state={
        //     userName:"",
        //     passWord:"",
        //     nextPage:"",
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
        // if(this.context.hasOwnProperty("store")){
        //     let {store} = this.context;
        //     store.getState();
        // }
    }

    onClickCancel(event:React.MouseEvent<HTMLElement, MouseEvent>):void{
        const{clearInformation} = this.props;
        clearInformation();
    }

    render(){
        const {getUserName,getPassWord} = this.props;
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