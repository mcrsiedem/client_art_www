
import { useContext } from "react";
import style from "./ZakonczArkusz.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { addRealizacjaZakonczArkusz } from "./addRealizacjaZakonczArkusz";
import { AppContext } from "context/AppContext";

export default function Zapisz({setShow,wykonanie,value,grup}) {

    const techContext = useContext(TechnologyContext);
    const appContext = useContext(AppContext);

      // const setWykonaniaOprawy = techContext.setWykonaniaOprawy;
      // const wykonaniaOprawy = techContext.wykonaniaOprawy;
      // const grupyOprawaAll = techContext.grupyOprawaAll;
      // const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
      const wykonania = techContext.wykonania;
      const setWykonania = techContext.setWykonania;
      const realizacje = techContext.realizacje;
      const setRealizacje = techContext.setRealizacje;
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
      const setIsLoading = appContext.setIsLoading;
    
    return (
      <button
        className={style.btn}
        onClick={() => {

          // addRealizacjaZakonczArkusz(setShow,wykonanie,value,wykonania,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll,grup,setIsLoading)
          // setShow(false)
       if(value==""){
        alert("Wpisz ilość")
       
        
       }else{
          addRealizacjaZakonczArkusz(setShow,wykonanie,value,wykonania,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll,grup,setIsLoading)
          setShow(false)
       }
          
     
         
          
          }}
      >
        Zapisz
      </button>
    );
  }