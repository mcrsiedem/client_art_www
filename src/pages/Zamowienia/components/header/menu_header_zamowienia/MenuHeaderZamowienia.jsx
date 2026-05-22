import { useContext, useState } from "react";
import axios from "axios";
import { IP } from "utils/Host";

import { TechnologyContext } from "context/TechnologyContext";
import style from "./MenuHeaderZamowienia.module.css";
import { ponumerArkusze } from "actions/ponumerArkusze";
import { useArkuszeOne } from "hooks/useArkuszeOne";
import { useProcesy } from "hooks/procesy/useProcesy";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useArkuszeAuto } from "hooks/arkusze/useArkuszeAuto";
import DecodeToken from "pages/Login/DecodeToken";
import { Eraser, File, Lock, Menu, RefreshCcw, Save, Search, Sheet, SquareMenu, TriangleAlert } from "lucide-react";
import { zapiszTechnologieDodruk } from "actions/zapiszTechnologieDodruk";
import { useZamowienia } from "hooks/useZamowienia";
import { ZamowienieContext } from "context/ZamowieniaContext";
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
        <OdblokujZamowienia  setShowMenu={setShowMenu} />
        <ZnajdzZlecenie  setShowMenu={setShowMenu} />
        
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



const Odswiez = ({setShowMenu,disabled, setDisabled} ) =>{
  const techContext = useContext(TechnologyContext)
  const {setOpenModalInsert} = useContext(ModalInsertContext);
  const {refreshZamowieniaProofy,refZamPagination} = useZamowienia()

  return(
    <button
    className={style.menu_legi_btn}
    onClick={() => {
            if(!disabled){
      setShowMenu(false);
            refZamPagination();
            setDisabled(true)
            setTimeout(() => {
              setDisabled(false);
            }, 2000);
        
            }

    }}
  >
     {disabled?  < RefreshCcw size={20} style={{color:'grey',marginRight:'10px',marginLeft:'4px'}}/> :
                  < RefreshCcw size={20} style={{color:'yellowgreen',marginRight:'10px',marginLeft:'4px'}}/>}

    Odśwież
  </button>
  )
}



const OdblokujZamowienia = ({setShowMenu } ) =>{
  const techContext = useContext(TechnologyContext)
  const {selectedZamowienie} = useContext(ModalInsertContext);
  const {refreshZamowieniaProofy,refZamPagination} = useZamowienia()

 if(DecodeToken(sessionStorage.getItem("token")).zamowienie_odblokuj==1)  {return(
    <button
    className={style.menu_legi_btn}
    onClick={ async() => {
    await axios.put(IP + "setOrderClosed", {
                                  id: selectedZamowienie.id,
                                }).then(x=> {setShowMenu(false)
                                  refZamPagination()
                                });

    }}
  >
      < Lock size={20} style={{color:'orange',marginRight:'10px',marginLeft:'4px'}}/> 
                 

    Odblokuj zamówienie
  </button>
  )
}
}

const ZnajdzZlecenie = ({setShowMenu } ) =>{
  const techContext = useContext(TechnologyContext)
  const {selectedZamowienie} = useContext(ModalInsertContext);
  const {refreshZamowieniaProofy,refZamPagination} = useZamowienia()
  const {setShowWyszukiwarka,showWyszukiwarka} = useContext(ZamowienieContext);


 if(DecodeToken(sessionStorage.getItem("token")).zamowienie_odblokuj==1)  {return(
    <button
    className={style.menu_legi_btn}
    onClick={ () => {

      setShowWyszukiwarka(true)
      setShowMenu(false);



    }}
  >
      < Search size={20} style={{color:'grey',marginRight:'10px',marginLeft:'4px'}}/> 
                 

    Znajdź zlecenie
  </button>
  )
}
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







