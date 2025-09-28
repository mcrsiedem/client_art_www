
import iconRefresh from "assets/refresh_green2.svg";
import { useZamowienia } from "hooks/useZamowienia";
import style from "./RefreshOddania.module.css";
import { useContext, useState } from "react";
import { AppContext } from "context/AppContext";
export default function RefreshOddania(){
    const appContext = useContext(AppContext)
  
  const [refreshZamowienia,odblokujZamowienie,deleteZamowienie] = useZamowienia()
    const [disabled, setDisabled] = useState(false);

    const fechOddaniaGrupy =appContext.fechOddaniaGrupy;
  const widokOddan =appContext.widokOddan;
    return (
        <img
        title="Odswież"
        disabled
        className={disabled ? style.iconMenuBtnDisabled:style.iconMenuBtn}
          src={iconRefresh}
          onClick={() => {
            if(!disabled){
  fechOddaniaGrupy(widokOddan)
            refreshZamowienia()
            setDisabled(true)
            // console.log("refresh")
            setTimeout(() => {
              setDisabled(false);
              // console.log("unlock")
            }, 1000);
        

            }

            
          }}
          
        />
      );
}