import style from "./Header.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import DecodeToken from "pages/Login/DecodeToken";

//----
export default function SprawdzBTN() {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const setSaveButtonDisabled = techContext.setSaveButtonDisabled;
  if (
    DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1 &&
    grupaWykonan.length > 0
  ) {
    return (
      <button
        className={style.btn}
        onClick={() => {
          if (
            DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1
          ) {
            setSaveButtonDisabled(false);
          }
        }}
      >
        Sprawdź
      </button>
    );
  }
}
