import React, { useContext, createContext, useState } from "react";
import styles from "./ZamowienieShort.module.css"
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _typ_elementu } from "utils/initialvalue";
import ElementCard from "./ElementCard";


const StatCard = ({ label, value, unit, variant = "blue", isError = false }) => {
  const cardClass = isError ? styles.orangeCard : styles[`${variant}Card`];
  const textClass = isError ? styles.orangeText : styles[`${variant}Text`];
  const subTextClass = isError ? styles.orangeSub : styles[`${variant}Sub`];

  return (
    <div className={`${styles.statCard} ${cardClass}`}>
      <span className={`${styles.cardLabel} ${subTextClass}`}>{label}</span>
      <div className={styles.cardValueGroup}>
        <span className={`${styles.cardValue} ${textClass}`}>{value}</span>
        <span className={`${styles.cardUnit} ${subTextClass}`}>{unit}</span>
      </div>
    </div>
  );
};













// --- Główny Komponent ---

export default function ZamowienieShort({ rowZamowienie }) {
  // Używamy mocka jeśli AppContext nie jest dostarczony z góry
  // const context = useContext(AppContext);
  const { zamowienia, setZamowienia, zamowieniaInfo } = useContext(AppContext);
  const { procesyElementowTech,elementyTech } = useContext(TechnologyContext);



  if (!rowZamowienie?.show) return null;

  const selectedCount = zamowienia?.filter(x => x.select).length || 0;
  const techCount = zamowienia?.filter(x => x.select && x.technologia_id).length || 0;
  const hasTechError = techCount !== selectedCount;

  const handleClose = () => {
    setZamowienia(
      zamowienia.map((t) =>
        t.id === rowZamowienie.id ? { ...t, show: false } : t,
      ),
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <header className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.accentBar}></div>
            <h2 className={styles.title}>Stan procesów</h2>
          </div>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.statsGrid}></div>

          <div className={styles.procesContainer}>
            
            {elementyTech
            // ?.filter((element, index, self) => index === self.findIndex((t) => t.typ_elementu === element.typ_elementu)) // pokazuje same elementy
            .map((rowElement, i) => (
            // {procesyElementowTech?.sort((a, b) => b.status - a.status).map((proces, i) => (
            <ElementCard key={i}
              rowElement={rowElement}
             
              i={i + 1}
            />
          ))}
          </div>


        </div>
      </div>
    </div>
  );
}


const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);