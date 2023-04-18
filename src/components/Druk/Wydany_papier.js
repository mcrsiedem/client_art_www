import React from "react";
import '../Druk/Druk.css';

import Wydany_papier_row from "./Wydany_papier_row";
import axios from "axios";

class Wydany_papier extends React.Component{

    constructor(props){
        super(props);
        this.state={
             notes : [],
             notes2 : [],
             notes3 : []
        };
    }

    componentDidMount(){
        this.fechXL();
        this.fechXL2();
        this.fechXL3();
    }

    async fechXL(){
    const res = await axios.get('http://46.41.151.63:3001/api/druk/XL/1');
    const notes =[...res.data].filter(row=> row.czy_jest == "Wydany" || row.czy_jest == "Przygotowany")
                               .filter(row=> row.status !== "Wydrukowane")
                               .filter(row=> row.status !== "Sfalcowane")
                               .filter(row=> row.status !== "Falcowanie")
                               .filter(row=> row.status !== "Oprawione")
                              .filter(row=> row.status !== "Oddane")
                               .filter(row=> row.status !== "Uszlachetnione")
                               .filter(row=> row.status !== "Nieaktywne")
                               .filter(row=> row.typ !== "Przerwa");
    this.setState({notes});  
    }

    async fechXL2(){
        const res = await axios.get('http://46.41.151.63:3001/api/druk/H1/1');
        const notes2 =[...res.data].filter(row=> row.czy_jest == "Wydany" || row.czy_jest == "Przygotowany")
                                   .filter(row=> row.status !== "Wydrukowane")
                                   .filter(row=> row.status !== "Sfalcowane")
                                   .filter(row=> row.status !== "Falcowanie")
                                   .filter(row=> row.status !== "Oprawione")
                                  .filter(row=> row.status !== "Oddane")
                                   .filter(row=> row.status !== "Uszlachetnione")
                                   .filter(row=> row.status !== "Nieaktywne")
                                   .filter(row=> row.typ !== "Przerwa");
        this.setState({notes2});  
        }

        async fechXL3(){
            const res = await axios.get('http://46.41.151.63:3001/api/druk/H3/1');
            const notes3 =[...res.data].filter(row=> row.czy_jest == "Wydany" || row.czy_jest == "Przygotowany")
                                       .filter(row=> row.status !== "Wydrukowane")
                                       .filter(row=> row.status !== "Sfalcowane")
                                       .filter(row=> row.status !== "Falcowanie")
                                       .filter(row=> row.status !== "Oprawione")
                                      .filter(row=> row.status !== "Oddane")
                                       .filter(row=> row.status !== "Uszlachetnione")
                                       .filter(row=> row.status !== "Nieaktywne")
                                       .filter(row=> row.typ !== "Przerwa");
            this.setState({notes3});  
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
                        />
            ))}

{this.state.notes2.map(row =>(
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
                        />
            ))}

{this.state.notes3.map(row =>(
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
                        />
            ))}


        </div>
    );
}
}
export default Wydany_papier;