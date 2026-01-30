import React, { useState } from 'react';
import styles from './Kalkulator.module.css';
import { BookOpen, Calculator, Plus, Trash2, Layers } from 'lucide-react';

const Kalkulator = () => {
  const [sections, setSections] = useState([
    { id: 1, pages: 4, thickness: 0.08, label: 'Okładka' },
    { id: 2, pages: 80, thickness: 0.08, label: 'Środek' }
  ]);
  const [totalThickness, setTotalThickness] = useState(0);

  const calculateThickness = () => {
    const total = sections.reduce((sum, section) => {
      const sheets = section.pages / 2;
      return sum + (sheets * section.thickness);
    }, 0);
    setTotalThickness(total.toFixed(2));
  };

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), pages: 8, thickness: 0.1, label: 'Nowa sekcja' }
    ]);
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>
              <BookOpen size={32} /> Kalkulator Grzbietu
            </h1>
            <p className={styles.headerSubtitle}>Oblicz grubość publikacji</p>
          </div>
          <Calculator size={48} style={{ opacity: 0.3 }} />
        </div>

        <div className={styles.body}>
          <div className={styles.scrollArea}>
            {sections.map((section) => (
              <div key={section.id} className={styles.sectionCard}>
                <div style={{ width: '100px' }}>
                  <label className={styles.label}>Element</label>
                  <input 
                    className={styles.input}
                    type="text"
                    value={section.label}
                    onChange={(e) => updateSection(section.id, 'label', e.target.value)}
                  />
                </div>

                <div style={{ width: '80px' }}>
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

                <div style={{ width: '250px' }}>
                  <label className={styles.label}>Papier (mm)</label>
                  <select 
                    className={styles.input}
                    value={section.thickness}
                    onChange={(e) => updateSection(section.id, 'thickness', parseFloat(e.target.value))}
                  >
                    <option value={0.07}>Gazetowy 45g (0.07)</option>
                    <option value={0.08}>Offset 80g (0.08)</option>
                    <option value={0.10}>Kreda 115g (0.10)</option>
                    <option value={0.12}>Kreda 135g (0.12)</option>
                    <option value={0.25}>Karton 250g (0.25)</option>
                    <option value={0.30}>Karton 300g (0.30)</option>
                  </select>
                </div>

                {sections.length > 1 && (
                  <button 
                    className={styles.trashBtn}
                    onClick={() => removeSection(section.id)}
                    title="Usuń sekcję"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <button className={styles.btnAdd} onClick={addSection}>
              <Plus size={20} /> Dodaj sekcję
            </button>
            <button className={styles.btnCalculate} onClick={calculateThickness}>
              POLICZ GRUBOŚĆ
            </button>
          </div>
        </div>

        <div className={styles.resultArea}>
          <span style={{ color: '#9da2aa', fontSize: '14px', fontWeight: '500' }}>
            Przybliżona grubość grzbietu:
          </span>
          <div style={{ marginTop: '10px' }}>
            <span className={styles.totalValue}>{totalThickness}</span>
            <span className={styles.unit}>mm</span>
          </div>
          
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '20px', color: '#9da2aa', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Layers size={14} /> Suma stron: {sections.reduce((a, b) => a + b.pages, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kalkulator;