import { useContext, useState } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./MenuHeaderZamowienia.module.css";
import { ponumerArkusze } from "actions/ponumerArkusze";
import { useArkuszeOne } from "hooks/useArkuszeOne";
import { useProcesy } from "hooks/procesy/useProcesy";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useArkuszeAuto } from "hooks/arkusze/useArkuszeAuto";
import DecodeToken from "pages/Login/DecodeToken";
import { Eraser, File, Menu, RefreshCcw, Save, Sheet, SquareMenu, TriangleAlert } from "lucide-react";
import { zapiszTechnologieDodruk } from "actions/zapiszTechnologieDodruk";
import { useZamowienia } from "hooks/useZamowienia";
export default function MenuHeaderZamowienia({ showMenu, setShowMenu }) {

  const techContext = useContext(TechnologyContext);

  const setElementyTech = techContext.setElementyTech;
  const elementyTech = techContext.elementyTech;
  const setShowProcesy = techContext.setShowProcesy;

  const {createProcesyFromArkuszONE} = useProcesy();
    const [disabled, setDisabled] = useState(false);


  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <Odswiez  setShowMenu={setShowMenu} disabled={disabled} setDisabled={setDisabled}/>
        {/* <Arkusze  setShowMenu={setShowMenu}/>
        <Dodruk  setShowMenu={setShowMenu}/>
        <PotwierdzKorekty  setShowMenu={setShowMenu}/>
        <ZapisBtnPromiseDodruk  setShowMenu={setShowMenu}/>
        <Clear  setShowMenu={setShowMenu}/> */}

        {/* <Zamowienie  setShowMenu={setShowMenu}/>
        <Zamowienie  setShowMenu={setShowMenu}/>
        <Zamowienie  setShowMenu={setShowMenu}/> */}
        <Anuluj  setShowMenu={setShowMenu}/>

      </div>
    );
  }
}



const ZapisBtnPromiseDodruk = ({setShowMenu} ) =>{
  const techContext = useContext(TechnologyContext);
  const isSaveButtonDisabled = techContext.isSaveButtonDisabled;
  const setSaveButtonDisabled = techContext.setSaveButtonDisabled;

  const daneTech = techContext.daneTech;
  const setDaneTech = techContext.setDaneTech;
  const produktyTech = techContext.produktyTech;
  const setProduktyTech = techContext.setProduktyTech;
  const elementyTech = techContext.elementyTech;
  const fragmentyTech = techContext.fragmentyTech;
  const oprawaTech = techContext.oprawaTech;
  const legi = techContext.legi;
  const legiFragmenty = techContext.legiFragmenty;
  const arkusze = techContext.arkusze;
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const procesyElementowTech = techContext.procesyElementowTech;

  const setLegiFragmenty = techContext.setLegiFragmenty;
  const setFragmentyTech = techContext.setFragmentyTech;
  const setElementyTech = techContext.setElementyTech;
  const setOprawaTech = techContext.setOprawaTech;
  const setLegi = techContext.setLegi;
  const setArkusze = techContext.setArkusze;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const setWykonania = techContext.setWykonania;
  const setProcesyElementowTech = techContext.setProcesyElementowTech;
  const grupaOprawaTech = techContext.grupaOprawaTech;
  const setGrupaOprawaTech = techContext.setGrupaOprawaTech;

  const fechparametryTechnologii = techContext.fechparametryTechnologii;
       if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1 & !isSaveButtonDisabled) {
  return(
    <button
    disabled={daneTech.korekta_zamowienia_alert == 1 ? false : true}
    className={style.menu_legi_btn}
    onClick={() => {
      console.log("zapis 1st ");
              daneTech.autor_id = DecodeToken(sessionStorage.getItem("token")).id  
              zapiszTechnologieDodruk({
                daneTech,
                produktyTech,
                elementyTech,
                fragmentyTech,
                oprawaTech,
                arkusze,
                legi,
                legiFragmenty,
                grupaWykonan,
                wykonania,
                procesyElementowTech,
                setProduktyTech,
                setDaneTech,
                setElementyTech,
                setFragmentyTech,
                setOprawaTech,
                setLegi,
                setLegiFragmenty,
                setArkusze,
                setGrupaWykonan,
                setWykonania,
                setProcesyElementowTech,setSaveButtonDisabled,
                grupaOprawaTech, setGrupaOprawaTech
              });

    }}
  >
       < Save size={15} style={{color:'teal',marginRight:'10px',marginLeft:'4px'}}/>

    Zapisz dodruk
  </button>
  )
}}





const Clear = ({setShowMenu} ) =>{
  const techContext = useContext(TechnologyContext);
  const setShowProcesy = techContext.setShowProcesy;
       if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1 ) {
  return(
    <button
    // disabled={daneTech.korekta_zamowienia_alert == 1 ? false : true}
    className={style.menu_legi_btn}
    onClick={() => {
                            techContext.setArkusze([])
        techContext.setLegi([])
        techContext.setLegiFragmenty([])
        techContext.setGrupaWykonan([])
        techContext.setWykonania([])
        techContext.setGrupaOprawaTech([])

        setShowProcesy(false)

    }}
  >
       < Eraser size={15} style={{color:'red',marginRight:'10px',marginLeft:'4px'}}/>

    Clear
  </button>
  )
}}



const PotwierdzKorekty = ({setShowMenu} ) =>{
  const techContext = useContext(TechnologyContext)
    const daneTech = techContext.daneTech;
  const setDaneTech = techContext.setDaneTech;
  const {setOpenModalInsert} = useContext(ModalInsertContext);
      const       {autoArk}= useArkuszeAuto();

       if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1 & daneTech.korekta_zamowienia_alert == 1) {
  return(
    <button
    // disabled={daneTech.korekta_zamowienia_alert == 1 ? false : true}
    className={style.menu_legi_btn}
    onClick={() => {
      setDaneTech({...daneTech, alert:true, korekta_zamowienia_alert: null})

    }}
  >
       < TriangleAlert size={15} style={{color:'red',marginRight:'10px',marginLeft:'4px'}}/>

    Potwierdź korekty
  </button>
  )
}}




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
       < SquareMenu size={15} style={{color:'yellow',marginRight:'10px',marginLeft:'4px'}}/>

    Arkusze
  </button>
  )
}}


const Dodruk = ({setShowMenu} ) =>{
  const techContext = useContext(TechnologyContext)
  const {setOpenModalInsert} = useContext(ModalInsertContext);
    const       {createWykonaniaFromArkuszeLegi}= useProcesy();


       if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {
  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {
       createWykonaniaFromArkuszeLegi();


    }}
  >
       < RefreshCcw size={15} style={{color:'lightblue',marginRight:'10px',marginLeft:'4px'}}/>

    Dodruk
  </button>
  )
}}



const Odswiez = ({setShowMenu,disabled, setDisabled} ) =>{
  const techContext = useContext(TechnologyContext)
  const {setOpenModalInsert} = useContext(ModalInsertContext);
  const {refreshZamowieniaProofy,refreshZamowienia} = useZamowienia()


  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {
            if(!disabled){
      setShowMenu(false);

            // refreshZamowieniaProofy()
            refreshZamowienia();
            setDisabled(true)
            // console.log("refresh")
            setTimeout(() => {
              setDisabled(false);
              // console.log("unlock")
            }, 2000);
        

            }


    }}
  >
     {disabled?  < RefreshCcw size={15} style={{color:'grey',marginRight:'10px',marginLeft:'4px'}}/> :
                  < RefreshCcw size={15} style={{color:'yellowgreen',marginRight:'10px',marginLeft:'4px'}}/>}

    Odśwież
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







