import style from "./GenerujUlotki.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import { input1632toElement } from "actions/input1632toElement";
import { useArkusze } from "hooks/useArkusze";
import { useGenerujUlotku } from "./useGenerujUlotku";

export default function GenerujUlotki() {
  const contextTech = useContext(TechnologyContext);
  const arkusze = contextTech.arkusze;
  const elementyTech = contextTech.elementyTech;
  const setElementyTech = contextTech.setElementyTech;
  const { legiKazdaUlotka,legiKazdaUlotkaJedenArkusz } = useGenerujUlotku();

  if (arkusze.filter((x) => x.delete != true).length == 0) {
    return (
      <div className={style.produkt_menu_button_sub}>
        <div className={style.produkt_menu_button_sub_16}>
          <button
            className={style.ulotki_dodaj_legi_btn}
            onClick={() => {  legiKazdaUlotka();  }}
          >
            Utwórz lege z każdej ulotki
          </button>
        </div>

        <div className={style.produkt_scal}>
          <button
            className={style.ulotki_dodaj_legi_btn}
            onClick={() => {
              legiKazdaUlotkaJedenArkusz()
            }}
          >
            Scal legi na arkusz
          </button>

          <input className={style.scal_po_ile} value={1}></input>
        </div>

        <MenuProduktyBtn />
      </div>
    );
  }
}

const MenuProduktyBtn = ({ row, showMenu, setShowMenu }) => {
  const techContext = useContext(TechnologyContext);
  const produktyTech = techContext.produktyTech;

  const { createArkuszeFromElemenets, createUlotki_lega_arkusz } = useArkusze();

  return (
    <div className={style.menu_produkty}>
      <img
        className={style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Auto wszystkie arkusze + legi"
        onClick={() => {
          if (produktyTech[0].typ == 1) {
            createArkuszeFromElemenets();
          }
          if (produktyTech[0].typ == 2) {
            createUlotki_lega_arkusz();
          }
        }}
        alt="x"
      />
    </div>
  );
};
