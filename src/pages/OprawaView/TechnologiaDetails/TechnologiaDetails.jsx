import style from "./TechnologiaDetails.module.css";
import ZamknijBtn from "./components/ZamknijBtn";
import ElementPane from "./components/ElementPane";
import TextEditor from "./components/TextEditor";
import DodajRealizacjeBtn from "./components/DodajRealizacjeBtn";
import RealizacjeOprawy from "./components/RealizacjeOprawy";

export default function TechnologiaDetails({grup}) {

if(grup.show)
  return (
<>
    {/* <RealizacjeOprawy/> */}
    <tr className={style.container}>
      <td colSpan={17}>
        <div className={style.container}>
          <div className={style.stage}>
            {/* <DodajRealizacjeBtn grup={grup}/> */}
            <ElementPane grup={grup}/>
            <TextEditor grup={grup}/>
            <ZamknijBtn grup={grup}/>
          </div>
        </div>
      </td>
    </tr>
</>
  );

}

