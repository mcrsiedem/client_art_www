import React from "react";
import style from '../DrukPlan/DrukPlan.module.css';

import DrukPlanRow from "./DrukPlanRow";
import axios from "axios";
import DrukPlanRow_przerwa from "./DrukPlanRow_przerwa";
import Copy from "./Copy";

class DrukPlanXL extends React.Component{

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
    const res = await axios.get('http://46.41.151.63:3001/api/druk/H1/1');
    const notes =[...res.data]
                              .filter(row=> row.status !== "Sfalcowane")
                              .filter(row=> row.status !== "Oprawione")
                              .filter(row=> row.status !== "Oddane")
                              .filter(row=> row.status !== "Uszlachetnione")
                              .filter(row=> row.status !== "Nieaktywne")
                              .filter(row=> row.status !== "Wydrukowane");
                            
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
            <Copy/>
            <p>Druk XL</p>

            {this.state.notes.map(row =>(row.typ=='Przerwa' ? 
                        <DrukPlanRow_przerwa
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

                        /> :
                        <DrukPlanRow
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
export default DrukPlanXL;