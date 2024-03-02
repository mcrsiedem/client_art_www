
import style from "./Introligatornia.module.css";
import logoExpand from "../../../../svg/expand.svg";
import { _rodzaj_oprawy,_typ_elementu } from "../api";
import {  useState } from "react";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
import iconTable from "../../../../svg/settings.svg";
import iconUstawienia from "../../../../svg/settings.svg";
import OprawaElementyStage from "./OprawaElementyStage/OprawaElementyStage";
import axios from "axios";

import { ip } from "../../../../Host";

export default function IntroligatorniaTable({
  oprawa,
  setOprawa,
  fragmenty,
  setFragmenty,
  handleChangeCardOprawa,
  handleChangeCardFragmenty,
  handleChangeCardFragmentyOprawaId
}) {

  const[oprawa_row,setOprawa_row]=useState();
  const [showOprawaElementyStage, setShowOprawaElementyStage] =
  useState(false);
  const [expand,setExpand] =useState(true);
   function handleDrop(id){

    // sprawdza czy upuszczamy właściwy obiekt
    if(sessionStorage.getItem("typ_drag") =='fragment'){
       let id_drag_element = sessionStorage.getItem("id_element_drag")
    let id_drop_oprawa = id;
    handleChangeCardFragmentyOprawaId(id_drag_element,id_drop_oprawa)

    }
   

  }

  function handleDragOver(e){
     e.preventDefault()


  }

  function handleDragStart(id){
   //   e.preventDefault();
    sessionStorage.setItem("id_element_drag", id);
    sessionStorage.setItem("typ_drag", "fragment");

  }
  
  return (
    <div className={style.container}>
      <div className={style.oprawa}>
      <Header  />
      <OprawaTable handleDragStart={handleDragStart} handleChangeCardFragmentyOprawaId={handleChangeCardFragmentyOprawaId} handleDrop={handleDrop} handleDragOver={handleDragOver} oprawa={oprawa} setOprawa={setOprawa} handleChangeCardOprawa={handleChangeCardOprawa} fragmenty={fragmenty} setFragmenty={setFragmenty} expand={expand} setExpand={setExpand} handleChangeCardFragmenty={handleChangeCardFragmenty } setShowOprawaElementyStage={setShowOprawaElementyStage} oprawa_row={oprawa_row} setOprawa_row={setOprawa_row}/>
      {showOprawaElementyStage && (
        <OprawaElementyStage
        showOprawaElementyStage={showOprawaElementyStage}
        setShowOprawaElementyStage={setShowOprawaElementyStage}
        oprawa={oprawa}
        setOprawa={setOprawa}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
        oprawa_row={oprawa_row}
        handleChangeCardOprawa={handleChangeCardOprawa}

        />
      )}
</div>
     

    </div>
  );
}

function OprawaTable({handleDragStart,handleChangeCardFragmentyOprawaId,handleDrop,handleDragOver,oprawa, setOprawa,handleChangeCardOprawa, fragmenty,setFragmenty, expand, setExpand,handleChangeCardFragmenty,setShowOprawaElementyStage,oprawa_row,setOprawa_row}){
  return (  < div className={style.main}>
  <table className={style.table}>
    <thead>
      <tr>
      <th className={style.col7}>

      </th>
        {/* <th className={style.col1}>Zam.</th> */}
        {/* <th className={style.col2}>Prod.</th> */}
        <th className={style.col3}>#</th>

        <th className={style.col4}>Oprawa</th>
        <th className={style.col4}>Wersja</th>
        <th className={style.col4}>Naklad</th>
        <th className={style.col4}>Bok oprawy</th>

        <th className={style.col6}>Data spedycji</th>
        <th className={style.col7}>Uwagi</th>
       
        <th className={style.col7}></th>
        <th className={style.col7}></th>
        <th className={style.col7}></th>
        
      

      </tr>
    </thead>
    <tbody>
      {oprawa.map((row) => {
        return (
          <>
            <tr 
         
             key={row.id}
             onDrop={()=>handleDrop(row.id)}
            onDragOver={handleDragOver}
             
             
             >
              {/* <td>{row.zamowienie_id}</td> */}
              <div className={style.expand}>
                <img
                  className={style.icon}
                  src={logoExpand}
                  onClick={() => {
                    setExpand(!expand);
                  }}
                  alt="Procesy"
                />
              </div>
              {/* <td>{row.produkt_id}</td> */}
              <td>{row.id}</td>
          
              <RodzajOprawy
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />


<WersjaOprawa
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />
                  <NakladOprawa
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />
              <BokOprawy
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />

              <DataSpedycji
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />

              {/* <td>{row.data_spedycji}</td> */}

              <UwagiOprawa
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />

                
              <Usun fragmenty={fragmenty} setFragmenty={setFragmenty} oprawa={oprawa} setOprawa={setOprawa} row={row} handleRemoveItem={handleRemoveItem}/>
              <DodajOprawe oprawa={oprawa} setOprawa={setOprawa} row={row} />
              <PodzielOprawe setShowOprawaElementyStage={setShowOprawaElementyStage} oprawa={oprawa} setOprawa={setOprawa} row={row} oprawa_row={oprawa_row} setOprawa_row={setOprawa_row}  />
            </tr>
            {expand ? (
              fragmenty
                .filter((el) => el.oprawa_id === row.id)
                .map((row) => {
                  return (
                    <tr draggable  onDragStart={()=>handleDragStart(row.id)}  key={row.id}>
      
                      <td></td>

                      <td></td>
                      <Typ row={row} />

                      <WersjaOprawaFragment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      />

                      <NakladOprawaFregment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      />
                      <td> </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      
                 
                    </tr>
                  );
                })
            ) : (
              <></>
            )}
          </>
        );
      })}
    </tbody>
  </table>

</div>)

}

