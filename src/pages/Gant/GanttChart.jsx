import React, { useRef, useEffect, useState } from 'react';
// 1. Importowanie modułu stylów
import styles from './GanttChart.module.css';
import { useGant } from './useGant';

// Zmieniamy format daty
const GanttChart = ({ stages }) => {
  const chartRef = useRef(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  const [refreshGant] = useGant();

  useEffect(() => {
    if (stages && stages.length > 0) {
      const allDates = stages.flatMap(stage => [new Date(stage.start), new Date(stage.end)]);
      if (allDates.length === 0) return;

      const calculatedMinDate = new Date(Math.min(...allDates));
      const calculatedMaxDate = new Date(Math.max(...allDates));

      // Dodajemy bufor czasowy, np. 1 godzinę przed i 1 godzinę po, zamiast dni
      calculatedMinDate.setHours(calculatedMinDate.getHours() - 1);
      calculatedMaxDate.setHours(calculatedMaxDate.getHours() + 1);

      setMinDate(calculatedMinDate);
      setMaxDate(calculatedMaxDate);
    }
  }, [stages]);

  const calculateBarProperties = (start, end) => {
    if (!minDate || !maxDate) return { width: 0, marginLeft: 0 };

    const totalTimeSpanMs = maxDate.getTime() - minDate.getTime();
    const stageDurationMs = new Date(end).getTime() - new Date(start).getTime();
    const startOffsetMs = new Date(start).getTime() - minDate.getTime();

    const containerWidthPx = chartRef.current?.offsetWidth || 2000; // Używamy dynamicznej szerokości
    // const containerWidthPx =  6000; // Używamy dynamicznej szerokości

    const widthPx = (stageDurationMs / totalTimeSpanMs) * containerWidthPx;
    const marginLeftPx = (startOffsetMs / totalTimeSpanMs) * containerWidthPx;

    return {
      width: `${Math.max(0, widthPx)}px`,
      marginLeft: `${Math.max(0, marginLeftPx)}px`
    };
  };

  const formatTime = (date) => {
    if (!date) return '';
    // Formatuje datę do formatu YYYY-MM-DD HH:mm
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // Reszta kodu pozostaje bez zmian
  const getBarClass = (name) => {
    if (name.startsWith('A:')) return styles.barA;
    if (name.startsWith('B:')) return styles.barB;
    if (name.startsWith('C:')) return styles.barC;
    return styles.barDefault;
  };

  const getProgressClass = (name) => {
    if (name.startsWith('A:')) return styles.progressA;
    if (name.startsWith('B:')) return styles.progressB;
    if (name.startsWith('C:')) return styles.progressC;
    return styles.progressDefault;
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.header}>
        <h2>Druk</h2>
        <button onClick={() => refreshGant()}>Odśwież</button>
      </div>

      <div
        ref={chartRef}
        className={styles.ganttChart}
      >
        <div className={styles.timeline}>
          <span className={styles.timelineDate}>{formatTime(minDate)}</span>
          <span className={styles.timelineDate}>{formatTime(maxDate)}</span>
          <div className={styles.timelineLine}></div>
        </div>

        {stages?.map(stage => {
          const { width, marginLeft } = calculateBarProperties(stage.start, stage.end);
          const barClass = getBarClass(stage.name);
          const progressClass = getProgressClass(stage.name);

          return (
            <div key={stage.id} className={styles.stageRow}>
              <div className={styles.stageName}>
                {stage.name.substring(0, 30)}
              </div>
              <div
                className={`${styles.stageBar} ${barClass}`}
                style={{ width, marginLeft }}
                title={`${stage.name}: ${stage.start} - ${stage.end} (${stage.progress}%)`}
              >
                <div
                  className={`${styles.progressBar} ${progressClass}`}
                  style={{ width: `${stage.progress}%` }}
                ></div>
                {stage.progress > 5 && (
                  <span className={styles.progressText}>
                    {stage.progress}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GanttChart;