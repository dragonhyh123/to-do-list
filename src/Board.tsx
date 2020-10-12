import * as React from 'react';

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
    }

    render() {
        // return(<TitleBar name={"dragonhyh123"}/>);

        //webpack创建了一个全局变量process.env.NODE_ENV,用来区分不同的状态，同时可以在程序中区分程序状态
        if(process.env.NODE_ENV==='development'){
            console.log("this is development")
        }else if(process.env.NODE_ENV==='production'){
            console.log("this is production")
        }
        return <div>
                 <h1>{this.props.match.params.text}</h1>
               </div>;
    }
}