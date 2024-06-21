import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./MenuZamowienia.module.css";
import icon from "assets/copy.svg";
export default function MenuZamowienia({ showMenu, setShowMenu }) {
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;

  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <button
          className={style.menu_legi_btn}
          onClick={() => {

            setShowMenu(!showMenu);
          }}
        >
          Usuń
        </button>
        <button className={style.menu_legi_btn}           onClick={() => {

            setShowMenu(!showMenu);
          }}>Usuń na zawsze...</button>

        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          Anuluj
        </button>
      </div>
    );
  }
}
