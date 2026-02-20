import { AppContext } from "context/AppContext";
import React, { useContext, createContext, useState } from "react";
import styles from "./ZamowienieShort.module.css"

// Mock AppContext do celów podglądu




// --- Sub-komponenty ---

const StatCard = ({ label, value, unit, variant = "blue", isError = false }) => {
  const cardClass = isError ? "orangeCard" : `${variant}Card`;
  const textClass = isError ? "orangeText" : `${variant}Text`;
  const subTextClass = isError ? "orangeSub" : `${variant}Sub`;

  return (
    <div className={`statCard ${cardClass}`}>
      <span className={`cardLabel ${subTextClass}`}>{label}</span>
      <div className="cardValueGroup">
        <span className={`cardValue ${textClass}`}>{value}</span>
        <span className={`cardUnit ${subTextClass}`}>{unit}</span>
        {/* {isError && <div className="badge">Braki</div>} */}
      </div>
    </div>
  );
};

const ProgressItem = ({ label, current, total, unit, color = "#2563eb" }) => {
  const percentage = Math.round((current / total) * 100) || 0;
  const isFinished = percentage >= 100;
  const fillColor = isFinished ? "#10b981" : color;
  const zostalo = total - current

  return (
    <div className="progressItem">
      <div className="progressHeader">
        <span className="progressTitle">{label}</span>
        <span className="progressPercent" style={{ color: fillColor }}>
          {percentage}%
        </span>
      </div>
      <div className="progressBarContainer">
        <div 
          className="progressBarFill" 
          style={{ width: `${percentage}%`, backgroundColor: fillColor }}
        />
      </div>
      <div className="progressFooter">
        <span className="footerText">Zakończono: {current.toLocaleString()} {unit}</span>
        <span className="footerText">Całość: {total.toLocaleString()} ark.</span>
      {zostalo > 0 && <span className="footerText">Zostało: <span className="footerTextYellow">{zostalo.toLocaleString()} </span>  ark.</span>}  
      </div>
    </div>
  );
};

// --- Główny Komponent ---

