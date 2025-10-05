import React, { useContext } from "react";
import style from "./Loading.module.css";
import { AppContext } from "context/AppContext";
import iconAdd from "assets/history.svg";
export default function Loading( ) {
  const appContext = useContext(AppContext);
  const isLoading = appContext.isLoading;
  if (isLoading) {
    return (
      <div className={style.grayScaleBackground}>
        <div
          onDoubleClick={() => {
            // console.clear();
            // console.log("daneKlienta : ");
          }}
          className={style.window}
        >
  
  
          <div className={style.center}>
           <img
            className={style.icon}
            src={iconAdd}
          />
          </div>


        </div>
      </div>
    );
  }
}





