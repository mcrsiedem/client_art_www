
import { useContext } from "react";
import style from "./AddDostepnoscPapieruInfo.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { addDostepnoscPapieru } from "./addDostepnoscPapieru";
export default function Zapisz({setShow,value,grup}) {

      const techContext = useContext(TechnologyContext);
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
    return (
      <button
        className={style.btn}
        onClick={() => {
          addDostepnoscPapieru(setShow,value,grupyWykonanAll,setGrupWykonanAll,grup)
          // setShow(false)
          }}
      >
        Zapisz
      </button>
    );
  }