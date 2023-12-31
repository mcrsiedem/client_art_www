import React from "react";
import '../Druk/Druk.css';

import DrukRow from "./DrukRow";
import axios from "axios";
import {ip} from "../../Host";


class XL extends React.Component{

    constructor(props){
        super(props);
        this.state={
             notes : []
        };
    }

    componentDidMount(){
        this.fechXL();
    }

    async fechXL(){
    const res = await axios.get(ip + 'druk/XL/1');
    const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
                              .filter(row=> row.status !== "Nowe")
                              .filter(row=> row.status !== "Pliki")
                              .filter(row=> row.status !== "Akcept")
                              .filter(row=> row.status !== "Sfalcowane")
                              .filter(row=> row.status !== "Falcowanie")
                              .filter(row=> row.status !== "Oprawione")
                              .filter(row=> row.status !== "Oddane")
                              .filter(row=> row.status !== "Uszlachetnione")
                              .filter(row=> row.status !== "Nieaktywne")
                              .filter(row=> row.typ !== "Przerwa");
    this.setState({notes});  
    }
    async updateDruk(id){
       
        
        const res = await axios.put(ip + 'produkty', { id: id, kolumna: 'Nazwa', value:'Wydrukowane'});
        console.log('wydrukowane',res.data.serverStatus);
        document.getElementById(id).className = 'wydrukowane';

    }

    async updateDrukNiewydrukowane(id){
        const res = await axios.put(ip + 'produkty', { id: id, kolumna: 'Nazwa', value: '-'});
        console.log('niewydrukowane',res.data.serverStatus);
        document.getElementById(id).className = 'niewydrukowane';
    }

render(){

    return (
        <div className ="color-dark" >
        
            <p>Druk XL</p>

            {this.state.notes.map(row =>(
                        <DrukRow
                            key={row.id}
                            title={row.klient}
                            body ={row.praca}
                            id ={row.id}
                            updateDruk={()=>this.updateDruk(row.id)}
                            klient={row.klient}
                            nrZlecenia={row.nrZlecenia}
                            rokZlecenia={row.rokZlecenia}
                            nazwa={row.nazwa}
                            updateDrukNiewydrukowane={()=>this.updateDrukNiewydrukowane(row.id)}
                            typ={row.typ}
                            format={row.formatPapieru}

                        />
            ))}
        </div>
        
    );
}
}
export default XL;