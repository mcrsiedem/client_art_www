import { TechnologyContext } from "context/TechnologyContext";
import style from "./ProcesRowDetails.module.css";
import CzystodrukiAkceptBtn from "./components/CzystodrukiAkceptBtn";
import CzystodrukiWyslijBtn from "./components/CzystodrukiWyslijBtn";
import ZamknijBtn from "./components/ZamknijBtn";
import Wykonania from "./components/wykonania/Wykonania";
import { useContext } from "react";


export default function ProcesRowDetails({grup,mini,expand, setExpand}) {


      const {selectedProces} = useContext(TechnologyContext);
  
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

            <div className={style.btnZamknijContainer}> 
         {selectedProces == 17 && grup.status<3 &&  <CzystodrukiWyslijBtn grup={grup}  expand={expand} setExpand={setExpand}/>}  
            <ZamknijBtn grup={grup}  expand={expand} setExpand={setExpand}/>
          {selectedProces == 17 && grup.status==3 &&   <CzystodrukiAkceptBtn grup={grup}  expand={expand} setExpand={setExpand}/> }
          
          </div>
           
          </div>
        </div>   
      </td>
    </tr>
</>
  );

}

