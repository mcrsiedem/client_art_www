import style from "./ElementyTable.module.css";
import ElementTable from "./ElementTable/ElementTable";

export default function WariantyTable({elementy,setElementy,handleChangeCardElementy,selected_papier,setSelected_papier,fragmenty,setFragmenty,info,setInfo}) {

    return (
        <>
            <div className={style.elementy}>
                <ElementTable elementy={elementy}
            setElementy={setElementy}
            handleChangeCardElementy={handleChangeCardElementy}
            selected_papier={selected_papier}
            setSelected_papier={setSelected_papier}
            fragmenty={fragmenty}
            setFragmenty={setFragmenty}
            info={info}
            setInfo={setInfo}/>
            </div>
        </>
    );
}

