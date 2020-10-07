import * as React from 'react';
import {Button} from 'antd';

const useState = React.useState;

interface titleBarProps{
    name:string;
}

function TitleBar(props?:titleBarProps){
    const[state,setState] = useState({name:"Visitor"});

    if(props.name==="dragonhyh123"){
        setState({name:"Administrator"})
    }

    return(
        <div>
            Hello {this.state.name}
        </div>
    );
}

export class Board extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event){
        this.props.history.goBack();
    }

    render() {
        // return(<TitleBar name={"dragonhyh123"}/>);
        return <div>
                 <h1>{this.props.match.params.text}</h1>
                 <Button onClick={this.onClick}>test</Button>
               </div>;
    }
}