import style from "./Elementy.module.css";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
import { useState } from "react";

export default function Elementy({ _elementy }) {

  function duplicate(){

  }

  return (
    <>
      <div className={style.elementy}>
        
     

        {_elementy.map((element) => (
          <ElementKafel key={element.id} element={element} ></ElementKafel>
        ))}

     {/* {_elementy.map((element) => (
          <ElementKafel key={element.id} element={element} ></ElementKafel>
        ))}
        */}

      </div>
    </>
  );
}

function ElementKafel({ element }) {
  return (
    <div className={style.elementKafel}>

      <div className={style.header}>
        <div className={style.typ}>
            <img className={style.icon} src={iconTrash} alt="React Logo" /> 
        </div>

        <div className={style.typ}>{element.typ} 1000 szt.     </div>
                       
          <div className={style.typ}>
      <img className={style.icon} src={iconCopy} alt="React Logo" />
    </div>
      </div>

      <div className={style.center}>
        <div className={style.col}>
          <label className={style.label}> Wersja</label>
          <input className={style.tytul} defaultValue={element.nazwa}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Strony</label>
          <input className={style.tytul} defaultValue={element.ilosc_stron}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Format</label>
          <input className={style.tytul} defaultValue={element.format_x}></input>
          <input className={style.tytul} defaultValue={element.format_y}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Kolory</label>
          <input className={style.tytul} defaultValue={element.kolor_front}></input>
          <input className={style.tytul} defaultValue={element.kolor_back}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Papier</label>
          <input className={style.tytul} defaultValue={element.kolor_front}></input>
          <input className={style.tytul} defaultValue={element.kolor_back}></input>
        </div>
      </div>


    </div>
    
  );
}

function Element({ element }) {
  return (
    <div className={style.element}>


      <div className={style.col}>
              <label className={style.label}> Typ</label>
              <input className={style.tytul} defaultValue={element.typ}></input>
            </div>
            <div className={style.col}>
              <label className={style.label}> Nakład</label>
              <input  defaultValue={element.naklad} type="text" className={style.produkt}/>
            </div>

      <div className={style.col}>
              <label className={style.label}> Wersja</label>
              <input  defaultValue={element.nazwa} type="text" className={style.produkt}/>
            </div>

            <div className={style.col}>
              <label className={style.label}> Strony</label>
              <input  defaultValue={element.ilosc_stron} type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Netto X</label>
              <input  defaultValue={element.format_x} type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Netto Y</label>
              <input  defaultValue={element.format_y}  type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Kolory </label>
              <input  defaultValue="4" type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Kolory </label>
              <input  defaultValue="4" type="text" className={style.produkt}/>
            </div>


    </div>
    
  );
}