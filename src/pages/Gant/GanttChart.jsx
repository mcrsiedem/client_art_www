import React, { useRef, useEffect, useState } from 'react';
import styles from './GanttChart.module.css';
import { useGant } from './useGant';
import Procesory from './procesory_btn/Procesory';

const GanttChart = ({ stages }) => {
  const chartRef = useRef(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [totalChartWidth, setTotalChartWidth] = useState(0);
  // Dodajemy zmienną stanu dla współczynnika skali
  const [scaleFactor, setScaleFactor] = useState(0.2); 

  const [refreshGant] = useGant();

  useEffect(() => {
    if (stages && stages.length > 0) {
      const allDates = stages.flatMap(stage => [new Date(stage.start), new Date(stage.end)]);
      if (allDates.length === 0) return;

      const calculatedMinDate = new Date(Math.min(...allDates));
      const calculatedMaxDate = new Date(Math.max(...allDates));

      calculatedMinDate.setHours(calculatedMinDate.getHours() - 1);
      calculatedMaxDate.setHours(calculatedMaxDate.getHours() + 1);

      setMinDate(calculatedMinDate);
      setMaxDate(calculatedMaxDate);

      const totalTimeSpanMinutes = (calculatedMaxDate.getTime() - calculatedMinDate.getTime()) / (1000 * 60);
      // Używamy zmiennej stanu `scaleFactor` do obliczeń
      setTotalChartWidth(totalTimeSpanMinutes * scaleFactor);
    }
  }, [stages, scaleFactor]); // Dodajemy scaleFactor jako zależność

  const calculateBarProperties = (start, end) => {
    if (!minDate || !maxDate || !totalChartWidth) return { width: 0, marginLeft: 0 };

    const totalTimeSpanMs = maxDate.getTime() - minDate.getTime();
    const stageDurationMs = new Date(end).getTime() - new Date(start).getTime();
    const startOffsetMs = new Date(start).getTime() - minDate.getTime();

    const widthPx = (stageDurationMs / totalTimeSpanMs) * totalChartWidth;
    const marginLeftPx = (startOffsetMs / totalTimeSpanMs) * totalChartWidth;

    return {
      width: `${Math.max(0, widthPx)}px`,
      marginLeft: `${Math.max(0, marginLeftPx)}px`
    };
  };

  const formatTime = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

const renderTimelineMarkers = () => {
  if (!minDate || !maxDate || totalChartWidth === 0) return null;

  const markers = [];
  const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  const interval = 24 * 60 * 60 * 1000;
  
  const startDate = new Date(minDate);
  startDate.setHours(0, 0, 0, 0);

  let currentDate = new Date(startDate);

  while (currentDate <= maxDate) {
    const offsetMs = currentDate.getTime() - minDate.getTime();
    const leftPosition = (offsetMs / (maxDate.getTime() - minDate.getTime())) * totalChartWidth;

    // Znacznik dnia
    markers.push(
      <div 
        key={`day-${currentDate.getTime()}`}
        className={styles.timelineMarker} 
        style={{ left: `${leftPosition+15}px` }}
      >
        {daysOfWeek[currentDate.getDay()]}<br />
        {String(currentDate.getDate()).padStart(2, '0')}/{String(currentDate.getMonth() + 1).padStart(2, '0')}
      </div>
    );

    // Znaczniki godzin 6:00 i 18:00
    const hoursToAdd = [6, 18];
    hoursToAdd.forEach(hour => {
      const hourDate = new Date(currentDate);
      hourDate.setHours(hour, 0, 0, 0);

      // Sprawdzamy, czy znacznik godziny jest w widocznym zakresie
      if (hourDate >= minDate && hourDate <= maxDate) {
        const hourOffsetMs = hourDate.getTime() - minDate.getTime();
        const hourLeftPosition = (hourOffsetMs / (maxDate.getTime() - minDate.getTime())) * totalChartWidth;

        markers.push(
          <div 
            key={`hour-${hourDate.getTime()}`}
            className={styles.timelineSubMarker} 
            style={{ left: `${hourLeftPosition}px` }}
          >
            {hour}:00
          </div>
        );
      }
    });

    currentDate.setTime(currentDate.getTime() + interval);
  }
  return markers;
};

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

  // Funkcja do obsługi zmiany wartości suwaka
  const handleScaleChange = (event) => {
    setScaleFactor(parseFloat(event.target.value));
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.header}>
        <h2>Druk</h2>
        <Procesory/>
          {/* <button onClick={() => refreshGant(1)}>XL</button>
          <button onClick={() => refreshGant(2)}>SM1</button>
          <button onClick={() => refreshGant(3)}>SM3</button> */}

        {/* Dodajemy suwak do kontroli powiększenia */}
        <div className={styles.controls}>
          <span>Powiększenie: </span>
          <input
            type="range"
            min="0.05"
            max="1.0"
            step="0.05"
            value={scaleFactor}
            onChange={handleScaleChange}
          />
          <span style={{ marginLeft: '10px' }}>{scaleFactor.toFixed(2)}x</span>
        </div>
        
      </div>

      <div className={styles.ganttWrapper}>
        <div className={styles.stageNamesList}>
          {stages?.map(stage => (
            <div key={stage.global_id} className={styles.stageNameFixed}>
              {stage.name.substring(0, 30)}
            </div>
          ))}
        </div>
        
        <div className={styles.scrollWrapper}>
          <div
            ref={chartRef}
            className={styles.ganttChart}
            style={{ width: `${totalChartWidth}px` }}
          >
            <div className={styles.timeline}>
              <div className={styles.timelineMarkersContainer}>
                {renderTimelineMarkers()}
              </div>
              <div className={styles.timelineLine}></div>
            </div>
            
            {stages?.map(stage => {
              const { width, marginLeft } = calculateBarProperties(stage.start, stage.end);
              const barClass = getBarClass(stage.name);
              const progressClass = getProgressClass(stage.name);

              return (
                <div key={stage.global_id+"a"} className={styles.stageBarRow}>
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

                        <div className={styles.timeline}>
              <div className={styles.timelineMarkersContainer}>
                {renderTimelineMarkers()}
              </div>
              <div className={styles.timelineLine}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;