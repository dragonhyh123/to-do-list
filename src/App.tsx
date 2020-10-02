import * as React from 'react';
import '../style/App.scss';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Login} from './Login';

/**
 * React.Component<any,any>第一个参数是props的type，第二个参数是state的参数
 */

interface props{}
interface state{}

export class App extends React.Component<props, state> {
    constructor(pros) {
        super(pros);
    }
    render() {
        return(<Login/>);
    }
}