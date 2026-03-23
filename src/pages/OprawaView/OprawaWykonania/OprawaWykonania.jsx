import { useContext } from "react";
import style from "./OprawaWykonania.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { today_teraz } from "actions/today_teraz";
import Usun from "./Usun";
import DecodeToken from "pages/Login/DecodeToken";

export default function OprawaWykonania({ grup }) {
  const techContext = useContext(TechnologyContext);
  const wykonaniaOprawy = techContext.wykonaniaOprawy;

  return (
    <>
      {wykonaniaOprawy
        .filter((x) => x.zamowienie_id == grup.zamowienie_id && x.grupa_id == grup.id)
        .map((wykonanie) => {
          return (
            <>
              <div onDoubleClick={()=>{console.log(wykonanie)}}
              className={style.container}>
                  <div className={style.row_title}> 
                    <p className={style.title2}>   {wykonanie.dodal || DecodeToken(sessionStorage.getItem("token")).imie +" "+DecodeToken(sessionStorage.getItem("token")).nazwisko } </p>

                     </div>
                     {wykonanie.typ == 1 ?                 <div className={style.row_brak}>
                    <div className={style.center}> 
                    <p className={style.title}>   {wykonanie.utworzono  } Brak:</p>
                    <p className={style.naklad}>   {wykonanie.naklad}</p>
                    <p className={style.title}>   szt.</p>
                    </div>
                  <Usun grup={grup} wykonanie={wykonanie}/>
              </div>:                <div className={style.row}>
                    <div className={style.center}> 
                    <p className={style.title}>   {wykonanie.utworzono  } Oprawiono:</p>
                    <p className={style.naklad}>   {wykonanie.naklad}</p>
                    <p className={style.title}>   szt.</p>
                    </div>
                  <Usun grup={grup} wykonanie={wykonanie}/>
              </div> }

              </div>
            </>
          );
        })}
    </>
  );
}
