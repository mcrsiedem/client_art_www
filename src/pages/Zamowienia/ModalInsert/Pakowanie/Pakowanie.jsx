import style from "./Pakowanie.module.css";
import HeaderPakowanie from "./components/HaderPakowanie";
import TablePakowanie from "./components/TablePakowanie";

export default function Pakowanie({ pakowanie,setPakowanie,handleChangeCardPakowanie,isLockDragDrop}) {
  
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <HeaderPakowanie style={style}/>
        <TablePakowanie  pakowanie={pakowanie} setPakowanie={setPakowanie} handleChangeCardPakowanie={handleChangeCardPakowanie} />
        </div>
      
      </div>
  );
}





