import React, {useContext } from "react";
import style from "./TechnologiaDetails.module.css";

import { TechnologyContext } from "context/TechnologyContext";
import ZamknijBtn from "./components/ZamknijBtn";
import ElementPane from "./components/ElementPane";
import TextEditor from "./components/TextEditor";
import DodajRealizacjeBtn from "./components/DodajRealizacjeBtn";

export default function TechnologiaDetails({grup}) {
  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const procesyElementowTech = techContext.procesyElementowTech;

if(grup.show)
  return (
    <tr className={style.container}>
      <td colSpan={17}>
        <div className={style.container}>
          <div className={style.stage}>
            <DodajRealizacjeBtn grup={grup}/>
            <ElementPane grup={grup}/>
            <TextEditor grup={grup}/>
            <ZamknijBtn grup={grup}/>
          </div>
        </div>
      </td>
    </tr>
  );


}


// sprawdzić które elementy należą do tej oprawy, ile różnych element_id jest w tej oprawa_id
// wyświetlić listę elementów
// dla każdego elementu wyświetlić listę procesów i ich etap

// zwalniać oprawę na oczekującą w zależności od wykonania tylko jej składowych elementów
// czyli przy zakańczanym procesie sprawdzać do jakiej oprawy należy dany element
// i na jakim etapie jest reszta procesów tego elementu