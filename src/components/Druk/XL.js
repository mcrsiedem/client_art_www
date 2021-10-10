import React from "react";
import '../Druk/Druk.css';
import DrukRow from "../Druk/DrukRow";
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
    const res = await axios.get('http://46.41.151.63:3001/api/druk/H3');
    const notes =[...res.data].filter(row=> row.status !== "Wydrukowane").filter(row=> row.status !== "Nowe")
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
                        />
            ))}
        </div>
    );
}
}
export default XL;