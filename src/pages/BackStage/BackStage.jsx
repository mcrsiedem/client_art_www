import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";

import style from "./BackStage.module.css";


import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";

export default function BackStage({ user, setUser }) {
  const navigate = useNavigate();
  const contextApp = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;

  // const [selectedProcesor, setSelectedProcesor] = useState(1);





  return (
    <div className={style.container}>

      druk
      {grupaWykonan
       
            .map((grup, i) => {
              return (
          
                 
                
                <tr
                  draggable
                  // onDragStart={() => handleDragStart(l.id)}
                  className={style.tr_legi_mini}
                  key={grup.id + i}
                >
                  <td>{grup.id}</td>
                  <td>{grup.czas} min</td>
                  <td></td>
 
                </tr>
      
              );
            })}
      
    </div>
  );
}


