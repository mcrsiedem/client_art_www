import React, { useState, useMemo } from 'react';
import { Calendar, BarChart3, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { rawData } from './Dane';




const Wykres = () => {
  const [viewType, setViewType] = useState('weekly');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#0f172a'
    },
    wrapper: {
      maxWidth: '97vw',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    titleSection: {
      display: 'flex',
      flexDirection: 'column'
    },
    mainTitle: {
      fontSize: '1.875rem',
      fontWeight: '800',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      margin: 0
    },
    subTitle: {
      color: '#64748b',
      marginTop: '0.25rem',
      fontWeight: '500'
    },
    buttonGroup: {
      display: 'flex',
      backgroundColor: '#fff',
      padding: '0.25rem',
      borderRadius: '0.75rem',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    },
    navButton: (active) => ({
      padding: '0.5rem 1.25rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '700',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: active ? '#4f46e5' : 'transparent',
      color: active ? '#fff' : '#64748b',
      transition: 'all 0.2s'
    }),
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: '#fff',
      padding: '1.25rem',
      borderRadius: '1rem',
      border: '1px solid #f1f5f9',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    iconBox: (color) => ({
      padding: '0.75rem',
      borderRadius: '0.75rem',
      backgroundColor: color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }),
    chartCard: {
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '1.5rem',
      border: '1px solid #f1f5f9',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      overflowX: 'auto'
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2.5rem'
    },
    legend: {
      display: 'flex',
      gap: '1rem',
      fontSize: '0.75rem',
      fontWeight: '700'
    },
    chartViewport: {
      position: 'relative',
      height: '350px',
      display: 'flex',
      alignItems: 'end',
      gap: '2.5rem',
      padding: '0 3rem',
      borderBottom: '1px solid #f1f5f9',
      minWidth: 'max-content'
    },
    yAxis: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontSize: '10px',
      fontWeight: '700',
      color: '#cbd5e1',
      paddingRight: '10px'
    },
    barContainer: {
      width: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'end',
      position: 'relative'
    },
    barGroup: {
      display: 'flex',
      alignItems: 'end',
      gap: '6px',
      width: '100%',
      height: '100%'
    },
    bar: (height, color) => ({
      flex: 1,
      backgroundColor: color,
      height: `${height}%`,
      borderRadius: '4px 4px 0 0',
      transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative'
    }),
    labelWrapper: {
      position: 'absolute',
      bottom: '-55px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '120px'
    },
    label: {
      fontSize: '11px',
      fontWeight: '800',
      color: '#1e293b',
      whiteSpace: 'nowrap'
    },
    dateRange: {
      fontSize: '9px',
      fontWeight: '500',
      color: '#94a3b8',
      whiteSpace: 'nowrap',
      marginTop: '2px'
    }
  };

  const getWeekInfo = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    // Ustawienie na czwartek w bieżącym tygodniu (standard ISO)
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    
    // Obliczanie zakresu dat dla tygodnia (Poniedziałek - Niedziela)
    const monday = new Date(d);
    monday.setDate(d.getDate() - 3);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const format = (date) => date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    
    return {
      weekLabel: `Tydzień ${weekNo}`,
      range: `${format(monday)} - ${format(sunday)}`
    };
  };

  const processedData = useMemo(() => {
    const groups = {};
    rawData.forEach(item => {
      const date = new Date(item.data_spedycji);
      let key, range = '';
      
      if (viewType === 'daily') {
        key = item.data_spedycji;
        range = date.toLocaleDateString('pl-PL', { weekday: 'long' });
      } else if (viewType === 'weekly') {
        const info = getWeekInfo(date);
        key = info.weekLabel;
        range = info.range;
      } else {
        key = date.toLocaleString('pl-PL', { month: 'long' });
        range = date.getFullYear().toString();
      }

      if (!groups[key]) {
        groups[key] = { label: key, range, druku: 0, falc: 0, timestamp: date.getTime() };
      }
      // groups[key].druku += item.przeloty_druku;
      // groups[key].falc += item.przeloty_falc;
         groups[key].druku += item.do_wydrukowania;
      groups[key].falc += item.do_sfalcowania;
    });
    return Object.values(groups).sort((a, b) => a.timestamp - b.timestamp);
  }, [viewType]);

  const maxVal = useMemo(() => {
    const allValues = processedData.flatMap(d => [d.druku, d.falc]);
    const peak = Math.max(...allValues, 1000);
    return Math.ceil(peak / 10000) * 10000; // Zaokrąglenie w górę dla czytelności osi
  }, [processedData]);

  const stats = useMemo(() => {
    return rawData.reduce((acc, curr) => ({
      druku: acc.druku + curr.przeloty_druku,
      falc: acc.falc + curr.przeloty_falc,
      druku_zak: acc.druku_zak + curr.przeloty_druku_zakonczone,
      falc_zak: acc.falc_zak + curr.przeloty_falc_zakonczone,
    }), { druku: 0, falc: 0, druku_zak: 0, falc_zak: 0 });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.mainTitle}>
              <BarChart3 size={32} color="#4f46e5" /> Raport Produkcji
            </h1>
            <span style={styles.subTitle}>Zestawienie przelotów do wykonania w wybranym interwale</span>
          </div>

          <div style={styles.buttonGroup}>
            {['daily', 'weekly', 'monthly'].map((type) => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                style={styles.navButton(viewType === type)}
              >
                {type === 'daily' ? 'Dzienny' : type === 'weekly' ? 'Tygodniowy' : 'Miesięczny'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.iconBox('#2563eb')}><BarChart3 size={20}/></div>
            <div>
              <div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Suma Druku</div>
              <div style={{fontSize: '1.25rem', fontWeight: 900}}>{stats.druku.toLocaleString()}</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconBox('#10b981')}><CheckCircle2 size={20}/></div>
            <div>
              <div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Druk Gotowy</div>
              <div style={{fontSize: '1.25rem', fontWeight: 900}}>{stats.druku_zak.toLocaleString()}</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconBox('#f59e0b')}><Clock size={20}/></div>
            <div>
              <div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Suma Falc</div>
              <div style={{fontSize: '1.25rem', fontWeight: 900}}>{stats.falc.toLocaleString()}</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconBox('#14b8a6')}><CheckCircle2 size={20}/></div>
            <div>
              <div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Falc Gotowy</div>
              <div style={{fontSize: '1.25rem', fontWeight: 900}}>{stats.falc_zak.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h2 style={{fontSize: '1.125rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Calendar size={18} color="#6366f1" /> Harmonogram Realizacji
            </h2>
            <div style={styles.legend}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <div style={{width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#3b82f6'}}></div> Druk
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <div style={{width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#f59e0b'}}></div> Falc
              </div>
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
                  <div 
                    title={`Druk: ${group.druku.toLocaleString()}`}
                    style={styles.bar((group.druku / maxVal) * 100, '#3b82f6')}
                  ></div>
                  <div 
                    title={`Falc: ${group.falc.toLocaleString()}`}
                    style={styles.bar((group.falc / maxVal) * 100, '#f59e0b')}
                  ></div>
                </div>
                <div style={styles.labelWrapper}>
                  <span style={styles.label}>{group.label}</span>
                  <span style={styles.dateRange}>{group.range}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{height: '80px'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Wykres;