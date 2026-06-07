import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function SzerokoscPapieru({arkusz_szerokosc, setArkusz_szerokosc} ){
  return(
      <div className={styles.colData_nr}>
      <label className={styles.labelData}> Papier szer. </label>
      <input className={styles.inputData} style={{width:"95px"}} type="text"
            value={arkusz_szerokosc}
            onChange={(event) => {
              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setArkusz_szerokosc(event.target.value);
              }
            }}></input>
    </div>
  );
}