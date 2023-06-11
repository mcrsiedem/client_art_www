import React, {Component,useEffect, useState,forwardRef,useImperativeHandle} from "react";
import Row from "./Row";
import style from '../artapp/Jobs.module.css';
import axios from "axios";
import {ip} from "../Host";



const Jobs = forwardRef((props,ref)=> {

    const [notes,setNotes] = useState([]);
    

    useImperativeHandle(ref, () =>({
        
        callChildFunction(maszyna){
            fechDruk(maszyna);
        }

    }));


    async function fechDruk(maszyna){
        const res = await axios.get(ip + 'druk/'+maszyna+'/1');
        const job =[...res.data];
        // const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
        //                           .filter(row=> row.status !== "Nowe")
        //                           .filter(row=> row.status !== "Pliki")
        //                           .filter(row=> row.status !== "Akcept")
        //                           .filter(row=> row.status !== "Sfalcowane")
        //                           .filter(row=> row.status !== "Falcowanie")
        //                           .filter(row=> row.status !== "Oprawione")
        //                           .filter(row=> row.status !== "Oddane")
        //                           .filter(row=> row.status !== "Uszlachetnione")
        //                           .filter(row=> row.status !== "Nieaktywne")
        //                           .filter(row=> row.typ !== "Przerwa");
        setNotes(job);  
       console.log('notes '+ job);
        };


        useEffect(()=>{
            fechDruk('XL');
          
        },[]);

    return (

        <div className={style.center}>
        <div className={style.body}>

          { notes.map((row) =>{
            return (
                    <Row
                        key={row.id}
                        title={row.klient}
                        body ={row.praca}
                        poczatekDruku={row.poczatekDruku}
                        czasDruku={row.czasDruku}
                        koniecDruku={row.koniecDruku}
                        id ={row.id}
                        // updateDruk={()=>this.updateDruk(row.id)}
                        klient={row.klient}
                        nrZlecenia={row.nrZlecenia}
                        rokZlecenia={row.rokZlecenia}
                        nazwa={row.nazwa}
                        // updateDrukNiewydrukowane={()=>this.updateDrukNiewydrukowane(row.id)}
                        typ={row.typ}
                        format={row.formatPapieru}
                        status={row.status}

            />
            );
                
          })}



        </div>
        </div>
    );
}

)
export default Jobs;