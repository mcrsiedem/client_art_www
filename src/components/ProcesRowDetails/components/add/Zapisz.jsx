
import { useContext } from "react";
import style from "./AddRealizacjaOprawa.module.css";
import { addRealizajcaOprawy } from "./addRealizajcaOprawy";
import { TechnologyContext } from "context/TechnologyContext";
export default function Zapisz({setShow,grup,value}) {

    const techContext = useContext(TechnologyContext);

      const setWykonaniaOprawy = techContext.setWykonaniaOprawy;
      const wykonaniaOprawy = techContext.wykonaniaOprawy;
      const grupyOprawaAll = techContext.grupyOprawaAll;
      const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
    
    return (
      <button
        className={style.btn}
        onClick={() => {
           addRealizajcaOprawy(setShow,grup,value,wykonaniaOprawy,setWykonaniaOprawy,grupyOprawaAll,setGrupyOprawaAll)
          setShow(false)
          
          }}
      >
        Zapisz
      </button>
    );
  }