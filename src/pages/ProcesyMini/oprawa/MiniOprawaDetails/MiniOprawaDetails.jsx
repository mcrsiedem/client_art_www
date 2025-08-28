import style from "./MiniOprawaDetailss.module.css";
import ZamknijBtn from "./components/ZamknijBtn";
import ElementPane from "./components/ElementPane";


export default function MiniOprawaDetails({grup,setExpand}) {

if(grup.show)
  return (
<>
    {/* <RealizacjeOprawy/> */}
    <tr className={style.container}>
      <td colSpan={17}>
        <div className={style.container}>
          <div className={style.stage}>
            <ElementPane grup={grup}/>
            <ZamknijBtn setExpand={setExpand}/>
          </div>
        </div>
      </td>
    </tr>
</>
  );

}

