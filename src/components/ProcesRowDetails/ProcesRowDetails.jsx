import style from "./ProcesRowDetails.module.css";
import ZamknijBtn from "./components/ZamknijBtn";


export default function ProcesRowDetails({grup,mini}) {

if(grup.show)
  return (
<>
    {/* <RealizacjeOprawy/> */}
    <tr className={style.container}>
      <td colSpan={mini? 4:17}>
        <div className={style.container}>
          <div className={style.stage}>
            {/* <OprawaWykonania grup={grup}/>
            <DodajRealizacjeBtn grup={grup}/>
            <ElementPane grup={grup}/>
            <TextEditor grup={grup} mini={mini}/> */}

            <ZamknijBtn grup={grup}/>
          </div>
        </div>   
      </td>
    </tr>
</>
  );

}

