import style from "./ElementTable.module.css";
import { useState } from "react";
import { _typ_elementu } from "../api";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
export default function RowFragment({
  row,
  handleChangeCardElementy,
  handleChangeCardFragmenty,
  i,
  listaGramatur,
  fragmenty,
  setFragmenty,
  elementy,
}) {
  const [listaDostepnychWykonczen, setListaDostepnychWykonczen] =
    useState(listaGramatur);
  const [listaDostepnychGramatur, setListaDostepnychGrmatur] =
    useState(listaGramatur);
  return (
    <tr key={row.id}>
            <td></td>
      <Dodaj
        row={row}
        handleChangeCardFragmenty={handleChangeCardFragmenty}
        handleAddFragment={handleAddFragment}
        fragmenty={fragmenty}
        elementy={elementy}
        setFragmenty={setFragmenty}
      />
           <Usun
        row={row}
        handleChangeCardFragmenty={handleChangeCardFragmenty}
        handleRemoveItem={handleRemoveItem}
        fragmenty={fragmenty}
        elementy={elementy}
        setFragmenty={setFragmenty}
      />
   
      {/* function Usun({ row, fragmenty,setFragmenty,handleChangeCardElementy,handleRemoveItem }) { */}

      <Typ row={row} handleChangeCardFragmenty={handleChangeCardFragmenty} />
      <Naklad row={row} handleChangeCardFragmenty={handleChangeCardFragmenty} />
      <Wersja row={row} handleChangeCardFragmenty={handleChangeCardFragmenty} />

      
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
}
function Typ({ row }) {
  return (
    <td>
      {/* {row.typ} */}
      <select
        className={style.select}
        value={row.typ}
        disabled
      >
        {}
        {_typ_elementu.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
}

function Naklad({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input
        className={style.element_naklad}
        value={row.naklad}
        onChange={(e) =>
          handleChangeCardFragmenty({
            ...row,
            naklad: e.target.value,
          })
        }
      ></input>
    </td>
  );
}
function  Wersja({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input
        value={row.wersja}
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

function Dodaj({ row, handleAddFragment, fragmenty, setFragmenty, elementy }) {
  return (
    <td className={style.col_button}>
      <img
        className={style.expand}
        src={iconCopy}
        onClick={() => {
          handleAddFragment(row, fragmenty, setFragmenty, elementy);
        }}
        alt="Procesy"
      />
    </td>
  );
}

function handleAddFragment(card, fragmenty, setFragmenty, elementy) {
  //-------------------
  const newFragmenty = fragmenty.slice();

  newFragmenty.map((x) => {
    if (x.index > card.index) {
      return {
        ...x,
      };
    } else {
      return x;
    }
  });

  newFragmenty.push({
    id: Math.max(...fragmenty.map((f) => f.id)) + 1,
    zamowienie_id: card.zamowienie_id,
    produkt_id: card.produkt_id,
    typ: card.typ,
    naklad: card.naklad,
    // oprawa_id:card.oprawa_id,
    element_id: card.element_id,
    index: Math.max(...newFragmenty.map((f) => f.index)) + 1,
  });

  newFragmenty.sort((a, b) => a.index - b.index);
  setFragmenty(newFragmenty);
}


function Usun({ row, fragmenty,elementy,setFragmenty,handleRemoveItem }) {
  return (
    <td className={style.col_button}>
      <div >
                      <img
         className={style.expand}
          src={iconTrash}
          onClick={() => {handleRemoveItem(row.index,row.id,fragmenty,elementy,setFragmenty)}}
          alt="Procesy"
        />
      </div>

    </td>
  );
}

const handleRemoveItem = (index,id,fragmenty,elementy,setFragmenty) => {
  // id = id elementu
  if (fragmenty.length > elementy.length) {
    setFragmenty(fragmenty.filter((x) => x.id !== id));
    // setFragmenty(fragmenty.filter((x) => x.element_id !== id));
  }

  setFragmenty((prev) =>
    prev.map((t, a) => {
      if (t.index > index) {
        return {
          ...t,
          index: t.index--,
        };
      } else {
        return t;
      }
    })
  );


};