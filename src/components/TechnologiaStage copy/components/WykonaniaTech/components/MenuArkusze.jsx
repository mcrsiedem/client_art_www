import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../WykonaniaTech.module.css";
import icon from "assets/copy.svg";
export default function MenuArkusze({ showMenu, setShowMenu }) {
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;

  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setArkusze(
              arkusze.map((t) => {
                return { ...t, select: true };
              })
            );
            setShowMenu(!showMenu);
          }}
        >
          Zaznacz wszystko
        </button>
        <button className={style.menu_legi_btn}           onClick={() => {
            setArkusze(
              arkusze.map((t) => {
                return { ...t, select: false };
              })
            );
            setShowMenu(!showMenu);
          }}>Odznacz wszystko</button>
        <button className={style.menu_legi_btn}>Legi</button>
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
