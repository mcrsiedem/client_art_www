
import { useContext } from "react";
import style from "./AddRealizacjaProcesu.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { addRealizajcaProcesu } from "./addRealizajcaProcesu";
import { AppContext } from "context/AppContext";
import { useSocket } from "context/SocketContext";
export default function Zapisz({setShow,wykonanie,value,grup}) {

    const appContext = useContext(AppContext);
    const techContext = useContext(TechnologyContext);

      // const setWykonaniaOprawy = techContext.setWykonaniaOprawy;
      // const wykonaniaOprawy = techContext.wykonaniaOprawy;
      // const grupyOprawaAll = techContext.grupyOprawaAll;
      // const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
      const setIsLoading = appContext.setIsLoading;
      const wykonania = techContext.wykonania;
      const setWykonania = techContext.setWykonania;
      const realizacje = techContext.realizacje;
      const setRealizacje = techContext.setRealizacje;
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
     const {         socket } = useSocket()
    return (
      <button
        className={style.btn}
        onClick={() => {
            if(value==""){
            alert("Dodaj ilość")
          }else{
                 addRealizajcaProcesu(setShow,wykonanie,value,wykonania,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll,grup,setIsLoading,socket)
          setShow(false)
          }
     
          
          }}
      >
        Zapisz
      </button>
    );
  }