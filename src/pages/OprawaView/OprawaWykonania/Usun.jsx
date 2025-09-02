
import { useContext } from "react";
import style from "./OprawaWykonania.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { deleteRealizajcaOprawy } from "./deleteRealizajcaOprawy";
export default function Usun({grup,wykonanie}) {

    const techContext = useContext(TechnologyContext);

      const setWykonaniaOprawy = techContext.setWykonaniaOprawy;
      const wykonaniaOprawy = techContext.wykonaniaOprawy;
      const grupyOprawaAll = techContext.grupyOprawaAll;
      const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
    
    return (
      <button
        className={style.skasujBtn}
        onClick={() => {
           deleteRealizajcaOprawy(grup,wykonanie,wykonaniaOprawy,setWykonaniaOprawy,grupyOprawaAll,setGrupyOprawaAll)
          
          }} 
      >
        Usuń
      </button>
    );
  }