import * as React from "react";
import {DatePicker} from "antd";
import 'antd/dist/antd.css';

export class helloWorld extends React.Component{
    constructor(pros) {
        super(pros);
    }

    render() {
        return <DatePicker/>;
    }
}