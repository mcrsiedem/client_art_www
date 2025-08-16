import React, {useContext } from "react";
import style from "./TechnologiaDetails.module.css";

import { TechnologyContext } from "context/TechnologyContext";
import ZamknijBtn from "./components/ZamknijBtn";

export default function TechnologiaDetails({grup}) {
  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const procesyElementowTech = techContext.procesyElementowTech;

if(grup.show)
  return (
    <tr className={style.container}>
      <td colSpan={16}>
        <div className={style.container}>
          <div className={style.stage}>
            <ZamknijBtn grup={grup}/>
          </div>
        </div>
      </td>
    </tr>
  );


}


