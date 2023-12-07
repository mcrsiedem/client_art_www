import style from "./ElementyTable.module.css";
import ElementTable from "./ElementTable/ElementTable";

export default function ElementyTable({elementy,setElementy,handleChangeCardElementy,selected_papier,setSelected_papier,fragmenty,setFragmenty,info,setInfo,listaWykonczenia,selected_wykonczenie,setSelected_wykonczenie,listaGramatur,listaPapierow,setListaGramatur,setListaWykonczen}) {

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
            setInfo={setInfo}
            listaWykonczenia={listaWykonczenia}
            setListaWykonczen={setListaWykonczen}
            listaGramatur={listaGramatur}
              listaPapierow={listaPapierow}
            setListaGramatur={setListaGramatur}
          />
            </div>
        </>
    );
}

