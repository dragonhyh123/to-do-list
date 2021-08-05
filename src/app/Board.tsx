import * as React from 'react';
import { Menu, Layout, Button } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import '../../style/App.scss';
import { match, history, location } from 'react-router-dom';
import { MenuInfo } from 'rc-menu/lib/interface';
import { connect } from "react-redux";
import { setValue, Set_Current_Tab } from '../actions/index';
import Calender from './Calendar';
import List from './List';

const useState = React.useState;
const { Header, Sider, Content, Footer } = Layout;

//webpack创建了一个全局变量process.env.NODE_ENV,用来区分不同的状态，同时可以在程序中区分程序状态
// if(process.env.NODE_ENV==='development'){
//     console.log("this is development")
// }else if(process.env.NODE_ENV==='production'){
//     console.log("this is production")
// }

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface titleProps {
    text: string;
}

interface titleBarProps {
    currentTab: string,
    changeTab: (e: MenuInfo) => void
}

interface boardProps {
    match: match<{ text: string }>,
    history: history,
    location: location,
    currentTab: string,
    setValue: (type: string, value: string | boolean) => void,
    changeTab: (e: MenuInfo) => void
}

interface boardState {
}

interface overviewContent {
}

interface detailContent {
}

function NavigationBar(props: titleBarProps) {
    return (
        <Menu theme="dark" selectedKeys={[props.currentTab]} defaultOpenKeys={['list']} mode="inline" style={{ width: 256 }} onClick={props.changeTab} className='menu'>
            <Menu.Item key="overview" icon={<MailOutlined />}>
                OverView
            </Menu.Item>
            <Menu.SubMenu key='list' title='Planning Group' icon={<AppstoreOutlined />}>
                <Menu.Item key="default" icon={<AppstoreOutlined />}>
                    Default
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>);
}

function OverviewContent(props: overviewContent) {
    return <Content
        className="site-layout-background"
        style={{
            margin: '24px 16px 0px 16px',
            padding: 24,
            minHeight: 280,
        }}>
        <Calender/>
    </Content>
}

function DetailContent(props: detailContent) {
    return <Content
        className="site-layout-background"
        style={{
            margin: '24px 16px 0px 16px',
            padding: 24,
            minHeight: 280,
        }}>
        <List/>
    </Content>
}

export class BoardComponent extends React.Component<boardProps, boardState>{
    constructor(props) {
        super(props);
    }

    render() {
        let content: JSX.Element;

        switch (this.props.currentTab) {
            case 'overview':
                content = <OverviewContent />;
                break;
            case 'default':
                content = <DetailContent />;
                break;
            default:
        }

        return (
            <Layout>
                <Sider collapsible={false} width={256} style={{ overflow: 'auto', height: '100vh', left: 0 }}>
                    <div className="logo">
                        <span className='title'>Today: 10</span>
                    </div>
                    <NavigationBar currentTab={this.props.currentTab} changeTab={this.props.changeTab.bind(this)} />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ margin: '24px 16px 0px 16px' }}>
                    </Header>
                    {content}
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Dragon</Footer>
                </Layout>
            </Layout>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentTab: state.board.currentTab
    }
}

const mapDispatchToProps = (dispatch: Function): { setValue: (type: string, value: any) => void, changeTab: (e: MenuInfo) => void } => {
    return {
        setValue: (type: string, value: string | boolean) => {
            dispatch(setValue(type, value as string));
        },
        changeTab: (e: MenuInfo) => {
            dispatch(setValue(Set_Current_Tab, (e.key) as string));
        }
    }
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);