
import iconRefresh from "assets/refresh_green2.svg";
import { useZamowienia } from "hooks/useZamowienia";
import style from "./REFRESH_ZAMOWIENIA_BTN.module.css";
import { useState } from "react";
export default function REFRESH_ZAMOWIENIA_BTN(){
  const [refreshZamowienia,odblokujZamowienie,deleteZamowienie,createPliki] = useZamowienia()
    const [disabled, setDisabled] = useState(false);
  

    return (
        <img
        title="Odswież"
        disabled
        className={disabled ? style.iconMenuBtnDisabled:style.iconMenuBtn}
          src={iconRefresh}
          onClick={() => {
            if(!disabled){

            // refreshZamowienia()
            createPliki()
            setDisabled(true)
            // console.log("refresh")
            setTimeout(() => {
              setDisabled(false);
              // console.log("unlock")
            }, 2000);
        

            }

            
          }}
          
        />
      );
}