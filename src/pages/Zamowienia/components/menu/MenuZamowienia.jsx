import { useContext } from "react";

import { AppContext } from "context/AppContext";
import style from "./MenuZamowienia.module.css";

import { deleteZamowienie } from "actions/deleteZamowienie";
import { deleteZamowienieKosz } from "actions/deleteZamowienieKosz";
import { odblokujZamowienie } from "actions/odblokujZamowienie";
import { refreshZamowienia } from "actions/refreshZamowienia";
export default function MenuZamowienia({ showMenu, setShowMenu }) {


  const appContext = useContext(AppContext)
  const setZamowienia = appContext.setZamowienia;
  const zamowienia = appContext.zamowienia;

  if (showMenu) {
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
        deleteZamowienie(zamowienia,setZamowienia,rowsToDelete, setShowMenu)
 
          }}>Usuń</button>

<button className={style.menu_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true);
        odblokujZamowienie(rowsToDelete, setShowMenu,refreshZamowienia,setZamowienia,zamowienia)
        
 
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
