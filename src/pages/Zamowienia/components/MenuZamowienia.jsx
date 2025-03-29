import { useContext } from "react";

import { AppContext } from "context/AppContext";
import style from "./MenuZamowienia.module.css";

import { deleteZamowienie } from "actions/deleteZamowienie";
import { deleteZamowienieKosz } from "actions/deleteZamowienieKosz";
import { odblokujZamowienie } from "actions/odblokujZamowienie";
export default function MenuZamowienia({ showMenu, setShowMenu }) {


  const appContext = useContext(AppContext)
  const zamowienia = appContext.zamowienia;
  const setZamowienia = appContext.setZamowienia;

  if (showMenu) {
    return (
      <div className={style.container_menu}>
        <button
          className={style.menu_btn}
          onClick={() => {
            const rowsToDelete =zamowienia.filter(x => x.select === true);
    
            deleteZamowienieKosz(zamowienia,setZamowienia,rowsToDelete, setShowMenu)

          }}
        >
          Usuń
        </button>
        <button className={style.menu_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true);
        deleteZamowienie(zamowienia,setZamowienia,rowsToDelete, setShowMenu)
 
          }}>Usuń na zawsze...</button>

<button className={style.menu_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true);
        odblokujZamowienie(rowsToDelete, setShowMenu)
 
          }}>Odblokuj zamówienie</button>

        <button
          className={style.menu_btn}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          Anuluj
        </button>
      </div>
    );
  }
}
