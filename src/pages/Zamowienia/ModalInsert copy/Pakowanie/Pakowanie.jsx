import style from "./Pakowanie.module.css";
import HeaderPakowanie from "./components/HaderPakowanie";
import TablePakowanie from "./components/TablePakowanie";

export default function Pakowanie({ handleChangeCardPakowanie}) {
  
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <HeaderPakowanie style={style}/>
        <TablePakowanie  handleChangeCardPakowanie={handleChangeCardPakowanie} />
        </div>
      
      </div>
  );
}





