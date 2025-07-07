import React from 'react';
import GanttChart from './GanttChart'; // Upewnij się, że ścieżka jest poprawna

const productionStages = [
  {
    id: '1',
    name: 'Druk',
    start: '2025-07-01',
    end: '2025-07-10',
    progress: 100,
  },
  {
    id: '2',
    name: 'Falcowanie',
    start: '2025-07-08',
    end: '2025-07-15',
    progress: 80,
  },
  {
    id: '3',
    name: 'Oprawa',
    start: '2025-07-15',
    end: '2025-07-25',
    progress: 40,
  },
  {
    id: '4',
    name: 'Procesy dodatkowe',
    start: '2025-07-20',
    end: '2025-07-30',
    progress: 10,
  },
  {
    id: '5',
    name: 'Pakowanie i wysyłka',
    start: '2025-07-28',
    end: '2025-08-05',
    progress: 0,
  },
];

function Gant() {
  return (
    <div className="App">
      <GanttChart stages={productionStages} />
    </div>
  );
}

export default Gant;