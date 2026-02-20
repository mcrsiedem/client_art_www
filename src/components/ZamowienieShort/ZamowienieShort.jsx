import React, { useContext, createContext, useState } from "react";
import styles from "./ZamowienieShort.module.css"
import { AppContext } from "context/AppContext";


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

const ProgressItem = ({ label, current, total, unit, color = "#2563eb" }) => {
  const percentage = Math.round((current / total) * 100) || 0;
  const isFinished = percentage >= 100;
  const fillColor = isFinished ? "#10b981" : color;
  const zostalo = total - current;

  return (
    <div className={styles.progressItem}>
      <div className={styles.progressHeader}>
        <span className={styles.progressTitle}>{label}</span>
        <span className={styles.progressPercent} style={{ color: fillColor }}>
          {percentage}%
        </span>
      </div>
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBarFill} 
          style={{ width: `${percentage}%`, backgroundColor: fillColor }}
        />
      </div>
      <div className={styles.progressFooter}>
        <span className={styles.footerText}>Zakończono: {current.toLocaleString()} {unit}</span>
        <span className={styles.footerText}>Całość: {total.toLocaleString()} ark.</span>
        {zostalo > 0 && (
          <span className={styles.footerText}>
            Zostało: <span className={styles.footerTextYellow}>{zostalo.toLocaleString()} </span> ark.
          </span>
        )}  
      </div>
    </div>
  );
};

// --- Główny Komponent ---

export default function ZamowienieShort({ rowZamowienie }) {
  // Używamy mocka jeśli AppContext nie jest dostarczony z góry
  // const context = useContext(AppContext);
  const { zamowienia, setZamowienia, zamowieniaInfo } = useContext(AppContext);

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
            <h2 className={styles.title}>Stan Produkcji</h2>
          </div>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.statsGrid}>
            <StatCard 
              label="Aktywne zamówienia" 
              value={selectedCount} 
              unit="szt." 
            />
            <StatCard 
              label="Przypisane technologie" 
              value={techCount} 
              unit={`/ ${selectedCount}`} 
              isError={hasTechError}
              variant="green"
            />
          </div>

          <div className={styles.sectionDivider}>
            <span className={styles.dividerLabel}>Status Przelotów</span>
            <div className={styles.line}></div>
          </div>

          <ProgressItem 
            label="Druk"
            current={zamowieniaInfo.przeloty_druk_zakonczone}
            total={zamowieniaInfo.przeloty_druk}
            unit="ark."
          />

          <ProgressItem 
            label="Falcowanie"
            current={zamowieniaInfo.przeloty_falc_zakonczone}
            total={zamowieniaInfo.przeloty_falc}
            unit="ark."
            color="#6366f1"
          />

          <div className={styles.summaryBoxKlejona}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className={styles.summaryLabel}>Zeszyt</span>
              <span style={{ marginLeft: '4px', color: '#cbd5e1' }}>szt.</span>
            </div>
            <div>
              <span className={styles.summaryLabel}>Kolbus</span>
              <span style={{ marginLeft: '4px', color: '#cbd5e1' }}>szt.</span>
            </div>
          </div>

          <div className={styles.summaryBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className={styles.summaryLabel}>Całkowity nakład</span>
            </div>
            <div>
              <span style={{ marginLeft: '4px', color: '#cbd5e1' }}>szt.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponent opakowujący dla podglądu (Demo)
// export function App() {
//   const [zamowienia, setZamowienia] = useState([
//     { id: 1, select: true, technologia_id: 101, show: true },
//     { id: 2, select: true, technologia_id: null, show: true }
//   ]);

//   const zamowieniaInfo = {
//     przeloty_druk: 12500,
//     przeloty_druk_zakonczone: 9400,
//     przeloty_falc: 10000,
//     przeloty_falc_zakonczone: 4500,
//     naklad: 5000
//   };

//   return (
//     <AppContext.Provider value={{ zamowienia, setZamowienia, zamowieniaInfo }}>
//       <ZamowienieShort rowZamowienie={zamowienia[0]} />
//     </AppContext.Provider>
//   );
// }

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);