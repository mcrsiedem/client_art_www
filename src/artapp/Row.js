import React from "react";
import style from '../artapp/Row.module.css';
import Searchbar from "./Searchbar";
function Row(props){

    const status = props.status;
    const czas = props.czasDruku;
    const typ = props.typ;


    function ChceckStatus(status) {
    // ustawwia styl css w zależności od statusu
        // if (typ==='Przerwa' ) return style.ripzaswiecone;
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

    function YearFormatter(czas) {
        // zamienia czas podnay w minutach na hh:mm
    
            return '20'+czas.substring(2)
        }



    return (

        <div id='row' className={ChceckStatus(status) +' '+ style.body}>
            <div className={style.checbox} >
                <input className={style.checboxinput}  type="checkbox" id="" name="" value=""/>
            </div>

            <div className={style.druk}>
                <div className={style.klient} >{props.poczatekDruku}</div>
                <div className={style.koniecdruku}> {props.koniecDruku}  </div>
            </div>
            
            <div className={style.czas} > {TimeFormatter(czas)} </div>
            
            <div>
                <div className={style.klient} >{props.nrZlecenia} </div>
                <div>{props.rokZlecenia} </div>
            </div>
            
            <div>
                <div><div className={style.klient} >{props.title} </div>{props.body}</div>
                
            </div>
            
            
            <div>{props.status} </div> 
        </div>

);
}

export default Row;