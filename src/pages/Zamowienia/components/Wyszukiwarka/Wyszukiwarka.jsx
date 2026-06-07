import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import styles from "./Wyszukiwarka.module.css";
import { X, Search, Delete, Trash, Trash2 } from "lucide-react";
import { AppContext } from "context/AppContext";
import { useApiPapier } from "hooks/useApiPapier";
import { UIContext } from "context/UIContext";
import { useZamowienia } from "hooks/useZamowienia";
import { TechnologyContext } from "context/TechnologyContext";
import { ZamowienieContext } from "context/ZamowieniaContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import Nr from "./components/Nr";
import Rok from "./components/Rok";
import Praca from "./components/Praca";
import Klient from "./components/Klient";
import Isbn from "./components/Isbn";
import KodaPracy from "./components/KodPracy";
import NrZamowieniaKlienta from "./components/NrZamowieniaKlienta";
import NrKalkulacji from "./components/NrKalkulacji";
import Papier from "./components/Papier";
import Wysokosc from "./components/Wysokosc";
import Szerokosc from "./components/Szerokosc";
import ProcesyElementow from "./components/ProcesyElementow";
// import Papier from "pages/ProcesyView/row/components/Papier";

export default function Wyszukiwarka() {
  const uiContext = useContext(UIContext);
  const techcontext = useContext(TechnologyContext);
  const { setShowWyszukiwarka,nr, setNr,rok, setRok,klient, setKlient,praca, setPraca,isbn, setIsbn,kod, setKod,nr_zamowienia_klienta,setNr_zamowienia_klienta,nr_kalkulacji,setNr_kalkulacji,papierId,setPapierId,wysokosc,setWysokosc,szerokosc,setSzerokosc,element_proces_id,setElement_proces_id } = useContext(ZamowienieContext);

  const { globalSearch } = useZamowienia();

  // const [nr, setNr] = useState(null);
  // const [rok, setRok] = useState(2026);
  // const [klient, setKlient] = useState(null);
  // const [praca, setPraca] = useState(null);
  // const [isbn, setIsbn] = useState(null);
  // const [kod, setKod] = useState(null);
  // const [nr_zamowienia_klienta,setNr_zamowienia_klienta] = useState(null);
  // const [nr_kalkulacji,setNr_kalkulacji] = useState(null);


  // 1. Pobranie danych z API przy montowaniu

  const pobierzGlobalSearch = () => {
    globalSearch();
  };

  //kod_pracy,nr_zamowienia_klienta,nr_kalkulacji
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.resultArea}>
          <div className={styles.resultAreaLeft}></div>
          <div className={styles.resultAreaCenter}>

            <div className={styles.resultAreaRow}>
            <Nr nr={nr} setNr={setNr} />
            <Rok rok={rok} setRok={setRok} />
            <Praca praca={praca} setPraca={setPraca} />
                  <Wysokosc wysokosc={wysokosc} setWysokosc={setWysokosc} />
            <Szerokosc szerokosc={szerokosc} setNr={setSzerokosc} />
            <Isbn isbn={isbn} setIsbn={setIsbn} />
            <KodaPracy kod={kod} setKod={setKod} />
            <NrKalkulacji nr_kalkulacji={nr_kalkulacji} setNr_kalkulacji={setNr_kalkulacji} />
            <NrZamowieniaKlienta nr_zamowienia_klienta={nr_zamowienia_klienta} setNr_zamowienia_klienta={setNr_zamowienia_klienta} />
            </div>

            <div className={styles.resultAreaRow}>
            <Klient klient={klient} setKlient={setKlient} />

      

            <Papier papierId={papierId} setPapierId={setPapierId} />
            <ProcesyElementow element_proces_id={element_proces_id} setElement_proces_id={setElement_proces_id} />
           
            </div>

          </div>
          <div className={styles.resultAreaRight}>
            <button
              title="Wyczyść"
              className={styles.btnWyczysc}
              onClick={() => {
                setRok("");
                setNr("");
                setPraca("");
                setKlient(0);

                setIsbn("");
                setKod("");
                setNr_zamowienia_klienta("");
                setNr_kalkulacji("");
                setPapierId(0);
                setWysokosc("");
                setSzerokosc("");


                // console.log(dane)

                
              }}
            >
              <Trash2 size={18} />
            </button>

            <button
              className={styles.btnAdd}
              onClick={() =>  globalSearch()}
            >
              <Search size={18} />
              Znajdź
            </button>

            <button
              title="Zamknij"
              className={styles.btnZamknij}
              onClick={() =>{

                setShowWyszukiwarka(false)


              } }
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
