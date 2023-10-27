
import React, { useEffect,useState } from "react";
import style from './Center.module.css'

import {_firma,_produkty,_klient,_zestawy,_elementy} from './components/api.jsx';
import Produkt from "./components/Produkt";
import Dane from "./components/Dane";
import Produkty from "./components/Produkty";


 export default function Center(){
    const [selected_firma, setSelected_firma] = useState(_firma[0].nazwa);
    const [klient, setKlient] = useState(_klient[0].firma);
    const [elementy, setElementy] = useState(_elementy);
    const [produkty, setProdukty] = useState(_produkty);
    const [zestawy, setZestawy] = useState(_zestawy);

    // const handleChange_firna = (firma) => {        setSelected_firma(firma);   };
    // const handleChange_klient = event => {        setKlient(event.target.value);      };

    return(<>
<div className={style.container}>
            <Dane   selected_firma={selected_firma} 
                    klient={klient}
                    setSelected_firma={(firma)=>setSelected_firma(firma)} 
                    setKlient={(kl)=>setKlient(kl)} 
                    />
            <Produkty _produkty={_produkty}/> 
   


            <div className={style.row3}>
          
                <div className={style.elementy}>
                        {_elementy.map(elem => (
                        <input key={elem.id} className={style.tytul} defaultValue={elem.typ}></input>
                        ))}
                </div>
         
            </div>

            <div className={style.row4}>

                <div className={style.zestawy}>
                        zestawy
                        {selected_firma} {klient}
                </div>
            </div>

    </div>
    </>
    );

}

