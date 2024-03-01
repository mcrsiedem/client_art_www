import style from "./Pakowanie.module.css";
import Header from "./components/Hader";
import Table from "./components/Table";
export default function Pakowanie({ pakowanie,setPakowanie,handleChangeCardPakowanie}) {
  
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <Header style={style}/>
        <Table  pakowanie={pakowanie} setPakowanie={setPakowanie} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
        </div>
      
      </div>
  );
}





