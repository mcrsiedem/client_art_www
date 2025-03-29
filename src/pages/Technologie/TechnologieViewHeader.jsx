import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./TechnologieViewHeader.module.css";
import iconClose2 from "assets/x.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";

function TechnologieViewHeader({
}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  //---------------------------------------------------------

  return (
    <div className={style.container}>
      <header id="header" className={style.body}>
        <div className={style.leftHeaderContener}>
          <p className={style.title}>Technologie</p>
        </div>
        <div className={style.centerHeaderContener}></div>
        <div className={style.rightHeaderContener}>
          <img
            className={style.icon}
            src={iconClose2}
            onClick={() => {
              navigate("/Panel");
            }}
            alt="React Logo"
          />
        </div>
      </header>
    </div>
  );
}
export default TechnologieViewHeader;
