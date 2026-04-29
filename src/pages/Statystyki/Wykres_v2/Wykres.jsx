import React, { useState, useMemo, useContext } from 'react';
import { Calendar, BarChart3, Clock, CheckCircle2 } from 'lucide-react';
import { AppContext } from 'context/AppContext';

const Wykres = () => {
  const [viewType, setViewType] = useState('weekly');
  const appcontext = useContext(AppContext);
  
    const daneZamowieniaProgres = appcontext.zamowieniaProgres;



  // Konfiguracja procesów: klucze z JSON, kolory i etykiety
  const config = [
    { key: 'przeloty_druk_zostalo', color: '#359b30', label: 'Druk' },
    { key: 'przeloty_falc_zostalo', color: '#30639b', label: 'Falc' },
    { key: 'przeloty_pur_zostalo', color: '#f59e0b', label: 'PUR' },
    { key: 'przeloty_hotmelt_zostalo', color: '#ef4444', label: 'Hotmelt' },
    { key: 'przeloty_zeszyt_zostalo', color: '#ef44d8', label: 'Zeszyt' }
  ];

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem', fontFamily: 'system-ui, sans-serif' },
    wrapper: { maxWidth: '98vw', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    buttonGroup: { display: 'flex', backgroundColor: '#fff', padding: '4px', borderRadius: '12px', border: '1px solid #e2e8f0' },
    navButton: (active) => ({
      padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
      backgroundColor: active ? '#30639b' : 'transparent', color: active ? '#fff' : '#64748b', fontWeight: 'bold'
    }),
    chartCard: { backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflowX: 'auto' },
    chartViewport: { position: 'relative', height: '400px', display: 'flex', alignItems: 'end', gap: '4rem', padding: '0 60px', borderBottom: '2px solid #f1f5f9', minWidth: 'max-content' },
    yAxis: { position: 'absolute', left: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', fontWeight: '600' },
    barContainer: { width: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'end' },
    barGroup: { display: 'flex', alignItems: 'end', gap: '4px', height: '100%', width: '100%' },
    bar: (height, color) => ({ flex: 1, backgroundColor: color, height: `${height}%`, borderRadius: '4px 4px 0 0', transition: 'all 0.6s ease' }),
    labelBox: { marginTop: '15px', textAlign: 'center' },
    mainLabel: { display: 'block', fontSize: '13px', fontWeight: '800', color: '#1e293b' },
    subLabel: { display: 'block', fontSize: '11px', color: '#94a3b8' }
  };

  const getWeekInfo = (dateStr) => {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    const monday = new Date(d); monday.setDate(d.getDate() - 3);
    const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
    const f = (date) => date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    return { label: `Tydzień ${weekNo}`, range: `${f(monday)} - ${f(sunday)}` };
  };

  const processedData = useMemo(() => {
    const groups = {};

    daneZamowieniaProgres.forEach(item => {
      const date = new Date(item.data_spedycji);
      let key, range;

      if (viewType === 'weekly') {
        const info = getWeekInfo(item.data_spedycji);
        key = info.label;
        range = info.range;
      } else {
        key = date.toLocaleString('pl-PL', { month: 'long', year: 'numeric' });
        range = "Suma miesięczna";
      }

      if (!groups[key]) {
        groups[key] = { 
          label: key, 
          range, 
          timestamp: date.getTime(),
          values: { przeloty_druk_zostalo: 0, przeloty_falc_zostalo: 0, przeloty_pur_zostalo: 0, przeloty_hotmelt_zostalo: 0,przeloty_zeszyt_zostalo: 0 }
        };
      }

      // Sumowanie wartości dla danej grupy (tygodnia/miesiąca)
      config.forEach(c => {
        groups[key].values[c.key] += item[c.key] || 0;
      });
    });

    return Object.values(groups).sort((a, b) => a.timestamp - b.timestamp);
  }, [viewType]);

  const maxVal = useMemo(() => {
    const allSums = processedData.flatMap(g => Object.values(g.values));
    const peak = Math.max(...allSums, 1000);
    return Math.ceil(peak / 5000) * 5000;
  }, [processedData]);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div>
            <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BarChart3 color="#30639b" /> Raport Produkcji
            </h1>
            <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Suma przelotów do wykonania w okresach</p>
          </div>
          <div style={styles.buttonGroup}>
            {['weekly', 'monthly'].map(t => (
              <button key={t} onClick={() => setViewType(t)} style={styles.navButton(viewType === t)}>
                {t === 'weekly' ? 'Tygodniowo' : 'Miesięcznie'}
              </button>
            ))}


          </div>
        </div>

        <div style={styles.chartCard}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginBottom: '30px' }}>
            {config.map(c => (
              <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: c.color, borderRadius: '2px' }}></div> {c.label}
              </div>
            ))}
          </div>

          <div style={styles.chartViewport}>
            <div style={styles.yAxis}>
              <span>{maxVal.toLocaleString()}</span>
              <span>{(maxVal * 0.5).toLocaleString()}</span>
              <span>0</span>
            </div>

            {processedData.map((group, idx) => (
              <div key={idx} style={styles.barContainer}>
                <div style={styles.barGroup}>
                  {config.map(c => (
                    <div 
                      key={c.key}
                      title={`${c.label}: ${group.values[c.key].toLocaleString()}`}
                      style={styles.bar((group.values[c.key] / maxVal) * 100, c.color)}
                    ></div>
                  ))}
                </div>
                <div style={styles.labelBox}>
                  <span style={styles.mainLabel}>{group.label}</span>
                  <span style={styles.subLabel}>{group.range}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '60px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Wykres;