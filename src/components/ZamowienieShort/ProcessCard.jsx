import React, { useContext, createContext, useState } from "react";
import styles from "./ProcesCard.module.css"
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _typ_elementu } from "utils/initialvalue";



export default function ProcessCard  ({ proces,rowZamowienie,i,label, value, unit, variant = "blue", isError = false }) {
  const cardClass = isError ? styles.orangeCard : styles[`${variant}Card`];
  const textClass = isError ? styles.orangeText : styles[`${variant}Text`];
  const subTextClass = isError ? styles.orangeSub : styles[`${variant}Sub`];

  // const onClickHandler = () => {
  //   console.table(proces)
  // }
  return (

          // <div key={i}  className={styles.summaryBox}>
          <div key={i}  className={switchColorBackGround(proces.status, styles)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* <span className={styles.procesLabel}>{i}</span> */}
              {/* <span className={styles.summaryLabelProces}>{_typ_elementu.filter(x=>x.id ==proces.typ_elementu)[0].nazwa}</span> */}
              <span className={styles.summaryLabel}>{proces.nazwa}</span>
            </div>
            <div>
              {/* <span className={switchColorLabel(proces.status, styles)}><Etap proces={proces} row={rowZamowienie} styles={styles}/></span> */}
            </div>
          </div>
  );
};


  function Etap({ proces, row, styles }) {
    if (proces.status == "3") {
      return <span> W trakcie</span>;
    }

    if (proces.status == "4") {
      return <span> Zrobione.</span>;
    }

    return <span> Czeka</span>;
  }

  
    const switchColorBackGround = (status,styles) =>{
      switch(status){
        case 3 : return styles.wtrakcie
        case 4 : return styles.wtrakcie
        default: return styles.wtrakcie
      }

  }

    const switchColorLabel = (status,styles) =>{
      switch(status){
        case 3 : return styles.procesLabel
        case 4 : return styles.procesLabel
        default: return styles.procesLabel
      }

  }