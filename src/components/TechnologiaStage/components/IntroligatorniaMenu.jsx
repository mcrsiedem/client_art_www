import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./IntroligatorniaMenu.module.css";
import icon from "assets/copy.svg";
import { deleteZamowienie } from "actions/deleteZamowienie";
import { deleteZamowienieKosz } from "actions/deleteZamowienieKosz";
export default function MenuIntroligatornia({ row,showMenu, setShowMenu }) {

  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  // const appContext = useContext(AppContext)
  // const zamowienia = appContext.zamowienia;
  // const setZamowienia = appContext.setZamowienia;

  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            // const rowsToDelete =zamowienia.filter(x => x.select === true);
    
            // deleteZamowienieKosz(zamowienia,setZamowienia,rowsToDelete, setShowMenu)
            // odlaczFragmenty(oprawa_id,legiFragmenty)
            setLegiFragmenty(
              legiFragmenty.map((t) => {
                if (t.oprawa_id === row.id) {
                  return {...t,
                    oprawa_id: 0}
                } else {
                  return t;
                }
              })
            );

      
            setShowMenu(!showMenu);
          }}
          
        >
         Odłącz legi
        </button>
        {/* <button className={style.menu_legi_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true);
        deleteZamowienie(zamowienia,setZamowienia,rowsToDelete, setShowMenu)
 
          }}>Usuń na zawsze...</button> */}

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
