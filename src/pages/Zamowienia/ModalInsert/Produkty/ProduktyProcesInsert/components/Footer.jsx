
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

    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()
   const [setStatus] = useStatus()

   const sprawdzKolejnoscIndeksow = (array) => {
  // Sprawdzamy każdy element tablicy.
  // 'element' to bieżący obiekt, 'index' to pozycja tego obiektu w tablicy (0, 1, 2, ...).
  return array.every((element, index) => {
    // Oczekiwany indeks to pozycja w tablicy + 1, ponieważ chcemy, żeby było 1, 2, 3, ...
    const oczekiwanyIndeks = index + 1;

    // Sprawdzamy, czy wartość pola 'indeks' w obiekcie jest równa oczekiwanemu indeksowi.
    // Używamy Number() na wszelki wypadek, gdyby wartość 'indeks' była stringiem,
    // choć w Twoim przykładzie jest number.
    return Number(element.indeks) === oczekiwanyIndeks;
  });
};



  return (
    <div className={style.footer}>
      <button
        className={style.btn}
        onClick={() => {

          if(sprawdzKolejnoscIndeksow(modalContext.procesyProduktowTemporary.filter(x=> x.delete != true))){
                      modalContext.setShowProcesyProduktow(false);
           modalContext.setProcesyProduktow( modalContext.procesyProduktowTemporary.map(row => {
            if(row.delete== true && row.historia != true){
              add(         {
            kategoria: "Procesy produktu",
            event: "OPRAWA_ID: "+row.oprawa_id+ " - kasowanie procesu  ",
            zamowienie_id: daneZamowienia.id
          })
     setStatus(3)
          return {...row, historia: true}
            } 
      
            if(row.insert== true && row.historia != true && row.update != true){
              add(         {
            kategoria: "Procesy produktu",
            event: "OPRAWA_ID: "+row.oprawa_id+ " - dodanie procesu  ",
            zamowienie_id: daneZamowienia.id
          })
     setStatus(3)
          return {...row, historia: true}
            } 
                  
            if(row.update== true && row.historia == false){
              add(         {
            kategoria: "Procesy produktu",
            event: "OPRAWA_ID: "+row.oprawa_id+ " - zmiana procesu  ",
            zamowienie_id: daneZamowienia.id
          })
     setStatus(3)
          return {...row, historia: true}
            } else return row


}))
          }else{
            alert("Ponumeruj ładnie kolejność : ) ")
          }



        }}
      >
        Zapisz
      </button>
    </div>
  );
}