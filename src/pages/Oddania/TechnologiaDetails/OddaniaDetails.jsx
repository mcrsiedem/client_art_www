import style from "./OddaniaDetails.module.css";
import ZamknijBtn from "./components/ZamknijBtn";
import ElementPane from "./components/ElementPane";
import TextEditor from "./components/TextEditor";
import DodajRealizacjeBtn from "./components/DodajRealizacjeBtn";
import RealizacjeOprawy from "./components/RealizacjeOprawy";
import OprawaWykonania from "../OprawaWykonania/OprawaWykonania";

export default function OddaniaDetails({grup,mini}) {

if(grup.show)
  return (
<>
    {/* <RealizacjeOprawy/> */}
    <tr className={style.container}>
      <td colSpan={mini? 4:17}>
        <div className={style.container}>
          <div className={style.stage}>
            <OprawaWykonania grup={grup}/>
            <DodajRealizacjeBtn grup={grup}/>
            <ElementPane grup={grup}/>
            <TextEditor grup={grup} mini={mini}/>
            <ZamknijBtn grup={grup}/>
          </div>
        </div>
      </td>
    </tr>
</>
  );

}

