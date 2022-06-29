import React from "react";
import '../Historia/Historia.css';

import HistoriaRow from "./HistoriaRow";
import axios from "axios";

class Historia extends React.Component{

    constructor(props){
        super(props);
        this.state={
             notes : []
        };
    }

    componentDidMount(){
        this.fechHistoria();
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
      }

    async fechHistoria(){

      const res = await axios.get('http://46.41.151.63:3001/api/historia_short');
      const notes =[...res.data].filter(row=> row.kategoria === "Logowanie");;
     
      this.setState({notes});  
      }
  
      async   scrollToBottom () {
      /*  this.messagesEnd.scrollIntoView({ behavior: "smooth" }); */
        this.messagesEnd.scrollIntoView();
      }


render(){

    return (
        <div        >
            <p>Druk XL</p>

            {this.state.notes.map(row =>(
                        <HistoriaRow
                            key={row.id}
                            data={row.data}
                            user ={row.user}
                            id ={row.id}
                            kategoria={row.kategoria}

                        />
            ))}

<div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
            
        </div>
        
    );
}
}
export default Historia;