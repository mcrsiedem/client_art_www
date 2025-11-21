import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./Ustawienia.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./UstawieniaHeader";
import { _status } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import UstawieniaHeader from "./UstawieniaHeader";
import iconPapiert from "assets/papier.svg";
import iconUser from "assets/users2.svg";
import iconProcesy from "assets/iconProcesy.svg";
import iconUsers from "assets/users.svg";
import iconKlienci from "assets/klienci.svg";
import iconMaszyny from "assets/maszyny.svg";
import iconWykres from "assets/wykres.svg";





import iconZamowienia from "assets/iconZamowienia.svg";
import PaperStage from "components/PaperStage/PaperStage";
import { ModalInsertContext } from "context/ModalInsertContext";
import ClientStage from "components/Klienci/ClientStage";

export default function Ustawienia({ user, setUser }) {
  const navigate = useNavigate();
  const techContext = useContext(TechnologyContext);
  const appContext = useContext(AppContext);
  const modalContext = useContext(ModalInsertContext);

  const procesory = appContext.procesory;
  const setShowPaperStage = modalContext.setShowPaperStage;

  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className={style.main}>
      <UstawieniaHeader />

      <div className={style.container}>
                <div
                  className={style.pane}
                  onClick={() => {
                    // navigate("/Zamowienia");
                 
                    setShowPaperStage(true)
                  }}
                >
                  <img className={style.icon} src={iconPapiert} alt="Zamówienia" />{" "}
                  <p className={style.podpis_icon}>PAPIERY</p>
                </div>

                <div
                  className={style.pane}
                  onClick={() => {
                     navigate("/users");
                    // navigate("/Zamowienia");
                  }}
                >
                  <img className={style.icon} src={iconUser} alt="Zamówienia" />{" "}
                  <p className={style.podpis_icon}
                             onClick={() => {
       
                  }}
                  >UŻYTKOWNICY</p>
                </div>

                <div
                  className={style.pane}
                  onClick={() => {
                    modalContext.showAddClientStage(true)
                    // navigate("/Zamowienia");
                  }}
                >
                  <img className={style.icon} src={iconKlienci} alt="Zamówienia" />{" "}
                  <p className={style.podpis_icon}>KLIENCI</p>
                </div>

                
                <div
                  className={style.pane}
                  onClick={() => {
                    navigate("/Procesy");
                  }}
                >
                  <img className={style.icon} src={iconMaszyny} alt="Zamówienia" />{" "}
                  <p className={style.podpis_icon}>PROCESY</p>
                </div>

                {/* <div
                  className={style.pane}
                  onClick={() => {
                    navigate("/Zestawienia");
                  }}
                >
                  <img className={style.icon} src={iconWykres} alt="Zestawienia" />{" "}
                  <p className={style.podpis_icon}>STATYSTYKI</p>
                </div> */}


      </div>

      
                  <PaperStage parent={"ustawienia"}/>
                  <ClientStage parent={"ustawienia"}/>

    </div>
  );
}
