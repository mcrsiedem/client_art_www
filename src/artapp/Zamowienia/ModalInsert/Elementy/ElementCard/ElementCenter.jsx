import style from "./ElementCenter.module.css"
import {  _papiery } from "../../api";
export default function CardCenter({ card, handleChangeCardElementy, selected_papier, setSelected_papier }) {
    const nakladHandler = (e) => { handleChangeCardElementy({ ...card, naklad: e.target.value }) }
    const nazwaHandler = (e) => { handleChangeCardElementy({ ...card, nazwa: e.target.value }) }
    const stronyHandler = (e) => { handleChangeCardElementy({ ...card, ilosc_stron: e.target.value }) }
    const formatXHandler = (e) => { handleChangeCardElementy({ ...card, format_x: e.target.value }) }
    const formatYHandler = (e) => { handleChangeCardElementy({ ...card, format_y: e.target.value }) }
    const kolorFrontHandler = (e) => { handleChangeCardElementy({ ...card, kolor_front: e.target.value }) }
    const kolorBackHandler = (e) => { handleChangeCardElementy({ ...card, kolor_back: e.target.value }) }
    const papierkHandler = (e) => { handleChangeCardElementy({ ...card, papier_id: e.target.value }) }
  
  
    return (
      <div className={style.center}>
        {/* <div className={style.row}>
          <Naklad card={card} nakladHandler={nakladHandler} />
          <Strony card={card} stronyHandler={stronyHandler} />
          <Wersja card={card} stronyHandler={nazwaHandler} />
        </div>
  
        <Format card={card} formatXHandler={formatXHandler} formatYHandler={formatYHandler} />
        <Kolory card={card} kolorFrontHandler={kolorFrontHandler} kolorBackHandler={kolorBackHandler} />
        <Papier card={card} selected_papier={selected_papier} setSelected_papier={setSelected_papier} papierkHandler={papierkHandler} />
        <Uszlachetnianie card={card} nakladHandler={nakladHandler} /> */}
        <div className={style.row}> id {card.id}  index: {card.index}</div>
      </div>);
  }
  
  function Uszlachetnianie({card,nakladHandler}){
    return(     <div className={style.col}>
      <label className={style.label}> Lakier</label>
      <input className={style.tytul} valueDefault={card.naklad} onChange={nakladHandler}></input>
    </div>);
  }
  
  function Papier({card,selected_papier,setSelected_papier,papierkHandler}){
    return(             <div className={style.col}>
      <label className={style.label}> Papier</label>
      <select
          className={style.select}
          valueDefault={selected_papier}
          onChange={papierkHandler}
        >
          {_papiery.map((option) => (
            <option key={option.id} value={option.id}>
            {option.nazwa} 
            </option>
          ))}
        </select>
        <div className={style.ilosckolorow}>
          <input className={style.tytul} valueDefault={card.wykonczenie}></input>
      <input className={style.tytul} valueDefault={card.gramatura}></input>
        </div>
      
    </div>);
  }
  
  function Naklad({card,nakladHandler}){
    return(     <div className={style.col}>
      <label className={style.label}> Nakład</label>
      <input className={style.tytul} defaultValue={card.naklad} onChange={nakladHandler}></input>
    </div>);
  }
  function Kolory({ card, kolorFrontHandler, kolorBackHandler }) {
    return (<div className={style.col}>
      <label className={style.label}> Kolory</label>
      <div className={style.ilosckolorow}>
        <input
          className={style.tytul}
          defaultValue={card.kolor_front}
          onChange={kolorFrontHandler}
        ></input>
        <input className={style.tytul} defaultValue={card.kolor_back} onChange={kolorBackHandler}></input>
      </div>
  
    </div>);
  }
  
  function Format({card,formatXHandler,formatYHandler}){
    return(              <div className={style.col}>
      <label className={style.label}> Format</label>
      <div className={style.ilosckolorow}>
            <input className={style.tytul} onChange={formatXHandler} defaultValue={card.format_x}></input>
      <input className={style.tytul} onChange={formatYHandler} defaultValue={card.format_y}></input>
      </div>
  
    </div>);
  }
  
  function Strony({ card, stronyHandler }) {
    return (     <div className={style.col}>
      <label className={style.label}> Strony</label>
      <input className={style.tytul} onChange={stronyHandler} defaultValue={card.ilosc_stron}></input>
    </div>);
  }
  
  function Wersja({ card, nazwaHandler }) {
    return (     <div className={style.col}>
      <label className={style.label}> Wersja</label>
      <input className={style.tytul} onChange={nazwaHandler} defaultValue={card.nazwa}></input>
    </div>);
  }