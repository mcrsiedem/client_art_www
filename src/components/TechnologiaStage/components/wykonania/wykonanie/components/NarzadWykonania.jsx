import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";
import { useWykonania } from "hooks/useWykonania";

export default  function NarzadWykonania ({ rowWykonanie }) {
  return (
    <div className={style.col_dane_przeloty}>
      
      <input
        className={style.input}
        value={rowWykonanie.narzad}
        onChange={(e) => {

        }}
      ></input>
    </div>
  );
};

