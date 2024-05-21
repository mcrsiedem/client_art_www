
import style from "./Header.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import LeftPane from "./LeftPane"
import RightPane from "./RightPane"
import logoGrid from "../../../../assets/grid.svg";
import IconNavigate from "./IconNavigate";
import IconClose from "assets/x.svg"
export default function Header(){

  const techContext = useContext(TechnologyContext)
    return (
      <header className={style.headerMain}>
        <LeftPane>
         {/* <p>Karta technologiczna... {techContext.rowTechnologia?.id} {techContext.rowZamowienia?.id}</p> */}
         <p>Karta technologiczna...  {techContext.dane?.id}</p>
         <button onClick={()=> console.log(techContext.dane.id)}> OK</button>
        </LeftPane>

        <RightPane>
          <IconNavigate className={style.btn} logo={IconClose} navi={"/Panel"} />
        </RightPane>

      </header>
    );
}

