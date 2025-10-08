
import { useContext } from "react";
import style from "./AddRealizacjaBrakOddania.module.css";
import { addRealizajcaBrakOddania } from "./addRealizajcaBrakOddania";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
export default function ZapiszBrak({setShow,grup,value}) {

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
        className={style.btn}
        onClick={() => {
            if(value==""){
            alert("Dodaj ilość")
          }else{
                addRealizajcaBrakOddania(setShow,grup,value,oddaniaGrupy,setOddaniaGrupy,oddaniaWykonania, setOddaniaWykonania,2)
          setShow(false)
          }
       
          
          }}
      >
        Zapisz
      </button>
    );
  }