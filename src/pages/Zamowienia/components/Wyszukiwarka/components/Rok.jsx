import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function Rok({rok, setRok} ){
  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> Rok </label>
      <input className={styles.inputData} style={{width:"60px"}} type="text"
            value={rok}
            onChange={(event) => {
              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setRok(event.target.value);
              }
            }}></input>
    </div>
  );
}