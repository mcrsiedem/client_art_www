import React, { useRef, useEffect, useState } from 'react';
// Importuj bibliotekę Gantta, np. import { Gantt } from 'dhtmlx-gantt';
// W tym przykładzie użyjemy uproszczonej logiki renderowania.

const GanttChart = ({ stages }) => {
  const chartRef = useRef(null);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    // Oblicz zakres dat dla osi X
    if (stages && stages.length > 0) {
      const allDates = stages.flatMap(stage => [new Date(stage.start), new Date(stage.end)]);
      const calculatedMinDate = new Date(Math.min(...allDates));
      const calculatedMaxDate = new Date(Math.max(...allDates));

      setMinDate(calculatedMinDate.toISOString().split('T')[0]);
      setMaxDate(calculatedMaxDate.toISOString().split('T')[0]);
    }
  }, [stages]);

  // W tym miejscu zazwyczaj następuje inicjalizacja biblioteki Gantta
  // np. dhtmlxGantt.init(chartRef.current);
  // dhtmlxGantt.parse({ data: stages });

  // Poniżej znajduje się uproszczony kod do wizualizacji na potrzeby przykładu.
  // W prawdziwej aplikacji, użyjesz funkcji biblioteki do renderowania.

  const calculateBarWidth = (start, end) => {
    if (!minDate || !maxDate) return 0;
    const totalDays = (new Date(maxDate).getTime() - new Date(minDate).getTime()) / (1000 * 60 * 60 * 24);
    const stageDays = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24);
    const startOffsetDays = (new Date(start).getTime() - new Date(minDate).getTime()) / (1000 * 60 * 60 * 24);

    const containerWidth = 800; // Przykładowa szerokość kontenera
    const pxPerDay = containerWidth / totalDays;

    return {
      width: `${stageDays * pxPerDay}px`,
      marginLeft: `${startOffsetDays * pxPerDay}px`
    };
  };

  return (
    <div style={{ overflowX: 'auto', padding: '20px' }}>
      <h2>Wykres Produkcji</h2>
      <div ref={chartRef} style={{ width: '100%', minWidth: '800px', border: '1px solid #ccc', padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>{minDate}</span>
          <span>{maxDate}</span>
        </div>
        {stages.map(stage => (
          <div key={stage.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '150px', flexShrink: 0 }}>{stage.name}</div>
            <div
              style={{
                height: '20px',
                backgroundColor: '#007bff',
                borderRadius: '3px',
                position: 'relative',
                ...calculateBarWidth(stage.start, stage.end)
              }}
              title={`${stage.name}: ${stage.start} - ${stage.end} (${stage.progress}%)`}
            >
              <div
                style={{
                  height: '100%',
                  width: `${stage.progress}%`,
                  backgroundColor: '#28a745',
                  borderRadius: '3px',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;