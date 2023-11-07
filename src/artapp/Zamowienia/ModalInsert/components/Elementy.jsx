import style from "./Elementy.module.css";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
import { useState } from "react";

export default function Elementy({ elementy,setElementy,handleChangeTask_elementyCard }) {

let index = 1;

  return (
    <>
      <div className={style.elementy}>
        
      {elementy.map((card) => ( {...card, index: index++}
         )).map(((card) => (
          <ElementCard key={card.id} index={index} card={card} elementy={elementy} setElementy={setElementy} handleChangeTask_elementyCard={handleChangeTask_elementyCard}></ElementCard>
        )))}

      </div>
    </>
  );
}

function ElementCard({ card,elementy,setElementy,handleChangeTask_elementyCard}) {
  return (
    <div className={style.elementCard}>
      <CardHeader card={card} elementy={elementy} setElementy={setElementy}/>
      <CardCenter card={card} setElementy={setElementy} handleChangeTask_elementyCard={handleChangeTask_elementyCard}/>
            
    </div>
  );
}


 function CardCenter  ({card,setElementy,handleChangeTask_elementyCard})  {
 const nakladHandler =(e)=>{
    console.log(e.target.value);
    handleChangeTask_elementyCard({...card, naklad: e.target.value,})
  }
  return(
    <div className={style.center}>
              <div className={style.col}>
                <label className={style.label}> Nakład</label>
                <input className={style.tytul} defaultValue={card.naklad} onChange={nakladHandler}></input>
              </div>
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

      <div className={style.typ}> {card.typ} {card.naklad} szt. </div>

      <div className={style.typ}>
        <img onClick={() => { dodaj() }} className={style.icon} src={iconCopy} alt="add" />
      </div>
    </div>
  )
}