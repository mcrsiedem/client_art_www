import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../ArkuszeTech.module.css";
export default function SelectBoxArkusze({row}) {

    const techContext = useContext(TechnologyContext)
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;

  
    return (
      <td className={style.td_checkbox}>
        <div >
        <input
        className={style.ch_box} 
        type="checkbox"
        checked={row.select}
        onChange={(event)=>{
  
          //  console.log(" select"+ row.id +" "+event.target.checked)
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