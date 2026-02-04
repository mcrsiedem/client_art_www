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
import { useZamowienia } from "hooks/useZamowienia";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import Loading from "components/Loading/Loading";
import { getGraniceMiesiaca } from "actions/getGraniceMiesiaca";
import { useZestawienia } from "hooks/useZestawienia";
import Tabs from "./components/tabs/Tabs";
import Pracownicy from "./components/pracownicy/Pracownicy";
import Grupy from "./components/grupy/Grupy";
import Proceosory from "./components/procesory/Procesory";
import Klienci from "./components/klienci/Klienci";
function RealizacjeZestawienie() {
  const contextModal = useContext(ModalInsertContext);
  const appContext = useContext(AppContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const open = useRef(false);
  const navigate = useNavigate();

const setOpenModalInsert = contextModal.setOpenModalInsert;
const {refreshRealizacjeZestawienie} = useZestawienia()

  const AKTUALNY_MIESIAC = getGraniceMiesiaca();
  const [dataOd, setDataOd] = useState(AKTUALNY_MIESIAC.pierwszyDzien);
  const [dataDo, setDataDo] = useState(AKTUALNY_MIESIAC.ostatniDzien);
  const [kto, setKto] = useState(0);
  const [grupa, setGrupa] = useState(0);


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
    appContext.setRealizacjeZestawienie([]);
    appContext.setRealizacjeZestawienieGrupy([]);
    appContext.setRealizacjeZestawienieProcesory([]);
    appContext.setRealizacjeZestawienieKlienci([]);
  }, []);

  return (
    <div className={style.container}>
      
      <Header  dataDo={dataDo} dataOd={dataOd} setDataDo={setDataDo} setDataOd={setDataOd}  kto={kto} setKto={setKto} grupa={grupa} setGrupa={setGrupa}/>
      <Tabs dataDo={dataDo} dataOd={dataOd} setDataDo={setDataDo} setDataOd={setDataOd}  kto={kto} setKto={setKto}/>
      <Pracownicy/>
      <Grupy/>
      <Proceosory dataDo={dataDo} dataOd={dataOd}/>
      <Klienci dataDo={dataDo} dataOd={dataOd}/>
      <Loading/>
    </div>
  );
}
export default RealizacjeZestawienie;