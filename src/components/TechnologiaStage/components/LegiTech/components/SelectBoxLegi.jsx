import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../LegiTech.module.css";
export default function SelectBoxLegi({row}) {

    const techContext = useContext(TechnologyContext)
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;

  
    return (
      <td className={style.td_checkbox}>
        <div >
        <input type="checkbox"
        onChange={(event)=>{
  
        //   console.log(" select"+ row.id +" "+event.target.checked)
          setLegi(
            legi.map((t) => {
              if (t.id == row.id) {
                return {...row, select: event.target.checked }
              } else {
                return t;
              }
            })
          )
        }}
       ></input>
        </div>
  
      </td>
    );
  }