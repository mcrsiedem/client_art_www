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
            const oddaniaWykonania =appContext.oddaniaWykonania


            // grup - to oddanie
  return (
    <>
      {oddaniaWykonania 
        .filter((x) => x.zamowienie_id == grup.zamowienie_id )
        .map((wykonanie) => {

          if(wykonanie.typ==1){
                      return (
            <>
              <div className={style.container}>
                  <div className={style.row_title}> 
                    <p className={style.title2}>   {wykonanie.dodal || DecodeToken(sessionStorage.getItem("token")).imie +" "+DecodeToken(sessionStorage.getItem("token")).nazwisko } </p>

                     </div>
              <div onDoubleClick={()=>{console.log(wykonanie)}} className={style.row}>
                    <div className={style.center}> 
                    <p className={style.title}>   {wykonanie.utworzono  } Oddano:</p>
                    <p className={style.naklad}>   {wykonanie.zrealizowano}</p>
                    <p className={style.title}>   szt.</p>
                     </div>
                  {/* <button className={style.skasujBtn}>Usuń </button> */}
                  <Usun grupaOddanie={grup} wykonanieOddania={wykonanie}/>
              </div>
              </div>
            </>
          );
          }

                    if(wykonanie.typ==2){
                      return (
            <>
              <div className={style.container}>
                  <div className={style.row_title}> 
                    <p className={style.title2}>   {wykonanie.dodal || DecodeToken(sessionStorage.getItem("token")).imie +" "+DecodeToken(sessionStorage.getItem("token")).nazwisko } </p>

                     </div>
              <div onDoubleClick={()=>{console.log(wykonanie)}} className={style.row_red}>
                    <div className={style.center}> 
                    <p className={style.title}>   {wykonanie.utworzono  } Brak:</p>
                    <p className={style.naklad}>   {wykonanie.zrealizowano}</p>
                    <p className={style.title}>   szt.</p>
                     </div>
                  {/* <button className={style.skasujBtn}>Usuń </button> */}
                  <Usun grupaOddanie={grup} wykonanieOddania={wykonanie}/>
              </div>
              </div>
            </>
          );
          }

        })}
    </>
  );
}
