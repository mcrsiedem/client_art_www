import style from "./Elementy.module.css";
import ElementTable from "./ElementTable/ElementTable";

export default function ElementyTable({
  elementy,
  setElementy,
  handleChangeCardElementy,
  handleChangeCardFragmenty,
  selected_papier,
  setSelected_papier,
  fragmenty,
  setFragmenty,
  info,
  setInfo,
  listaWykonczenia,
  listaGramatur,
  listaPapierow,
  setListaGramatur,
  setListaWykonczen,
  isEdit,
  setIsEdit,
  listaUszlachetnien,
  setListaUszlachetnien,
  procesyElementow,
  setProcesyElementow,
  listaDostepnychProcesow,
  showElementyProcesyModal,
  setShowElementyProcesyInsert
}) {
  return (
    <>
      <div className={style.elementy}>
        <ElementTable
          elementy={elementy}
          setElementy={setElementy}
          handleChangeCardElementy={handleChangeCardElementy}
          handleChangeCardFragmenty={handleChangeCardFragmenty}
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
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          listaUszlachetnien={listaUszlachetnien}
          setListaUszlachetnien={setListaUszlachetnien}
          procesyElementow={procesyElementow}
          setProcesyElementow={setProcesyElementow}
          listaDostepnychProcesow={listaDostepnychProcesow}
          showElementyProcesyModal={showElementyProcesyModal}
          setShowElementyProcesyInsert={setShowElementyProcesyInsert}
        />
      </div>
    </>
  );
}
