
import React, { useEffect,useState } from "react";
import style from './Center.module.css'

import {_firma} from './_firma.jsx';
import {_klient} from './_klient.jsx';
import {_elementy} from './_elementy.jsx';
import {_produkty} from './_produkty.jsx';
import {_zestawy} from './_zestawy';

import Produkt from "./Produkt";


 export default function Center(){
    const [selected_firma, setSelected_firma] = useState(_firma[0].nazwa);
    const [klient, setKlient] = useState(_klient[0].firma);
    const [elementy, setElementy] = useState(_elementy);
    const [produkty, setProdukty] = useState(_produkty);
    const [zestawy, setZestawy] = useState(_zestawy);

    const handleChange_firna = event => {
        console.log(event.target.value);
        setSelected_firma(event.target.value);
      };
      const handleChange_klient = event => {
        console.log(event.target.value);
        setKlient(event.target.value);
      };
    return(<>
<div className={style.container}>
            <div className={style.row1}>
                      
                         
                                <div className={style.col}>
                                    <label className={style.label}> Firma   </label>
                                        <select className={style.firma} value={selected_firma} onChange={handleChange_firna}>
                                            {_firma.map(option => (
                                                <option key={option.id} value={option.nazwa}>
                                                    {option.nazwa}
                                                </option>
                                            ))}
                                        </select>
                                </div>
                              

                                <div className={style.col}>
                                <label className={style.label}> Klient    </label>
                                    <select className={style.klient} value={klient} onChange={handleChange_klient}>
                                        {_klient.map(option => (
                                            <option key={option.id} value={option.firma}>
                                                {option.firma}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                            

                            <div className={style.col}>
                            <label className={style.label}> Tytuł   </label>
                                <input className={style.tytul} value="Tytuł" type="text" />
                        </div>
                        

                        <div className={style.col}>
                            <label className={style.label}> Data materiałów   </label>
                                <input className={style.data} type="date"></input>
                        </div>
                

                        <div className={style.col}>
                            <label className={style.label}> Data spedycji   </label>
                                <input className={style.data} type="date"></input>
                        </div>
     
            </div>

            <div className={style.row2}>
                <div className={style.produkty}>
                        {_produkty.map(prod => (
                                <Produkt key={prod.id}></Produkt>
                        ))}
                </div>
   
            </div>


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
                </div>
            </div>

    </div>
    </>
    );

}

