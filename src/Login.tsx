import React = require('react');
import { Input, Button, Form, Checkbox, Modal } from 'antd';
import 'antd/dist/antd.css';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import '../style/App.scss';
import { connect } from "react-redux";
import { setUserName, setPassWord, setRigister } from '../src/actions/index';
import { ChangeEventHandler } from "react";
import { history } from 'react-router-dom';
import axios from 'axios';

interface propsType {
    getUserName: ChangeEventHandler,
    getPassWord: ChangeEventHandler,
    userName: string,
    passWord: string,
    history: history,
    showRegister: boolean,
    setRegisterVisible: (boolean) => void
}

interface stateType {
}

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

//mapStateToProps函数：参数是容器组件的state对象，用于将容器组件（在例子中是Container）的state对象值映射到对应显示组件
// （在例子中是LoginComponent组件）的props属性上，因此后续LoginComponent组件可以通过props.userName直接获取到容器组件的state.userName
const mapStateToProps = (state) => {
    return {
        userName: state.login.userName,
        passWord: state.login.passWord,
        showRegister: state.login.showRegister
    }
}

// 如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator,
// 返回的 Action 会由 Redux 自动发出。举例来说，上面的mapDispatchToProps写成对象就是下面这样。
const mapDispatchToProps = (dispatch: Function): { getUserName: (Event) => void, getPassWord: (Event) => void, setRegisterVisible: (boolean) => void } => {
    return {
        getUserName: (e: Event) => { dispatch(setUserName(e)) },
        getPassWord: (e: Event) => { dispatch(setPassWord(e)) },
        setRegisterVisible: (visible: boolean) => { dispatch(setRigister(visible)) }
    }
}

//class组件实现
class LoginComponent extends React.Component<propsType, stateType>{
    constructor(props) {
        super(props);
    }

    async onClickLogin(event: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> {
        let result: any = await axios.post('http://localhost:3000/login', { userName: this.props.userName, password: this.props.passWord });
        if (result.status === 200 && result.data.status === 'success') {
            const path = `/Board/${this.props.userName}`;
            this.props.history.push(path);
        } else {
            alert(result.data.message);
        }
    }

    render() {
        const { getUserName, getPassWord, setRegisterVisible } = this.props;
        return (
            <div id="container" className="container">
                <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={getUserName} />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" onChange={getPassWord} />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.onClickLogin.bind(this)}>
                            Log in
                        </Button>
                        new user? <a onClick={function (e: Event) {
                            setRegisterVisible(true);
                        }.bind(this)}>register now!</a>
                    </Form.Item>
                </Form>
                <Modal title="Basic Modal" visible={this.props.showRegister} onOk={(e: React.MouseEvent<HTMLElement>) => {
                    setRegisterVisible(false);
                }} onCancel={(e: React.MouseEvent<HTMLElement>) => {
                    setRegisterVisible(false);
                }}>
                    <Form name="register" className="register-form" labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your Username' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your Password' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="password1" label="Password Again" rules={[{ required: true, message: 'Please input your Password' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);