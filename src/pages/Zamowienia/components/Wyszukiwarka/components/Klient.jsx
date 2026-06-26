import React, {
  useContext,
} from "react";
import styles from "../Wyszukiwarka.module.css";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";

  export default function Klient({klient, setKlient }) {

const contextModalInsert = useContext(ModalInsertContext);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const contextApp = useContext(AppContext);

  return (
    <div className={styles.colData}>
      <label className={styles.labelData}> Klient </label>
      <select
        className={styles.inputData}
        style={{width:"240px"}}
        value={klient}
        onChange={(event) => {
          setKlient( event.target.value);
            // 
      // setStaus(3)
           ;
        }}
      >
        <option key={1} value={"0"}> 
           wybierz...
          </option>
        {contextApp.clients
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma}
          </option>
        ))}
      </select>

    </div>
  );
}