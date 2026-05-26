import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

export default function KodaPracy({kod, setKod} ){


  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> KOD PRACY </label>
      <input className={styles.inputData} style={{width:"100px"}} type="text"
      value={kod}
      onChange={(event) => {
         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
        setKod(event.target.value);
      }}></input>
    </div>
  );
}