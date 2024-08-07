
import style from "./Header.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import LeftPane from "./LeftPane"
import RightPane from "./RightPane"
import logoGrid from "../../../../assets/grid.svg";
import IconNavigate from "./IconNavigate";
import IconClose from "assets/x.svg"
export default function Header(){

  const techContext = useContext(TechnologyContext)
  const appcontext = useContext(AppContext)
  const listaPapierow = appcontext.listaPapierow;
    return (
      <header className={style.headerMain}>
        <LeftPane>
         {/* <p>Karta technologiczna... {techContext.rowTechnologia?.id} {techContext.rowZamowienia?.id}</p> */}
         <p>Karta technologiczna...  {techContext.dane?.id}</p> <button onClick={()=>{
            console.clear()
            console.log("Karta Technologiczna: ")
            console.log("Produkt: ",techContext.produktyTech)
            console.log("Elementy: ",techContext.elementyTech)
            console.log("Procesy elementów: ",techContext.procesyElementowTech)
            console.log("Arkusze: ",techContext.arkusze)
            console.log("Legi: ",techContext.legi)
            console.log("Grupy wykonan: ",techContext.grupaWykonan)
            console.log("Wykonania: ",techContext.wykonania)
            console.log("Procesy Elementow Tech: ",techContext.procesyElementowTech)
            console.log("Procesy Elementow Tech Temporary: ",techContext.procesyElementowTechTemmporary)

         }}>OK</button>
         {/* <button onClick={()=> console.log(techContext.dane.id)}> OK</button> */}
        </LeftPane>

        <RightPane>
          <IconNavigate className={style.btn} logo={IconClose} navi={"/Panel"} />
        </RightPane>

      </header>
    );
}

