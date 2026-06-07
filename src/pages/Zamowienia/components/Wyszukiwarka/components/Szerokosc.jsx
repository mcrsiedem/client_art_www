import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function Szerokosc({szerokosc, setSzerokosc} ){
  return(
      <div className={styles.colData_nr}>
      <label className={styles.labelData}> Szerokość </label>
      <input className={styles.inputData} style={{width:"80px"}} type="text"
            value={szerokosc}
            onChange={(event) => {
              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setSzerokosc(event.target.value);
              }
            }}></input>
    </div>
  );
}