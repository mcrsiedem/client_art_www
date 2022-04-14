import React,{useState} from "react";
import '../Papier/Papier.css';

import PapierRow from "./PapierRow";
import axios from "axios";
import Search from "./Search";

class Papier extends React.Component{

    constructor(props){
        super(props);
     
        this.state={
             notes : [],
             searchText: "",
             txt : "WSiP"
        };
      
        
    }

    componentDidMount(){
        this.fechPapier();
    }



    
    async fechPapier(){
        

    const res = await axios.get('http://46.41.151.63:3001/api/getPapierStan');
//     const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
//                               .filter(row=> row.status !== "Nowe")
//                               .filter(row=> row.status !== "Pliki")
//                               .filter(row=> row.status !== "Akcept")
//                               .filter(row=> row.status !== "Sfalcowane")
//                               .filter(row=> row.status !== "Oprawione")
//                               .filter(row=> row.status !== "Oddane")
//                               .filter(row=> row.status !== "Uszlachetnione")
//                               .filter(row=> row.status !== "Nieaktywne")
//                               .filter(row=> row.typ !== "Przerwa");
//    this.setState({notes});  

const notes =[...res.data].   filter(row=> row.typ !== "Przerwa");
   this.setState({notes}); 
 
    }
     
    

    async znajdz(txt2){


 console.log(txt2)
 this.setState({txt:txt2});

     
        }



    async updateDruk(id){
        const res = await axios.put('http://46.41.151.63:3001/api/updatePapierStanOneValue', { id: id, kolumna: 'czy_jest', value:'Jest'});
        console.log('wydrukowane',res.data);
        document.getElementById(id).className = 'wydrukowane';

    }

    async updateDrukNiewydrukowane(id){
        const res = await axios.put('http://46.41.151.63:3001/api/updatePapierStanOneValue', { id: id, kolumna: 'czy_jest', value: '-'});
        console.log('niewydrukowane',res.data);
        document.getElementById(id).className = 'niewydrukowane';
    }

render(){

  

    return (
  
        <div>
            <p>Papier</p>

            <input onInput={(event)=>this.znajdz(event.target.value)} type='text' placeholder="Szukaj..." />
      

        
            {this.state.notes.filter((row) => {
    if(this.state.txt === ""){
        return row;
    }
    else if(row.Klient.toLowerCase() && row.Praca.toLowerCase() 
            .includes(this.state.txt.toLowerCase())){
        return row

    }


    

}).map(row =>(
                        <PapierRow
                            key={row.id}

                            id ={row.id}
                            typ={row.typ}
                            nrZlecenia={row.NrZlecenia}
                            rokZlecenia={row.RokZlecenia}
                            klient={row.Klient}
                            praca={row.Praca}
                            formatpapier={row.FormatPapieru}
                            czy_jest={row.czy_jest}
                            
                            
                            updateDruk={()=>this.updateDruk(row.id)}
                            updateDrukNiewydrukowane={()=>this.updateDrukNiewydrukowane(row.id)}
                            
                        />
            ))}
        </div>
    );
}
}
export default Papier;