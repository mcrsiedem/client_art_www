
import { useContext } from "react";
import style from "./Realizacje.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { deleteRealizajcaProcesu } from "./deleteRealizajcaProcesu";
// import { deleteRealizajcaOprawy } from "./deleteRealizajcaOprawy";
export default function Usun({wykonanie,realizacja,grup}) {

    const techContext = useContext(TechnologyContext);


      const wykonania = techContext.wykonania;
      const setWykonania = techContext.setWykonania;
      const realizacje = techContext.realizacje;
      const setRealizacje = techContext.setRealizacje;
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
    
    return (
      <button
        className={style.skasujBtn}
        onClick={() => {
  console.log(grup)

            deleteRealizajcaProcesu({wykonanie,realizacja,grup,wykonania ,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll} )
          
          }} 
      >
        Usuń
      </button>
    );
  }


    