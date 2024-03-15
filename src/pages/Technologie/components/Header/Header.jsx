
import style from "./Header.module.css";
import LeftPane from "./LeftPane"
import RightPane from "./RightPane"
import logoGrid from "../../../../assets/grid.svg";
import IconNavigate from "./IconNavigate";
export default function Header(){

    return (
      <header className={style.headerMain}>
        <LeftPane>
          <IconNavigate className={style.btn} logo={logoGrid} navi={"/Panel"} />
        </LeftPane>

        <RightPane>
          <IconNavigate className={style.btn} logo={logoGrid} navi={"/Zamowienia"} />
        </RightPane>

        {/* <div className={style.leftHeaderContener}>
          <img
            className={style.icon}
            src={ReactLogo}
            onClick={() => {
              navigate("/Panel");
              console.log("z contextu :"+ token.rowSelected)
            //  sessionStorage.setItem("us",{id:1,imie:"Maciek"})
  
            }}
            alt="React Logo"
          />
          <img className={style.icon} src={ReactLogo_ustawienia} alt="React Logo" />
          <img className={style.icon} src={ReactLogo} alt="React Logo" />
          <img className={style.icon} src={ReactLogo} alt="React Logo" />
          <img
            className={style.icon}
            src={ReactLogo_ilosc}
            onClick={() => {
              navigate("/Print");
            }}
            alt="React Logo"
          />
          <img
            className={style.icon}
            src={ReactLogo_history}
            onClick={() => {
              navigate("/History");
            }}
            alt="React Logo"
          />
        </div>
        <div className={style.leftHeaderContener}></div>
        <div className={style.rightHeaderContener}>
          <img
            className={style.icon}
            src={ReactLogo_full}
            onClick={() => {
              // fullScrean();
            }}
            alt="React Logo"
          />
        </div> */}
      </header>
    );
}