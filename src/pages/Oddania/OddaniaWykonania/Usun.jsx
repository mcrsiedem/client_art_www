
import { useContext } from "react";
import style from "./OddaniaWykonania.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { deleteRealizajcaOddania } from "./deleteRealizajcaOddania";
import { AppContext } from "context/AppContext";

export default function Usun({grupaOddanie,wykonanieOddania}) {

    const techContext = useContext(TechnologyContext);

      const setWykonaniaOprawy = techContext.setWykonaniaOprawy;
      const wykonaniaOprawy = techContext.wykonaniaOprawy;
      const grupyOprawaAll = techContext.grupyOprawaAll;
      const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
    
          const appContext = useContext(AppContext)
        
          const oddaniaGrupy =appContext.oddaniaGrupy;
          const setOddaniaGrupy =appContext.setOddaniaGrupy
          const oddaniaWykonania =appContext.oddaniaWykonania
          const setOddaniaWykonania =appContext.setOddaniaWykonania
    return (
      <button
        className={style.skasujBtn}
        onClick={() => {
           deleteRealizajcaOddania(grupaOddanie,wykonanieOddania,oddaniaGrupy,setOddaniaGrupy,oddaniaWykonania,setOddaniaWykonania )
          
          }} 
      >
        Usuń
      </button>
    );
  }