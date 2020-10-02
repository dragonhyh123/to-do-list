import * as React from "react";
import {DatePicker} from "antd";
import 'antd/dist/antd.css';
import '../style/App.scss';
import locale from 'antd/es/date-picker/locale/zh_CN';
import * as moment from "moment";

const Text = function(props){
    debugger
    return props.date ? <div><span className="text">当前日期 {props.date}</span></div> :
        <div><span className="text">未选择</span></div>
}

//React.Component<any,any>第一个参数是props的type，第二个参数是state的参数
export class helloWorld extends React.Component<any,any>{
    constructor(pros) {
        super(pros);
        this.state={date:""};
        this.onSelectDate = this.onSelectDate.bind(this);
    }

    onSelectDate(date: any, dateString: string){
        debugger;
        this.setState((state,prop)=>({date:date?date.format('YYYY年MM月DD日'):""}));
    }

    render() {
        return (
            <div>
                <DatePicker locale={locale} onChange={this.onSelectDate}/>
                <Text date={this.state.date}/>
            </div>);
    }
}