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
import style from "./TechnologieView.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./TechnologieViewHeader";
import { _status } from "utils/initialvalue";

import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";

import { useApiPapier } from "hooks/useApiPapier";
import iconError from "assets/error.svg";

export default function TechnologieView({ user, setUser }) {
  const navigate = useNavigate();

  const techContext = useContext(TechnologyContext);
  const fechTechnology = techContext.fechTechnology;
  const [selectedProcesor, setSelectedProcesor] = useState(1);
  const [selectedProces, setSelectedProces] = useState(1);
  const appcontext = useContext(AppContext);
  const setClients = appcontext.setClients;
  const setClientsWyszukiwarka = appcontext.setClientsWyszukiwarka;
  const setNadkomplety = appcontext.setNadkomplety;

  const [callForPaper] = useApiPapier();
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          fechTechnology();
          start();
        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  const start = async () => {
    callForPaper();
    getClients(setClients, setClientsWyszukiwarka);
    getNadkomplety(setNadkomplety);
  };

  return (
    <div className={style.main}>
      <ProcesyHeader
        selectedProces={selectedProces}
        setSelectedProces={setSelectedProces}
        setSelectedProcesor={setSelectedProcesor}
      />
      <TECHNOLOGIA_TABLE selectedProcesor={selectedProcesor} />
      <TechnologiaStage />
    </div>
  );
}

const TECHNOLOGIA_TABLE = () => {
  const techContext = useContext(TechnologyContext);
  const technology = techContext.technology;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}> !</th>
              <th> Nr</th>
              <th> Rok</th>
              <th> Klient</th>
              <th> Tytuł</th>
              <th> Stan</th>
              <th> Status</th>
              <th> Uwagi</th>
            </tr>
          </thead>
          <tbody>
            {technology?.map((row) => {
              return (
                <tr
                  key={row.id}
                  onDoubleClick={(node, event) => {
                    fechparametryTechnologii(row.zamowienie_id, row.id);
                  }}
                  onClick={() => {
                    // console.log("klik!")
                    // setRow(row.id)
                    // console.log(row.id)
                  }}
                >
                  <IconErrorTable row={row} />
                  <td style={{ width: "50px" }}>{row.nr} </td>
                  <td style={{ width: "50px" }}>{row.rok} </td>
                  <td>{row.klient} </td>
                  <td>{row.tytul}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const IconErrorTable = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  if (row.korekta_zamowienia_alert == 1) {
    return (
      <td style={{ width: "30px" }}>
        <img
          className={style.iconErrorTable}
          src={iconError}
          onClick={() => {}}
          alt="Procesy"
        />
      </td>
    );
  } else return <td></td>;
};

function Status({ selectedProcesor, setSelectedProcesor, selectedProces }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory;
  const _status_wykonania = contextApp._status_wykonania;
  const updateGrupaWykonan = techContext.updateGrupaWykonan;
  return (
    <td style={{ width: "130px" }}>
      <select
        className={style.select}
        value={selectedProcesor}
        onChange={(event) => {
          // setSelectedProcesor(event.target.value)
        }}
      >
        {_status_wykonania
          //  .filter(x => x.grupa == selectedProces )
          .map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
      </select>
    </td>
  );
}

function Stan({ selectedProcesor, setSelectedProcesor, selectedProces }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory;
  const _stan_wykonania = contextApp._stan_wykonania;
  const updateGrupaWykonan = techContext.updateGrupaWykonan;
  return (
    <td style={{ width: "100px" }}>
      <select
        className={style.select}
        value={selectedProcesor}
        onChange={(event) => {
          // setSelectedProcesor(event.target.value)
        }}
      >
        {_stan_wykonania
          //  .filter(x => x.grupa == selectedProces )
          .map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
      </select>
    </td>
  );
}

function Procesory({ selectedProcesor, setSelectedProcesor, selectedProces }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory;
  const updateGrupaWykonan = techContext.updateGrupaWykonan;
  return (
    <div className={style.procesor_btn_container}>
      {procesory
        ?.filter((x) => x.grupa == selectedProces)
        .map((option) => (
          <Btn_procesor
            setSelectedProcesor={setSelectedProcesor}
            id={option.id}
            nazwa={option.nazwa}
          />
        ))}
    </div>
  );
}

const Btn_procesor = ({ setSelectedProcesor, id, nazwa }) => {
  return (
    <button
      className={style.btn_procesor}
      onClick={(event) => {
        setSelectedProcesor(id);
      }}
    >
      {nazwa}
    </button>
  );
};
