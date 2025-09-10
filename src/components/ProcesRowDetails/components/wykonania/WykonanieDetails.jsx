import style from "./WykonanieDetails.module.css";
import ZamknijWykonanieBtn from "./ZamknijWykonanieBtn";
// import ZamknijBtn from "./components/ZamknijBtn";
// import Wykonania from "./components/wykonania/Wykonania";


export default function WykonanieDetails({wykonanie,mini}) {

if(wykonanie.show)
  return (
<>
    {/* <RealizacjeOprawy/> */}
    <tr className={style.container}>
      {/* <td colSpan={mini? 4:17}> */}
      <td colSpan={mini? 4:17}>
        <div className={style.container}>
          <div className={style.stage}>
              tu będą realizacje
            {/* <div className={style.stage}>  */}
            {/* <Wykonania grup={grup}/> */}

            {/* </div> */}
            {/* <OprawaWykonania grup={grup}/>
            <DodajRealizacjeBtn grup={grup}/>
            <ElementPane grup={grup}/>
            <TextEditor grup={grup} mini={mini}/> */}

            <ZamknijWykonanieBtn wykonanie={wykonanie}/>
          </div>
        </div>   
      </td>
    </tr>
</>
  );

}

