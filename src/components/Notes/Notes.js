import React from "react";
import './Notes.css';
import Note from "./Note/Note";
import NewNote from "./NewNote/NewNote";
import axios from "axios";


class Notes extends React.Component{

    constructor(props){
        super(props);

        this.state={
             notes : []
        };
    }

    componentDidMount(){
        // this.fechNotes();
        this.fechOkladki();

    }

    async fechNotes(){
        //const res = await axios.get('http://46.41.151.63:3001/api/notes');
      //  const res = await axios.get('http://192.168.0.195:3001/api/notes');
        // const notes = res.data;
        // this.setState({notes});  
    }

    async fechOkladki(){
   // const res = await axios.get('http://46.41.151.63:3001/api/okladki/All');
      const res = await axios.get('http://localhost:3001/api/okladki/All');
        const notes = res.data;
        this.setState({notes});  
      
    }

    deleteNote(id){
        console.log('usuwanie notatki',id);
        const notes =[...this.state.notes].filter(note=> note.id !== id)
        this.setState({notes});
    }

    addNote(note){
        const notes =[...this.state.notes];
        notes.push(note);
        this.setState({notes});
    }




render(){

    
    return (
        <div>
            <p>Okładki</p>


            {/* <NewNote
            onAdd= {(note)=> this.addNote(note)}
            /> */}


            {this.state.notes.map(note =>(
                        <Note
                            key={note.id}
                            title={note.klient}
                            body ={note.praca}
                            id ={note.id}
                            onDelete={()=>this.deleteNote(note.id)}
                            klient={note.klient}

                        />
            ))}
       

        </div>
    );
}
}

export default Notes;