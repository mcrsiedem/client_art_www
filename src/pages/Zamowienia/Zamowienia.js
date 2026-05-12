import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import ModalInsert from "./ModalInsert/ModalInsert";
import style from "../Zamowienia/Zamowienia.module.css";
import Header from "./components/header/Header";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";
import { AppContext } from "context/AppContext";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import TableZamowienia from "./components/table/TableZamowienia";
import { useZamowienia } from "hooks/useZamowienia";
import ZamowieniaInfo from "components/ZamowieniaInfo/ZamowieniaInfo";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import Loading from "components/Loading/Loading";
import DiaglogAlert from "components/Dialog/DiaglogAlert";
import TableFx from "./components/table/TableFx/TableFx";
import DialogHipopotamapi from "components/DialogHipopotam/DialogHipopotamapi";
import { ZamowienieContext } from "context/ZamowieniaContext";
function Zamowienia() {

  const {setClients,setClientsWyszukiwarka,setNadkomplety,isLoading, selectedKlient, selectedUser,sortowanieZamowieniaEtap} = useContext(AppContext);
  const {openModalInsert,setOpenModalInsert} = useContext(ModalInsertContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const open = useRef(false);
  const navigate = useNavigate();
  const [callForPaper] = useApiPapier();
  const {refreshZamowienia,refZamPagination} = useZamowienia();
  const [showSettings, setShowSettings] = useState(false); // ustawienia tabeli zamówienia
  const { pagination,widok} = useContext(ZamowienieContext);


  const STORAGE_KEYS = {
  COLUMNS: "table_css_mod_columns",
  WIDTHS: "table_css_mod_widths",
  SORT: "table_css_mod_sort",
  VIEW: "table_css_mod_view"
};
  // const [visibleColumns, setVisibleColumns] = useState(() => {
  //   const saved = localStorage.getItem(STORAGE_KEYS.COLUMNS);
  //   return saved ? JSON.parse(saved) : allColumns?.filter(col => col.visible == true).map(c => c.id);
  // });

    const allColumns = [
    { id: "nr", label: "Nr" , visible: true},
    { id: "rok", label: "Rok" , visible: false},
    { id: "technologia", label: "Karta", isIcon: true, noSort: true , visible: true},
    { id: "firma_nazwa", label: "Klient" , visible: true},
    { id: "tytul", label: "Praca", visible: true }, // Używamy tytul jako klucza danych
    { id: "kod_pracy", label: "Kod", visible: true }, // Używamy tytul jako klucza danych
    { id: "nr_zamowienia_klienta", label: "Nr zam. klienta" , visible: false},
    { id: "naklad", label: "Nakład" , visible: true},
    { id: "oprawa", label: "Oprawa" , visible: true},
    { id: "ilosc_stron", label: "Str." , visible: true},
    { id: "cena", label: "Cena" , visible: false},
    { id: "waluta_id", label: "Waluta" , visible: true},
    { id: "wartosc_zamowienia", label: "Wartosc zamówienia" , visible: false},
    { id: "data_materialow", label: "Data materiałów" , visible: false},
    { id: "data_przyjecia", label: "Data przyjęcia" , visible: true},
    { id: "data_spedycji", label: "Spedycja" , visible: true},
    { id: "utworzono", label: "Utworzono" , visible: false},
    { id: "nr_kalkulacji", label: "Kalkulacja" , visible: true},
    { id: "format_x", label: "Netto" , visible: true},
    { id: "opiekun", label: "Opiekun", visible: true },
    { id: "firma", label: "Firma", visible: true },
    { id: "status_nazwa", label: "Status" , visible: true},
    { id: "stan", label: "Stan" , visible: true},
    { id: "etap", label: "Etap zamówienia" , visible: true},
    { id: "lista_faktur", label: "Faktury" , visible: false},
    { id: "koszty_status", label: "Koszty" , visible: false},
    { id: "faktury_status", label: "Faktury status" , visible: false},

    
    
  ];

  //   const [visibleColumns, setVisibleColumns] = useState(() => {
  //   const saved = localStorage.getItem(STORAGE_KEYS.COLUMNS);
  //   return saved ? JSON.parse(saved) : allColumns?.filter(col => col.visible == true).map(c => c.id);
  // });


  const [visibleColumns, setVisibleColumns] = useState(() => {
  const saved = localStorage.getItem(STORAGE_KEYS.COLUMNS);
  if (saved) return JSON.parse(saved);
  
  // Jeśli nie ma w storage, filtruj allColumns, 
  // a jeśli allColumns jest undefined, zwróć pustą tablicę []
  return allColumns?.filter(col => col.visible === true).map(c => c.id) || [];
});
    

  function dodaj_clikHandler() {
    setOpenModalInsert(true);
    open.current = false;
  }

  const open2 = () => {
    setOpenModalInsert(true);
    open.current = true;
  };
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
     

          refZamPagination(); 
          // refreshZamowienia();

          callForPaper();
          getClients(setClients, setClientsWyszukiwarka);
          getNadkomplety(setNadkomplety);
          // setLoading(false);
        } else {
          navigate("/Login");
        }
      });
  }



//     useEffect(() => {
//   refreshZamowienia();
// }, [pagination.currentPage, selectedKlient, selectedUser,sortowanieZamowieniaEtap]); 


  useEffect(() => {
          refZamPagination(); 

  // refreshZamowienia();
}, [    widok]); 
// Za każdym razem gdy zmieni się strona, pobierz nowe dane

  useEffect(() => {
    checkToken();
    setOpenModalInsert(false)
  }, []);

  return (
    <div className={style.container}>
      <Header showSettings={showSettings} setShowSettings={setShowSettings} dodaj_clikHandler={dodaj_clikHandler} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} allColumns={allColumns}/>
      <div className={style.multiTableContainer}>
        {/* <TableZamowienia /> */}
        <TableFx  showSettings={showSettings} setShowSettings={setShowSettings} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} allColumns={allColumns}/>
      </div>
          {openModalInsert && (
            <ModalInsert lokalizacja={"zamowienia"}
            />
          )}
      <TechnologiaStage/>
      <ZamowieniaInfo/>

       <Loading/>
       <DiaglogAlert/>
       <DialogHipopotamapi/>
    </div>
  );
}
export default Zamowienia;