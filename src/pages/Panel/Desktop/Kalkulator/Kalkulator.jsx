import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './Kalkulator.module.css';
import { BookOpen, Calculator, Plus, Trash2, Layers } from 'lucide-react';
import { AppContext } from 'context/AppContext';

const Kalkulator = () => {
  const [sections, setSections] = useState([
    { id: 1, pages: 4, thickness: 0.25, label: 'Okładka' },
    { id: 2, pages: 80, thickness: 0.08, label: 'Środek' }
  ]);
  const [totalThickness, setTotalThickness] = useState(0);
  const scrollRef = useRef(null);

  // Funkcja obliczania
  const calculateThickness = () => {
    const total = sections.reduce((sum, section) => {
      const sheets = section.pages / 2;
      return sum + (sheets * section.thickness);
    }, 0);
    setTotalThickness(total.toFixed(2));
  };

  // Dodawanie sekcji z auto-scrollem
  const addSection = () => {
    const newId = Date.now();
    setSections([
      ...sections,
      { id: newId, pages: 16, thickness: 0.1, label: 'Nowa sekcja' }
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

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  // Oblicz przy pierwszym załadowaniu
  useEffect(() => {
    calculateThickness();
  }, []);

      const appcontext = useContext(AppContext);
      const listaPapierow = appcontext.listaPapierow;
      const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>
              <BookOpen size={32} color="#b1ec10" /> 
              Kalkulator Grzbietu
            </h1>
            <p className={styles.headerSubtitle}>Obliczanie grubości publikacji</p>
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
                  <label className={styles.label}>Rodzaj papieru (mm)</label>
                  <select 
                    className={styles.input}
                    value={section.thickness}
                    onChange={(e) => updateSection(section.id, 'thickness', parseFloat(e.target.value))}
                  >
                    <option value={0.07}>Gazetowy 45g (0.07)</option>
                    <option value={0.08}>Offset 80g (0.08)</option>
                    <option value={0.10}>Kreda 115g (0.10)</option>
                    <option value={0.12}>Kreda 135g (0.12)</option>
                    <option value={0.15}>Kreda 170g (0.15)</option>
                    <option value={0.25}>Karton 250g (0.25)</option>
                    <option value={0.30}>Karton 300g (0.30)</option>
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

          <div className={styles.controls}>
            <button className={styles.btnAdd} onClick={addSection}>
              <Plus size={20} /> Dodaj element
            </button>
            <button className={styles.btnCalculate} onClick={calculateThickness}>
              OBLICZ GRZBIET
            </button>
          </div>
        </div>

        <div className={styles.resultArea}>


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
              <span>Łącznie stron: <strong>{sections.reduce((a, b) => a + b.pages, 0)}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
              {/* <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#b1ec10' }}></div>
              <span>Status: Gotowy do druku</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kalkulator;