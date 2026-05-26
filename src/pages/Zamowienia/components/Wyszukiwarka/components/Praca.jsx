import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function Praca({praca, setPraca} ){


  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> Tytul </label>
      <input className={styles.inputData} type="text"
      value={praca}
      onChange={(event) => {
        

         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
        setPraca(event.target.value);
         

      }}></input>
    </div>
  );
}