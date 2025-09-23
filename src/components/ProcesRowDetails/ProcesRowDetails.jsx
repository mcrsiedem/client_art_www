import style from "./ProcesRowDetails.module.css";
import ZamknijBtn from "./components/ZamknijBtn";
import Wykonania from "./components/wykonania/Wykonania";


export default function ProcesRowDetails({grup,mini}) {

if(grup.show)
  return (
<>
    <tr className={style.container}>
      <td colSpan={mini? 4:17}>
        <div className={style.container}>
          <div className={style.stage}>
            <Wykonania grup={grup}/>
            <ZamknijBtn grup={grup}/>
          </div>
        </div>   
      </td>
    </tr>
</>
  );

}

