import { useContext, useRef, useState } from "react";
import style from "./Szukaj.module.css";
import { AppContext } from "context/AppContext";
import iconClose2 from "assets/x2.svg";
import iconSzukaj from "assets/szukaj_green.svg";
import { TechnologyContext } from "context/TechnologyContext";

export default function Szukaj() {
  const contextApp = useContext(AppContext);
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
  const setZamowienia = contextApp.setZamowienia;

  const techContext = useContext(TechnologyContext);
  const grupyOprawaAllWyszukiwarka = techContext.grupyOprawaAllWyszukiwarka;
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;

   const setGrupWykonanAll = techContext.setGrupWykonanAll;
    const grupyWykonanAllWyszukiwarka = techContext.grupyWykonanAllWyszukiwarka;

  const inputRef = useRef(null);
  return (
    <div className={style.main}>
      <img className={style.icon2} src={iconSzukaj} alt="React Logo" />
      <input
        ref={inputRef}
        className={style.szukajInput}
        type="text"
        title="Znajdź tytuł pracy..."
        placeholder=""
        onChange={(event) => {
        
          let m = grupyOprawaAllWyszukiwarka.filter((k) =>
            k.tytul?.concat(" ", k?.nr ).concat(" ", k?.klient ).toLowerCase().includes(event.target.value.toLowerCase())
          );

          setGrupyOprawaAll(m);

        }}
      ></input>

    <ClearBTN inputRef={inputRef}/>
    </div>
  );
}

const ClearBTN = ({inputRef}) =>{
    const contextApp = useContext(AppContext);
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
  const setZamowienia = contextApp.setZamowienia;
    const techContext = useContext(TechnologyContext);
  const grupyOprawaAllWyszukiwarka = techContext.grupyOprawaAllWyszukiwarka;
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  
  if (inputRef.current) {
      if(inputRef.current.value ){
      return(
        <div
          className={style.icon_clear}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            setGrupyOprawaAll(grupyOprawaAllWyszukiwarka);

          }}
        >
          <img className={style.icon} src={iconClose2} alt="React Logo" />
        </div>
  )
  }
  }
}
