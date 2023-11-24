// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../../api";
import ElementTableHeader from "./ElementTableHeader";
// import ElementFooter from "./ElementFooter";
// import CardCenter from "./ElementCenter";
// import ElementHeader from "./ElementHeader"



export default function ElementTable({
  card,
  elementy,
  setElementy,
  handleChangeCardElementy,
  selected_papier,
  setSelected_papier,
  fragmenty,
  setFragmenty,
}) {
  return (
    <div className={style.elementCard}>
        
      <ElementTableHeader
        card={card}
        elementy={elementy}
        setElementy={setElementy}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
      />
      {/* <CardCenter
        card={card}
        setElementy={setElementy}
        handleChangeCardElementy={handleChangeCardElementy}
        selected_papier={selected_papier}
        setSelected_papier={setSelected_papier}
      /> */}

    </div>
  );
}


