import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../LegiTech.module.css";
import icon from "assets/copy.svg";
export default function MenuLegi({ showMenuLegi }) {
  const techContext = useContext(TechnologyContext);
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;

if(showMenuLegi){
  return (

    <div className={style.menu_legi}>
dd
    </div>
  );
}


}
