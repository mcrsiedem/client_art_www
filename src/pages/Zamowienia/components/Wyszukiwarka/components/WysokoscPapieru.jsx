import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function WysokoscPapieru({arkusz_wysokosc, setArkusz_wysokosc} ){
  return(
      <div className={styles.colData_nr}>
      <label className={styles.labelData}> Papier wys. </label>
      <input className={styles.inputData} style={{width:"95px"}} type="text"
            value={arkusz_wysokosc}
            onChange={(event) => {
              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setArkusz_wysokosc(event.target.value);
              }
            }}></input>
    </div>
  );
}