export default function ZamowienieShort({rowZamowienie}) {
  const { showZamowieniaInfo, setShowZamowieniaInfo, setZamowienia,zamowienia, zamowieniaInfo } = useContext(AppContext);

  if (!rowZamowienie.show) return null;

  const selectedCount = zamowienia.filter(x => x.select).length;
  const techCount = zamowienia.filter(x => x.select && x.technologia_id).length;
  const hasTechError = techCount !== selectedCount;

  return (
    <div className="overlay">
      <style>{`
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          background-color: rgba(15, 23, 42, 0.5);
          // backdrop-filter: blur(4px);
          padding-top: 3rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .window {
          position: relative;
          width: 100%;
          max-width: 600px;
          background-color: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          margin: 0 1rem;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .headerTitleGroup {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .accentBar {
          width: 4px;
          height: 1.5rem;
          background-color: #2563eb;
          border-radius: 9999px;
        }
        .title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        .closeButton {
          padding: 0.5rem;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          border-radius: 9999px;
          display: flex;
          transition: background-color 0.2s;
        }
        .closeButton:hover {
          background-color: #f1f5f9;
        }
        .content {
          padding: 1.5rem;
        }
        .statsGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .statCard {
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid #f1f5f9;
        }
        .cardLabel {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
          letter-spacing: 0.025em;
        }
        .cardValueGroup {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }
        .cardValue {
          font-size: 1.875rem;
          font-weight: 900;
        }
        .cardUnit {
          font-size: 0.875rem;
          font-weight: 600;
        }
        .blueCard { background-color: #eff6ff; border-color: #dbeafe; }
        .blueText { color: #2563eb; }
        .blueSub { color: rgba(37, 99, 235, 0.7); }
        .greenCard { background-color: #f0fdf4; border-color: #dcfce7; }
        .greenText { color: #10b981; }
        .greenSub { color: rgba(16, 185, 129, 0.7); }
        .orangeCard { background-color: #fff7ed; border-color: #ffedd5; }
        .orangeText { color: #f97316; }
        .orangeSub { color: rgba(249, 115, 22, 0.7); }
        .badge {
          margin-left: auto;
          padding: 0.125rem 0.5rem;
          background-color: #fed7aa;
          color: #9a3412;
          font-size: 0.625rem;
          font-weight: 900;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .sectionDivider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .dividerLabel {
          font-size: 0.65rem;
          font-weight: 900;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .line {
          height: 1px;
          background-color: #f1f5f9;
          flex: 1;
        }
        .progressItem { margin-bottom: 1.5rem; }
        .progressHeader { display: flex; justify-content: space-between; margin-bottom: 0.5rem; align-items: flex-end; }
        .progressTitle { font-size: 0.875rem; font-weight: 700; color: #334155; }
        .progressPercent { font-size: 0.875rem; font-weight: 900; }
        .progressBarContainer { height: 0.625rem; background-color: #f1f5f9; border-radius: 9999px; overflow: hidden; }
        .progressBarFill { height: 100%; transition: width 0.7s ease-out; }
        .progressFooter { display: flex; justify-content: space-between; margin-top: 0.4rem; }
        .footerText { font-size: 0.8rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
        .footerTextYellow { padding: 5px; font-size: 0.9rem; color: #f31409; font-weight: 700; text-transform: uppercase; }
        .summaryBox {
          margin-top: 2rem;
          background-color: #1e293b;
          border-radius: 0.75rem;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
        }

                .summaryBoxKlejona {
          margin-top: 2rem;
          background-color: #1e3b30c4;
          border-radius: 0.75rem;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
        }

                        .summaryBoxZeszyt {
          margin-top: 2rem;
          background-color: #ff9100;
          border-radius: 0.75rem;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
        }

        .summaryLabel { color: #cbd5e1; font-weight: 500; }
        .summaryValue { font-size: 1.5rem; font-weight: 900; }
      `}</style>

      <div className="window">
        <header className="header">
          <div className="headerTitleGroup">
            <div className="accentBar"></div>
            <h2 className="title">Stan Produkcji</h2>
          </div>
          <button 
            className="closeButton" 
            onClick={() =>     setZamowienia(
      zamowienia.map((t) => {
        if (t.id == rowZamowienie.id) {
          return {...t,
            show: false,
          }
        } else {
          return t;
        }
      })
    )}
          >
            <CloseIcon />
          </button>
        </header>

        <div className="content">
          <div className="statsGrid">
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

          <div className="sectionDivider">
            <span className="dividerLabel">Status Przelotów</span>
            <div className="line"></div>
          </div>
{/* 
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
          /> */}




          <div className="summaryBoxKlejona">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
              <span className="summaryLabel">Zeszyt</span>
              {/* <span className="summaryValue">{zamowieniaInfo.naklad_zeszyt.toLocaleString()}</span> */}
              <span style={{ marginLeft: '4px', color: '#94a3b8' }}>szt.</span>
            </div>
            <div>
              
              <span className="summaryLabel"> Kolbus </span>
              {/* <span className="summaryValue">{zamowieniaInfo.naklad_klejona.toLocaleString()}</span> */}
              <span style={{ marginLeft: '4px', color: '#94a3b8' }}>szt.</span>
            </div>
            
          </div>


          <div className="summaryBox">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* <StackIcon />  */}
              <span className="summaryLabel">Całkowity nakład</span>
            </div>
            <div>
              {/* <span className="summaryValue">{zamowieniaInfo.naklad.toLocaleString()}</span> */}
              <span style={{ marginLeft: '4px', color: '#94a3b8' }}>szt.</span>
            </div>
            
          </div>











        </div>
      </div>
    </div>
  );
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const StackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#60a5fa'}}><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
);

