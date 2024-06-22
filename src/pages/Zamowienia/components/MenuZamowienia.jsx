import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./MenuZamowienia.module.css";
import icon from "assets/copy.svg";
import { deleteZamowienie } from "actions/deleteZamowienie";
export default function MenuZamowienia({ showMenu, setShowMenu }) {


  const appContext = useContext(AppContext)
  const zamowienia = appContext.zamowienia;
  const setZamowienia = appContext.setZamowienia;

  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            

          }}
        >
          Usuń
        </button>
        <button className={style.menu_legi_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true);
        deleteZamowienie(zamowienia,setZamowienia,rowsToDelete, setShowMenu)
 
          }}>Usuń na zawsze...</button>

        <button
          className={style.menu_legi_btn}
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
