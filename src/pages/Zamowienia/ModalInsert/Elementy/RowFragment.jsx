import style from "./ElementTable.module.css";
import { useState } from "react";
import { _typ_elementu } from "../api";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import axios from "axios";

import { IP } from "../../../../utils/Host";
export default function RowFragment({
  row,
  handleChangeCardElementy,
  handleChangeCardFragmenty,
  i,
  listaGramatur,
  fragmenty,
  setFragmenty,
  elementy,
  handleChangeCardFragmentyOprawaId
}) {
  const [listaDostepnychWykonczen, setListaDostepnychWykonczen] =
    useState(listaGramatur);
  const [listaDostepnychGramatur, setListaDostepnychGrmatur] =
    useState(listaGramatur);

    function handleDragStart(){
      //  e.preventDefault()
      sessionStorage.setItem("id_element_drag", row.id);
      sessionStorage.setItem("typ_drag", 'fragment');
  
    }
  return (
    <tr draggable
     onDragStart={handleDragStart} 

    
     key={row.id}>
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
      <td className={row.oprawa_id==" " ? style.alert2 :style.alert3 }>{row.oprawa_id}</td>
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

    // <td>

    //     {_typ_elementu
    //     .filter((t) => t.id === row.id)
    //     .map((option) => (
    //             <option key={option.id} value={option.id}>
    //               {option.nazwa}
    //         </option>))
            
    //       }


     
    // </td>


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

  const newFragmenty = fragmenty.slice();

  axios.post(IP + "fragmenty", {
    naklad: 0,
    info: "fragment temp",
    indeks: 0,
    zamowienie_id:0,
    element_id: 0,
    produkt_id: 0,
    typ: 0,
    oprawa_id: 0,
      
}).then((res) => {

  newFragmenty.push({
    id: Math.max(...fragmenty.map((f) => f.id)) + 1,
    zamowienie_id: card.zamowienie_id,
    produkt_id: card.produkt_id,
    typ: card.typ,
    naklad: card.naklad,
     oprawa_id: card.oprawa_id,
    element_id: card.element_id,
    indeks: Math.max(...newFragmenty.map((f) => f.indeks)) + 1,
  });

  newFragmenty.sort((a, b) => a.indeks - b.indeks);
  setFragmenty(newFragmenty);

})


}


function Usun({ row, fragmenty,elementy,setFragmenty,handleRemoveItem }) {
  return (
    <td className={style.col_button}>
      <div >
                      <img
         className={style.expand}
          src={iconTrash}
          onClick={() => {handleRemoveItem(row.indeks,row.id,fragmenty,elementy,setFragmenty)}}
          alt="Procesy"
        />
      </div>

    </td>
  );
}

const handleRemoveItem = (indeks,id,fragmenty,elementy,setFragmenty) => {
  // id = id elementu
  if (fragmenty.length > elementy.length) {
    setFragmenty(fragmenty.filter((x) => x.id !== id));
    // setFragmenty(fragmenty.filter((x) => x.element_id !== id));
  }

  setFragmenty((prev) =>
    prev.map((t, a) => {
      if (t.indeks > indeks) {
        return {
          ...t,
          indeks: t.indeks--,
        };
      } else {
        return t;
      }
    })
  );


};