import style from "./Elementy.module.css";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
import { useState } from "react";

export default function Elementy({ elementy,setElementy }) {

let index = 1;

  return (
    <>
      <div className={style.elementy}>
        
      {elementy.map((card) => ( {...card, index: index++}
         )).map(((card) => (
          <ElementCard key={card.id} index={index} card={card} elementy={elementy} setElementy={setElementy}></ElementCard>
        )))}

        {/* {elementy.map((card) => (
          <ElementCard key={card.id} index={index} card={card} elementy={elementy} setElementy={setElementy}></ElementCard>
        ))}
   */}


      </div>
    </>
  );
}

function ElementCard({ card,elementy,setElementy}) {
  function usun(){
    console.log(card );
  }
  function dodaj(){
setElementy([...elementy,  {
  id: 5,
  typ: card.typ,
  nazwa: "EN",
  ilosc_stron: "2",
  kolor_front: "4",
  kolor_back: "4",
  format_x: "200",
  format_y: "290",
  papier_id: "Offset",
  gramatura: "110",
  wykonczenie: "",
  naklad: "1000",
  uszlachetnianie_id: ""
}]);
  }
  function dodaj2(){
    setElementy([...elementy,card]);
      }

  return (
    <div className={style.elementCard}>
      <div className={style.header}>
        <div className={style.typ}>
          <img onClick={()=>{usun()}} className={style.icon} src={iconTrash} alt="React Logo" />
        </div>

        <div className={style.typ}>{card.typ} 1000 szt. </div>

        <div className={style.typ}>
          <img onClick={()=>{dodaj2()}} className={style.icon} src={iconCopy} alt="React Logo" />
        </div>

      </div>

      <div className={style.center}>
        <div className={style.col}>
          <label className={style.label}> Wersja</label>
          <input className={style.tytul} defaultValue={card.nazwa}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Strony</label>
          <input
            className={style.tytul}
            defaultValue={card.ilosc_stron}
          ></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Format</label>
          <input className={style.tytul} defaultValue={card.format_x}></input>
          <input className={style.tytul} defaultValue={card.format_y}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Kolory</label>
          <input
            className={style.tytul}
            defaultValue={card.kolor_front}
          ></input>
          <input className={style.tytul} defaultValue={card.kolor_back}></input>
        </div>
        <div className={style.col}>
          <label className={style.label}> Papier</label>
          <input
            className={style.tytul}
            defaultValue={card.kolor_front}
          ></input>
          <input className={style.tytul} defaultValue={card.kolor_back}></input>
        </div>
      </div>
    </div>
  );
}

