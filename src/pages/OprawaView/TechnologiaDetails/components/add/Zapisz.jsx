
import { useContext } from "react";
import style from "./AddRealizacjaOprawa.module.css";
import { addRealizajcaOprawy } from "./addRealizajcaOprawy";
import { TechnologyContext } from "context/TechnologyContext";
export default function Zapisz({setShow,grup,value}) {

    const techContext = useContext(TechnologyContext);

      const setWykonaniaOprawy = techContext.setWykonaniaOprawy;
      const wykonaniaOprawy = techContext.wykonaniaOprawy;
    return (
      <button
        className={style.btn}
        onClick={() => {
           addRealizajcaOprawy(setShow,grup,value,wykonaniaOprawy,setWykonaniaOprawy)
          setShow(false)
          
          }}
      >
        Zapisz
      </button>
    );
  }