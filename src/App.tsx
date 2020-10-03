import * as React from 'react';
import '../style/App.scss';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Login} from './Login';
import {Provider} from "react-redux";
import {configureStore} from "./store";

/**
 * React.Component<any,any>第一个参数是props的type，第二个参数是state的参数
 */

interface props{}
interface state{}

const routes = [
    {
        path: "/",
        component: Login
    },
];

const store = configureStore();

function RouteWithSubRoutes(route) {
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

export class App extends React.Component<props, state> {
    constructor(pros) {
        super(pros);
    }
    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </Router>
            </Provider>
        );
    }
}