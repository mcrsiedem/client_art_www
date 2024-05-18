
import style from "./Header.module.css";
import LeftPane from "./LeftPane"
import RightPane from "./RightPane"
import logoGrid from "../../../../assets/grid.svg";
import IconNavigate from "./IconNavigate";
import IconClose from "assets/x.svg"
export default function Header(){

    return (
      <header className={style.headerMain}>
        <LeftPane>
         <p>Karta technologiczna...</p>
        </LeftPane>

        <RightPane>
          <IconNavigate className={style.btn} logo={IconClose} navi={"/Panel"} />
        </RightPane>

      </header>
    );
}

