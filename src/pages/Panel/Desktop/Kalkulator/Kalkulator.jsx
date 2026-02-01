import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import styles from './Kalkulator.module.css';
import { BookOpen, Calculator, Plus, Trash2, Layers } from 'lucide-react';
import { AppContext } from 'context/AppContext';
import { useApiPapier } from 'hooks/useApiPapier';
import { UIContext } from 'context/UIContext';

const Kalkulator = () => {
  const [callForPaper] = useApiPapier();
  const { listaPapierow, listaPapierowWyszukiwarka } = useContext(AppContext);
  const uiContext = useContext(UIContext);

  
  const [sections, setSections] = useState([
    { id: 1, pages: 4, thickness: 0.25, label: 'Okładka', papier_id: 1 },
    { id: 2, pages: 80, thickness: 0.08, label: 'Środek', papier_id: 1 }
  ]);
  
  const [totalThickness, setTotalThickness] = useState(0);
  const scrollRef = useRef(null);

  // 1. Pobranie danych z API przy montowaniu
  useEffect(() => {
    callForPaper();
  }, []);

  // 2. Funkcja obliczająca jednostkową grubość arkusza
  const obliczGruboscArkusza = useCallback((id) => {
    if (!listaPapierow || listaPapierow.length === 0) return 0.1; // Wartość domyślna podczas ładowania
    
    const papier = listaPapierow.find(x => x.id == id);
    if (!papier) return 0.1;

    // Formuła: (gramatura / 1000) * bulk
    return (parseFloat(papier.gramatura) / 1000) * parseFloat(papier.bulk);
  }, [listaPapierow]);

  // 3. Główna funkcja przeliczająca całkowity grzbiet
  const calculateThickness = useCallback(() => {
    const total = sections.reduce((sum, section) => {
      const sheets = section.pages / 2;
      // Używamy aktualnej grubości z obiektu sekcji
      return sum + (sheets * section.thickness);
    }, 0);
    
    // Dodajemy 1mm zapasu (zgodnie z Twoim oryginałem)
    const finalResult = total > 0 ? total + 1 : 0;
    setTotalThickness(finalResult.toFixed(2));
  }, [sections]);

  // 4. Reaguj na zmiany w sekcjach lub załadowanie listy papierów
  useEffect(() => {
    calculateThickness();
  }, [sections, calculateThickness]);

  // Aktualizacja sekcji - teraz automatycznie przelicza grubość przy zmianie papier_id
  const updateSection = (id, field, value) => {
    setSections(prevSections => prevSections.map(s => {
      if (s.id === id) {
        const updatedSection = { ...s, [field]: value };
        
        // Jeśli zmieniamy papier_id, od razu aktualizujemy też thickness dla tej sekcji
        if (field === 'papier_id') {
          updatedSection.thickness = obliczGruboscArkusza(value);
        }
        return updatedSection;
      }
      return s;
    }));
  };

  const addSection = () => {
    const newId = Date.now();
    // Pobieramy domyślną grubość dla papieru o ID 1 (lub pierwszego z listy)
    const defaultThickness = obliczGruboscArkusza(1);

    setSections([
      ...sections,
      { id: newId, pages: 16, thickness: defaultThickness, label: 'Nowa sekcja', papier_id: 1 }
    ]);

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const removeSection = (id) => {
    if (sections.length > 1) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  if(uiContext.showKalkulatorGrzbietu){
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div onDoubleClick={() => console.table(sections)} className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>
              <BookOpen size={32} color="#b1ec10" /> 
              Kalkulator Grzbietu **
            </h1>
            <p className={styles.headerSubtitle}>** Oblicz grubość grzbietu, a jak nie ma papieru to napisz do Piotra prośbę o dodanie.</p>
          </div>
          <Calculator size={48} style={{ opacity: 0.2 }} />
        </div>

        <div className={styles.body}>
          <div className={styles.scrollArea} ref={scrollRef}>
            {sections.map((section) => (
              <div key={section.id} className={styles.sectionCard}>
                <div style={{ flex: '2', minWidth: '150px' }}>
                  <label className={styles.label}>Nazwa elementu</label>
                  <input 
                    className={styles.input}
                    type="text"
                    value={section.label}
                    onChange={(e) => updateSection(section.id, 'label', e.target.value)}
                  />
                </div>

                <div style={{ width: '100px' }}>
                  <label className={styles.label}>Strony</label>
                  <input 
                    className={styles.input}
                    type="number"
                    min="2"
                    step="2"
                    value={section.pages}
                    onChange={(e) => updateSection(section.id, 'pages', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div style={{ flex: '2', minWidth: '200px' }}>
                  <label className={styles.label}>Rodzaj papieru</label>
                  <select 
                    className={styles.input}
                    value={section.papier_id}
                    onChange={(e) => updateSection(section.id, 'papier_id', e.target.value)}
                  >
                    {listaPapierowWyszukiwarka && listaPapierowWyszukiwarka.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nazwa} {option.gramatura}g {option.wykonczenie}
                      </option>
                    ))}
                  </select>
                </div>

                <button 
                  className={styles.trashBtn}
                  onClick={() => removeSection(section.id)}
                  style={{ visibility: sections.length > 1 ? 'visible' : 'hidden' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* <div className={styles.controls}>
            <button className={styles.btnAdd} onClick={addSection}>
              <Plus size={20} /> Dodaj element
            </button>
          </div> */}
        </div>

        <div className={styles.resultArea}>
          <div className={styles.resultAreaLeft}>
  <button className={styles.btnAdd} onClick={addSection}>
              <Plus size={20} /> Dodaj element
            </button>
          </div>
          <div className={styles.resultAreaCenter}>
          <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>
            Przybliżona grubość grzbietu:
          </span>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <span className={styles.totalValue}>{totalThickness}</span>
            <span className={styles.unit}>mm</span>
          </div>
          
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
              <Layers size={16} /> 
              <span>Łącznie stron: <strong>{sections.reduce((a, b) => a + (parseInt(b.pages) || 0), 0)}</strong></span>
            </div>
          </div>
          </div>
          <div className={styles.resultAreaRight}>

          </div>


        </div>
      </div>
    </div>
  );
  }

};

export default Kalkulator;