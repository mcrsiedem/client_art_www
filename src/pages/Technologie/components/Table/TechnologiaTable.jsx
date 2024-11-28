// tableka z technologiami
import { useRef,useEffect,useContext } from "react";
import style from "./TechnologiaTable.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { getTechnology } from "actions/getTechnolgy";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IP } from "utils/Host";
export default function TechnologiaTable(){
  const techContext = useContext(TechnologyContext);
  const technology = techContext.technology;
  const setTechnology = techContext.setTechnology;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

return(
    <table>
    <thead>
      <tr>
        <th className={style.col_id}>#</th>
        <th className={style.col_nr}>Nr</th>
        <th className={style.col_rok}>Rok</th> 
        <th className={style.col_tytul}>tytul</th>
        <th className={style.col_tytul}>zamowienie_id</th>
       

      </tr>
    </thead>
    <tbody>
      {/* <tr             onDoubleClick={(node, event) => {
        setShowTechnologyStage(true)
      techContext.setRowTechnologia({id: 2})  // zamienić na row

            }}>
         <td>1</td>
    <td>1</td>
    <td>2024</td>
      </tr>
    */}

      {technology?.map((row) => {
        return (
          <tr 
            key={row.id}
            onDoubleClick={(node, event) => {
              fechparametryTechnologii(row.id)
              // setActiveRowId(row.id)
              // setShowTechnologyStage(true);
            }}
            onClick={()=> {
                // setRow(row.id)
            // console.log(row.id)
            }}
          >
            <td>{row.id} </td>
            <td>{row.nr} </td>
            <td>{row.rok} </td>
   
            <td>{row.tytul}</td>
            <td>{row.zamowienie_id}</td>

          </tr>
        );
      })}
    </tbody>
  </table>
)
}