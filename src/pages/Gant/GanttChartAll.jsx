import React, { useRef, useEffect, useState, useContext } from 'react';
import styles from './GanttChartAll.module.css';
import Procesory from './procesory_btn/Procesory';
import { AppContext } from 'context/AppContext';

const GanttChartAll = ({ stages }) => {
  const chartRef = useRef(null);
  const scrollWrapperRef = useRef(null); // Nowy ref dla przewijania
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [totalChartWidth, setTotalChartWidth] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(0.2);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
const [nowTime, setNowTime] = useState(new Date()); 
          const [colorFrom, setColorFrom] = useState(2);
  

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

  const getColorForTechnologyAndOrder = (technologiaId, zamowienieId) => {
    const hashString = `${technologiaId}-${zamowienieId}`;
    let hash = 0;
    for (let i = 0; i < hashString.length; i++) {
        hash = hashString.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = (technologiaId * 137.508) % 360;
    const saturation = 70 + (hash % 30);
    const lightness = 50 + (hash % 10);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };



const getColorForTechnology = (technologiaId) => {
  // Unikalny, deterministyczny generator hasha na podstawie technologiaId
  let hash = 0;
  const str = String(technologiaId);
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generowanie koloru HSL
  // Odcień (hue) jest unikalny dla każdej technologii
  const hue = Math.abs(hash) % 360; 
  // Nasycenie (saturation) i jasność (lightness) są stałe, aby zachować spójność
  const saturation = 75;
  const lightness = 60;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};


const getColor = (stage,technologiaId,zamowienieId) => {

  let parametr 

  if(colorFrom==1){  //jeden parametr klient data spedycji itp 
   parametr = stage.klient_id 
      // Unikalny, deterministyczny generator hasha na podstawie technologiaId
  let hash = 0;
  const str = String(parametr);
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generowanie koloru HSL
  // Odcień (hue) jest unikalny dla każdej technologii
  const hue = Math.abs(hash) % 360; 
  // Nasycenie (saturation) i jasność (lightness) są stałe, aby zachować spójność
  const saturation = 75;
  const lightness = 60;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

 
if(colorFrom==2){  // dwa parametry technologia id i zamowienie id
    const hashString = `${technologiaId}-${zamowienieId}`;
    let hash = 0;
    for (let i = 0; i < hashString.length; i++) {
        hash = hashString.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = (technologiaId * 137.508) % 360;
    const saturation = 70 + (hash % 30);
    const lightness = 50 + (hash % 10);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

  if(colorFrom==3){  //jeden parametr klient data spedycji itp 
   parametr = stage.data_spedycji 
      // Unikalny, deterministyczny generator hasha na podstawie technologiaId
  let hash = 0;
  const str = String(parametr);
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generowanie koloru HSL
  // Odcień (hue) jest unikalny dla każdej technologii
  const hue = Math.abs(hash) % 360; 
  // Nasycenie (saturation) i jasność (lightness) są stałe, aby zachować spójność
  const saturation = 75;
  const lightness = 60;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }


};



  const renderTimelineMarkers = () => {
    if (!minDate || !maxDate || totalChartWidth === 0) return null;

    const markers = [];
    const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    // const daysOfWeek = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
    const interval = 24 * 60 * 60 * 1000;
    
    const startDate = new Date(minDate);
    startDate.setHours(0, 0, 0, 0);

    let currentDate = new Date(startDate);

    while (currentDate <= maxDate) {
      const offsetMs = currentDate.getTime() - minDate.getTime();
      const leftPosition = (offsetMs / (maxDate.getTime() - minDate.getTime())) * totalChartWidth;

      markers.push(
        <div key={`day-${currentDate.getTime()}`} className={styles.timelineMarker} style={{ left: `${leftPosition + 25}px` }}>
          {daysOfWeek[currentDate.getDay()]} {String(currentDate.getDate()).padStart(2, '0')}/{String(currentDate.getMonth() + 1).padStart(2, '0')}
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
            <div key={`hour-${hourDate.getTime()}`} className={styles.timelineSubMarker} style={{ left: `${hourLeftPosition+25}px` }}>
              {hour}:00
            </div>
          );
        }
      });

      currentDate.setTime(currentDate.getTime() + interval);
    }
    return markers;
  };


  const calculateNowPosition = () => {
    if (!minDate || !maxDate || totalChartWidth === 0) return 0;

    const now = nowTime.getTime();
    const totalTimeSpanMs = maxDate.getTime() - minDate.getTime();
    const nowOffsetMs = now - minDate.getTime();

    const leftPosition = (nowOffsetMs / totalTimeSpanMs) * totalChartWidth;

    return Math.max(0, Math.min(leftPosition, totalChartWidth));
  };

  const handleScaleChange = (event) => {
    setScaleFactor(parseFloat(event.target.value));
  };

  const handleScrollToNow = () => {
    if (!scrollWrapperRef.current || !minDate || !maxDate || totalChartWidth === 0) {
      return;
    }

    const now = new Date();
    const totalTimeSpanMs = maxDate.getTime() - minDate.getTime();
    const nowOffsetMs = now.getTime() - minDate.getTime();
    
    // Obliczamy pozycję przewijania w pikselach
    const scrollPosition = (nowOffsetMs / totalTimeSpanMs) * totalChartWidth;

    // Przewijamy do tej pozycji, z opcjonalnym buforem, aby element nie był na samej krawędzi
    scrollWrapperRef.current.scrollLeft = scrollPosition - (scrollWrapperRef.current.clientWidth / 2);
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.header}>
        {/* <h2>Druk</h2> */}
        {/* <Procesory/> */}
               <div className={styles.btnFormContainer}>
             <button className={styles.btnForm} onClick={()=>{setColorFrom(2)}}>
            Prace
          </button>

             <button className={styles.btnForm} onClick={()=>{setColorFrom(1)}}>
            Klient
          </button>
                    <button className={styles.btnForm} onClick={()=>{setColorFrom(3)}}>
            Spedycja
          </button>

          </div>
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
          <button className={styles.scrollToNowBtn} onClick={handleScrollToNow}>
            Dziś
          </button>
        </div>
      </div>
      <div className={styles.ganttWrapper}>
        <div className={styles.stageNamesList}>
          {groupedStages && Object.keys(groupedStages).map(processorId => (
            <div key={`names-group-${processorId}`} className={styles.processorRow}>
              <div className={styles.processorNameFixed}>
                {procesory.find(x => x.id == processorId ).nazwa}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
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

                                                          <div 
                className={styles.nowLine} 
                style={{ left: `${calculateNowPosition()}px` }}
              >
                <span className={styles.nowLabel}>AKTUALNY CZAS</span>
              </div>  
            
            {groupedStages && Object.keys(groupedStages).map(processorId => (
              <div key={`bars-group-${processorId}`} className={styles.processorRow}>

 


                <div className={styles.processorBarsGroup}>
                  {groupedStages[processorId].map(stage => {
                    const { width, marginLeft } = calculateBarProperties(stage.start, stage.end);
                    // const barColor = getColorForTechnologyAndOrder(stage.technologia_id, stage.zamowienie_id);
                    // const barColor = getColorForTechnology(stage.data_spedycji);
                    const barColor = getColor(stage,stage.technologia_id, stage.zamowienie_id);

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

export default GanttChartAll;