import style from "./Pakowanie.module.css";
import Header from "./components/Hader";
import Table from "./components/Table";
export default function Pakowanie({ pakowanie,setPakowanie,handleChangeCardPakowanie,isLockDragDrop}) {
  
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <Header style={style}/>
        <Table  pakowanie={pakowanie} setPakowanie={setPakowanie} handleChangeCardPakowanie={handleChangeCardPakowanie} isLockDragDrop={isLockDragDrop}/>
        </div>
      
      </div>
  );
}





