
import style from "./IntroligatorniaTech.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import logoExpand from "../../../../assets/expand.svg";
import { _typ_elementu} from "utils/initialvalue"
import {  useState } from "react";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import iconTable from "../../../../assets/settings.svg";
import iconUstawienia from "../../../../assets/settings.svg";
import OprawaElementyStage from "./OprawaElementyStageTech/OprawaElementyStageTech";
import axios from "axios";

import { IP } from "../../../../utils/Host";
import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { TechnologyContext } from "context/TechnologyContext";

export default function IntroligatorniaTech({
  handleChangeCardProdukty,
  handleChangeCardOprawa,
  handleChangeCardFragmenty,
  handleChangeCardFragmentyOprawaId,

}) {

  const[oprawa_row,setOprawa_row]=useState();
  const [showOprawaElementyStage, setShowOprawaElementyStage] =
  useState(false);
  const [expand,setExpand] =useState(true);

  
   function handleDrop(id) {
     // sprawdza czy upuszczamy właściwy obiekt
     if (sessionStorage.getItem("typ_drag") == "fragment") {
       let id_drag_element = sessionStorage.getItem("id_element_drag");
       let id_drop_oprawa = id;
       handleChangeCardFragmentyOprawaId(id_drag_element, id_drop_oprawa);
     }
   }

   function handleDragOver(e) {
     e.preventDefault();
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
      <OprawaTable  handleChangeCardProdukty={handleChangeCardProdukty}  handleDragStart={handleDragStart} handleChangeCardFragmentyOprawaId={handleChangeCardFragmentyOprawaId} handleDrop={handleDrop} handleDragOver={handleDragOver}  handleChangeCardOprawa={handleChangeCardOprawa}  expand={expand} setExpand={setExpand} handleChangeCardFragmenty={handleChangeCardFragmenty } setShowOprawaElementyStage={setShowOprawaElementyStage} oprawa_row={oprawa_row} setOprawa_row={setOprawa_row}/>
      {showOprawaElementyStage && (
        <OprawaElementyStage
        showOprawaElementyStage={showOprawaElementyStage}
        setShowOprawaElementyStage={setShowOprawaElementyStage}
        oprawa_row={oprawa_row}
        handleChangeCardOprawa={handleChangeCardOprawa}

        />
      )}
</div>
     

    </div>
  );
}

