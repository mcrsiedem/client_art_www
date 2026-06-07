import React, {
  useContext,
} from "react";
import styles from "../Wyszukiwarka.module.css";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";

  export default function ProcesyElementow({element_proces_id,setElement_proces_id }) {

const contextModalInsert = useContext(ModalInsertContext);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const contextApp = useContext(AppContext);
    const procesList = contextApp.procesList;


  return (
    <div className={styles.colData}>
      <label className={styles.labelData}> Procesy Elementów </label>
      <select
        className={styles.inputData}
        style={{width:"260px"}}
        value={element_proces_id}
        onChange={(event) => {
          setElement_proces_id( event.target.value);
            // 
      // setStaus(3)
           ;
        }}
      >
        <option key={1} value={"0"}> 
           wybierz...
          </option>
          {procesList.filter(x=> x.nazwa_id != 6).sort((a,c)=>a.nazwa_id-c.nazwa_id).map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa} {option.typ}  {option.rodzaj}
            </option>
          ))}
      </select>

    </div>
  );
}