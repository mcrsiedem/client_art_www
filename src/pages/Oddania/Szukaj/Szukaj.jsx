import { useContext, useRef, useState } from "react";
import style from "./Szukaj.module.css";
import { AppContext } from "context/AppContext";
import iconClose2 from "assets/x2.svg";
import iconSzukaj from "assets/szukaj_green.svg";

export default function Szukaj() {
  const contextApp = useContext(AppContext);
  const setOddaniaGrupy = contextApp.setOddaniaGrupy;
  const oddaniaGrupyWyszukiwarka = contextApp.oddaniaGrupyWyszukiwarka;

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
        
          // let m = oddaniaGrupyWyszukiwarka.filter((k) =>
          //   k.tytul.concat(" ", k.nr ).concat(" ", k.firma_nazwa ).concat(" ", k.klient ).toLowerCase().includes(event.target.value.toLowerCase())
          // );

          let m = oddaniaGrupyWyszukiwarka.filter((k) =>
    // NOWY WARUNEK: Sprawdź, czy k.nr ma jakąkolwiek wartość (nie jest null, undefined, '', 0, false)
    k.nr && 
    // STARY WARUNEK: Kontynuuj filtrowanie tylko jeśli k.nr istnieje
    k.tytul.concat(" ", k.nr ).concat(" ", k.firma_nazwa ).concat(" ", k.klient ).toLowerCase().includes(event.target.value.toLowerCase())
);

          setOddaniaGrupy(m);

        }}
      ></input>

    <ClearBTN inputRef={inputRef}/>
    </div>
  );
}

const ClearBTN = ({inputRef}) =>{
    const contextApp = useContext(AppContext);
    const setOddaniaGrupy = contextApp.setOddaniaGrupy;
  const oddaniaGrupyWyszukiwarka = contextApp.oddaniaGrupyWyszukiwarka;
  
  if (inputRef.current) {
      if(inputRef.current.value ){
      return(
        <div
          className={style.icon_clear}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            setOddaniaGrupy(oddaniaGrupyWyszukiwarka);

          }}
        >
          <img className={style.icon} src={iconClose2} alt="React Logo" />
        </div>
  )
  }
  }
}
