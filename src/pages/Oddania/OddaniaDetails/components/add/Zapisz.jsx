
import { useContext } from "react";
import style from "./AddRealizacjaOddania.module.css";
import { addRealizajcaOddania } from "./addRealizajcaOddania";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
export default function Zapisz({setShow,grup,value}) {

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
                     addRealizajcaOddania(setShow,grup,value,oddaniaGrupy,setOddaniaGrupy,oddaniaWykonania, setOddaniaWykonania,1)
          setShow(false)
          }
  
          
          }}
      >
        Zapisz
      </button>
    );
  }