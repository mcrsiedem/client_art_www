import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import styles from "./Wyszukiwarka.module.css";
import { X, Search, Delete } from "lucide-react";
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

export default function Wyszukiwarka() {
  const uiContext = useContext(UIContext);
  const techcontext = useContext(TechnologyContext);
  const { setShowWyszukiwarka } = useContext(ZamowienieContext);

  const { globalSearch } = useZamowienia();

  const [nr, setNr] = useState(null);
  const [rok, setRok] = useState(2026);
  const [klient, setKlient] = useState(null);
  const [praca, setPraca] = useState(null);
  const [isbn, setIsbn] = useState(null);
  const [kod, setKod] = useState(null);


  // 1. Pobranie danych z API przy montowaniu

  const pobierzGlobalSearch = () => {
    console.log(nr);
    globalSearch({ nr: nr, rok: rok, praca: praca, klient: klient,isbn:isbn });
  };

  //kod_pracy,nr_zamowienia_klienta,nr_kalkulacji
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.resultArea}>
          <div className={styles.resultAreaLeft}></div>
          <div className={styles.resultAreaCenter}>
            <Nr nr={nr} setNr={setNr} />
            <Rok rok={rok} setRok={setRok} />
            <Praca praca={praca} setPraca={setPraca} />
            <Klient klient={klient} setKlient={setKlient} />
            <Isbn isbn={isbn} setIsbn={setIsbn} />
            <KodaPracy kod={kod} setKod={setKod} />
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
              }}
            >
              <Delete size={18} />
            </button>

            <button
              className={styles.btnAdd}
              onClick={() => pobierzGlobalSearch()}
            >
              <Search size={18} />
              Znajdź
            </button>

            <button
              title="Zamknij"
              className={styles.btnZamknij}
              onClick={() => setShowWyszukiwarka(false)}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
