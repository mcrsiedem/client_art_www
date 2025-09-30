
import { useContext } from "react";
import style from "./OprawaWykonania.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { deleteRealizajcaOprawy } from "./deleteRealizajcaOprawy";
import DecodeToken from "pages/Login/DecodeToken";
export default function Usun({grup,wykonanie}) {

    const techContext = useContext(TechnologyContext);

      const setWykonaniaOprawy = techContext.setWykonaniaOprawy;
      const wykonaniaOprawy = techContext.wykonaniaOprawy;
      const grupyOprawaAll = techContext.grupyOprawaAll;
      const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
        if(DecodeToken(sessionStorage.getItem("token")).realizacje_usun==1 || DecodeToken(sessionStorage.getItem("token")).id == wykonanie.dodal_id){
             
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

  }