import React, { useRef } from "react";

import style from "./NawigacjaBTN.module.css";
import iconLock from 'assets/iconLock.svg'
import NewNotificationIcon from "./NewNotificationIcon";


export default function NawigacjaBTN({ handler, icon, nazwa, locked,nowe }) {
  return (
    <div
      className={style.kafle}
      onClick={() => {

        !locked && handler();
     
      }}
    >
      <p className={style.znak}> </p>
      <img className={style.icon} src={icon}  />
      <p className={style.menu_txt}>{nazwa}</p>
      {locked && (
        <img className={style.iconLock} src={iconLock} />
      )}

      {nowe && (
        // <img className={style.iconLock} src={iconLock} />
        <div className={style.iconNew}> 
          <NewNotificationIcon/>
        </div>
      )}
    </div>
  );
}