function OprawaTable({handleChangeCardProdukty,handleDragStart,handleChangeCardFragmentyOprawaId,handleDrop,handleDragOver,handleChangeCardOprawa, expand, setExpand,handleChangeCardFragmenty,setShowOprawaElementyStage,oprawa_row,setOprawa_row}){
  const contextModalInsert = useContext(ModalInsertContext);
  const techContext = useContext(TechnologyContext);
  const oprawaTech = techContext.oprawaTech;
  const fragmentyTech = techContext.fragmentyTech;
  const legiFragmenty = techContext.legiFragmenty;

  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;
  const elementy = contextModalInsert.elementy;
  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;
  const [showLegiFragmenty, setShowLegiFragmenty] = useState(true);

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
        <th className={style.col4}>Ilość str</th>
        <th className={style.col4}>Wersja</th>
        <th className={style.col4}>Naklad</th>
        <th className={style.col4}>Bok oprawy</th>

        <th className={style.col6}>Czystodruki</th>
        <th className={style.col6}>Data spedycji</th>
        <th className={style.col7}>Uwagi</th>
       
        <th className={style.col7}></th>
        <th className={style.col7}></th>
        <th className={style.col7}></th>
        
      

      </tr>
    </thead>
    <tbody>
      {oprawaTech.map((row) => {
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
                handleChangeCardProdukty={handleChangeCardProdukty} 
              
              />
      <td></td>

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

<DataCzystodrukow
  row={row}
  handleChangeCardOprawa={handleChangeCardOprawa}
/>
              <DataSpedycji
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />


              <UwagiOprawa
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />

                
              <Usun  row={row} handleRemoveItem={handleRemoveItem}/>
              <DodajOprawe row={row} oprawa={oprawa} setOprawa={setOprawa} />
              <PodzielOprawe setShowOprawaElementyStage={setShowOprawaElementyStage}  row={row} oprawa_row={oprawa_row} setOprawa_row={setOprawa_row}  />
            </tr>
            {expand ? (
              fragmentyTech
                .filter((el) => el.oprawa_id === row.id)
                .map((row) => {
                  return (
                    <>
                    <tr draggable  onDragStart={()=>handleDragStart(row.id)}  key={row.id}>
      
                      <td></td>

                      <td></td>
                      <Typ row={row} />
                      <td>{row.ilosc_stron} </td>
                      <WersjaOprawaFragment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      />

                      <NakladOprawaFregment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      />
                      
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      
                 
                    </tr>
                    {showLegiFragmenty &&(<>     {legiFragmenty.filter(x=> x.element_id == row.element_id).map( (l,i) => {
                      return     <tr draggable  onDragStart={()=>handleDragStart(l.id)} className={style.tr_legi_mini} key={l.id}>
                      <td></td>
                      <td></td>
                      <td  >{i+1}</td>
                      <td>lega {l.indeks}</td>
                      <td></td>
                      <td>{l.naklad}</td>
                      <td>{l.ilosc_leg}</td>
                      <td>{l.uwagi}</td>
                      {/* <td>{row.element_id}</td> */}
                      {/* <td>{row.ilosc_stron}</td> */}
                      <td></td>
                      <td></td>
                    </tr>
                    })}</>)}
                      </>
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
  return <div className={style.header}> Introligatornia</div>;
}

function DataSpedycji({row,handleChangeCardOprawa}){
  return(
      <td  className={style.col}>
      <input className={style.data} type="date"
      defaultValue={row.data_spedycji}
      onChange={(event) => {
        handleChangeCardOprawa({...row, data_spedycji: event.target.value});
      }}></input>
    </td>
  );
}
function DataCzystodrukow({row,handleChangeCardOprawa}){
  return(
      <td className={style.col}>
      <input className={style.data} type="date"
      defaultValue={row.data_czystodrukow}
      onChange={(event) => {
        handleChangeCardOprawa({...row, data_czystodrukow: event.target.value});
      }}></input>
    </td>
  );
}

function RodzajOprawy({ row,handleChangeCardOprawa}) {
  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
const setProdukty = contextModalInsert.setProdukty;
const contextApp = useContext(AppContext);

  return (
    <td className={style.select}>

      <select
        className={style.firma}
        defaultValue={row.oprawa}
        onChange={(event) => {
          handleChangeCardOprawa({...row, oprawa: event.target.value});


          if(row.indeks == 0){
          setProdukty(
            produkty.map((p) => {
              if (p.id === row.produkt_id) {
                return {...p, oprawa:event.target.value};
              } else {
                return p;
              }
            })
          );
           
          }

        }}
      >
        {contextApp.bindingType.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </td>
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

function Usun({ row, handleChangeCardOprawa ,handleRemoveItem }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;

  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;

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


function PodzielOprawe({ row, handleChangeCardOprawa ,handleAddCard,setShowOprawaElementyStage,oprawa_row,setOprawa_row}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;
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

  console.log("oprawa", oprawa)
  const newOprawa = JSON.parse(JSON.stringify(oprawa))

 // do bazy dodawany jest jeden pusty wpis, aby zgadzała się kolejność id
  axios.post(IP + "oprawa", {
    zamowienie_id: 0,
    produkt_id: 0,
    oprawa: 0,
    naklad:0,
    uwagi: "oprawa temp",
    data_spedycji: "2024-01-30 00:00:00",
    data_czystodrukow: "2024-01-30 00:00:00",
      indeks: 0,
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
    data_czystodrukow: card.data_czystodrukow,
      indeks: card.indeks + 1,
  
  });


  setOprawa(newOprawa);
})

}

function Typ({ row }) {
  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;

  return (
    <td>
      <select
        className={style.select}
        value={row.typ}
        disabled
        onClick={()=>{setLegiFragmenty(!legiFragmenty)}}
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

          {       if ( e.target.value === '' || reg_txt.test(e.target.value)) {
          handleChangeCardFragmenty({
            ...row,
            wersja: e.target.value,
          })
        }}}
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

          {

            if (e.target.value === '' || reg_int.test(e.target.value)) {
                        handleChangeCardFragmenty({
            ...row,
            naklad: e.target.value,
          })
            }
          }

        }
      ></input>
    </td>
  );
}
function  IloscStronFragment({ row, handleChangeCardFragmenty }) {
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
          {      if ( e.target.value === '' || reg_txt.test(e.target.value)) {
            handleChangeCardOprawa({
            ...row,
            wersja: e.target.value,
          })}}
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
          {
            if (e.target.value === '' || reg_int.test(e.target.value)) {
            handleChangeCardOprawa({
            ...row,
            bok_oprawy: e.target.value,
          })}}
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
          {
            if ( e.target.value === '' || reg_txt.test(e.target.value)) {
            handleChangeCardOprawa({
            ...row,
            uwagi: e.target.value,
          })}}
        }
      ></input>
    </td>
  );
}

function  NakladOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        value={row.naklad} 
        onChange={(e) =>
          {
            if (e.target.value === '' || reg_int.test(e.target.value)) {
            handleChangeCardOprawa({
            ...row,
            naklad: e.target.value,
          })}}
        }
      ></input>
    </td>
  );
}