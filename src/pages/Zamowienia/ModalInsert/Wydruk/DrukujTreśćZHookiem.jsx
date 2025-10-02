import React, { useState, useRef,useCallback } from 'react';
// Poprawny import dla hooka: używamy nawiasów klamrowych {}
import { useReactToPrint } from 'react-to-print'; 

const DrukujTreśćZHookiem = () => {
  
  const [trescDoDruku, setTrescDoDruku] = useState(
    'Treść, która zostanie wydrukowana, po upewnieniu się, że referencja jest gotowa.'
  );
  
  // Nowy stan, aby wymusić re-render i upewnić się, że hook ma aktualne dane
  const [isLoading, setIsLoading] = useState(false); 
  
  const componentRef = useRef();

  // 1. Funkcja synchronizująca przed rozpoczęciem drukowania
  const handleBeforePrint = useCallback(() => {
    // Ustawienie ładowania na true (opcjonalnie, do pokazania spinnera)
    setIsLoading(true); 
    // W tym miejscu można wykonać asynchroniczne operacje, jeśli to konieczne
    return Promise.resolve(); // Zawsze zwracaj Promise, aby opóźnić druk
  }, []);

  // 2. Konfiguracja hooka useReactToPrint
  const handlePrint = useReactToPrint({
    content: () => {
      // W tym momencie referencja MUSI być już poprawna
      if (componentRef.current) {
        return componentRef.current;
      }
      return null;
    },
    // Właściwość wywoływana ZANIM content zostanie odczytany
    onBeforeGetContent: handleBeforePrint, 
    // Właściwość wywoływana po zakończeniu drukowania
    onAfterPrint: () => setIsLoading(false),
    documentTitle: 'Raport_Z_Aplikacji',
  });

  const handleZmianaTreści = (event) => {
    setTrescDoDruku(event.target.value);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1>Drukowanie (Synchronizacja Referencji)</h1>
      
      {/* ... Pole tekstowe i style bez zmian ... */}
      <textarea
        value={trescDoDruku}
        onChange={handleZmianaTreści}
        rows="6"
        cols="60"
        style={{ marginBottom: '15px', width: '100%', padding: '10px' }}
      />
      
      {/* 3. Wywołanie drukowania */}
      <button 
        onClick={handlePrint}
        // Wyłączamy guzik, jeśli trwa ładowanie (synchronizacja)
        disabled={isLoading} 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: isLoading ? '#6c757d' : '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer' 
        }}
      >
        {isLoading ? 'Przygotowywanie do druku...' : 'Drukuj Treść'}
      </button>

      <hr style={{ margin: '20px 0' }} />
      
      {/* 4. Element do druku, z bezpośrednią referencją */}
      <div 
        ref={componentRef} 
        style={{ 
          padding: '25px', 
          backgroundColor: 'white', 
          border: '1px solid #333',
          marginTop: '20px'
        }}
      >
        <h2>Zawartość do Druku:</h2>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
          {trescDoDruku}
        </p>
      </div>
    </div>
  );
};
export default DrukujTreśćZHookiem;