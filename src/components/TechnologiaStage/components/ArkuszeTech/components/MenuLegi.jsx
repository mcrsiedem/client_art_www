import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../ArkuszeTech.module.css";
import icon from "assets/copy.svg";
export default function MenuLegi({ showMenuLegi, setShowMenuLegi }) {
  const techContext = useContext(TechnologyContext);
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;

  if (showMenuLegi) {
    return (
      <div className={style.menu_legi}>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setLegi(
              legi.map((t) => {
                return { ...t, select: true };
              })
            );
            setShowMenuLegi(!showMenuLegi);
          }}
        >
          Zaznacz wszystko
        </button>
        <button className={style.menu_legi_btn}           onClick={() => {
            setLegi(
              legi.map((t) => {
                return { ...t, select: false };
              })
            );
            setShowMenuLegi(!showMenuLegi);
          }}>Odznacz wszystko</button>
        <button className={style.menu_legi_btn}>Arkusze</button>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setShowMenuLegi(!showMenuLegi);
          }}
        >
          Anuluj
        </button>
      </div>
    );
  }
}
