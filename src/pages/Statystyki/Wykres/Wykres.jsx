import React, { useState, useMemo } from 'react';
import { Calendar, BarChart3, Clock, CheckCircle2 } from 'lucide-react';

const Wykres = () => {
  const [viewType, setViewType] = useState('weekly');

  const daneTestowe2 = [
    {
      "id": 337,
      "data_spedycji": "2026-03-13",
      "przeloty_druk_zostalo": 0,
      "przeloty_falc_zostalo": 330000,
      "przeloty_pur_zostalo": 0,
      "przeloty_hotmelt_zostalo": 30000
    },
    {
      "id": 338,
      "data_spedycji": "2026-03-16",
      "przeloty_druk_zostalo": 0,
      "przeloty_falc_zostalo": 30000,
      "przeloty_pur_zostalo": 0,
      "przeloty_hotmelt_zostalo": 30000
    },
    {
      "id": 339,
      "data_spedycji": "2026-04-13",
      "przeloty_druk_zostalo": 30000,
      "przeloty_falc_zostalo": 30000,
      "przeloty_pur_zostalo": 10000,
      "przeloty_hotmelt_zostalo": 2500
    },
    {
      "id": 341,
      "data_spedycji": "2026-05-13",
      "przeloty_druk_zostalo": 1000,
      "przeloty_falc_zostalo": 30000,
      "przeloty_pur_zostalo": 500,
      "przeloty_hotmelt_zostalo": 30000
    },
    {
      "id": 342,
      "data_spedycji": "2026-06-23",
      "przeloty_druk_zostalo": 1000,
      "przeloty_falc_zostalo": 30000,
      "przeloty_pur_zostalo": 500,
      "przeloty_hotmelt_zostalo": 30000
    }
  ];

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#0f172a' },
    wrapper: { maxWidth: '97vw', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
    titleSection: { display: 'flex', flexDirection: 'column' },
    mainTitle: { fontSize: '1.875rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 },
    subTitle: { color: '#64748b', marginTop: '0.25rem', fontWeight: '500' },
    buttonGroup: { display: 'flex', backgroundColor: '#fff', padding: '0.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' },
    navButton: (active) => ({
      padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '700', border: 'none', cursor: 'pointer',
      backgroundColor: active ? '#30639b' : 'transparent', color: active ? '#fff' : '#64748b', transition: 'all 0.2s'
    }),
    chartCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #f1f5f9', overflowX: 'auto' },
    chartHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' },
    legend: { display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: '700', flexWrap: 'wrap' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '0.4rem' },
    colorBox: (color) => ({ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: color }),
    chartViewport: {
      position: 'relative', height: '350px', display: 'flex', alignItems: 'end', gap: '3rem', padding: '0 4rem',
      borderBottom: '1px solid #f1f5f9', minWidth: 'max-content'
    },
    yAxis: {
      position: 'absolute', left: 0, top: 0, height: '100%', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', color: '#cbd5e1', paddingRight: '10px'
    },
    barContainer: { width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'end', position: 'relative' },
    barGroup: { display: 'flex', alignItems: 'end', gap: '4px', width: '100%', height: '100%' },
    bar: (height, color) => ({
      flex: 1, backgroundColor: color, height: `${height}%`, borderRadius: '3px 3px 0 0', transition: 'height 0.5s ease',
      cursor: 'pointer', position: 'relative'
    }),
    labelWrapper: { position: 'absolute', bottom: '-55px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' },
    label: { fontSize: '11px', fontWeight: '800', color: '#1e293b' },
    dateRange: { fontSize: '9px', fontWeight: '500', color: '#94a3b8', marginTop: '2px' }
  };

  const getWeekInfo = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    const monday = new Date(d); monday.setDate(d.getDate() - 3);
    const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
    const format = (date) => date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    return { weekLabel: `Tydzień ${weekNo}`, range: `${format(monday)} - ${format(sunday)}` };
  };

  const processedData = useMemo(() => {
    const groups = {};
    daneTestowe2.forEach(item => {
      const date = new Date(item.data_spedycji);
      let key, range = '';
      
      if (viewType === 'weekly') {
        const info = getWeekInfo(date);
        key = info.weekLabel;
        range = info.range;
      } else {
        key = date.toLocaleString('pl-PL', { month: 'long' });
        range = date.getFullYear().toString();
      }

      if (!groups[key]) {
        groups[key] = { label: key, range, druk: 0, falc: 0, pur: 0, hotmelt: 0, timestamp: date.getTime() };
      }
      groups[key].druk += item.przeloty_druk_zostalo;
      groups[key].falc += item.przeloty_falc_zostalo;
      groups[key].pur += item.przeloty_pur_zostalo;
      groups[key].hotmelt += item.przeloty_hotmelt_zostalo;
    });
    return Object.values(groups).sort((a, b) => a.timestamp - b.timestamp);
  }, [viewType]);

  const maxVal = useMemo(() => {
    const allValues = processedData.flatMap(d => [d.druk, d.falc, d.pur, d.hotmelt]);
    const peak = Math.max(...allValues, 1000);
    return Math.ceil(peak / 10000) * 10000;
  }, [processedData]);

  const config = [
    { key: 'druk', color: '#359b30', label: 'Druk' },
    { key: 'falc', color: '#30639b', label: 'Falc' },
    { key: 'pur', color: '#f59e0b', label: 'PUR' },
    { key: 'hotmelt', color: '#ef4444', label: 'Hotmelt' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.mainTitle}><BarChart3 size={32} color="#30639b" /> Raport Produkcji V2</h1>
            <span style={styles.subTitle}>Zestawienie pozostałych przelotów z daneTestowe2</span>
          </div>
          <div style={styles.buttonGroup}>
            {['weekly', 'monthly'].map((type) => (
              <button key={type} onClick={() => setViewType(type)} style={styles.navButton(viewType === type)}>
                {type === 'weekly' ? 'Tygodniowy' : 'Miesięczny'}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="#359b30" /> Harmonogram Realizacji
            </h2>
            <div style={styles.legend}>
              {config.map(item => (
                <div key={item.key} style={styles.legendItem}>
                  <div style={styles.colorBox(item.color)}></div> {item.label}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.chartViewport}>
            <div style={styles.yAxis}>
              <span>{maxVal.toLocaleString()}</span>
              <span>{(maxVal * 0.75).toLocaleString()}</span>
              <span>{(maxVal * 0.5).toLocaleString()}</span>
              <span>{(maxVal * 0.25).toLocaleString()}</span>
              <span>0</span>
            </div>

            {processedData.map((group, idx) => (
              <div key={idx} style={styles.barContainer}>
                <div style={styles.barGroup}>
                  {config.map(c => (
                    <div 
                      key={c.key}
                      title={`${c.label}: ${group[c.key].toLocaleString()}`}
                      style={styles.bar((group[c.key] / maxVal) * 100, c.color)}
                    ></div>
                  ))}
                </div>
                <div style={styles.labelWrapper}>
                  <span style={styles.label}>{group.label}</span>
                  <span style={styles.dateRange}>{group.range}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '80px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Wykres;