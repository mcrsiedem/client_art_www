import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./MenuHeaderTech.module.css";
import { ponumerArkusze } from "actions/ponumerArkusze";
import { useArkuszeOne } from "hooks/useArkuszeOne";
import { useProcesy } from "hooks/procesy/useProcesy";
import { ModalInsertContext } from "context/ModalInsertContext";
export default function MenuHeaderTech({ showMenu, setShowMenu }) {

  const techContext = useContext(TechnologyContext);

  const setElementyTech = techContext.setElementyTech;
  const elementyTech = techContext.elementyTech;
  const setShowProcesy = techContext.setShowProcesy;

  const {createProcesyFromArkuszONE} = useProcesy();

  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <Zamowienie  setShowMenu={setShowMenu}/>
        <Zamowienie  setShowMenu={setShowMenu}/>
        <Zamowienie  setShowMenu={setShowMenu}/>
        <Zamowienie  setShowMenu={setShowMenu}/>
        <Zamowienie  setShowMenu={setShowMenu}/>
        <Anuluj  setShowMenu={setShowMenu}/>

      </div>
    );
  }
}





const Zamowienie = ({setShowMenu} ) =>{
  const techContext = useContext(TechnologyContext)
  const {setOpenModalInsert} = useContext(ModalInsertContext);
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {
      setShowMenu(false)
      setOpenModalInsert(true);

    }}
  >
    Zamówienie
  </button>
  )
}



const Anuluj = ({setShowMenu} ) =>{
  const techContext = useContext(TechnologyContext)
  const elementyTech = techContext.elementyTech;
  const setElementyTech = techContext.setElementyTech;
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {
      setShowMenu(false);

    }}
  >
    Anuluj
  </button>
  )
}







