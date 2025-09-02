import { useContext } from "react";
import style from "./OprawaWykonania.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { today_teraz } from "actions/today_teraz";
import Usun from "./Usun";

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
              <div className={style.container}>
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
