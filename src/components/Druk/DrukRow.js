import React,{useState,useEffect} from "react";

function DrukRow(props){

    const[showDesc,setShowDesc] = useState(false);
    const toggleDesc = ()=>{
        //zmiana setShowDesc na odwrotność aktualnego stanu
        setShowDesc(!showDesc);
    }

    const[showMinus,setShowMinus] = useState(true);
    const toggleMinus = ()=>{
        //zmiana setShowDesc na odwrotność aktualnego stanu
        console.log('true');
        setShowMinus(!showMinus);
        

    }



  const handleSend = () => {
    props.updateDruk(props.id) 
    console.log('OK');
  }

    

    return (

      
       // <div className ="note"></div>
    <div className ="note" >
     
        {/* <p onClick={toggleDesc}>{props.title}</p>      */}
        <p onClick={toggleDesc}> {props.nrZlecenia} {props.rokZlecenia}   {props.title}</p> 
        {showDesc &&
                (
                <div className ="description">{props.body}</div>
                )}
        <button id={props.id} className = {props.nazwa==='Wydrukowane' ? 'wydrukowane':'niewydrukowane'} onClick={ handleSend}>Wydrukowane</button>

        

         {showMinus &&
                (
                  <button className="delete" onClick={()=>props.updateDrukNiewydrukowane(props.id)}>-</button>
                )}

       {/* <button className="delete" onClick={()=>props.updateDrukNiewydrukowane(props.id)}>-</button> */}

    </div>
    

    );

  
}

export default DrukRow;