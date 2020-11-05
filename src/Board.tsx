import * as React from 'react';
import { Button, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import '../style/App.scss';

const useState = React.useState;
const { SubMenu } = Menu;

//webpack创建了一个全局变量process.env.NODE_ENV,用来区分不同的状态，同时可以在程序中区分程序状态
// if(process.env.NODE_ENV==='development'){
//     console.log("this is development")
// }else if(process.env.NODE_ENV==='production'){
//     console.log("this is production")
// }

interface titleProps{
    text:string;
}

interface titleBarProps{
}

interface boardProps{
}

interface boardState{
}

function Title(props: titleProps) {
    return (
        <div>
            <h1 className="boardTitle">{`Welcome ${props.text}`}</h1>
        </div>
    );
}

function TitleBar(props: titleBarProps) {
    const [state, setState] = useState({ current: 'mail' });
    const { current } = state;

    function handleClick(event: any) {
        console.log('click ', event);
        setState({ current: event.key });
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
                OverView
            </Menu.Item>
            <Menu.Item key="app" icon={<AppstoreOutlined />}>
                Plan Detail
            </Menu.Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>);
}

export class Board extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <Title text={this.props.match.params.text} />
                <TitleBar />
            </div>);
    }
}