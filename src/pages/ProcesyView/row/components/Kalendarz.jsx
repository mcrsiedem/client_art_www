import style from "../ProcesViewRow.module.css";
import iconCzas from "assets/kalendarz3.svg";
import { TechnologyContext } from "context/TechnologyContext";
import { useContext } from "react";

export default function Kalendarz  ({ grup }) {
  const techContext = useContext(TechnologyContext);

  return (

      <img
            className={style.iconKalendarz}
            src={iconCzas}
            onClick={() => {
            techContext.setSelectedGrupaTechROW(grup)
            techContext.setShowKalendarz(true)
            }}
            alt="Kalendarz"
          />

  );
};