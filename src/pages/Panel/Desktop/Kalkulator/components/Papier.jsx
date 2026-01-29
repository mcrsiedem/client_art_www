import style from "./Papier.module.css";
import addIcon2 from "assets/addIcon2.svg"
import {  useContext } from "react";
import { _typ_elementu} from "utils/initialvalue"
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { getNameOfPapier } from "actions/getNameOfPapier";
import { useHistoria } from "hooks/useHistoria";
import { useStatus } from "hooks/useStatus";
import { getNameOfElement } from "actions/getNameOfElement";

  export default function Papier({
    row,handleChangeCardElementy
  }) {
    const appcontext = useContext(AppContext);
    const listaPapierow = appcontext.listaPapierow;
    const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
    const modalcontext = useContext(ModalInsertContext);
    const setShowPaperStage = modalcontext.setShowPaperStage;
    const setSelectedElementROW = modalcontext.setSelectedElementROW;
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const historiaZamowienia = modalcontext.historiaZamowienia;
    const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;
    const daneZamowienia = modalcontext.daneZamowienia;
    const elementy = modalcontext.elementy;
    const [add] = useHistoria()
    const [setStatus] = useStatus()
    return (
     <div className={style.papier_input_container}>
        <select
          className={row.papier_id =="0" ? style.select_papier_brak : style.select_papier }
          value={row.papier_id}
          onChange={(e) => {
            handleChangeCardElementy({
              ...row,
              papier_id: e.target.value,
              update: true
            });

          setStatus(3)
            add(         {
              kategoria: "Papier",
              event: getNameOfElement(row.id,elementy,_typ_elementu)+" : zmiana papieru z "+ getNameOfPapier(listaPapierowWyszukiwarka,row.papier_id) + " na "+getNameOfPapier(listaPapierowWyszukiwarka,e.target.value),
              zamowienie_id: daneZamowienia.id
            })


            
          }}
        >
          {   <option value = "0"  >
             wybierz papier
            </option>}
       
          {listaPapierowWyszukiwarka.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa} {option.gramatura}  {option.wykonczenie}
            </option>
          ))}
        </select>
<img
         className={style.dodaj_klienta}
          src={addIcon2}
          onClick={() => {
            setShowPaperStage(true)
            setSelectedElementROW(row)
            setListaPapierowWyszukiwarka(listaPapierow)
            // showAddClientStage(true)
          }}
          alt="Procesy"
        />
     </div>

   
    );
  }
