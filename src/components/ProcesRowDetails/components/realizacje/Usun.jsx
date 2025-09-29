
import { useContext } from "react";
import style from "./Realizacje.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { deleteRealizajcaProcesu } from "./deleteRealizajcaProcesu";
import DecodeToken from "pages/Login/DecodeToken";
// import { deleteRealizajcaOprawy } from "./deleteRealizajcaOprawy";
export default function Usun({wykonanie,realizacja,grup}) {

    const techContext = useContext(TechnologyContext);


      const wykonania = techContext.wykonania;
      const setWykonania = techContext.setWykonania;
      const realizacje = techContext.realizacje;
      const setRealizacje = techContext.setRealizacje;
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
   if(DecodeToken(sessionStorage.getItem("token")).realizacje_usun==1 || DecodeToken(sessionStorage.getItem("token")).id == realizacja.dodal_id){
    return (
      <button
        className={style.skasujBtn}
        onClick={() => {
            deleteRealizajcaProcesu({wykonanie,realizacja,grup,wykonania ,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll} )
          }} 
      >
        Usuń
      </button>
    );
   }

  }


    