import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./Szukaj.module.css";
import { useZamowienieUpdate } from "hooks/useZamowienieUpdate";
import { useZamowienieInsert } from "hooks/useZamowienieInsert";
import { AppContext } from "context/AppContext";

export default function Szukaj() {
  const contextApp = useContext(AppContext);
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
  const setZamowienia = contextApp.setZamowienia;
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
    <div className={style.main}>
      <span className={style.icon_szukaj}>🔍</span>
          <input
      className={style.szukajInput}
      type="text"
      title="Znajdź tytuł pracy..."
      placeholder="Praca..."
      onChange={(event) => {


        
        let m = [...zamowieniaWyszukiwarka];
           m =  m.filter((k) =>
            // k.tytul.toLowerCase().includes(event.target.value.toLowerCase()) 
            k.tytul.concat(" ", k.nr ).concat(" ", k.nr_stary ).toLowerCase().includes(event.target.value.toLowerCase()) 
          )

        setZamowienia(
         m
        );





      }}
    ></input>

    <span className={style.icon_clear}>❌</span>
    </div>

  );
}