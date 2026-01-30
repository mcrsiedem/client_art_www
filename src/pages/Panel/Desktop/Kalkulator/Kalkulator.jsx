import React, { useContext, useState } from 'react';
// Importujemy style z pliku CSS Modules
import style from './Kalkulator.module.css';
import { useSocket } from 'context/SocketContext';
import { AppContext } from 'context/AppContext';
import iconClose2 from "assets/x2.svg";
import Papier from 'pages/ProcesyView/row/components/Papier';
import { Calculator, Plus, Trash2, BookOpen, Layers } from 'lucide-react';
// Komponent ikony online (używany tylko dla estetyki)
// const OnlineIcon = () => (
//   <span className={style.onlineIcon} title="Online" />
// );



const Kalkulator = () => {
  const [sections, setSections] = useState([
    { id: 1, pages: 4, thickness: 0.08, label: 'Okładka' },{ id: 2, pages: 80, thickness: 0.08, label: 'Środek' }
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

  // Style CSS jako obiekt JS
  const styles = {
    container: {
      minHeight: '100-screen',
      // width:'1000px',
      // backgroundColor: '#f8fafc',
      backgroundColor: 'transparent',
      
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      maxWidth: '1000px',
      width: '800px',
      backgroundColor: 'rgba(43, 106, 131, 0.15)',
      // backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      border: '1px solid #f1f5f98e'
    },
    header: {
      backgroundColor: 'rgba(45, 45, 46, 0.77)',
      // backgroundColor: 'rgb(216, 216, 216,0.5)',
      padding: '30px',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    sectionCard: {
      padding: '15px 20px 20px 20px',
      // width:'100px',
      // backgroundColor: '#2020208f',
      backgroundColor: 'rgba(45, 45, 46, 0.77)',
      // backgroundColor: 'rgb(216, 216, 216,0.2)',
      // backgroundColor: 'tansparent',
      borderRadius: '16px',
      border: '1px solid #e2e8f0a1',
      marginBottom: '15px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      alignItems: 'flex-end',
      position: 'relative'
    },
    label: {
      display: 'block',
      fontSize: '11px',
      fontWeight: '600',
      color: '#d2d2d2',
      textTransform: 'uppercase',
      marginBottom: '8px',
      letterSpacing: '0.05em'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #e2e8f080',
      borderRadius: '8px',
      outline: 'none',
      fontSize: '14px',
      backgroundColor: 'rgba(216, 216, 216,0.2)',
      color: '#c2c6cc',
  
      
    },
        input_nazwa: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      fontSize: '14px',
      backgroundColor: 'rgba(216, 216, 216,0.2)',
      color: '#c2c6cc',

    },
    btnCalculate: {
      flex: 1,
      backgroundColor: '#b2ec1063',
      color: '#dfffc5',
      border: 'none',
      borderRadius: '12px',
      // padding: '15px 25px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.2s',
      letterSpacing: '5px'
    },
    btnAdd: {
      backgroundColor: '#cbd5e117',
      border: '1px dashed #cbd5e1',
      borderRadius: '12px',
      padding: '12px 20px',
      color: '#c0c0c0',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '500'
    },
    resultArea: {
      padding: '25px',
      backgroundColor: 'rgba(45, 45, 46, 0.77)',
      borderTop: '1px solid #f1f5f9',
      textAlign: 'center'
    },
    trashBtn: {
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      padding: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        input:focus, select:focus { border-color: #4f46e5 !important; box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1); }
        button:hover { opacity: 0.9; }
        .section-item:hover { border-color: #c7d2fe !important; }
      `}</style>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={32} /> Kalkulator Grzbietu 
          {/* <Calculator size={48} style={{ opacity: 0.3 }} />  Kalkulator Grzbietu */}

            </h1>
            <p style={{ margin: '5px 0 0 0px', color: '#c4c4c4', fontSize: '14px' }}>Oblicz grubość publikacji</p>
          </div>
          <Calculator size={48} style={{ opacity: 0.3 }} onClick={()=>{console.log("ok")}}/>
        </div>

        <div style={{ padding: '30px' }}>
          <div style={{ marginBottom: '20px', height:'280px' ,overflow:'auto' }}>
            {sections.map((section) => (
              <div key={section.id} style={styles.sectionCard} className="section-item">
                <div style={{  width: '100px' }}>
                  <label style={styles.label}>Element</label>
                  <input 
                    style={styles.input}
                    type="text"
                    value={section.label}
                    onChange={(e) => updateSection(section.id, 'label', e.target.value)}
                  />
                </div>

                <div style={{ width: '80px' }}>
                  <label style={styles.label}>Strony</label>
                  <input 
                    style={styles.input_nazwa}
                    type="number"
                    min="2"
                    step="2"
                    value={section.pages}
                    onChange={(e) => updateSection(section.id, 'pages', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div style={{ width: '250px' }}>
                  <label style={styles.label}>Papier (mm)</label>
                  <select 
                    style={styles.input}
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
                    style={styles.trashBtn}
                    onClick={() => removeSection(section.id)}
                    title="Usuń sekcję"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={styles.btnAdd} onClick={addSection}>
              <Plus size={20} /> Dodaj element
            </button>
            <button style={styles.btnCalculate} onClick={calculateThickness}>
              POLICZ GRUBOŚĆ
            </button>
          </div>
        </div>

        <div style={styles.resultArea}>
          <span style={{ color: '#9da2aa', fontSize: '14px', fontWeight: '500' }}>
            Przybliżona grubość grzbietu:
          </span>
          <div style={{ marginTop: '10px' }}>
            {/* <span style={{ fontSize: '48px', fontWeight: '900', color: '#1e293b' }}>{totalThickness}</span> */}
            <span style={{ fontSize: '48px', fontWeight: '900', color: '#bebebe' }}>{totalThickness}</span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#94a3b8', marginLeft: '10px' }}>mm</span>
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