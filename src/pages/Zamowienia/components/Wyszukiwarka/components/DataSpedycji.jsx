import React, {  } from 'react';
import styles from '../Wyszukiwarka.module.css';

  export default function DataSpedycji({dataSpedycji, setDataSpedycji} ){
  return(
      <div className={styles.colData_nr}>
      <label className={styles.labelData}> Spedycja </label>
      <input className={styles.inputData} style={{width:"130px"}} type="month"
            value={dataSpedycji}
            onChange={(event) => {
  
              setDataSpedycji(event.target.value);
              
            }}></input>
    </div>
  );
}