import React from "react";
import style from '../artapp/Row.module.css';
import Searchbar from "./Searchbar";
function Row(props){

    const status = props.status;
    const czas = props.czasDruku;
    const typ = props.typ;


    function ChceckStatus(status) {
    // ustawwia styl css w zależności od statusu
        if (typ==='Przerwa' ) return style.ripzaswiecone;
        if (status==='Wydrukowane' ^ status==='Sfalcowane' ^ status==='Falcowanie') return style.wydrukowane;
        if (status==='RIP' ^ status==='Zaświecone' ) return style.ripzaswiecone;
        if (status==='Akcept' ) return style.akcept;
        if (status==='Nowe' ) return style.nowe;
        if (status==='Pliki' ) return style.pliki;
        return style.body;
    }

    function TimeFormatter(czas) {
    // zamienia czas podnay w minutach na hh:mm

       let minuty = czas%60;
       let godziny = Math.round(czas/60);

       if (godziny<10)  godziny = '0'+godziny;        
       if (minuty<10)   minuty = '0'+minuty;
       
        return godziny +':'+ minuty;
    }


    return (

        <div className={ChceckStatus(status) +' '+ style.body}>
        <p >  {props.poczatekDruku} {TimeFormatter(czas)} {props.koniecDruku} <p> </p> {props.nrZlecenia} {props.rokZlecenia}   {props.title} {props.body}   {props.typ}  {props.status}</p> 
        </div>
);
}

export default Row;