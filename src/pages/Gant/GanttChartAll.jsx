import React, { useRef, useEffect, useState } from 'react';
import styles from './GanttChartAll.module.css';
import Procesory from './procesory_btn/Procesory';

const GanttChartAll = ({ stages }) => {
  const chartRef = useRef(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [totalChartWidth, setTotalChartWidth] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(0.2);

  const groupedStages = stages?.reduce((acc, stage) => {
    const { procesor_id } = stage;
    if (!acc[procesor_id]) {
      acc[procesor_id] = [];
    }
    acc[procesor_id].push(stage);
    return acc;
  }, {});

  const allStagesList = Object.values(groupedStages || {}).flat();

  useEffect(() => {
    if (allStagesList && allStagesList.length > 0) {
      const allDates = allStagesList.flatMap(stage => [new Date(stage.start), new Date(stage.end)]);

      if (allDates.length === 0) return;

      const calculatedMinDate = new Date(Math.min(...allDates));
      const calculatedMaxDate = new Date(Math.max(...allDates));

      calculatedMinDate.setHours(calculatedMinDate.getHours() - 1);
      calculatedMaxDate.setHours(calculatedMaxDate.getHours() + 1);

      setMinDate(calculatedMinDate);
      setMaxDate(calculatedMaxDate);

      const totalTimeSpanMinutes = (calculatedMaxDate.getTime() - calculatedMinDate.getTime()) / (1000 * 60);
      setTotalChartWidth(totalTimeSpanMinutes * scaleFactor);
    }
  }, [allStagesList, scaleFactor]);

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

  const getColorForTechnology = (globalId) => {
    let hash = 0;
    const str = String(globalId);
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    
    return color;
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

      markers.push(
        <div key={`day-${currentDate.getTime()}`} className={styles.timelineMarker} style={{ left: `${leftPosition + 15}px` }}>
          {daysOfWeek[currentDate.getDay()]}{String(currentDate.getDate()).padStart(2, '0')}/{String(currentDate.getMonth() + 1).padStart(2, '0')}
        </div>
      );

      const hoursToAdd = [6, 18];
      hoursToAdd.forEach(hour => {
        const hourDate = new Date(currentDate);
        hourDate.setHours(hour, 0, 0, 0);

        if (hourDate >= minDate && hourDate <= maxDate) {
          const hourOffsetMs = hourDate.getTime() - minDate.getTime();
          const hourLeftPosition = (hourOffsetMs / (maxDate.getTime() - minDate.getTime())) * totalChartWidth;

          markers.push(
            <div key={`hour-${hourDate.getTime()}`} className={styles.timelineSubMarker} style={{ left: `${hourLeftPosition}px` }}>
              {hour}:00
            </div>
          );
        }
      });

      currentDate.setTime(currentDate.getTime() + interval);
    }
    return markers;
  };

  const handleScaleChange = (event) => {
    setScaleFactor(parseFloat(event.target.value));
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.header}>
        <h2>Druk</h2>
        <Procesory/>
        <div className={styles.controls}>
          <span>Powiększenie:</span>
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
          {groupedStages && Object.keys(groupedStages).map(processorId => (
            <div key={`names-group-${processorId}`} className={styles.processorRow}>
              <div className={styles.processorNameFixed}>
                Procesor: {processorId}
              </div>
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
            
            {groupedStages && Object.keys(groupedStages).map(processorId => (
              <div key={`bars-group-${processorId}`} className={styles.processorRow}>
                <div className={styles.processorBarsGroup}>
                  {groupedStages[processorId].map(stage => {
                    const { width, marginLeft } = calculateBarProperties(stage.start, stage.end);
                    const barColor = getColorForTechnology(stage.global_id);

                    return (
                      <div
                        key={`bar-${stage.global_id}`}
                        className={styles.stageBar}
                        style={{
                          width,
                          marginLeft,
                          backgroundColor: barColor
                        }}
                        title={`${stage.name}: ${stage.start} - ${stage.end} (${stage.progress}%)`}
                      >
                        {stage.progress > 5 && stage.status == 3 && (
                          <div
                            className={styles.progressBar}
                            style={{ width: `${stage.progress}%`, backgroundColor: 'rgba(255,255,255,0.4)' }}
                          ></div>
                        )}
                        {stage.progress > 5 && stage.status == 3 && (
                          <span className={styles.progressText}>
                            {stage.progress}%
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChartAll;