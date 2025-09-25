import { useContext } from "react";
import style from "./Realizacje.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { today_teraz } from "actions/today_teraz";

import DecodeToken from "pages/Login/DecodeToken";
import Usun from "./Usun";

export default function Realizacje({ wykonanie,grup }) {
  const techContext = useContext(TechnologyContext);
  const wykonaniaOprawy = techContext.wykonaniaOprawy;
  const realizacje = techContext.realizacje;

  return (
    <>
      {realizacje
        // .filter((x) => x.zamowienie_id == wykonanie.zamowienie_id && x.grupa_id == grup.id)
        .filter((x) => x.wykonanie_global_id== wykonanie.global_id)
        .map((realizacja) => {

          if(realizacja.typ ==1){
                      return (
            <>
              <div 
               onDoubleClick={()=>{console.log(realizacja) }}
              className={style.container}>
                  <div className={style.row_title}> 
                    <p className={style.title2}>   {realizacja.dodal || DecodeToken(sessionStorage.getItem("token")).imie +" "+DecodeToken(sessionStorage.getItem("token")).nazwisko } </p>

                     </div>
              <div className={style.row}>
                    <div className={style.center}> 
                    <p className={style.title}>   {realizacja.utworzono  } Wykonano:</p>
                    <p className={style.naklad}>   {realizacja.zrealizowano}</p>
                    <p className={style.title}>   ark.</p>
                     </div>
                  {/* <button className={style.skasujBtn}>Usuń </button> */}
                  <Usun wykonanie={wykonanie} realizacja={realizacja} grup={grup}/>
              </div>
              </div>
            </>
          );
          }




                    if(realizacja.typ ==2){
                      return (
            <>
              <div 
               onDoubleClick={()=>{console.log(realizacja) }}
              className={style.container}>
                  <div className={style.row_title}> 
                    <p className={style.title2}>   {realizacja.dodal || DecodeToken(sessionStorage.getItem("token")).imie +" "+DecodeToken(sessionStorage.getItem("token")).nazwisko } </p>

                     </div>
              <div className={style.rowRed}>
                    <div className={style.center}> 
                    <p className={style.title}>   {realizacja.utworzono  } Brak:</p>
                    <p className={style.naklad}>   {realizacja.zrealizowano}</p>
                    <p className={style.title}>   ark.</p>
                     </div>
                  {/* <button className={style.skasujBtn}>Usuń </button> */}
                  <Usun wykonanie={wykonanie} realizacja={realizacja} grup={grup}/>
              </div>
              </div>
            </>
          );
          }




        })}
    </>
  );
}
