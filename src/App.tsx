import * as React from 'react';
import '../style/App.scss';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Login} from './Login';
import {connect, Provider} from "react-redux";
// import {configureStore} from "./store";

/**
 * React.Component<any,any>第一个参数是props的type，第二个参数是state的参数
 */

/**
 * 在 Redux 中，对于 store state 的定义是通过组合 reducer 函数来得到的，也就是说 reducer 决定了最后的整个状态的数据结构
 * 在生成的 store 中有一个 replaceReducer(nextReducer) 方法，它是 Redux 中的一个高阶 API ，该函数接收一个 nextReducer 参数
 * 用于替换 store 中原有的 reducer ，以此可以改变 store 中原有的状态的数据结构
 */

interface props{}
interface state{}

const routes = [
    {
        path: "/",
        component: Login
    },
];

// const mapStateToProps = (state) => {
//     return {
//     }
// };
//
// const mapDispatchToProps = {
// };

function RouteWithSubRoutes(route:any) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

class AppComponent extends React.Component<props, state> {
    constructor(pros) {
        super(pros);
    }
    render() {
        return(
            <Router>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                    {/*<Route path="/" component={Login}/>*/}
                </Switch>
            </Router>
        );
    }
}

export const App = connect()(AppComponent);