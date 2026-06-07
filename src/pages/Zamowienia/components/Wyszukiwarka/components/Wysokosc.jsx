import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function Wysokosc({wysokosc, setWysokosc} ){
  return(
      <div className={styles.colData_nr}>
      <label className={styles.labelData}> Wysokosc </label>
      <input className={styles.inputData} style={{width:"80px"}} type="text"
            value={wysokosc}
            onChange={(event) => {
              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setWysokosc(event.target.value);
              }
            }}></input>
    </div>
  );
}