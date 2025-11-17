import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./RealizacjeZestawienie.module.css";
import Header from "./components/header/Header";
import { AppContext } from "context/AppContext";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import TableRealizacjeZestawienie from "./components/table/TableRealizacjeZestawienie";
import { useZamowienia } from "hooks/useZamowienia";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import Loading from "components/Loading/Loading";
import Footer from "./components/footer/Footer";
import { getGraniceMiesiaca } from "actions/getGraniceMiesiaca";
import { useZestawienia } from "hooks/useZestawienia";
function RealizacjeZestawienie({ user, setUser }) {

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
const {refreshRealizacjeZestawienie} = useZestawienia()



  const AKTUALNY_MIESIAC = getGraniceMiesiaca();
  const [dataOd, setDataOd] = useState(AKTUALNY_MIESIAC.pierwszyDzien);
  const [dataDo, setDataDo] = useState(AKTUALNY_MIESIAC.ostatniDzien);
  const [kto, setKto] = useState(0);


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
     
          refreshRealizacjeZestawienie(dataOd,dataDo,kto);

        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className={style.container}>
      <Header  dataDo={dataDo} dataOd={dataOd} setDataDo={setDataDo} setDataOd={setDataOd}  kto={kto} setKto={setKto}/>
      <TableRealizacjeZestawienie  open2={open2} setRow={setRow}  header={false} />
      <Footer dodaj_clikHandler={dodaj_clikHandler} kto={kto} setKto={setKto} dataDo={dataDo} dataOd={dataOd}   setDataDo={setDataDo} setDataOd={setDataOd} />
      <Loading/>
    </div>
  );
}
export default RealizacjeZestawienie;