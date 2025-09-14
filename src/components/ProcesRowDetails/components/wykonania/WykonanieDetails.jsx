import Realizacje from "../realizacje/Realizacje";
import style from "./WykonanieDetails.module.css";
import DodajBrakBtn from "./btn/DodajBrakBtn";
import DodajRealizacjeBtn from "./btn/DodajRealizacjeBtn";
import ZamknijWykonanieBtn from "./btn/ZamknijWykonanieBtn";
// import ZamknijBtn from "./components/ZamknijBtn";
// import Wykonania from "./components/wykonania/Wykonania";


export default function WykonanieDetails({wykonanie,mini,grup}) {

if(wykonanie.show)
  return (
<>
    {/* <RealizacjeOprawy/> */}
    <tr className={style.container}>
      {/* <td colSpan={mini? 4:17}> */}
      <td colSpan={mini? 4:17}>
        <div className={style.container}>
          <div className={style.stage}>

            <Realizacje wykonanie={wykonanie}/>
              {/* tu będą realizacje */}
            {/* <div className={style.stage}>  */}
            {/* <Wykonania grup={grup}/> */}

            {/* </div> */}
            {/* <OprawaWykonania grup={grup}/>
            <DodajRealizacjeBtn grup={grup}/>
            <ElementPane grup={grup}/>
            <TextEditor grup={grup} mini={mini}/> */}
            




            <div  className={style.paneBtn}>
                <DodajRealizacjeBtn wykonanie={wykonanie} grup={grup}/>
                <DodajBrakBtn wykonanie={wykonanie}/>
                <ZamknijWykonanieBtn wykonanie={wykonanie}/>
            </div>

            
          </div>
        </div>   
      </td>
    </tr>
</>
  );

}

