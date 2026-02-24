import React, { useContext, createContext, useState } from "react";
import styles from "./ElementCard.module.css"
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _typ_elementu } from "utils/initialvalue";
import ProcessCard from "./ProcessCard";



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
            <div className={styles.procesContainer}>

                          {procesyElementowTech
                          .filter(x => x.typ_elementu == rowElement.typ)
                          // ?.filter((element, index, self) => index === self.findIndex((t) => t.typ_elementu === element.typ_elementu)) // pokazuje same elementy
                          .map((proces, i) => (
                          // {procesyElementowTech?.sort((a, b) => b.status - a.status).map((proces, i) => (
                          <ProcessCard key={i}
                            proces={proces}
                            i={i + 1}
                          />
                        ))}
            </div>
          </div>
  );
};


