
import style from "../ProcesProdukt.module.css";
import iconX from "assets/xDark.svg";
import iconTrash from "assets/trash2.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { addNewProcess } from "actions/addProcess";
import { _typ_elementu, reg_int } from "utils/initialvalue";
import { reg_txt } from "utils/initialvalue";
import { useHistoria } from "hooks/useHistoria";
import { getNameOfElement } from "actions/getNameOfElement";
import { useStatus } from "hooks/useStatus";
import { useContext } from "react";



export default function Footer() {
  const modalContext = useContext(ModalInsertContext);
  const setProcesyElementow = modalContext.setProcesyElementow;
  const procesyElementowTemporary = modalContext.procesyElementowTemporary;
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()
   const [setStatus] = useStatus()
  return (
    <div className={style.footer}>
      <button
        className={style.btn}
        onClick={() => {
          modalContext.setShowElementyProcesyInsert(false);
          setProcesyElementow(procesyElementowTemporary.map(row => {
            if(row.delete== true && row.historia != true){
              add(         {
            kategoria: "Procesy",
            event: getNameOfElement(row.element_id,elementy,_typ_elementu)+ " - kasowanie procesu  ",
            zamowienie_id: daneZamowienia.id
          })
     setStatus(3)
          return {...row, historia: true}
            } 
      
            if(row.insert== true && row.historia != true && row.update != true){
              add(         {
            kategoria: "Procesy",
            event: getNameOfElement(row.element_id,elementy,_typ_elementu)+ " - dodanie procesu  ",
            zamowienie_id: daneZamowienia.id
          })
     setStatus(3)
          return {...row, historia: true}
            } 
                  
            if(row.update== true && row.historia == false){
              add(         {
            kategoria: "Procesy",
            event: getNameOfElement(row.element_id,elementy,_typ_elementu)+ " - zmiana procesu  ",
            zamowienie_id: daneZamowienia.id
          })
     setStatus(3)
          return {...row, historia: true}
            } else return row


}))


        }}
      >
        Zapisz
      </button>
    </div>
  );
}