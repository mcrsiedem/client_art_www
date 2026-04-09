import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./MenuHeaderTech.module.css";
import { ponumerArkusze } from "actions/ponumerArkusze";
import { useArkuszeOne } from "hooks/useArkuszeOne";
import { useProcesy } from "hooks/procesy/useProcesy";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useArkuszeAuto } from "hooks/arkusze/useArkuszeAuto";
import DecodeToken from "pages/Login/DecodeToken";
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
        <Arkusze  setShowMenu={setShowMenu}/>
        {/* <Zamowienie  setShowMenu={setShowMenu}/>
        <Zamowienie  setShowMenu={setShowMenu}/>
        <Zamowienie  setShowMenu={setShowMenu}/> */}
        <Anuluj  setShowMenu={setShowMenu}/>

      </div>
    );
  }
}



const PotwierdzKorekty = ({setShowMenu} ) =>{
  const techContext = useContext(TechnologyContext)
  const {setOpenModalInsert} = useContext(ModalInsertContext);
      const       {autoArk}= useArkuszeAuto();
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {
      autoArk()

    }}
  >
    Arkusze
  </button>
  )
}


const Arkusze = ({setShowMenu} ) =>{
  const techContext = useContext(TechnologyContext)
  const {setOpenModalInsert} = useContext(ModalInsertContext);
      const       {autoArk}= useArkuszeAuto();

       if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {
      autoArk()

    }}
  >
    Arkusze
  </button>
  )
}}




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







