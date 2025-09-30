import { useContext } from "react";
import style from "./OddaniaWykonania.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { today_teraz } from "actions/today_teraz";
import Usun from "./Usun";
import DecodeToken from "pages/Login/DecodeToken";
import { AppContext } from "context/AppContext";

export default function OddaniaWykonania({ grup }) {
  const techContext = useContext(TechnologyContext);
  const wykonaniaOprawy = techContext.wykonaniaOprawy;
    const appContext = useContext(AppContext)
  
    const oddaniaGrupy =appContext.oddaniaGrupy;
    const setOddaniaGrupy =appContext.setOddaniaGrupy

  return (
    <>
      {oddaniaGrupy
        .filter((x) => x.zamowienie_id == grup.zamowienie_id && x.grupa_id == grup.id)
        .map((wykonanie) => {
          return (
            <>
              <div className={style.container}>
                  <div className={style.row_title}> 
                    <p className={style.title2}>   {wykonanie.dodal || DecodeToken(sessionStorage.getItem("token")).imie +" "+DecodeToken(sessionStorage.getItem("token")).nazwisko } </p>

                     </div>
              <div className={style.row}>
                    <div className={style.center}> 
                    <p className={style.title}>   {wykonanie.utworzono  } Oprawiono:</p>
                    <p className={style.naklad}>   {wykonanie.naklad}</p>
                    <p className={style.title}>   szt.</p>
                     </div>
                  {/* <button className={style.skasujBtn}>Usuń </button> */}
                  <Usun grup={grup} wykonanie={wykonanie}/>
              </div>
              </div>
            </>
          );
        })}
    </>
  );
}
