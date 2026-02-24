import React, { useContext, createContext, useState } from "react";
import styles from "./ElementCard.module.css"
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _typ_elementu } from "utils/initialvalue";



export default function ElementCard ({ rowElement,i }) {

  const { procesyElementowTech } = useContext(TechnologyContext);

  return (

          // <div key={i}  className={styles.summaryBox}>
          <div key={i}  className={styles.elementCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className={styles.elementLabelIndeks}>{i}</span>
              <span className={styles.elementLabelName}>{_typ_elementu.filter(x=>x.id ==rowElement.typ)[0].nazwa}</span>
              <span className={styles.elementLabelNameMini}>{rowElement.nazwa}</span>
            </div>
            <div>
              {/* <span className={switchColorLabel(proces.status, styles)}><Etap proces={proces} row={rowZamowienie} styles={styles}/></span> */}
            </div>
          </div>
  );
};
