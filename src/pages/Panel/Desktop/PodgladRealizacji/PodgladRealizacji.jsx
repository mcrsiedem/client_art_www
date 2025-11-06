import React, { useContext, useEffect, useRef } from "react";
// Importujemy style z pliku CSS Modules
import style from "./PodgladRealizacji.module.css";
import { useSocket } from "context/SocketContext";
import { AppContext } from "context/AppContext";
import iconClose2 from "assets/x2.svg";
import Realizacje from "./Realizacje";
import Oprawa from "./Oprawa";
import Zamowienia from "./Zamowienia";
import { formatujDateZGodzinaIDniemTygodniaPoPolsku } from "actions/formatujDateZGodzinaIDniemTygodniaPoPolsku";
import { formatujDateZGodzinaICalyDniemTygodniaPoPolsku } from "actions/formatujDateZGodzinaICalyDniemTygodniaPoPolsku";
import LoadingMini from "components/Loading/LoadingMini";
import { todayMinusDniGodziny } from "actions/todayMinusDniGodziny";
// Komponent ikony online (używany tylko dla estetyki)
// const OnlineIcon = () => (
//   <span className={style.onlineIcon} title="Online" />
// );

const OnlineIcon = ({ status }) => {
  if (status == "Aktywny") {
    return <span className={style.onlineIcon} title="Online" />;
  } else {
    return <span className={style.offlineIcon} title="Nieaktywny" />;
  }
};
/**
 * Komponent wyświetlający listę użytkowników online z wykorzystaniem
 * nazewnictwa 'usersIO' i stylów z CSS Modules.
 * * @param {object} props
 * @param {Array<{id: number, imie: string, nazwisko: string, zalogowany: string}>} props.usersIO - Lista użytkowników online.
 */
export default function PodgladRealizacji() {
  const appcontext = useContext(AppContext);
  const podgladTableRef2 = useRef(null);
  // const {loading,podgladRealizacji,callPodgladRalizacji} = useRealizacje();
  const {loading,podgladRealizacji,callPodgladRalizacji} = useSocket();

  const pokazUzytkownikowOnline = appcontext.pokazUzytkownikowOnline;
  const setPokazUzytkownikowOnline = appcontext.setPokazUzytkownikowOnline;

    useEffect(() => {
    // callPodgladRalizacji(todayMinusDniGodziny(1))

  }, []);
  useEffect(() => {

    // Sprawdzamy, czy dane istnieją i czy ref istnieje
    if (podgladRealizacji && podgladTableRef2.current) {
      // Użycie setTimeout(..., 0) jest tutaj wciąż dobrym zabezpieczeniem
      setTimeout(() => {
        podgladTableRef2.current.scrollTo({ top: 30000, behavior: "auto" });
      }, 0);
    }
  }, [podgladRealizacji]);

    // if (loading) {
    //   // return <div>Ładowanie danych...</div>;
    //   return <LoadingMini loading={loading}/>;
  
    // }

  return (
    <div className={style.container}>
      <h2 className={style.header}>
        Ostatnie realizacje... ({podgladRealizacji?.length}) 
        <div className={style.statystykiContainerData}>
            Od : {podgladRealizacji[0]?.utworzono} {formatujDateZGodzinaICalyDniemTygodniaPoPolsku(podgladRealizacji[0]?.utworzono) }
</div>
        {/* <img
          className={style.icon2}
          src={iconClose2}
          onClick={() => {
            setPokazUzytkownikowOnline(false)
          }}
          alt="React Logo"
        /> */}
      </h2>

      <div ref={podgladTableRef2} className={style.listWrapper}>
    
        {loading? (<LoadingMini loading={loading}/>):( podgladRealizacji
          ?.sort((a, b) => new Date(a.utworzono) - new Date(b.utworzono))
          .map((podglad, i) => {


            if (podglad.rodzaj == "Realizacje") {
              return <Realizacje podglad={podglad} i={i} />;
            }

              if (podglad.rodzaj == "Oprawa") {
              return <Oprawa podglad={podglad} i={i} />;
            }


         if (podglad.rodzaj == "Zamowienia") {
              return <Zamowienia podglad={podglad} i={i} />;
            }
          
          }))}

      </div>
                <div className={style.statystykiContainer}>
                  <div>
                                  Druk : {podgladRealizacji
    .filter(pozycja => pozycja.nazwa === "Druk")
    .reduce((acc, pozycja) => acc + pozycja.zrealizowano, 0).toLocaleString('pl-PL')} ark.
                  </div>

<div>
            Falc : {podgladRealizacji
    .filter(pozycja => pozycja.nazwa === "Falcowanie")
    .reduce((acc, pozycja) => acc + pozycja.zrealizowano, 0).toLocaleString('pl-PL')} ark.

</div>

<div>
            Oprawa : {podgladRealizacji
    .filter(pozycja => pozycja.rodzaj === "Oprawa")
    .reduce((acc, pozycja) => acc + pozycja.naklad, 0).toLocaleString('pl-PL')} szt
</div>

<div>
            Uszlachetnianie : {podgladRealizacji
    .filter(pozycja => pozycja.nazwa === "Uszlachetnianie")
    .reduce((acc, pozycja) => acc + pozycja.zrealizowano, 0).toLocaleString('pl-PL')} ark.
</div>

    </div>
      </div>

    
  );
}
