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
  const setZamowieniaWyszukiwarka = appContext.setZamowieniaWyszukiwarka;
  const zamowienia = appContext.zamowienia;
  const showMenuZamowienia = contextModalInsert.showMenuZamowienia;
  const setShowMenuZamowienia = contextModalInsert.setShowMenuZamowienia;
  const container_menu = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position:  "absolute",
    top: "30px",
    right: "55px",
    zIindex: "100",
    width: "200px",
    height: "120px",
    backgroundColor: "rgb(31, 31, 31)",
    borderRadius: "10px"
    }
  if (showMenuZamowienia) {
    return (
      <div onContextMenu={(event)=>{  event.preventDefault()}} className={style.grayScaleBackground}>
      <div className={style.container_menu}>
      {/* <div style={container_menu}> */}
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
        deleteZamowienie(zamowienia,setZamowienia,setZamowieniaWyszukiwarka,rowsToDelete, setShowMenuZamowienia)
 
          }}>Usuń</button>

<button className={style.menu_btn}           onClick={() => {
        const rowsToDelete =zamowienia.filter(x => x.select === true);
        odblokujZamowienie(rowsToDelete, setShowMenuZamowienia,refreshZamowienia,setZamowienia,setZamowieniaWyszukiwarka,zamowienia)
        
 
          }}>Odblokuj zamówienie</button>

        <button
          className={style.menu_btn}
          onClick={() => {
            setZamowienia(
              zamowienia.map((t) => {
          
                  return {...t, select: false }
                
              })
            )
            setShowMenuZamowienia(!showMenuZamowienia);
          }}
        >
          Anuluj
        </button>
      </div>
      </div>
    );
  }
}
