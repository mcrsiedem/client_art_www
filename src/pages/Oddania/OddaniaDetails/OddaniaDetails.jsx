import style from "./OddaniaDetails.module.css";
import ZamknijBtn from "./components/ZamknijBtn";
import ElementPane from "./components/ElementPane";
import TextEditor from "./components/TextEditor";
import DodajRealizacjeBtn from "./components/DodajOddanieBtn";

import OddaniaWykonania from "../OddaniaWykonania/OddaniaWykonania";
import DodajOddanieBtn from "./components/DodajOddanieBtn";

export default function OddaniaDetails({grup,mini}) {

if(grup.show)
  return (
<>
    <tr className={style.container}>
      <td colSpan={mini? 4:17}>
        <div className={style.container}>
          <div className={style.stage}>
            <OddaniaWykonania grup={grup}/>
            <DodajOddanieBtn grup={grup}/>
            {/* <ElementPane grup={grup}/> */}
            <TextEditor grup={grup} mini={mini}/>
            <ZamknijBtn grup={grup}/>
          </div>
        </div>
      </td>
    </tr>
</>
  );

}

