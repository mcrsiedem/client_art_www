
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import logoExpand from "assets/expand.svg";
import iconTrash from "assets/trash2.svg"
import icon from "assets/copy.svg";
import style from "./RowArkusze.module.css";
import { reg_cena, reg_int, reg_txt } from "utils/initialvalue";
import addIcon2 from "assets/addIcon2.svg"

export default function RowArkusze  ({ row,i })  {
    const techContext = useContext(TechnologyContext);
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
    const dragLegaId = techContext.dragLegaId;
    const setDragLegaId = techContext.setDragLegaId;
    const legiFragmenty = techContext.legiFragmenty;
    const setLegiFragmenty = techContext.setLegiFragmenty;
    const [showLegi, setShowLegi] = useState(false);
    const setDropArkuszId = techContext.setDropArkuszId;
  
    return (
      <>
        <div className={style.main2}>
      <div      className={style.row3}        onDrop={()=>handleDrop(row.id)}
              onDragOver={handleDragOver}  key={row.id}>

        <Rozwin setShowLegi={setShowLegi} showLegi={showLegi} />
        <NrArkusza row={row} i={i+1}/>
        <TypElementu row={row} i={i+1}/>
        <NakladArkusza row={row} />
        <RodzajArkusza row={row} />
         <td></td>
         <td></td>
         <td></td>
        <PapierSelectArkusze row={row} />
        <UwagiArkusz row={row} />
        <ArkuszSzerokosc row={row} />
        <ArkuszWysokosc row={row} />
        <UsunArkusz row={row} />
        <DodajArkusz row={row} />
      </div>
      </div>
      {showLegi &&(<>     {legi.filter(x=> x.arkusz_id == row.id).map( (l,i) => {
        return  <>  <div draggable  onDragStart={()=>handleDragStart(l.id)}  className={style.row4} key={l.id}>
           <NrLegi row={l} />
        <td className={style.input2}>lega</td>
       
        <NakladLegi row={l} />
        <RodzajLegi row={l} />
        {/* <td>{l.rodzaj_legi}</td> */}
        <UwagiLegi row={l} />
      </div>


{showLegi &&(<>     {legiFragmenty.filter(x=> x.lega_id == l.id).map( (lf,i) => {
  return     <div draggable  onDragStart={()=>handleDragStartFragmnetLegi(lf.id)} className={style.row5} key={lf.id}>


<td className={style.input3}>  </td>
<td className={style.lega_fragment_text}> fragment</td>
  <NakladFragment row={lf}/>
  <td>{lf.ilosc_leg}</td>
  <WersjaFragment row={lf}/>
 
</div>
})}</>)}
</> 
      })
      }
      </>)}
      </>
    );


    function handleDragStart(id){
      //   e.preventDefault();
      setDragLegaId(id)
     }

     function handleDragStartFragmnetLegi(id){
      sessionStorage.setItem("id_fragment_legi_drag", id);
    sessionStorage.setItem("typ_drag", "fragmentlegi");
 
     }
   
    function handleDrop(id) {
      setLegi(
        legi.map((t, a) => {
        // console.log("oprawa id" +prev)
        if (t.id === dragLegaId) {
          return {
            ...t,
            arkusz_id: id,
            update: true
  
          };
        } else {
          return t;
        }
      })
    );

    setLegiFragmenty(
      legiFragmenty.map((t, a) => {
      if (t.lega_id === dragLegaId) {
        return {
          ...t,
          arkusz_id: id,
          update: true

        };
      } else {
        return t;
      }
    })
  );
      setDropArkuszId(id)
    }
  
    function handleDragOver(e) {
      e.preventDefault();
    }








  };

  function WersjaFragment ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateLegiFragmentyTech = techContext.handleUpdateLegiFragmentyTech;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        
        <input
        className={style.input_ark_typ}
        // disabled
        
          defaultValue={row.wersja}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateLegiFragmentyTech({
              ...row,
              wersja: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function NakladFragment ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateLegiFragmentyTech = techContext.handleUpdateLegiFragmentyTech;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        
        <input
        className={style.input_ark_typ}
        // disabled
        
          defaultValue={row.naklad}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateLegiFragmentyTech({
              ...row,
              naklad: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function Rozwin({ showLegi,setShowLegi }) {
    const techContext = useContext(TechnologyContext);
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
  
  
    return (
  
        <div>
          <img
            className={style.expand}
            src={logoExpand}
            onClick={() => {
              setShowLegi(!showLegi)
            }}
            alt="Procesy"
          />
        </div>
  
    );
  }

  function UsunArkusz({ row }) {
    const techContext = useContext(TechnologyContext)
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;

    const legi = techContext.legi;
    const setLegi = techContext.setLegi;
    const legiFragmenty = techContext.legiFragmenty;
    const setLegiFragmenty = techContext.setLegiFragmenty;


    const handleRemoveArkusz = (indeks,id,arkusze,setArkusze,row) => {
      // id = id elementu
      if (arkusze.length !== 1) {
        setArkusze(arkusze.filter((x) => x.indeks !== indeks));
        setLegi(legi.filter((x) => x.arkusz_id !== row.id));
        setLegiFragmenty(legiFragmenty.filter((x) => x.arkusz_id !== row.id));

        // setFragmenty(fragmenty.filter((x) => x.element_id !== id));
      }
    
      setArkusze((prev) =>
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

    return (
      <td className={style.col_button}>
        <div>
          <img
            className={style.expand}
            src={iconTrash}
            onClick={() => {
              handleRemoveArkusz(row.indeks, row.id,arkusze,setArkusze,row)
              // handleRemoveItem(row.indeks, row.id);
            }}
            alt="Procesy"
          />
        </div>
      </td>
    );
  }

  function DodajArkusz({ row }) {
    const techContext = useContext(TechnologyContext);
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
  
    const handleAddArkusz = (row, arkusze, setArkusze) => {
      // id = id elementu
      const newArkusze = arkusze.slice();
  
  
      newArkusze.push({
        id: Math.max(...newArkusze.map((f) => f.id)) + 1,
        indeks: Math.max(...newArkusze.map((f) => f.indeks)) + 1,
        typ_elementu: row.typ_elementu,
        rodzaj_arkusza:row.rodzaj_arkusza,
        naklad: row.naklad,
        element_id: row.id,
        ilosc_stron: row.ilosc_stron,
        insert: true
      });
  
      setArkusze(newArkusze);
    };
  
    return (
      <td className={style.col_dodaj2}>
        <div>
          <img
            className={style.expand}
            src={icon}
            onClick={() => {
              handleAddArkusz(row, arkusze, setArkusze);
              // handleRemoveItem(row.indeks, row.id);
            }}
            alt="Procesy"
          />
        </div>
      </td>
    );
  }
  function NrArkusza ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        <input
        className={style.input_ark_nr}
          value={row.nr_arkusza}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              nr_arkusza: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }
  function ArkuszSzerokosc ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        <input
        className={style.input_ark_nr}
        value={row.arkusz_szerokosc}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_cena.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              arkusz_szerokosc: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function ArkuszWysokosc ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        <input
        className={style.input_ark_nr}
          value={row.arkusz_wysokosc}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_cena.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              arkusz_wysokosc: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }


  
  function RodzajArkusza ({row}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
   
        <input
        className={style.input_ark}
          value={row.rodzaj_arkusza}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              rodzaj_arkusza: e.target.value,
              update: true
            }
            )}}

          }
        ></input>
     
    );
  }
  function PapierSelectArkusze({  row}) {
    const appcontext = useContext(AppContext);
    const listaPapierow = appcontext.listaPapierow;
    const modalcontext = useContext(ModalInsertContext);
    const setShowPaperStage = modalcontext.setShowPaperStage;
    const setSelectedElementROW = modalcontext.setSelectedElementROW;
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
     const techContext = useContext(TechnologyContext)
        const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
  
    return (
     <div className={style.papier_input_container}>
        <select
          className={row.papier_id =="0" ? style.select_papier_brak : style.select_papier }
          value={row.papier_id}
          onChange={(e) => {

            handleUpdateRowArkusze({
              ...row,
              papier_id: e.target.value,
              update: true
            })
            
          }}
        >
          {   <option value = "0"  >
             wybierz papier
            </option>}
       
          {listaPapierow.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa} {option.gramatura} g/m2 {option.wykonczenie}
            </option>
          ))}
        </select>
  <img
         className={style.dodaj_klienta}
          src={addIcon2}
          onClick={() => {
            setShowPaperStage(true)
            setSelectedElementROW(row)
            setListaPapierowWyszukiwarka(listaPapierow)
         
          }}
          alt="Procesy"
        />
     </div>
  
   
    );
  }


  function SelectBoxArkusze({row}) {

    const techContext = useContext(TechnologyContext)
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;

  
    return (
      <td className={style.td_checkbox}>
        <div >
        <input
        className={style.ch_box} 
        type="checkbox"
        checked={row.select}
        onChange={(event)=>{
  
          //  console.log(" select"+ row.id +" "+event.target.checked)
          setArkusze(
            arkusze.map((t) => {
              if (t.id == row.id) {
                return {...row, select: event.target.checked }
              } else {
                return t;
              }
            })
          )
        }}
       ></input>
        </div>
  
      </td>
    );
  }

  function TypElementu ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        <input
        className={style.input_ark_typ}
        disabled
          value={"arkusz"}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              typ_elementu: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }


  function NakladArkusza ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        <input
        className={style.input_ark_typ}
        // disabled
        
          defaultValue={row.naklad}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              naklad: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }
  function NrLegi ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        <input
        className={style.input_ark_typ}
        // disabled
        
          defaultValue={row.nr_legi}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              nr_legi: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }
  function NakladLegi ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        <input
        className={style.input_ark_typ}
        // disabled
        
          defaultValue={row.naklad}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              naklad: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }
  function RodzajLegi ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        <input
        className={style.input_ark_typ}
        // disabled
        
          defaultValue={row.rodzaj_legi}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              rodzaj_legi: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function UwagiLegi ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        
        <input
        className={style.input_ark_typ}
        // disabled
        
          defaultValue={row.uwagi}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              uwagi: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }

  function UwagiArkusz ({row,i}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
        // <div  className={style.input_ark}> arkusz {i}</div>
        
        <input
        className={style.input_ark_typ}
        // disabled
        
          defaultValue={row.uwagi}
          // value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa }
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_txt.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              uwagi: e.target.value,
              update: true
            }
            )}}
          }
        ></input>
    );
  }