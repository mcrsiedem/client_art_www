import React, { useState, useMemo, useContext } from 'react';
import { BarChart3 } from 'lucide-react';
import { AppContext } from 'context/AppContext';

const Wykres = () => {
  const [viewType, setViewType] = useState('monthly');
  const [processTab, setProcessTab] = useState('all');
  
  const appcontext = useContext(AppContext);
  const daneZamowieniaProgres = appcontext.zamowieniaProgres;

  // --- MATRYCA LIMITÓW ---
  // Konfiguracja: [KATEGORIA][INTERWAŁ]
  const LIMIT_MATRIX = {
    all: {
      daily: 40000,
      weekly: 200000,
      monthly: 800000
    },
    main: { // Druk i Falc
      daily: 30000,
      weekly: 150000,
      monthly: 500000
    },
    finishing: { // Oprawa
      daily: 5000,
      weekly: 25000,
      monthly: 80000
    }
  };

  const allConfig = [
    { key: 'przeloty_druk_zostalo', color: '#359b30', label: 'Druk', category: 'main' },
    { key: 'przeloty_falc_zostalo', color: '#30639b', label: 'Falc', category: 'main' },
    { key: 'przeloty_pur_zostalo', color: '#f59e0b', label: 'PUR', category: 'finishing' },
    { key: 'przeloty_hotmelt_zostalo', color: '#ef4444', label: 'Hotmelt', category: 'finishing' },
    { key: 'przeloty_zeszyt_zostalo', color: '#ef44d8', label: 'Zeszyt', category: 'finishing' }
  ];

  const activeConfig = useMemo(() => {
    if (processTab === 'main') return allConfig.filter(c => c.category === 'main');
    if (processTab === 'finishing') return allConfig.filter(c => c.category === 'finishing');
    return allConfig;
  }, [processTab]);

  // Dynamiczne pobieranie limitu na podstawie dwóch parametrów
  const currentLimit = useMemo(() => {
    return LIMIT_MATRIX[processTab][viewType];
  }, [processTab, viewType]);

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem', fontFamily: 'system-ui, sans-serif' },
    wrapper: { maxWidth: '98vw', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    controlsRow: { display: 'flex', gap: '20px', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' },
    buttonGroup: { display: 'flex', backgroundColor: '#fff', padding: '4px', borderRadius: '12px', border: '1px solid #e2e8f0' },
    navButton: (active, activeColor = '#30639b') => ({
      padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
      backgroundColor: active ? activeColor : 'transparent', color: active ? '#fff' : '#64748b', fontWeight: 'bold', transition: '0.2s'
    }),
    chartCard: { backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflowX: 'auto' },
    chartViewport: { 
      position: 'relative', 
      height: '450px', 
      display: 'flex', 
      alignItems: 'end', 
      gap: '4rem', 
      padding: '60px 60px 30px 60px', 
      borderBottom: '2px solid #f1f5f9', 
      minWidth: 'max-content' 
    },
    yAxis: { position: 'absolute', left: 0, top: '60px', bottom: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', fontWeight: '600' },
    targetLine: (yPos) => ({
      position: 'absolute', left: 0, right: 0, bottom: `calc(${yPos}% + 30px)`, 
      borderTop: '2px dashed #ef4444', zIndex: 10, pointerEvents: 'none',
      display: 'flex', alignItems: 'start', justifyContent: 'flex-end', transition: 'bottom 0.5s ease'
    }),
    targetLabel: { backgroundColor: '#ef4444', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', marginTop: '-12px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(239,68,68,0.3)' },
    barContainer: { width: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'end' },
    barGroup: { display: 'flex', alignItems: 'end', gap: '8px', height: '100%', width: '100%', position: 'relative' },
    barWrapper: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', height: '100%' },
    bar: (height, color) => ({ 
      width: '100%', backgroundColor: color, height: `${height}%`, borderRadius: '4px 4px 0 0', transition: 'all 0.6s ease' 
    }),
    barValue: { fontSize: '10px', fontWeight: 'bold', color: '#64748b', marginBottom: '4px', textAlign: 'center' },
    labelBox: { marginTop: '15px', textAlign: 'center' },
    mainLabel: { display: 'block', fontSize: '12px', fontWeight: '800', color: '#1e293b' }
  };

  const processedData = useMemo(() => {
    const groups = {};
    daneZamowieniaProgres.forEach(item => {
      const date = new Date(item.data_spedycji);
      let key;
      if (viewType === 'daily') {
        key = date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
      } else if (viewType === 'weekly') {
        const d = new Date(item.data_spedycji);
        d.setHours(0,0,0,0); d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const weekNo = Math.ceil((((d - new Date(d.getFullYear(),0,1))/86400000)+1)/7);
        key = `Tydzień ${weekNo}`;
      } else {
        key = date.toLocaleString('pl-PL', { month: 'long' });
      }

      if (!groups[key]) {
        groups[key] = { label: key, timestamp: date.getTime(), values: {} };
        allConfig.forEach(c => groups[key].values[c.key] = 0);
      }
      allConfig.forEach(c => { groups[key].values[c.key] += item[c.key] || 0; });
    });
    return Object.values(groups).sort((a, b) => a.timestamp - b.timestamp);
  }, [viewType, daneZamowieniaProgres]);

  const maxVal = useMemo(() => {
    const allVisibleValues = processedData.flatMap(g => activeConfig.map(c => g.values[c.key]));
    const peak = Math.max(...allVisibleValues, currentLimit, 100);
    const step = peak > 200000 ? 50000 : peak > 50000 ? 10000 : 5000;
    return Math.ceil((peak * 1.25) / step) * step; 
  }, [processedData, activeConfig, currentLimit]);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart3 color="#30639b" /> Raport Produkcji
          </h1>
        </div>

        <div style={styles.controlsRow}>
          <div style={styles.buttonGroup}>
            <button onClick={() => setProcessTab('all')} style={styles.navButton(processTab === 'all', '#64748b')}>Wszystko</button>
            <button onClick={() => setProcessTab('main')} style={styles.navButton(processTab === 'main', '#30639b')}>Druk i Falc</button>
            <button onClick={() => setProcessTab('finishing')} style={styles.navButton(processTab === 'finishing', '#f59e0b')}>Oprawa</button>
          </div>
          
          <div style={styles.buttonGroup}>
            <button onClick={() => setViewType('daily')} style={styles.navButton(viewType === 'daily')}>Dziennie</button>
            <button onClick={() => setViewType('weekly')} style={styles.navButton(viewType === 'weekly')}>Tygodniowo</button>
            <button onClick={() => setViewType('monthly')} style={styles.navButton(viewType === 'monthly')}>Miesięcznie</button>
          </div>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartViewport}>
            <div style={styles.targetLine((currentLimit / maxVal) * 100)}>
              <span style={styles.targetLabel}>Limit ({viewType}): {currentLimit.toLocaleString()}</span>
            </div>

            <div style={styles.yAxis}>
              <span>{maxVal.toLocaleString()}</span>
              <span>{(maxVal * 0.5).toLocaleString()}</span>
              <span>0</span>
            </div>

            {processedData.map((group, idx) => (
              <div key={idx} style={styles.barContainer}>
                <div style={styles.barGroup}>
                  {activeConfig.map(c => (
                    <div key={c.key} style={styles.barWrapper}>
                      <span style={styles.barValue}>
                        {group.values[c.key] > 0 ? (group.values[c.key] >= 1000 ? (group.values[c.key]/1000).toFixed(1)+'k' : group.values[c.key]) : ''}
                      </span>
                      <div 
                        title={`${c.label}: ${group.values[c.key].toLocaleString()}`}
                        style={styles.bar((group.values[c.key] / maxVal) * 100, c.color)}
                      ></div>
                    </div>
                  ))}
                </div>
                <div style={styles.labelBox}>
                  <span style={styles.mainLabel}>{group.label}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
             {activeConfig.map(c => (
              <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: c.color, borderRadius: '2px' }}></div> {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wykres;