import React from "react";
import style from '../artapp/Row.module.css';
import Searchbar from "./Searchbar";
function Row(props){

    function ChceckStatus(props) {
    
        if (props.status==='Wydrukowane') return style.wydrukowane;
        if (props.status==='RIP' ^ props.status==='Zaświecone' ) return style.ripzaswiecone;
        if (props.status==='Akcept' ) return style.akcept;
        
        return style.body;
    }


    return (

        <div className={ChceckStatus(props) +' '+ style.body}>
        <p >  {props.poczatekDruku} {props.czasDruku} {props.koniecDruku} {props.nrZlecenia} {props.rokZlecenia}   {props.title} {props.body}   {props.typ}  {props.status}</p> 
        </div>
);
}

export default Row;