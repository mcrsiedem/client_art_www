import style from "./Elementy.module.css";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
import { useState } from "react";

export default function Elementy({ elementy,setElementy }) {

  function duplicate(){

  }

  return (
    <>
      <div className={style.elementy}>
        
     

        {elementy.map((row) => (
          <ElementCard key={row.id} row={row} ></ElementCard>
        ))}

     {/* {_elementy.map((element) => (
          <ElementKafel key={element.id} element={element} ></ElementKafel>
        ))}
        */}

      </div>
    </>
  );
}

function ElementCard({ row }) {
  return (
    <div className={style.elementCard}>

      <div className={style.header}>
        <div className={style.typ}>
            <img className={style.icon} src={iconTrash} alt="React Logo" /> 
        </div>

        <div className={style.typ}>{row.typ} 1000 szt.     </div>
                       
          <div className={style.typ}>
      <img className={style.icon} src={iconCopy} alt="React Logo" />
    </div>
      </div>

      <div className={style.center}>
        <div className={style.col}>
          <label className={style.label}> Wersja</label>
          <input className={style.tytul} defaultValue={row.nazwa}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Strony</label>
          <input className={style.tytul} defaultValue={row.ilosc_stron}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Format</label>
          <input className={style.tytul} defaultValue={row.format_x}></input>
          <input className={style.tytul} defaultValue={row.format_y}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Kolory</label>
          <input className={style.tytul} defaultValue={row.kolor_front}></input>
          <input className={style.tytul} defaultValue={row.kolor_back}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Papier</label>
          <input className={style.tytul} defaultValue={row.kolor_front}></input>
          <input className={style.tytul} defaultValue={row.kolor_back}></input>
        </div>
      </div>


    </div>
    
  );
}

