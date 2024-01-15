import style from "./ElementTable.module.css";
import Logo_ustawienia from "../../../../../svg/settings.svg";
import { useState } from "react";
import { _typ_elementu} from "../../api"
export default function RowFragment({
    row,
    handleChangeCardElementy,
    i,
    listaPapierow,
    setListaGramatur,
    listaGramatur,
    setInfo,
    isEdit,
    setIsEdit,
    procesyElementow,
    setProcesyElementow,
    listaDostepnychProcesow,
    setShowElementyProcesyInsert,
    fragmenty
  }) {
    const [listaDostepnychWykonczen, setListaDostepnychWykonczen] =
      useState(listaGramatur);
    const [listaDostepnychGramatur, setListaDostepnychGrmatur] =
      useState(listaGramatur);
    return (
      <tr key={row.id}>
        <td>{i + 1}</td>
        <Typ row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <Naklad row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <Nazwa row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <Strony row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <NettoX row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <NettoY row={row} handleChangeCardElementy={handleChangeCardElementy} />

  
        <PapierSelect
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
          listaGramatur={listaGramatur}
          listaDostepnychWykonczen={listaDostepnychWykonczen}
          setListaDostepnychWykonczen={setListaDostepnychWykonczen}
          listaPapierow={listaPapierow}
          setListaGramatur={setListaGramatur}
          listaDostepnychGramatur={listaDostepnychGramatur}
          setListaDostepnychGrmatur={setListaDostepnychGrmatur}
        />

      </tr>
    );
  }
  function Typ({ row, handleChangeCardElementy }) {
    return (
      <td>
{row.naklad}
      </td>
    );
  }
  
  function PapierSelect({
    row,
    handleChangeCardElementy,
    listaPapierow,
    setListaGramatur,
    listaGramatur,
    listaDostepnychWykonczen,
    setListaDostepnychWykonczen,
    listaDostepnychGramatur,
    setListaDostepnychGrmatur,
  }) {
    return (
      <td>
        ...
        {/* <select
          className={style.select}
          defaultValue={row.papier_id}
          onChange={(e) => {
            setListaDostepnychGrmatur(
              listaGramatur.filter((wyk) => wyk.papier_id == e.target.value)
            );
            handleChangeCardElementy({
              ...row,
              papier_id: e.target.value,
            });
          }}
        >
          {}
          {listaPapierow.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select> */}
      </td>
    );
  }
  
  function Gramatura({
    row,
    handleChangeCardElementy,
    listaGramatur,
    listaDostepnychGramatur,
  }) {
    return (
      <td>
        ...
        {/* <select
          className={style.select}
          defaultValue={row.gramatura_id}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              gramatura_id: e.target.value,
            })
          }
        >
          <option value="0">wybierz</option>
          {listaDostepnychGramatur
            .sort((a, c) => a.gramatura - c.gramatura)
            .map((option) =>
              row.papier_id !== 7 ? (
                <option key={option.id} value={option.id}>
                  {option.gramatura}{" "}
                  {option.bulk !== 1 ? (
                    <p>
                      {" "}
                      g/m2 vol. {option.bulk} {option.wykonczenie}
                    </p>
                  ) : (
                    <p>g/m2 </p>
                  )}
                </option>
              ) : (
                <option key={option.id} value={option.id}>

                </option>
              )
            )}
        </select> */}
      </td>
    );
  }
  
  function Naklad({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          className={style.col_naklad}
          defaultValue={row.naklad}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              naklad: e.target.value,
            })
          }
        ></input>
      </td>
    );
  }
  function Nazwa({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          defaultValue={row.nazwa}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              nazwa: e.target.value,
            })
          }
        ></input>
      </td>
    );
  }
  
  
  
  function Strony({ row, handleChangeCardElementy }) {
    return (
      <td>
        ...
        {/* <input
          defaultValue={row.ilosc_stron}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              ilosc_stron: e.target.value,
            })
          }
        ></input> */}
      </td>
    );
  }
  function NettoX({ row, handleChangeCardElementy }) {
    return (
      <td className={style.col_format}>
        {/* <input
          defaultValue={row.format_x}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              format_x: e.target.value,
            })
          }
        ></input> */}
        ...
      </td>
    );
  }
  function NettoY({ row, handleChangeCardElementy }) {
    return (
      <td className={style.col_format}>
        ...
        {/* <input
          defaultValue={row.format_y}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              format_y: e.target.value,
            })
          }
        ></input> */}
      </td>
    );
  }
  function Kolory({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          defaultValue={row.kolory}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              kolory: e.target.value,
            })
          }
        ></input>
      </td>
    );
  }
  
  function PapierInfo({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          defaultValue={row.papier_info}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              papier_info: e.target.value,
            })
          }
        ></input>
      </td>
    );
  }
  
  function Uwagi({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          defaultValue={row.uwagi}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              uwagi: e.target.value,
            })
          }
        ></input>
      </td>
    );
  }