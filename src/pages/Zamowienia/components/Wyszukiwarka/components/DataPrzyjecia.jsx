import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function DataPrzyjecia({dataPrzyjecia, setDataPrzyjecia} ){
  return(
      <div className={styles.colData_nr}>
      <label className={styles.labelData}> Przyjęcie </label>
      <input className={styles.inputData} style={{width:"130px"}} type="month"
            value={dataPrzyjecia}
            onChange={(event) => {
  
              setDataPrzyjecia(event.target.value);
              
            }}></input>
    </div>
  );
}