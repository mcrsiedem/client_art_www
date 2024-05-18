// tableka z technologiami
import { useRef,useEffect,useContext } from "react";
import style from "./TechnologiaTable.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { getTechnology } from "actions/getTechnolgy";
export default function TechnologiaTable(){
  const techContext = useContext(TechnologyContext);
  // const technology = TechnologyContext.technology;
  // const setTechnology = TechnologyContext.setTechnology;
  // const updateTechnology = TechnologyContext.updateTechnology;
  const setShowTechnologyStage = techContext.setShowTechnologyStage;
  const test = techContext.test;



  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      //  fetchTechnologie();
      // const socket = io.connect("http://localhost:3002")
      // console.log(technology)
      // getTechnology(setTechnology)
    }
    return () => {
      effectRan.current = true;
    };
  }, []);


  
return(
    <table>
    <thead>
      <tr>
        <th className={style.col_id}>#</th>
        <th className={style.col_nr}>Nr</th>
        <th className={style.col_rok}>Rok</th> 
        <th className={style.col_tytul}>tytul</th>
       

      </tr>
    </thead>
    <tbody>
      <tr             onDoubleClick={(node, event) => {
        setShowTechnologyStage(true)
 
              // setActiveRowId(row.id)
              // setStageTechnologiaVisible(true);
            }}>
         <td>1</td>
    <td>1</td>
    <td>2024</td>
      </tr>
   

      {/* {technology.map((row) => {
        return (
          <tr 
            key={row.id}
            onDoubleClick={(node, event) => {
              // setActiveRowId(row.id)
              // setStageTechnologiaVisible(true);
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

          </tr>
        );
      })} */}
    </tbody>
  </table>
)
}