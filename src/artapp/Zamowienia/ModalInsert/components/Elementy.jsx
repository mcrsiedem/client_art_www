import style from "./Elementy.module.css";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
import { useState } from "react";

export default function Elementy({ elementy,setElementy,handleChangeCardElementy }) {

let index = 1;

  return (
    <>
      <div className={style.elementy}>
        
      {elementy.map((card) => ( {...card, index: index++}
         )).map(((card) => (
          <ElementCard key={card.id} index={index} card={card} elementy={elementy} setElementy={setElementy} handleChangeCardElementy={handleChangeCardElementy}></ElementCard>
        )))}

      </div>
    </>
  );
}

function ElementCard({ card,elementy,setElementy,handleChangeCardElementy}) {
  return (
    <div className={style.elementCard}>
      <CardHeader card={card} elementy={elementy} setElementy={setElementy}/>
      <CardCenter card={card} setElementy={setElementy} handleChangeCardElementy={handleChangeCardElementy}/>
    </div>
  );
}


 function CardCenter  ({card,handleChangeCardElementy})  {
 const nakladHandler =(e)=>{handleChangeCardElementy({...card, naklad: e.target.value})   }
 const nazwaHandler = (e)=>{handleChangeCardElementy({...card, nazwa: e.target.value})  }
 const stronyHandler = (e)=>{handleChangeCardElementy({...card, ilosc_stron: e.target.value})  }
 const formatXHandler = (e)=>{handleChangeCardElementy({...card, format_x: e.target.value})  }
 const formatYHandler = (e)=>{handleChangeCardElementy({...card, format_y: e.target.value})  }
 const kolorFrontHandler = (e)=>{handleChangeCardElementy({...card, kolor_front: e.target.value})  }
 const kolorBackHandler = (e)=>{handleChangeCardElementy({...card, kolor_back: e.target.value})  }
  return(
    <div className={style.center}>
              <div className={style.col}>
                <label className={style.label}> Nakład</label>
                <input className={style.tytul} defaultValue={card.naklad} onChange={nakladHandler}></input>
              </div>
              <div className={style.col}>
                <label className={style.label}> Wersja</label>
                <input className={style.tytul} defaultValue={card.nazwa} onChange={nazwaHandler}></input>
              </div>
              <div className={style.col}>
                <label className={style.label}> Strony</label>
                <input className={style.tytul} onChange={stronyHandler} defaultValue={card.ilosc_stron}></input>
              </div>
              <div className={style.col}>
                <label className={style.label}> Format</label>
                <input className={style.tytul} onChange={formatXHandler} defaultValue={card.format_x}></input>
                <input className={style.tytul} onChange={formatYHandler} defaultValue={card.format_y}></input>
              </div>
              <div className={style.col}>
                <label className={style.label}> Kolory</label>
                <input
                  className={style.tytul}
                  defaultValue={card.kolor_front}
                  onChange={kolorFrontHandler}
                ></input>
                <input className={style.tytul} defaultValue={card.kolor_back} onChange={kolorBackHandler}></input>
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
  );
}



function CardHeader({ card, elementy, setElementy }) {
  const handleRemoveItem = id => {
    if (elementy.length !== 1) {
      setElementy(elementy.filter(x => x.id !== id))
    }
  }

  function dodaj() {
    setElementy([...elementy, card]);
  }

  return (
    <div className={style.header}>
      <div className={style.typ}>
        <img onClick={() => { handleRemoveItem(card.id) }} className={style.icon} src={iconTrash} alt="delete" />
      </div>

      <div className={style.typ}> {card.typ} {card.naklad} szt.</div>

      <div className={style.typ}>
        <img onClick={() => { dodaj() }} className={style.icon} src={iconCopy} alt="add" />
      </div>
    </div>
  )
}