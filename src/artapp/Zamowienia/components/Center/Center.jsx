
import React, { useEffect,useState } from "react";
import style from './Center.module.css'

import {_firma} from './_firma.jsx';
import {_klient} from './_klient.jsx';
import {_elementy} from './_elementy.jsx';
import {_produkty} from './_produkty.jsx';
import {_zestawy} from './_zestawy';

import Produkt from "./produkt/Produkt";


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
                      
                         
                                <label className={style.label}> Firma
                                    <select className={style.klient} value={selected_firma} onChange={handleChange_firna}>
                                        {_firma.map(option => (
                                            <option key={option.id} value={option.nazwa}>
                                                {option.nazwa}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                            <label className={style.label}> Klient           
                                <select className={style.klient} value={klient} onChange={handleChange_klient}>
                                    {_klient.map(option => (
                                        <option key={option.id} value={option.firma}>
                                            {option.firma}
                                        </option>
                                    ))}
                                </select>
                            </label>

                        <label className={style.label}> Tytuł     
                            <input className={style.tytul} value="Tytuł" type="text" />
                        </label>

                        <label className={style.label}> Data materiałów     
                            <input className={style.data} type="date"></input>
                        </label>

                        <label className={style.label}> Data spedycji   
                            <input className={style.data} type="date"></input>
                        </label>
            </div>

            <div className={style.row2}>
                <div className={style.produkty}>
                        {_produkty.map(prod => (
                                <Produkt key={prod.id}></Produkt>
                        ))}
                </div>
                <div className={style.elementy}>
                        {_elementy.map(elem => (
                        <input key={elem.id} className={style.tytul} defaultValue={elem.typ}></input>
                        ))}
                </div>
                <div className={style.zestawy}>
                        zestawy
                </div>
            </div>

    </div>
    </>
    );

}

