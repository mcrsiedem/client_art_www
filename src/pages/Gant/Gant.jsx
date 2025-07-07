import React from 'react';
import GanttChart from './GanttChart'; // Upewnij się, że ścieżka jest poprawna

const productionStages = [
  // Produkcja A
  {
    id: 'A1',
    name: 'A: Druk',
    start: '2025-07-01',
    end: '2025-07-10',
    progress: 100,
  },
  {
    id: 'A2',
    name: 'A: Falcowanie',
    start: '2025-07-12',
    end: '2025-07-25', // Koniec 25 lipca
    progress: 85,
  },
  {
    id: 'A3',
    name: 'A: Oprawa',
    start: '2025-07-20',
    end: '2025-07-27', // Koniec 27 lipca
    progress: 30,
  },

  // Produkcja B
  {
    id: 'B1',
    name: 'B: Druk',
    start: '2025-07-05',
    end: '2025-07-14',
    progress: 100,
  },
  {
    id: 'B2',
    name: 'B: Falcowanie',
    start: '2025-07-15',
    end: '2025-07-26', // Koniec 26 lipca
    progress: 60,
  },
  {
    id: 'B3',
    name: 'B: Oprawa',
    start: '2025-07-25',
    end: '2025-07-28',
    progress: 10,
  },

  // Produkcja C
  {
    id: 'C1',
    name: 'C: Druk',
    start: '2025-07-10',
    end: '2025-07-18',
    progress: 90,
  },
  {
    id: 'C2',
    name: 'C: Falcowanie',
    start: '2025-07-20',
    end: '2025-07-25', // Koniec 25 lipca
    progress: 70,
  },
  {
    id: 'C3',
    name: 'C: Oprawa',
    start: '2025-07-24',
    end: '2025-07-27', // Koniec 27 lipca
    progress: 20,
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