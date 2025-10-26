
import style from "../ProcesProdukt.module.css";
import iconX from "assets/xDark.svg";
import { ModalInsertContext } from "context/ModalInsertContext";

import { useContext } from "react";
export default function Header() {
const modalcontext = useContext(ModalInsertContext);
  return (
    <div 
    onClick={()=>{
       console.log("procesyProduktowTemporary" ,modalcontext.procesyProduktowTemporary)
       console.log("procesyProduktow" ,modalcontext.procesyProduktow)
      
      }}
    className={style.header}>
      {/* <p className={style.title}>Procesy - <p className={style.title2}>{appContext.typ_elementu?.filter(x => x.id == rowElement?.typ)[0]?.nazwa} {rowElement?.naklad} szt. {rowElement?.nazwa}</p> </p>  */}
      <p className={style.title}>Procesy produktu </p> 
      <Zamknij/>
    </div>
  );
}


function Zamknij() {
  const modalContext = useContext(ModalInsertContext);


  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        modalContext.setShowProcesyProduktow(false);
 
      }}
      alt="Procesy"
    />
  );
}