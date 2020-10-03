import * as React from 'react';

const useState = React.useState;

interface titleBarProps{
    name:string;
}

function TitleBar(props:titleBarProps){
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