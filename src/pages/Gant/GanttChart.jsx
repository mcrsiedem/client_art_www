import React, { useRef, useEffect, useState } from 'react';

const GanttChart = ({ stages }) => {
  const chartRef = useRef(null);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    // Oblicz zakres dat dla osi X na podstawie wszystkich etapów
    if (stages && stages.length > 0) {
      const allDates = stages.flatMap(stage => [new Date(stage.start), new Date(stage.end)]);
      const calculatedMinDate = new Date(Math.min(...allDates));
      const calculatedMaxDate = new Date(Math.max(...allDates));

      // Dodaj trochę bufora, aby wykres był czytelniejszy
      calculatedMinDate.setDate(calculatedMinDate.getDate() - 2);
      calculatedMaxDate.setDate(calculatedMaxDate.getDate() + 5);


      setMinDate(calculatedMinDate.toISOString().split('T')[0]);
      setMaxDate(calculatedMaxDate.toISOString().split('T')[0]);
    }
  }, [stages]);

  const calculateBarProperties = (start, end) => {
    if (!minDate || !maxDate) return { width: 0, marginLeft: 0 };

    const totalTimeSpanMs = new Date(maxDate).getTime() - new Date(minDate).getTime();
    const stageDurationMs = new Date(end).getTime() - new Date(start).getTime();
    const startOffsetMs = new Date(start).getTime() - new Date(minDate).getTime();

    const containerWidthPx = 1000; // Przykładowa, stała szerokość kontenera wykresu

    const widthPx = (stageDurationMs / totalTimeSpanMs) * containerWidthPx;
    const marginLeftPx = (startOffsetMs / totalTimeSpanMs) * containerWidthPx;

    return {
      width: `${Math.max(0, widthPx)}px`, // Upewnij się, że szerokość nie jest ujemna
      marginLeft: `${Math.max(0, marginLeftPx)}px` // Upewnij się, że margines nie jest ujemny
    };
  };

  const getBarColor = (name) => {
    if (name.startsWith('A:')) return '#007bff'; // Niebieski dla Produkcji A
    if (name.startsWith('B:')) return '#ffc107'; // Żółty dla Produkcji B
    if (name.startsWith('C:')) return '#28a745'; // Zielony dla Produkcji C
    return '#6c757d'; // Domyślny kolor
  };

  const getProgressColor = (name) => {
    if (name.startsWith('A:')) return '#0056b3';
    if (name.startsWith('B:')) return '#e0a800';
    if (name.startsWith('C:')) return '#1e7e34';
    return '#495057';
  };

  return (
    <div style={{ overflowX: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Wykres Gantta dla Wielu Produkcji</h2>
      <div
        ref={chartRef}
        style={{
          width: '100%',
          minWidth: '1000px', // Upewnij się, że jest wystarczająco szeroki
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '15px',
          backgroundColor: '#f8f9fa'
        }}
      >
        {/* Oś czasu */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingLeft: '160px', // Odpowiednik szerokości etykiety zadania
          position: 'relative'
        }}>
          <span style={{ fontWeight: 'bold' }}>{minDate}</span>
          <span style={{ fontWeight: 'bold' }}>{maxDate}</span>
          <div style={{
            position: 'absolute',
            left: '160px',
            right: '0',
            height: '1px',
            backgroundColor: '#ccc',
            bottom: '-5px'
          }}></div>
        </div>

        {/* Zadania na wykresie */}
        {stages.map(stage => {
          const { width, marginLeft } = calculateBarProperties(stage.start, stage.end);
          return (
            <div key={stage.id} style={{
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '30px' // Zapewnij minimalną wysokość wiersza
            }}>
              <div style={{ width: '150px', flexShrink: 0, fontSize: '0.9em', color: '#333' }}>
                {stage.name}
              </div>
              <div
                style={{
                  height: '22px',
                  backgroundColor: getBarColor(stage.name),
                  borderRadius: '3px',
                  position: 'relative',
                  ...{ width, marginLeft }, // Używamy bezpośrednio obliczonych właściwości
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  overflow: 'hidden' // Ukryj, jeśli pasek postępu wystaje
                }}
                title={`${stage.name}: ${stage.start} - ${stage.end} (${stage.progress}%)`}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${stage.progress}%`,
                    backgroundColor: getProgressColor(stage.name),
                    borderRadius: '3px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                ></div>
                {stage.progress > 5 && ( // Pokaż % tylko jeśli jest wystarczająco miejsca
                  <span style={{
                    position: 'absolute',
                    right: '5px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    fontSize: '0.75em',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}>
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