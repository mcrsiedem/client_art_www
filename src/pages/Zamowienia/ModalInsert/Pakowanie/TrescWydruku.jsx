// MojaZawartosc.jsx
import React, { useEffect } from 'react';
import styles from './TrescWydruku.module.css'; // Importujemy moduł

const TrescWydruku = ({ onButtonClick,row, daneZamowienia}) => {



  return (
    // Używamy klas z modułu CSS
    <div className={styles.kontener}>
      <h1>{daneZamowienia.nr+ " / "+daneZamowienia.rok+" "+ daneZamowienia.klient}</h1>
      <h3>{daneZamowienia.tytul}</h3>
      <hr></hr>
      <p className={styles.ha3}> Uwagi do pakowania:</p>
      <p>{row.uwagi}</p>
      <hr></hr>

      <p>Wydrukowano: {new Date().toLocaleDateString()}  - {new Date().toLocaleTimeString()}</p>
      {/* <button  onClick={()=>{ window.print()}} className={styles.przycisk} onClick={onButtonClick}> */}
      {/* <button  className={styles.przycisk} onClick={onButtonClick}>
       Drukuj
      </button> */}
    </div>
  );
};

export default TrescWydruku;