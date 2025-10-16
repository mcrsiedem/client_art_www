import React, { useContext } from "react";
import style from "./LoadingMini.module.css";
import { AppContext } from "context/AppContext";
import iconAdd from "assets/history.svg";
import iconLoading from "assets/loading_yellow.svg";

export default function LoadingMini( {loading}) {
  const appContext = useContext(AppContext);
  // const {loading} = useRealizacje();

  // const isLoading = appContext.isLoading;
  // if (isLoading) {
  if (loading) {
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
            src={iconLoading}
          />
          {/* <hr></hr>
          <h3>   Aktualizacja ... </h3> */}
       
          </div>


        </div>
      </div>
    );
  }
}





