import React, {
  useContext,
} from "react";
import styles from "../Wyszukiwarka.module.css";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";

  export default function Papier({papierId, setPapierId }) {

const contextModalInsert = useContext(ModalInsertContext);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const contextApp = useContext(AppContext);
    const listaPapierowWyszukiwarka = contextApp.listaPapierowWyszukiwarka;


  return (
    <div className={styles.colData}>
      <label className={styles.labelData}> Papier </label>
      <select
        className={styles.inputData}
        style={{width:"260px"}}
        value={papierId}
        onChange={(event) => {
          setPapierId( event.target.value);
            // 
      // setStaus(3)
           ;
        }}
      >
        <option key={1} value={"0"}> 
           wybierz...
          </option>
          {listaPapierowWyszukiwarka.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa} {option.gramatura}  {option.wykonczenie}
            </option>
          ))}
      </select>

    </div>
  );
}