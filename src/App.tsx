import * as React from "react";
import {DatePicker} from "antd";
import 'antd/dist/antd.css';
import '../style/App.scss';
import locale from 'antd/es/date-picker/locale/zh_CN';
import * as moment from "moment";

const Text = function(props){
    return <div><span className="text">The current date is {props.date}</span></div>
}

export class helloWorld extends React.Component<any,any>{
    constructor(pros) {
        super(pros);
        this.state={date:""};
        this.onSelectDate = this.onSelectDate.bind(this);
    }

    onSelectDate(date: moment.MomentInput, dateString: string){
        this.setState((state,prop)=>({date:dateString}));
    }

    render() {
        return (
            <div>
                <DatePicker locale={locale} onChange={this.onSelectDate}/>
                <Text date={this.state.date}/>
            </div>);
    }
}