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
function Zamowienia() {

  const {setClients,setClientsWyszukiwarka,setNadkomplety,isLoading} = useContext(AppContext);
  const {openModalInsert,setOpenModalInsert} = useContext(ModalInsertContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const open = useRef(false);
  const navigate = useNavigate();
  const [callForPaper] = useApiPapier();
  const {refreshZamowienia} = useZamowienia();
  const [showSettings, setShowSettings] = useState(false); // ustawienia tabeli zamówienia


    

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
     
          refreshZamowienia();
          callForPaper();
          getClients(setClients, setClientsWyszukiwarka);
          getNadkomplety(setNadkomplety);
          // setLoading(false);
        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
    setOpenModalInsert(false)
  }, []);

  return (
    <div className={style.container}>
      <Header showSettings={showSettings} setShowSettings={setShowSettings} dodaj_clikHandler={dodaj_clikHandler} />
      <div className={style.multiTableContainer}>
        {/* <TableZamowienia /> */}
        <TableFx  showSettings={showSettings} setShowSettings={setShowSettings}/>
      </div>
          {openModalInsert && (
            <ModalInsert lokalizacja={"zamowienia"}
            />
          )}
      <TechnologiaStage/>
      <ZamowieniaInfo/>

       <Loading/>
       <DiaglogAlert/>
    </div>
  );
}
export default Zamowienia;