function Header() {
  return <div className={style.header}> Oprawa</div>;
}

function DataSpedycji({row,handleChangeCardOprawa}){
  return(
      <div className={style.col}>
      <input className={style.data} type="date"
      defaultValue={row.data_spedycji}
      onChange={(event) => {
        handleChangeCardOprawa({...row, data_spedycji: event.target.value});
      }}></input>
    </div>
  );
}

function RodzajOprawy({ row,handleChangeCardOprawa }) {
  return (
    <div className={style.select}>

      <select
        className={style.firma}
        defaultValue={row.oprawa}
        onChange={(event) => {
          handleChangeCardOprawa({...row, oprawa: event.target.value});
        }}
      >
        {_rodzaj_oprawy.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function DodajOprawe({ row, handleChangeCardOprawa ,handleAddCard,oprawa,setOprawa}) {
  return (
    <td className={style.col_button} >
            <img
         className={style.expand}
          src={iconCopy}
          onClick={() => {handleAddRowOprawa(row,oprawa,setOprawa)}}
          alt="Procesy"
        />
    </td>
  );
}

function Usun({ row, handleChangeCardOprawa ,handleRemoveItem,oprawa,setOprawa ,fragmenty,setFragmenty}) {
  return (
    <td className={style.col_button}>
      <div >
                      <img
         className={style.expand}
          src={iconTrash}
          onClick={() => {handleRemoveItem(row.indeks, row.id,oprawa,setOprawa,fragmenty,setFragmenty)}}
          alt="Procesy"
        />
      </div>

    </td>
  );
}


function PodzielOprawe({ row, handleChangeCardOprawa ,handleAddCard,oprawa,setOprawa,setShowOprawaElementyStage,oprawa_row,setOprawa_row}) {
  return (
    <td className={style.col_button} >
            <img
         className={style.expand}
          src={iconTable}
          onClick={() => {
            setShowOprawaElementyStage(true);
            setOprawa_row(row);
          }}
          alt="Procesy"
        />
    </td>
  );
}
function PokazElementy({ setShowOprawaElementyStage  }) {
  return (
    <td className={style.col_button}>
      <div >
      <img
            className={style.pokaz_elementy_oprawy}
            src={iconUstawienia}
            onClick={() => {
              setShowOprawaElementyStage(true);
            }}
            alt="Procesy"
          />
      </div>

    </td>
  );
}

const handleRemoveItem = (indeks,id,oprawa,setOprawa ,fragmenty,setFragmenty) => {

  // kasowanie oprawy?
  // id = id elementu
  if (oprawa.length !== 1) {
    setOprawa(oprawa.filter((x) => x.indeks !== indeks));
    setFragmenty(fragmenty.filter((x) => x.oprawa_id !== id));
  }

  setOprawa((prev) =>
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

function handleAddRowOprawa(card,oprawa,setOprawa) {
  const newOprawa = JSON.parse(JSON.stringify(oprawa))

 // do bazy dodawany jest jeden pusty wpis, aby zgadzała się kolejność id
  axios.post(ip + "oprawa", {
    zamowienie_id: 0,
    produkt_id: 0,
    oprawa: 0,
    naklad:0,
    uwagi: "oprawa temp",
    data_spedycji: "2024-01-30 00:00:00"
}).then((res) => {


   newOprawa.push({
    id: Math.max(...newOprawa.map((f) => f.id)) + 1,
    
    zamowienie_id: card.zamowienie_id,
    produkt_id: card.produkt_id,
    oprawa: card.oprawa,
    bok_oprawy: card.bok_oprawy,

    naklad: 20,
    indeks: Math.max(...newOprawa.map((f) => f.indeks)) + 1,
    uwagi: card.uwagi,
    data_spedycji: card.data_spedycji,
  
  });


  setOprawa(newOprawa);
})

}

function Typ({ row }) {
  return (
    <td>
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


function  WersjaOprawaFragment({ row, handleChangeCardFragmenty }) {
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

function  NakladOprawaFregment({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input
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

function  WersjaOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        value={row.wersja}
        onChange={(e) =>
          handleChangeCardOprawa({
            ...row,
            wersja: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function  BokOprawy({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        value={row.bok_oprawy}
        onChange={(e) =>
          handleChangeCardOprawa({
            ...row,
            bok_oprawy: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function  UwagiOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        value={row.uwagi}
        onChange={(e) =>
          handleChangeCardOprawa({
            ...row,
            uwagi: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function  NakladOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        defaultValue={row.naklad} 
        onChange={(e) =>
          handleChangeCardOprawa({
            ...row,
            naklad: e.target.value,
          })
        }
      ></input>
    </td>
  );
}