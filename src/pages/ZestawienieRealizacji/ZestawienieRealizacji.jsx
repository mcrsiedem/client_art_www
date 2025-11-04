import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./ZestawienieRealizacji.module.css";
import Header from "./components/header/Header";
import { AppContext } from "context/AppContext";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import TableZamowienia from "./components/table/TableZestawienia";
import { useZamowienia } from "hooks/useZamowienia";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import Loading from "components/Loading/Loading";
import Footer from "./components/footer/Footer";
function ZestawieniaRealizacji({ user, setUser }) {

  const contextApp = useContext(AppContext);
  const contextModal = useContext(ModalInsertContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const open = useRef(false);
  const navigate = useNavigate();
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const setNadkomplety = contextApp.setNadkomplety;
  const openModalInsert = contextModal.openModalInsert;
  const setOpenModalInsert = contextModal.setOpenModalInsert;
  const [callForPaper] = useApiPapier();
const [refreshZamowienia] = useZamowienia()
const [loading, setLoading] = useState(true);

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
          setLoading(false);
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
      <Header dodaj_clikHandler={dodaj_clikHandler} />
      <TableZamowienia  open2={open2} setRow={setRow}  header={false} loading={loading}/>
      <Footer dodaj_clikHandler={dodaj_clikHandler} />





      
    </div>
  );
}
export default ZestawieniaRealizacji;