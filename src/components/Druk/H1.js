import React from "react";
import '../Druk/Druk.css';

import DrukRow from "./DrukRow";

import axios from "axios";

class H1 extends React.Component{

    constructor(props){
        super(props);
        this.state={
             notes : []
        };
    }

    componentDidMount(){
        this.fechDruk();
    }

    async fechDruk(){
    const res = await axios.get('http://46.41.151.63:3001/api/druk/H1/1');
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
        const res = await axios.put('http://46.41.151.63:3001/api/produkty', { id: id, kolumna: 'Nazwa', value:'Wydrukowane'});
        console.log('wydrukowane',res.data);
        document.getElementById(id).className = 'wydrukowane';
    }

    async updateDrukNiewydrukowane(id){
        const res = await axios.put('http://46.41.151.63:3001/api/produkty', { id: id, kolumna: 'Nazwa', value: '-'});
        console.log('niewydrukowane',res.data);
        document.getElementById(id).className = 'niewydrukowane';
    }

render(){

    return (
        <div>
            <p>Druk H1</p>

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
                        />
            ))}
        </div>
    );
}
}
export default H1;