import React from "react";
import '../Falc/Falc.css';

import FalcRow from "./FalcRow";
import axios from "axios";

class Falc extends React.Component{

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
<<<<<<< HEAD
      //  const res = await axios.get('http://46.41.151.63:3001/api/falcowanie');
    const res = await axios.get('http://localhost:3001/api/falcowanie');
    const notes =[...res.data].filter(row=> row.status === "Wydrukowane" || row.status === "Sfalcowane" || row.status === "W trakcie falcowania...");
=======
        const res = await axios.get('http://46.41.151.63:3001/api/falcowanie');
    //const res = await axios.get('http://localhost:3001/api/falcowanie');
    const notes =[...res.data].filter(row=> row.status === "Wydrukowane" || row.status === "Sfalcowane");
>>>>>>> 232ef1a8ca29ad30df1208d62a0086edce009635
    this.setState({notes});  
    }
    async updateDruk(id){
     
<<<<<<< HEAD
       const res = await axios.put('http://localhost:3001/api/produkty', { id: id, kolumna: 'Status', value:'Sfalcowane'});
        console.log('wydrukowane',res.data);
=======
       const res = await axios.put('http://46.41.151.63:3001/api/updateProduktyStatusFalcowanie', { id: id, kolumna: 'Status', value:'Sfalcowane'});
        console.log('wydrukowane',res.data.changedRows);
        if(res.data.changedRows===0 ){
            document.getElementById(id+"x").remove();
        }else{
>>>>>>> 232ef1a8ca29ad30df1208d62a0086edce009635
        document.getElementById(id).className = 'wydrukowane';
    }

    }
    async updateWtrakcie(id){
     
        const res = await axios.put('http://localhost:3001/api/produkty', { id: id, kolumna: 'Status', value:'W trakcie falcowania...'});
         console.log('wydrukowane',res.data);
         document.getElementById(id).className = 'wydrukowane';
 
     }

    async updateDrukNiewydrukowane(id){

<<<<<<< HEAD
       const res = await axios.put('http://localhost:3001/api/produkty', { id: id, kolumna: 'Status', value: 'Wydrukowane'});
        console.log('niewydrukowane',res.data);
=======
       const res = await axios.put('http://46.41.151.63:3001/api/produkty', { id: id, kolumna: 'Status', value: 'Wydrukowane'});
        console.log('niewydrukowane',res.data.changedRows);
>>>>>>> 232ef1a8ca29ad30df1208d62a0086edce009635
        document.getElementById(id).className = 'niewydrukowane';
    }

render(){

    return (
        <div>
            <p>Druk XL</p>

            {this.state.notes.map(row =>(
                        <FalcRow
                            key={row.id}
                            title={row.klient}
                            body ={row.praca}
                            id ={row.id}
                            updateDruk={()=>this.updateDruk(row.id)}
                            klient={row.klient}
                            nrZlecenia={row.nrZlecenia}
                            rokZlecenia={row.rokZlecenia}
                            status={row.status}
                            updateDrukNiewydrukowane={()=>this.updateDrukNiewydrukowane(row.id)}
                            typ={row.typ}
                            wtrakcie={()=>this.updateWtrakcie(row.id)}
                        />
            ))}
        </div>
    );
}
}
export default Falc;