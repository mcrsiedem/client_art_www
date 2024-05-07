import style from "./KosztyDodatkowe.module.css";
import HeaderKoszty from "./components/HaderKoszty";
import TableKoszty from "./components/TableKoszty";

export default function KosztyDodatkowe({ handleChangeCardPakowanie}) {
  
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <HeaderKoszty style={style}/>
        <TableKoszty  handleChangeCardPakowanie={handleChangeCardPakowanie} />
        </div>
      
      </div>
  );
}





