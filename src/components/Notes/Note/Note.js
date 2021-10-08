import React,{useState} from "react";

function Note(props){

    const[showDesc,setShowDesc] = useState(false);
    const toggleDesc = ()=>{
        //zmiana setShowDesc na odwrotność aktualnego stanu
        setShowDesc(!showDesc);
    }

    return (
    <div className ="note">
        {/* <p onClick={toggleDesc}>{props.title}</p>      */}
        <p onClick={toggleDesc}>{props.nrZlecenia} {props.rokZlecenia}   {props.title}</p> 
        {showDesc &&
                (
                <div className ="description">{props.body}</div>
                )}
        <button>zrobione</button>

        {/* <button 
            className="delete" 
            onClick={()=>props.onDelete(props.id)}>usuń</button> */}

    </div>
    

    );
}

export default Note;