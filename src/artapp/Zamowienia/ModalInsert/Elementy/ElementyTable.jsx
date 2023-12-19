import style from "./ElementyTable.module.css";
import ElementTable from "./ElementTable/ElementTable";

export default function ElementyTable({
  elementy,
  setElementy,
  handleChangeCardElementy,
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
  setShowElementyProcesyModal,
}) {
  return (
    <>
      <div className={style.elementy}>
        <ElementTable
          elementy={elementy}
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
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          listaUszlachetnien={listaUszlachetnien}
          setListaUszlachetnien={setListaUszlachetnien}
          procesyElementow={procesyElementow}
          setProcesyElementow={setProcesyElementow}
          listaDostepnychProcesow={listaDostepnychProcesow}
          showElementyProcesyModal={showElementyProcesyModal}
          setShowElementyProcesyModal={setShowElementyProcesyModal}
        />
      </div>
    </>
  );
}
