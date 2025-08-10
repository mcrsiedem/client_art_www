import { useContext, useRef, useState } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./Szukaj.module.css";
import { useZamowienieUpdate } from "hooks/useZamowienieUpdate";
import { useZamowienieInsert } from "hooks/useZamowienieInsert";
import { AppContext } from "context/AppContext";
import iconClose2 from "assets/x2.svg";
// import iconSzukaj from "assets/szukaj.svg";
import iconSzukaj from "assets/szukaj_green.svg";
import { useZamowienia } from "hooks/useZamowienia";


export default function Szukaj() {
  const contextApp = useContext(AppContext);
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
  const zamowienia = contextApp.zamowienia;
  const setZamowienia = contextApp.setZamowienia;

  const inputRef = useRef(null);
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
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
        
          let m = [...zamowieniaWyszukiwarka];
          m = m.filter((k) =>
            // k.tytul.toLowerCase().includes(event.target.value.toLowerCase())
            k.tytul
              .concat(" ", k.nr)
              .concat(" ", k.nr_stary)
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          );

          setZamowienia(m);
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
  
  if (inputRef.current) {
      if(inputRef.current.value ){
      return(
        <div
          className={style.icon_clear}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
              console.log("input");
            }
            setZamowienia(zamowieniaWyszukiwarka);

          }}
        >
          <img className={style.icon} src={iconClose2} alt="React Logo" />
        </div>
  )
  }
  }


}
