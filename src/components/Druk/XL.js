import React from "react";
import '../Druk/Druk.css';
import DrukRow from "../Druk/DrukRow";
import DrukRow2 from "../Druk/DrukRow2";
import axios from "axios";

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
    const res = await axios.get('http://46.41.151.63:3001/api/druk/XL');
    const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
                              .filter(row=> row.status !== "Nowe")
                              .filter(row=> row.status !== "Pliki")
                              .filter(row=> row.status !== "Sfalcowane")
                              .filter(row=> row.status !== "Oprawione")
                              .filter(row=> row.status !== "Oddane")
                              .filter(row=> row.status !== "Uszlachetnione")
                              .filter(row=> row.typ !== "Przerwa");
    this.setState({notes});  
    }
    async updateDruk(id){
       // console.log('usuwanie notatki',id);
        //const notes =[...this.state.notes].filter(note=> note.id !== id)
// const index = notes.findIndex(x => x.id === id)
//         notes[index]
        const res = await axios.put('http://46.41.151.63:3001/api/produkty', { id: id, kolumna: 'Nazwa', value:'Wydrukowane'});
        console.log('wydrukowane',res.data.changedRows);
       // this.setState({notes});
    }

render(){

    return (
        <div>
            <p>Druk XL</p>

            {this.state.notes.map(row =>(
                        <DrukRow2
                            key={row.id}
                            title={row.klient}
                            body ={row.praca}
                            id ={row.id}
                            updateDruk={()=>this.updateDruk(row.id)}
                            klient={row.klient}
                            nrZlecenia={row.nrZlecenia}
                            rokZlecenia={row.rokZlecenia}
                            nazwa={row.nazwa}
                        />
            ))}
        </div>
    );
}
}
export default XL;