import { useContext } from "react";

import { AppContext } from "context/AppContext";
import style from "./MenuZamowienia.module.css";

import { deleteZamowienie } from "actions/deleteZamowienie";
import { deleteZamowienieKosz } from "actions/deleteZamowienieKosz";
import { odblokujZamowienie } from "actions/odblokujZamowienie";
import { refreshZamowienia } from "actions/refreshZamowienia";
import { ModalInsertContext } from "context/ModalInsertContext";
export default function MenuZamowienia() {

  const contextModalInsert = useContext(ModalInsertContext);

  const appContext = useContext(AppContext)
  const setZamowienia = appContext.setZamowienia;
  const zamowienia = appContext.zamowienia;
  const showMenuZamowienia = contextModalInsert.showMenuZamowienia;
  const setShowMenuZamowienia = contextModalInsert.setShowMenuZamowienia;

  if (showMenuZamowienia) {
    return (
      <div className={style.container_menu}>
        {/* <button
          className={style.menu_btn}
          onClick={() => {
            const rowsToDelete =zamowienia.filter(x => x.select === true);
    
            deleteZamowienieKosz(zamowienia,setZamowienia,rowsToDelete, setShowMenu)

          }}
        >
          Usuń
        </button> */}
        <button className={style.menu_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true && x.stan <3);
        deleteZamowienie(zamowienia,setZamowienia,rowsToDelete, setShowMenuZamowienia)
 
          }}>Usuń</button>

<button className={style.menu_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true);
        odblokujZamowienie(rowsToDelete, setShowMenuZamowienia,refreshZamowienia,setZamowienia,zamowienia)
        
 
          }}>Odblokuj zamówienie</button>

        <button
          className={style.menu_btn}
          onClick={() => {
            setShowMenuZamowienia(!showMenuZamowienia);
          }}
        >
          Anuluj
        </button>
      </div>
    );
  }
}
