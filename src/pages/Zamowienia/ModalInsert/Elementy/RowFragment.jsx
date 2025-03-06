import style from "./ElementTable.module.css";
import { useState,useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _typ_elementu } from "utils/initialvalue"
import iconCopy from "assets/copy.svg";
import iconTrash from "assets/trash2.svg";
import axios from "axios";
import { IP } from "utils/Host";
import { reg_txt } from "utils/initialvalue";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
export default function RowFragment({
  row

}) {

    const contextModalInsert = useContext(ModalInsertContext);
    const handleUpdateRowFragmenty = contextModalInsert.handleUpdateRowFragmenty;
    const lockDragDrop = contextModalInsert.lockDragDrop;
   


    function handleDragStart(){
      //  e.preventDefault()
      sessionStorage.setItem("id_element_drag", row.id);
      sessionStorage.setItem("typ_drag", 'fragment');
  
    }
  return (
    <>
    <div className={style.row_fragmenty} draggable={lockDragDrop} onDragStart={handleDragStart} key={row.id}>
      
      <Typ row={row} />
      <Naklad row={row} handleUpdateRowFragmenty={handleUpdateRowFragmenty} />
       {/* <div  className={style.rowFragmenty_strony}>{row.ilosc_stron}</div> */}
       <div ></div>
      <div disabled > </div>
      <div disabled > </div>
      
      <Wersja row={row} handleUpdateRowFragmenty={handleUpdateRowFragmenty} />
      <Dodaj row={row} handleUpdateRowFragmenty={handleUpdateRowFragmenty} handleAddFragment={handleAddFragment} />
      <Usun row={row} handleUpdateRowFragmenty={handleUpdateRowFragmenty}handleRemoveItem={handleRemoveItem} />
      
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      {/* <td className={row.oprawa_id==" " ? style.alert2 :style.alert3 }>{row.oprawa_id}</td> */}
      <td></td>
      <td></td>
    </div>
    
    
   
    </>
  );


}


function Typ({ row }) {
  return (
 
      <select
        className={style.rowFragmenty_typ}
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




  );
}

function Naklad({ row, handleUpdateRowFragmenty }) {
  return (

      <input
        className={style.rowFragmenty_naklad}
        value={row.naklad}
        onChange={(e) =>
          handleUpdateRowFragmenty({
            ...row,
            naklad: ifNoTextSetNull(e.target.value) ,
            update: true
          })
        }
      ></input>

  );
}
function  Wersja({ row, handleUpdateRowFragmenty }) {
  return (
  
      <input
       className={style.selectFragmenty}
        value={row.wersja}
        onChange={(e) =>
          {
            if ( e.target.value === '' || reg_txt.test(e.target.value)) {
              handleUpdateRowFragmenty({
            ...row,
            wersja: e.target.value,
            update: true
          })}}
        }
      ></input>

  );
}

function Dodaj({ row, handleAddFragment }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;
  const elementy = contextModalInsert.elementy;
  return (
<div>
      <img
        className={style.expand}
        src={iconCopy}
        onClick={() => {
          handleAddFragment(row, fragmenty, setFragmenty, elementy);
        }}
        alt="Procesy"
      />
</div>
  );
}

function handleAddFragment(card, fragmenty, setFragmenty) {
  const newFragmenty = fragmenty.slice();

  newFragmenty.push({
    id: Math.max(...fragmenty.map((f) => f.id)) + 1,
    zamowienie_id: card.zamowienie_id,
    ilosc_stron: card.ilosc_stron,
    produkt_id: card.produkt_id,
    typ: card.typ,
    wersja: card.wersja,
    naklad: card.naklad,
    oprawa_id: card.oprawa_id,
    element_id: card.element_id,
    indeks: Math.max(...newFragmenty.map((f) => f.indeks)) + 1,
    insert: true
  });

  newFragmenty.sort((a, b) => a.indeks - b.indeks);
  setFragmenty(newFragmenty);
}


function Usun({ row,handleRemoveItem }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;
  const elementy = contextModalInsert.elementy;
  return (
   
      <div >
                      <img
         className={style.expand}
          src={iconTrash}
          onClick={() => {handleRemoveItem(row.indeks,row.id,fragmenty,elementy,setFragmenty)}}
          alt="Procesy"
        />
      </div>


  );
}

const handleRemoveItem = (indeks,id,fragmenty,elementy,setFragmenty) => {

  // if (fragmenty.length > elementy.length) {
  //   setFragmenty(fragmenty.filter((x) => x.id !== id));
  // }
  // setFragmenty(fragmenty.filter((x) => x.id !== id));

  setFragmenty((prev) =>
    prev.map((t, a) => {
      if (t.id == id) {
        return {
          ...t,
          delete: true
        };
      } else {
        return t;
      }
    })
  );
  // setFragmenty((prev) =>
  //   prev.map((t, a) => {
  //     if (t.indeks > indeks) {
  //       return {
  //         ...t,
  //         indeks: t.indeks--,
  //       };
  //     } else {
  //       return t;
  //     }
  //   })
  // );


};