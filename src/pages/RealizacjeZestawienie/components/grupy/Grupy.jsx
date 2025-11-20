import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IP } from "utils/Host";
import style from "./Grupy.module.css";

import { getGraniceMiesiaca } from "actions/getGraniceMiesiaca";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useZestawienia } from "hooks/useZestawienia";

import Footer from "./footer/Footer";

import TableRealizacjeZestawienie from "./table/TableRealizacjeZestawienie";
import Header from "./header/Header";
import { AppContext } from "context/AppContext";

function Grupy() {
   const appContext = useContext(AppContext);
  const showTabsRealizacje = appContext.showTabsRealizacje
  const contextModal = useContext(ModalInsertContext);
  const [row, setRow] = useState({ id: 1, prime_id: 1 });
  const open = useRef(false);
  const navigate = useNavigate();

const setOpenModalInsert = contextModal.setOpenModalInsert;
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
    console.log("Check Token")
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
    // checkToken();
  }, []);

if(showTabsRealizacje.grupy){
    return (
    <div className={style.container}>
      {/* <Header  dataDo={dataDo} dataOd={dataOd} setDataDo={setDataDo} setDataOd={setDataOd}  kto={kto} setKto={setKto}/> */}
      <TableRealizacjeZestawienie  open2={open2} setRow={setRow}  header={false} />
      <Footer dodaj_clikHandler={dodaj_clikHandler} kto={kto} setKto={setKto} dataDo={dataDo} dataOd={dataOd}   setDataDo={setDataDo} setDataOd={setDataOd} />
    </div>
  );
}

}
export default Grupy;