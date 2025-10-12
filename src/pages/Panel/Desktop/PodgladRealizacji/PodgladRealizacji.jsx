import React, { useContext, useEffect, useRef } from "react";
// Importujemy style z pliku CSS Modules
import style from "./PodgladRealizacji.module.css";
import { useSocket } from "context/SocketContext";
import { AppContext } from "context/AppContext";
import iconClose2 from "assets/x2.svg";
import Realizacje from "./Realizacje";
import Oprawa from "./Oprawa";
import Zamowienia from "./Zamowienia";
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

  const pokazUzytkownikowOnline = appcontext.pokazUzytkownikowOnline;
  const setPokazUzytkownikowOnline = appcontext.setPokazUzytkownikowOnline;
  const { podgladRealizacji } = useSocket();
  useEffect(() => {
    // Sprawdzamy, czy dane istnieją i czy ref istnieje
    if (podgladRealizacji && podgladTableRef2.current) {
      // Użycie setTimeout(..., 0) jest tutaj wciąż dobrym zabezpieczeniem
      setTimeout(() => {
        podgladTableRef2.current.scrollTo({ top: 30000, behavior: "auto" });
      }, 0);
    }
  }, [podgladRealizacji]);

  return (
    <div className={style.container}>
      <h2 className={style.header}>
        Ostatnie realizacje... ({podgladRealizacji.length})
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
        {/* Zastosowanie Twojej struktury mapowania */}
        {podgladRealizacji
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
            
          })}
      </div>
    </div>
  );
}
