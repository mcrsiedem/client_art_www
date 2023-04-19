import React from "react";
import '../Druk/Druk.css';

import Wydany_papier_row from "./Wydany_papier_row";
import axios from "axios";

class Wydany_papier extends React.Component{

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
    const res = await axios.get('http://46.41.151.63:3001/api/druk_papier/XL/1');
    const notes =[...res.data].filter(row=> row.typ !== "Przerwa");
    this.setState({notes});  
    }








    async updateDruk(id){
        const res = await axios.put('http://46.41.151.63:3001/api/updatePapierStanOneValue', { id: id, kolumna: 'czy_jest', value:'Przygotowany'});
        console.log('wydrukowane',res.data);
        document.getElementById(id).className = 'przygotowane';

    }

    async updateDrukNiewydrukowane(id){
        const res = await axios.put('http://46.41.151.63:3001/api/updatePapierStanOneValue', { id: id, kolumna: 'czy_jest', value: 'Wydany'});
        console.log('niewydrukowane',res.data);
        document.getElementById(id).className = 'niewydrukowane';
    }

render(){

    return (
        <div>
            <p>Druk XL</p>

            {this.state.notes.map(row =>(
                        <Wydany_papier_row
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
                            czy_jest={row.czy_jest}
                            poczatekDruku={row.poczatekDruku}
                            uwagi={row.uwagi}
                        />
            ))}






        </div>
    );
}
}
export default Wydany_papier;