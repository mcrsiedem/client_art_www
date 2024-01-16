import style from "./ElementTable.module.css";
import Logo_ustawienia from "../../../../../svg/settings.svg";
import { useState } from "react";
import { _typ_elementu} from "../../api"
export default function RowFragment({
    row,
    handleChangeCardElementy,
    handleChangeCardFragmenty,
    i,
    listaGramatur,
    fragmenty
  }) {
    const [listaDostepnychWykonczen, setListaDostepnychWykonczen] =
      useState(listaGramatur);
    const [listaDostepnychGramatur, setListaDostepnychGrmatur] =
      useState(listaGramatur);
    return (
      <tr key={row.id}>
        <td>{i + 1}</td>
        <Typ row={row} handleChangeCardFragmenty={handleChangeCardFragmenty} />
        <Naklad row={row} handleChangeCardFragmenty={handleChangeCardFragmenty} />
        <Wersja row={row} handleChangeCardFragmenty={handleChangeCardFragmenty} />
  
        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
      </tr>
    );
  }
  function Typ({ row, handleChangeCardFragmenty }) {
    return (
      <td>
{row.typ}
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
  function Wersja({ row, handleChangeCardFragmenty }) {
    return (
      <td>
        <input
          defaultValue={row.nazwa}
          onChange={(e) =>
            handleChangeCardFragmenty({
              ...row,
              wersja: e.target.value,
            })
          }
        ></input>
      </td>
    );
  }
  
  
