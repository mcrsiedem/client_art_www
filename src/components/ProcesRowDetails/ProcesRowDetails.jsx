import style from "./ProcesRowDetails.module.css";
import ZamknijBtn from "./components/ZamknijBtn";
import Wykonania from "./components/wykonania/Wykonania";


export default function ProcesRowDetails({grup,mini,expand, setExpand}) {

 if(mini==false){
  expand = false;
  setExpand = () => {}
 } 
if(grup.show)
  return (
<>
    <tr className={style.container}>
      <td colSpan={mini? 17:17}>
        <div className={style.container}>
          <div className={style.stage}>
            <Wykonania grup={grup}/>
            <ZamknijBtn grup={grup}  expand={expand} setExpand={setExpand}/>
          </div>
        </div>   
      </td>
    </tr>
</>
  );

}

