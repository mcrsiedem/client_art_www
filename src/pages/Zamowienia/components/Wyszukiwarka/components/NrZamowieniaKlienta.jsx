import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

export default function NrZamowieniaKlienta({nr_zamowienia_klienta,setNr_zamowienia_klienta} ){


  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> NR ZAM. KLIENTA </label>
      <input className={styles.inputData} style={{width:"140px"}} type="text"
      value={nr_zamowienia_klienta}
      onChange={(event) => {
         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
        setNr_zamowienia_klienta(event.target.value);
      }}></input>
    </div>
  );
}