import * as React from 'react';
import { Menu, Layout } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import '../../style/App.scss';
import { match, history, location } from 'react-router-dom';
import { MenuInfo } from 'rc-menu/lib/interface';

const useState = React.useState;
const { Header, Sider, Content, Footer } = Layout;

//webpack创建了一个全局变量process.env.NODE_ENV,用来区分不同的状态，同时可以在程序中区分程序状态
// if(process.env.NODE_ENV==='development'){
//     console.log("this is development")
// }else if(process.env.NODE_ENV==='production'){
//     console.log("this is production")
// }

interface titleProps {
    text: string;
}

interface titleBarProps {
}
interface boardProps {
    match: match<{ text: string }>,
    history: history,
    location: location,
}

interface boardState {
}

function Title(props: titleProps) {
    return (
        <div className='titles'>
            <h1 className="boardTitle">{`Welcome ${props.text}`}</h1>
        </div>
    );
}

function NavigationBar(props: titleBarProps) {
    const [state, setState] = useState({ current: 'mail' });
    const { current } = state;

    function handleClick(event: MenuInfo) {
        setState({ current: event.key.toString() });
        switch (event.key) {
            case 'overview':
                break;
            case 'detail':
                break;
            default:
                break;
        }
    }

    return (
        <Menu theme="dark" onClick={handleClick} selectedKeys={[current]} mode="inline" style={{ width: 256 }}>
            <Menu.Item key="overview" icon={<MailOutlined />}>
                OverView
            </Menu.Item>
            <Menu.Item key="detail" icon={<AppstoreOutlined />}>
                Plan Detail
            </Menu.Item>
        </Menu>);
}
export class Board extends React.Component<boardProps, boardState>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Sider collapsible={true} width={256} style={{overflow: 'auto',height: '100vh', left: 0}}>
                    <div className="logo"/>
                    <NavigationBar />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ margin: '24px 16px 0px 16px'}}>
                        {/* <Title text={this.props.match.params.text}/> */}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}>
                        Content
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Dragon</Footer>
                </Layout>
            </Layout>)
    }
}