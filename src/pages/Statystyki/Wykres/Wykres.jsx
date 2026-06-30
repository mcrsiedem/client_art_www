import React, { useState, useMemo, useContext } from 'react';
import { BarChart3 } from 'lucide-react';
import { AppContext } from 'context/AppContext';

const Wykres = () => {
  const [viewType, setViewType] = useState('monthly');
  const [processTab, setProcessTab] = useState('all');
  
  const appcontext = useContext(AppContext);
  const daneZamowieniaProgres = appcontext.zamowieniaProgres;

  // Matryca limitów - aktywne dla każdego widoku
  const LIMIT_MATRIX = {
    all: { daily: 200000, weekly: 2000000, monthly: 8000000 },
    main: { daily: 100000, weekly: 2000000, monthly: 8000000 },
    finishing: { daily: 100000, weekly: 200000, monthly: 800000 }
  };

  const allConfig = [
    { key: 'przeloty_druk_zostalo', color: '#359b30', label: 'Druk', category: 'main' },
    { key: 'przeloty_falc_zostalo', color: '#30639b', label: 'Falc', category: 'main' },
    { key: 'przeloty_pur_zostalo', color: '#f59e0b', label: 'PUR', category: 'finishing' },
    { key: 'przeloty_hotmelt_zostalo', color: '#ef4444', label: 'Hotmelt', category: 'finishing' },
    { key: 'przeloty_zeszyt_zostalo', color: '#36a3b6be', label: 'Zeszyt', category: 'finishing' }
  ];

  const formatValue = (val) => {
    if (!val || val <= 0) return '';
    if (val >= 1000000) return (val / 1000000).toFixed(3) + ' mln';
    if (val >= 1000) return (val / 1000).toFixed(1) + ' k';
    return val;
  };

  const activeConfig = useMemo(() => {
    if (processTab === 'main') return allConfig.filter(c => c.category === 'main');
    if (processTab === 'finishing') return allConfig.filter(c => c.category === 'finishing');
    return allConfig;
  }, [processTab]);

  const currentLimit = useMemo(() => LIMIT_MATRIX[processTab][viewType], [processTab, viewType]);

  const getWeekRange = (date) => {
    const d = new Date(date);
    const day = d.getDay() || 7;
    const monday = new Date(d);
    monday.setDate(d.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const f = (dt) => dt.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    return `${f(monday)} - ${f(sunday)}`;
  };

  // Grupowanie danych z rozbiciem na główny proces i harmonogram
  const processedData = useMemo(() => {
    const groups = {};
    daneZamowieniaProgres.forEach(item => {
      const date = new Date(item.data_spedycji);
      let key, subLabel = "";
      
      if (viewType === 'daily') {
        key = date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
        subLabel = date.toLocaleDateString('pl-PL', { weekday: 'short' });
      } else if (viewType === 'weekly') {
        const d = new Date(date);
        d.setHours(0,0,0,0); d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const weekNo = Math.ceil((((d - new Date(d.getFullYear(),0,1))/86400000)+1)/7);
        key = `Tydzień ${weekNo}`;
        subLabel = getWeekRange(date);
      } else {
        key = date.toLocaleString('pl-PL', { month: 'long' });
        subLabel = date.getFullYear();
      }

      if (!groups[key]) {
        groups[key] = { label: key, subLabel, timestamp: date.getTime(), values: {} };
        allConfig.forEach(c => {
          groups[key].values[c.key] = { main: 0, schedule: 0, total: 0 };
        });
      }

      allConfig.forEach(c => {
        const val = item[c.key] || 0;
        if (Number(item.etap) === 1) {
          groups[key].values[c.key].schedule += val;
        } else if (Number(item.etap) > 1) {
          groups[key].values[c.key].main += val;
        }
        groups[key].values[c.key].total += val;
      });
    });
    return Object.values(groups).sort((a, b) => a.timestamp - b.timestamp);
  }, [viewType, daneZamowieniaProgres]);

  // Dynamiczne obliczanie maxVal na osi Y (uwzględnia łączną sumę etapów)
  const maxVal = useMemo(() => {
    const allVisibleValues = processedData.flatMap(g => activeConfig.map(c => g.values[c.key].total));
    const peakReference = Math.max(...allVisibleValues, currentLimit, 100);
    const step = peakReference > 200000 ? 50000 : 10000;
    return Math.ceil((peakReference * 1.25) / step) * step; 
  }, [processedData, activeConfig, currentLimit]);

  // Obliczanie sum końcowych do dolnej legendy
  const totals = useMemo(() => {
    const sums = {};
    allConfig.forEach(c => {
      sums[c.key] = processedData.reduce((acc, group) => acc + (group.values[c.key]?.total || 0), 0);
    });
    return sums;
  }, [processedData]);

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem', fontFamily: 'system-ui, sans-serif' },
    wrapper: { maxWidth: '98vw', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    buttonGroup: { display: 'flex', backgroundColor: '#fff', padding: '4px', borderRadius: '12px', border: '1px solid #e2e8f0' },
    navButton: (active, activeColor = '#30639b') => ({
      padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
      backgroundColor: active ? activeColor : '#f1f5f9', color: active ? '#fff' : '#64748b', fontWeight: 'bold', fontSize: '13px'
    }),
    chartCard: { backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 20px -5px rgb(0 0 0 / 0.1)' },
    scrollContainer: { overflowX: 'auto', paddingBottom: '15px', scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' },
    chartArea: { position: 'relative', height: '420px', padding: '40px 0 0 80px', minWidth: 'max-content' },
    chartViewport: { position: 'relative', height: '100%', display: 'flex', alignItems: 'end', gap: '9rem', paddingRight: '40px' },
    yAxis: { position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', fontWeight: '600', width: '70px', borderRight: '1px dashed #e2e8f0', paddingBottom: '45px', boxSizing: 'border-box' },
    targetLine: (yPos) => ({
      position: 'absolute', left: 0, right: 0, bottom: `calc(${yPos}% + 45px)`, 
      borderTop: '2px dashed #ef4444', zIndex: 10, pointerEvents: 'none',
      display: 'flex', alignItems: 'start', justifyContent: 'flex-end', transition: 'bottom 0.5s ease'
    }),
    targetLabel: { backgroundColor: '#ef4444', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', marginTop: '-10px', fontWeight: 'bold' },
    barContainer: { width: '130px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'end' },
    barGroup: { display: 'flex', alignItems: 'end', gap: '6px', height: '100%', borderBottom: '2px solid #f1f5f9', paddingBottom: '2px' },
    // Poprawiony barWrapper - wysokość zależy teraz od realnej sumy wartości słupka
    barWrapper: (totalHeight) => ({ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'end', 
      height: `${totalHeight}%`,
      minHeight: '25px', // Zapewnia bezpieczną przestrzeń na etykietę tekstową, nawet gdy wartość wynosi 0
      transition: 'height 0.6s ease'
    }),
    // Elastyczny stack dopasowany do wysokości wrappera
    barStack: { 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'end', 
      height: '100%' 
    },
    // Segmenty liczą swój procent względem całkowitej wysokości wrappera słupka
    barSegment: (segmentShare, color, isSchedule) => ({
      width: '100%',
      backgroundColor: color,
      height: `${segmentShare}%`,
      transition: 'all 0.6s ease',
      opacity: isSchedule ? 0.45 : 1, 
      borderTop: isSchedule ? '1px dashed rgba(255,255,255,0.4)' : 'none'
    }),
    barValue: { fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '6px', textAlign: 'center', whiteSpace: 'nowrap', display: 'block', width: '100%' },
    labelBox: { height: '45px', marginTop: '12px', textAlign: 'center' },
    mainLabel: { display: 'block', fontSize: '13px', fontWeight: '800', color: '#1e293b' },
    subLabel: { display: 'block', fontSize: '10px', color: '#94a3b8', marginTop: '2px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' }}>
            <BarChart3 color="#30639b" size={32} /> Przeloty do wykonania
          </h1>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={styles.buttonGroup}>
              {['all', 'main', 'finishing'].map(cat => (
                <button key={cat} onClick={() => setProcessTab(cat)} style={styles.navButton(processTab === cat, cat === 'finishing' ? '#f59e0b' : '#30639b')}>
                  {cat === 'all' ? 'Wszystko' : cat === 'main' ? 'Druk i Falc' : 'Oprawa'}
                </button>
              ))}
            </div>
            <div style={styles.buttonGroup}>
              {['daily', 'weekly', 'monthly'].map(t => (
                <button key={t} onClick={() => setViewType(t)} style={styles.navButton(viewType === t)}>
                  {t === 'daily' ? 'Dziennie' : t === 'weekly' ? 'Tygodniowo' : 'Miesięcznie'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.scrollContainer}>
            <div style={styles.chartArea}>
              <div style={styles.yAxis}>
                <span>{maxVal.toLocaleString()}</span>
                <span>{(maxVal * 0.75).toLocaleString()}</span>
                <span>{(maxVal * 0.5).toLocaleString()}</span>
                <span>{(maxVal * 0.25).toLocaleString()}</span>
                <span>0</span>
              </div>

              <div style={styles.chartViewport}>
                {/* Linia limitu */}
                <div style={styles.targetLine((currentLimit / maxVal) * 100)}>
                  <span style={styles.targetLabel}>LIMIT: {currentLimit.toLocaleString()}</span>
                </div>

                {processedData.map((group, idx) => (
                  <div key={idx} style={styles.barContainer}>
                    <div style={styles.barGroup}>
                      {activeConfig.map(c => {
                        const dataObj = group.values[c.key] || { main: 0, schedule: 0, total: 0 };
                        
                        // Wyliczamy całkowitą wysokość słupka w odniesieniu do osi Y wykresu (maxVal)
                        const totalHeight = (dataObj.total / maxVal) * 100;
                        
                        // Wyliczamy udział procentowy segmentów wewnątrz tej wysokości (suma musi dać 100% wysokości wrappera)
                        const mainShare = dataObj.total > 0 ? (dataObj.main / dataObj.total) * 100 : 0;
                        const scheduleShare = dataObj.total > 0 ? (dataObj.schedule / dataObj.total) * 100 : 0;

                        return (
                          <div key={c.key} style={styles.barWrapper(totalHeight)}>
                            <span title={`${c.label} (Suma: ${dataObj.total})`} style={styles.barValue}>
                              {formatValue(dataObj.total)}
                            </span>
                            
                            <div style={styles.barStack}>
                              {/* Część górna: Harmonogram (etap == 1) */}
                              {dataObj.schedule > 0 && (
                                <div 
                                  title={`Harmonogram: ${dataObj.schedule.toLocaleString()}`}
                                  style={{
                                    ...styles.barSegment(scheduleShare, c.color, true),
                                    borderRadius: '4px 4px 0 0'
                                  }}
                                />
                              )}

                              {/* Część dolna: Główna (etap > 1) */}
                              {dataObj.main > 0 && (
                                <div 
                                  title={`W toku: ${dataObj.main.toLocaleString()}`}
                                  style={{
                                    ...styles.barSegment(mainShare, c.color, false),
                                    borderRadius: dataObj.schedule > 0 ? '0 0 0 0' : '4px 4px 0 0' 
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={styles.labelBox}>
                      <span style={styles.mainLabel}>{group.label}</span>
                      <span style={styles.subLabel}>{group.subLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Legenda główna z sumami */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '130px', marginTop: '40px', padding: '20px', borderTop: '1px solid #f1f5f9' }}>
            {activeConfig.map(c => (
              <div key={c.key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700', color: '#64748b' }}>
                  <div style={{ width: '24px', height: '24px', backgroundColor: c.color, borderRadius: '4px' }}></div> 
                  {c.label}
                </div>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#64748b', marginLeft: '10px' }}>
                  {totals[c.key] > 0 ? formatValue(totals[c.key]) : '0'}
                </span>
              </div>
            ))}
          </div>

          {/* Pomocnicza legenda podziału słupka */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', fontSize: '12px', color: '#64748b', marginTop: '-5px', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: '#596575', borderRadius: '3px' }}></div> Zamówienia
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: '#94a3b8', borderRadius: '3px', opacity: 0.45, borderTop: '1px dashed rgba(0,0,0,0.2)' }}></div> Harmonogram 
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Wykres;