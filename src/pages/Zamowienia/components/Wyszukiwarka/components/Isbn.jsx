import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

export default function Isbn({isbn, setIsbn} ){


  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> ISBN </label>
      <input className={styles.inputData} style={{width:"140px"}} type="text"
      value={isbn}
      onChange={(event) => {
         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
        setIsbn(event.target.value);
      }}></input>
    </div>
  );
}

//9788376218007