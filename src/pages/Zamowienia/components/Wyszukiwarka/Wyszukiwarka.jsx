import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import styles from './Wyszukiwarka.module.css';
import {  X,  Search,  Delete } from 'lucide-react';
import { AppContext } from 'context/AppContext';
import { useApiPapier } from 'hooks/useApiPapier';
import { UIContext } from 'context/UIContext';
import { useZamowienia } from 'hooks/useZamowienia';
import { TechnologyContext } from 'context/TechnologyContext';
import { ZamowienieContext } from 'context/ZamowieniaContext';
import { ModalInsertContext } from 'context/ModalInsertContext';

const Wyszukiwarka = () => {
  const uiContext = useContext(UIContext);
    const techcontext = useContext(TechnologyContext);
      const {setShowWyszukiwarka} = useContext(ZamowienieContext);
    
    const {globalSearch} = useZamowienia();
  
  
  const [callForPaper] = useApiPapier();
  const {getElementy} = useZamowienia();
  const { listaPapierow, listaPapierowWyszukiwarka } = useContext(AppContext);

  
  const [sections, setSections] = useState([
    { id: 1, pages: 80, thickness: 0.0648, label: 'Środek', papier_id: 10, width: 210, height: 297 },
    { id: 2, pages: 4, thickness: 0.20, label: 'Okładka', papier_id: 83 , width: 210, height: 297}
  ]);
  
  const [totalThickness, setTotalThickness] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
  const [naklad, setNaklad] = useState(1);
  const [warstwy, setWarstwy] = useState(1);
  const [iloscNaWarstwie, setIloscNaWarstwie] = useState(1);


  const [nr, setNr] = useState(null);
  const [rok, setRok] = useState(2026);
  const [klient, setKlient] = useState(null);
  const [praca, setPraca] = useState(null);
  const [opiekun, setOpiekun] = useState(null);


  const scrollRef = useRef(null);

  // 1. Pobranie danych z API przy montowaniu
  useEffect(() => {
    techcontext.setDaneTech([])
    callForPaper();
  }, []);

  // 2. Funkcja obliczająca jednostkową grubość arkusza
  // Pobieranie danych papieru po ID
  const getPapierById = useCallback((id) => {
    return listaPapierow?.find(x => x.id == id);
  }, [listaPapierow]);

  // Obliczanie grubości pojedynczego arkusza
  const obliczGruboscArkusza = useCallback((id) => {
    const papier = getPapierById(id);
    if (!papier) return 0.1;
    return (parseFloat(papier.gramatura) / 1000) * parseFloat(papier.bulk);
  }, [getPapierById]);


  

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

    const calculateWeight = useCallback(() => {
    const total = sections.reduce((sum, section) => {
      const papier = getPapierById(section.papier_id);
      if (!papier) return sum;

      const gramatura = parseFloat(papier.gramatura) || 0;
      const arkusze = (parseInt(section.pages) || 0) / 2;
      const powierzchniaM2 = (section.width * section.height) / 1000000;
      
      const wagaSekcji = powierzchniaM2 * (gramatura / 1000) * arkusze;
      return sum + wagaSekcji;
    }, 0);
    
    setTotalWeight(total.toFixed(3));
  }, [sections, getPapierById]);



  // 4. Reaguj na zmiany w sekcjach lub załadowanie listy papierów
  useEffect(() => {
    calculateThickness();
    calculateWeight();
  }, [sections, calculateThickness,calculateWeight]);












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
      { id: newId, pages: 16, thickness: defaultThickness, label: 'Nowa sekcja', papier_id: 1, width: sections[1].width, height: sections[1].height }
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

const pobierzGlobalSearch = () => {
  // // 1. Czekamy aż dane zostaną pobrane i przypisane do zmiennej data
  // setNaklad(1)
  // setWarstwy(1)
  // const data = await getElementy(nr, rok);
  // // 2. Wykonujemy resztę logiki tylko gdy mamy dane
  // if (data[0] && Array.isArray(data)) {
  //   const sec = data.map(x => ({
  //     id: x.id,
  //     pages: x.ilosc_stron,
  //     // Zakładam, że obliczGruboscArkusza jest dostępna w zasięgu
  //     thickness: obliczGruboscArkusza(x.papier_id || 1), 
  //     label: x.typ_nazwa || "cos",
  //     papier_id: x.papier_id,
  //     width: x.format_x,
  //     height: x.format_y,
  //   }));

  //   // 3. Aktualizujemy stan sekcji
  // // console.log(data)

  //   setSections(sec);
  // }
  console.log(nr)
  globalSearch({nr:nr})
};



const pobierzElementyZamowienia = async () => {
  // 1. Czekamy aż dane zostaną pobrane i przypisane do zmiennej data
  setNaklad(1)
  setWarstwy(1)
  const data = await getElementy(nr, rok);
  // 2. Wykonujemy resztę logiki tylko gdy mamy dane
  if (data[0] && Array.isArray(data)) {
    const sec = data.map(x => ({
      id: x.id,
      pages: x.ilosc_stron,
      // Zakładam, że obliczGruboscArkusza jest dostępna w zasięgu
      thickness: obliczGruboscArkusza(x.papier_id || 1), 
      label: x.typ_nazwa || "cos",
      papier_id: x.papier_id,
      width: x.format_x,
      height: x.format_y,
    }));

    // 3. Aktualizujemy stan sekcji
  // console.log(data)

    setSections(sec);
  }
};



  const removeSection = (id) => {
    if (sections.length > 1) {
      setSections(sections.filter(s => s.id !== id));
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div onDoubleClick={() => console.table(sections)} className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>
              <Search size={20} color="#303030" /> 
              Znajdź zamówienie
            </h1>
            {/* <p className={styles.headerSubtitle}>.</p> */}
            {/* <p className={styles.headerSubtitle}>Oblicz grubość grzbietu oraz wagę...</p> */}

            {/* {techcontext.daneTech.length > 0 ? (<p className={styles.headerSubtitle}>{techcontext.daneTech[0]?.firma_nazwa} -  {techcontext.daneTech[0]?.tytul}</p>): (<p className={styles.headerSubtitle}>Policz grzbiet oraz wage...</p>)} */}
{/* <p className={styles.headerSubtitle}>Wpisz nr zlecenia</p> */}
            {/* // <p className={styles.headerSubtitle}>{techcontext.daneTech[0]?.firma_nazwa} -  {techcontext.daneTech[0]?.tytul}</p> */}
            
          </div>
          

          <X size={20} styles={{ opacity: 0.2 } } onClick={()=>{setShowWyszukiwarka(false )}} />
      

        </div>

        {/* <div className={styles.body}>



        </div> */}

        <div className={styles.resultArea}>
          <div className={styles.resultAreaLeft}>

          </div>
          <div className={styles.resultAreaCenter}>

            <Nr  nr={nr} setNr={setNr} />
            <Rok  rok={rok} setRok={setRok} />
            <Praca  praca={praca} setPraca={setPraca} />
            <Klient  klient={klient} setKlient={setKlient} />



                    {/* <button 
                    title='Wpisz nr zlecenia i pobierz elementy'
                    className={styles.btnImport} onClick={pobierzElementyZamowienia}>
              <Download size={20} /> 
            </button> */}
 
          {/* <span styles={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>
            Przybliżona grubość grzbietu oraz waga:
          </span>

          <div styles={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <span className={styles.totalValue}>{(totalThickness* naklad * warstwy).toFixed(2)}</span>
            <span className={styles.unit}>mm</span>
            <span className={styles.unit2}> - </span>



                <span className={styles.totalWeight}>{(totalWeight * naklad * warstwy *iloscNaWarstwie).toFixed(2)}</span>
                <span className={styles.unit}>kg</span>
          </div>
          
          <div styles={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '25px'}}>


            



          </div> */}
          </div>
          <div className={styles.resultAreaRight}>

                         <button className={styles.btnWyczysc} onClick={pobierzElementyZamowienia}>
              <Delete size={18} /> 
              
            </button>

             <button className={styles.btnAdd} onClick={()=>pobierzGlobalSearch()}>
              <Search size={18} /> 
              Znajdź
            </button>

          </div>


        </div>
        {/* <div className={styles.resultAreaBottom}> */}
            {/* <div styles={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
              <File  color="#1c8de9" size={16} /> 
              <span>Strony: <strong>{sections.reduce((a, b) => a + (parseInt(b.pages) || 0), 0)}</strong></span>
            </div>

                       <div styles={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
              <Box color="#933e3e" size={16} /> 
              <span>Ilość w paczce : </span>                           <input 
                    className={styles.inputNaklad}
                    placeholder='1'
                    title={naklad.toLocaleString()}

                    type="text"
                    value={naklad}

                    onChange={(e) => setNaklad( e.target.value)}
                  />
            </div>


                       <div styles={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
              <Layers  color="#a9ac18" size={16} /> 
              <span>Warstwy : </span>                           <input 
                    className={styles.inputNaklad}
                    placeholder='1'
                    title={warstwy.toLocaleString()}

                    type="text"
                    value={warstwy}

                    onChange={(e) => setWarstwy( e.target.value)}
                  />
            </div>

                                   <div styles={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
              <Grid3X3  color="#3e9392" size={16} /> 
              <span>Ilość paczek na warstwie : </span>                           <input 
                    className={styles.inputNaklad}
                    placeholder='1'
                    title={iloscNaWarstwie.toLocaleString()}

                    type="text"
                    value={iloscNaWarstwie}

                    onChange={(e) => setIloscNaWarstwie( e.target.value)}
                  />
            </div> */}
        {/* </div> */}
      </div>
    </div>
  );
  

};

export default Wyszukiwarka;

function Nr({nr, setNr} ){
  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> Nr </label>
      <input className={styles.inputData} type="text"
            value={nr}
            onChange={(event) => {
              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setNr(event.target.value);
              }
            }}></input>
    </div>
  );
}

function Rok({rok, setRok} ){
  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> Rok </label>
      <input className={styles.inputData} type="text"
            value={rok}
            onChange={(event) => {
              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setRok(event.target.value);
              }
            }}></input>
    </div>
  );
}




function Praca({praca, setPraca} ){


  return(
      <div className={styles.colData}>
      <label className={styles.labelData}> Tytul </label>
      <input className={styles.inputData} type="text"
      value={praca}
      onChange={(event) => {
        

         const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
        setPraca(event.target.value);
         

      }}></input>
    </div>
  );
}


function Klient({klient, setKlient }) {

const contextModalInsert = useContext(ModalInsertContext);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const contextApp = useContext(AppContext);

  return (
    <div className={styles.colData}>
      <label className={styles.labelData}> Klient </label>
      <select
        className={styles.inputData}
        value={klient}
        onChange={(event) => {
          setKlient( event.target.value);
            // 
      // setStaus(3)
           ;
        }}
      >
        <option key={1} value={"0"}> 
           wybierz...
          </option>
        {contextApp.clients
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma}
          </option>
        ))}
      </select>

    </div>
  );
}