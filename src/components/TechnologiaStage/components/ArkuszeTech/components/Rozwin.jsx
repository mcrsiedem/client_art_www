import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../ArkuszeTech.module.css";
import icon from "assets/copy.svg";
import logoExpand from "assets/expand.svg";

export default function Rozwin({ showLegi,setShowLegi }) {
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;


  return (

      <div>
        <img
          className={style.expand}
          src={logoExpand}
          onClick={() => {
            setShowLegi(!showLegi)
          }}
          alt="Procesy"
        />
      </div>

  );
}
