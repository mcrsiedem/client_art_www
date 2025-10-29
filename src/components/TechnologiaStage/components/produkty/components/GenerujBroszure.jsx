import style from "./GenerujBroszure.module.css";
import { useContext } from "react";

import { TechnologyContext } from "context/TechnologyContext";

import Logo_ustawienia2 from "assets/refresh_green2.svg";

import { input1632toElement } from "actions/input1632toElement";
import { useArkusze } from "hooks/useArkusze";

export default function GenerujBroszure() {
  const contextTech = useContext(TechnologyContext);
  const arkusze = contextTech.arkusze;
  const elementyTech = contextTech.elementyTech;
  const setElementyTech = contextTech.setElementyTech;

  if (arkusze.filter(x=> x.delete != true).length == 0) {
    return (
      <div className={style.produkt_menu_button_sub}>
        <div className={style.produkt_menu_button_sub_16}>
          <button
            className={style.BTN_12_24_16_32}
            onClick={() => {
              input1632toElement(2, elementyTech, setElementyTech);
            }}
          >
            2
          </button>
        </div>

        <div className={style.produkt_menu_button_sub_16}>
          <button
            className={style.BTN_12_24_16_32}
            onClick={() => {
              input1632toElement(12, elementyTech, setElementyTech);
            }}
          >
            12
          </button>
        </div>

        <div className={style.produkt_menu_button_sub_16}>
          <button
            className={style.BTN_12_24_16_32}
            onClick={() => {
              input1632toElement(16, elementyTech, setElementyTech);
            }}
          >
            16
          </button>
        </div>

        <div className={style.produkt_menu_button_sub_16}>
          <button
            className={style.BTN_12_24_16_32}
            onClick={() => {
              input1632toElement(24, elementyTech, setElementyTech);
            }}
          >
            24
          </button>
        </div>

        <div className={style.produkt_menu_button_sub_16}>
          <button
            className={style.BTN_12_24_16_32}
            onClick={() => {
              input1632toElement(32, elementyTech, setElementyTech);
            }}
          >
            32
          </button>
        </div>

        <MenuProduktyBtn />
      </div>
    );
  }
}

const MenuProduktyBtn = ({ row, showMenu, setShowMenu }) => {

   const techContext = useContext(TechnologyContext);
  const produktyTech = techContext.produktyTech;

  const { createArkuszeFromElemenets, createUlotki } = useArkusze();
 
      return (
    
    <div className={style.menu_produkty}>
      <img

        className={ style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Auto wszystkie arkusze + legi"
        onClick={() => {

          if (produktyTech[0].typ == 1) {
            createArkuszeFromElemenets();
          }
          if (produktyTech[0].typ == 2) {
          createUlotki()

          }
 
         
        }}
        alt="x"
      />

    </div>
  );
  

};