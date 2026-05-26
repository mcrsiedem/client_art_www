import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

export default function NrKalkulacji({nr_kalkulacji,setNr_kalkulacji} ){


  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> NR KALKULACJI </label>
      <input className={styles.inputData} style={{width:"100px"}} type="text"
      value={nr_kalkulacji}
      onChange={(event) => {
         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
        setNr_kalkulacji(event.target.value);
      }}></input>
    </div>
  );
}