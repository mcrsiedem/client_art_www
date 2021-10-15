import React,{useState} from "react";

function DrukRow(props){

    const[showDesc,setShowDesc] = useState(false);
    const toggleDesc = ()=>{
        //zmiana setShowDesc na odwrotność aktualnego stanu
        setShowDesc(!showDesc);
    }



  const handleToggle = () => {

    document.getElementById(props.id).className = 'wydrukowane';
    props.updateDruk(props.id);
    
  }
    

    return (
       // <div className ="note"></div>
    <div className ="note">
        {/* <p onClick={toggleDesc}>{props.title}</p>      */}
        <p onClick={toggleDesc}> {props.nrZlecenia} {props.rokZlecenia}   {props.title}</p> 
        {showDesc &&
                (
                <div className ="description">{props.body}</div>
                )}
        <button id={props.id} className = {props.nazwa==='Wydrukowane' ? 'wydrukowane':'niewydrukowane'} onClick={ ()=>props.updateDruk(props.id), handleToggle }>Wydrukowane</button>

        {/* <button 
            className="delete" 
            onClick={()=>props.onDelete(props.id)}>usuń</button> */}

    </div>
    

    );

  
}

export default DrukRow;