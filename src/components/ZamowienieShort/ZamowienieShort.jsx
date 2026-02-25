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






const data = [
  {
    id: 1,
    typ: 1,
    nazwa: 'Okładka',
    pliki: '10-10-2026',
    akcept: '11-10-2026',
    procesy: [
      { id: 1, typ: 1, nazwa_procesu: 'druk', status: 'Zakończone' },
      { id: 2, typ: 2, nazwa_procesu: 'uszalachetnianie', status: 'W trakcie' }
    ]
  },
  {
    id: 2,
    typ: 2,
    nazwa: 'Środek',
    pliki: '10-10-2026',
    akcept: '11-10-2026',
    procesy: [
      { id: 1, typ: 1, nazwa_procesu: 'druk', status: 'W trakcie' },
      { id: 2, typ: 3, nazwa_procesu: 'Falcowanie', status: 'Czeka' }
    ]
  }
];

const styles2 = `
  .dashboard-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #2d3436;
    background-color: #f8f9fa;
    padding: 2rem;
    min-height: 100vh;
  }

  .header {
    margin-bottom: 2.5rem;
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 1rem;
  }

  .header h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e272e;
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
    transition: transform 0.2s ease;
    border: 1px solid #f1f2f6;
  }

  .card:hover {
    // transform: translateY(-4px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .badge-typ {
    background: #0984e3;
    color: white;
    font-size: 0.75rem;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .card h2 {
    font-size: 1.25rem;
    margin: 0;
    color: #2d3436;
  }

  .dates-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    background: #f1f2f6;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .date-item {
    display: flex;
    flex-direction: column;
  }

  .date-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #636e72;
    margin-bottom: 4px;
  }

  .date-value {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .process-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .process-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-radius: 6px;
    background: #fff;
    border-left: 4px solid #dfe6e9;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  /* Dynamic border colors based on status */
  .status-zakonczone { border-left-color: #00b894; }
  .status-w-trakcie { border-left-color: #fdcb6e; }
  .status-czeka { border-left-color: #b2bec3; }

  .process-info {
    display: flex;
    flex-direction: column;
  }

  .process-name {
    font-weight: 500;
    font-size: 0.95rem;
    text-transform: capitalize;
  }

  .status-pill {
    font-size: 0.75rem;
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 500;
  }

  .pill-zakonczone { background: #e6fffb; color: #00b894; border: 1px solid #b7eb8f; }
  .pill-w-trakcie { background: #fffbe6; color: #d48806; border: 1px solid #ffe58f; }
  .pill-czeka { background: #f5f5f5; color: #8c8c8c; border: 1px solid #d9d9d9; }
`;






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


  const StatusPill = ({ status }) => {
  const normalized = status.toLowerCase().replace(' ', '-');
  let className = 'status-pill ';
  
  if (normalized === 'zakończone') className += 'pill-zakonczone';
  else if (normalized === 'w-trakcie') className += 'pill-w-trakcie';
  else className += 'pill-czeka';

  return <span className={className}>{status}</span>;
};

const getProcessClass = (status) => {
  const normalized = status.toLowerCase().replace(' ', '-');
  if (normalized === 'zakończone') return 'status-zakonczone';
  if (normalized === 'w-trakcie') return 'status-w-trakcie';
  return 'status-czeka';
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
            
            {/* {elementyTech
            // ?.filter((element, index, self) => index === self.findIndex((t) => t.typ_elementu === element.typ_elementu)) // pokazuje same elementy
            .map((rowElement, i) => (
            // {procesyElementowTech?.sort((a, b) => b.status - a.status).map((proces, i) => (
            <ElementCard key={i}
              rowElement={rowElement}
             
              i={i + 1}
            />
          ))} */}


<div className="grid">
  <style>{styles2}</style>
        {data.map((item) => (
          <div key={item.id} className="card">
            <div className="card-header">
              <div className="title-group">
                <span className="badge-typ">Element {item.typ}</span>
                <h2>{item.nazwa}</h2>
              </div>
            </div>

            <div className="dates-grid">
              <div className="date-item">
                <span className="date-label">Pliki dostarczone</span>
                <span className="date-value">{item.pliki}</span>
              </div>
              <div className="date-item">
                <span className="date-label">Akceptacja klienta</span>
                <span className="date-value">{item.akcept}</span>
              </div>
            </div>

            <div className="process-list">
              <h3 style={{ fontSize: '0.85rem', color: '#636e72', marginBottom: '0.5rem' }}>
                Etapy Realizacji
              </h3>
              {item.procesy.map((proces) => (
                <div 
                  key={proces.id} 
                  className={`process-item ${getProcessClass(proces.status)}`}
                >
                  <div className="process-info">
                    <span className="process-name">{proces.nazwa_procesu}</span>
                  </div>
                  <StatusPill status={proces.status} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>







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