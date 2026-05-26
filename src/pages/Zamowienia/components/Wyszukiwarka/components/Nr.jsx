import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function Nr({nr, setNr} ){
  return(
      <div className={styles.colData_nr}>
      <label className={styles.labelData}> Nr </label>
      <input className={styles.inputData} style={{width:"60px"}} type="text"
            value={nr}
            onChange={(event) => {
              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setNr(event.target.value);
              }
            }}></input>
    </div>
  );
}