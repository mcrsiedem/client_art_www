
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";


import logoExpand from "assets/expand.svg";
import iconTrash from "assets/trash2.svg"
import icon from "assets/copy.svg";
// import TypElementu from "./TypElementu";
// import RodzajArkusza from "./RodzajArkusza";
// import { reg_int } from "utils/initialvalue";
// import UsunArkusz from "./UsunArkusz";
// import DodajArkusz from "./DodajArkusz";
// import Rozwin from "./Rozwin";
import style from "./RowArkusze.module.css";
import { reg_int, reg_txt } from "utils/initialvalue";
// import NrArkusza from "./NrArkusza";


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
    function handleDragStart(id){
      //   e.preventDefault();
  
      setDragLegaId(id)
     }

     function handleDragStartFragmnetLegi(id){
      //   e.preventDefault();
      sessionStorage.setItem("id_fragment_legi_drag", id);
    sessionStorage.setItem("typ_drag", "fragmentlegi");
 
     }
   
    function handleDrop(id) {
      // sprawdza czy upuszczamy właściwy obiekt
      // if (sessionStorage.getItem("typ_drag") == "fragment") {
      //   let id_drag_element = sessionStorage.getItem("id_element_drag");
      //   let id_drop_oprawa = id;
      //   handleChangeCardFragmentyOprawaId(id_drag_element, id_drop_oprawa);
      // }
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
      // console.log("oprawa id" +prev)
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




      console.log("drop: "+id)
      setDropArkuszId(id)
    }
  
    function handleDragOver(e) {
      e.preventDefault();
    }
  
    return (
      <>
        <div className={style.main2}>
      <div      className={style.row3}        onDrop={()=>handleDrop(row.id)}
              onDragOver={handleDragOver}  key={row.id}>
              
{/*        
        <div className={style.input2}>{row.indeks}</div> */}
        {/* <td>{row.typ_elementu}</td> */}
        <Rozwin setShowLegi={setShowLegi} showLegi={showLegi} />
        <NrArkusza row={row} i={i+1}/>
        <TypElementu row={row} i={i+1}/>
   
        
        {/* <div className={style.input_ark}>{row.naklad}</div> */}

        <NakladArkusza row={row} />
        <RodzajArkusza row={row} />
   
        <td>{row.ilosc_leg}</td>
        <td>{row.uwagi}</td>
        {/* <td>{row.element_id}</td> */}
        {/* <td>arkusz id {row.id}</td> */}
        <UsunArkusz row={row} />
        <DodajArkusz row={row} />

        <SelectBoxArkusze row={row} />
      </div>
      </div>
      {showLegi &&(<>     {legi.filter(x=> x.arkusz_id == row.id).map( (l,i) => {
        return  <>  <div draggable  onDragStart={()=>handleDragStart(l.id)}  className={style.row4} key={l.id}>
  
        {/* <td  >{i+1}</td> */}
        <td className={style.input2}>lega {l.indeks}</td>
   
        
        <NakladLegi row={l} />
        {/* <td className={style.input2}>{l.naklad}</td> */}
        <td>{l.ilosc_stron}</td>
        {/* <td>{l.ilosc_leg}</td> */}
        <UwagiLegi row={l} />
  
        {/* <td>{row.element_id}</td> */}
        {/* <td>{row.ilosc_stron}</td> */}

      </div>


{showLegi &&(<>     {legiFragmenty.filter(x=> x.lega_id == l.id).map( (lf,i) => {
  return     <div draggable  onDragStart={()=>handleDragStartFragmnetLegi(lf.id)} className={style.row5} key={lf.id}>

  {/* <td  >idfrag{l.id}</td>
  <td>frag.idx {l.indeks}</td> */}
<td className={style.input3}>  </td>
  {/* <td className={style.input3}>{l.naklad}</td> */}
  <NakladFragment row={lf}/>
  
  <td>{lf.ilosc_leg}</td>
  <WersjaFragment row={lf}/>
  <td>lega id{lf.lega_id}</td>
  {/* <td>{row.element_id}</td> */}
  {/* <td>{row.ilosc_stron}</td> */}

</div>
})}</>)}
</> 

      })
      
      }
      
      
      {/* {showLegiFragmenty &&(<>     {legiFragmenty.filter(x=> x.lega_id == row.id).map( (l,i) => { */}

      
      </>)}
  
      </>
    );
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
  

  
        // <div  className={style.input_ark}> arkusz {i}</div>


        <input
        className={style.input_ark_nr}
        
          // value={i}
          value={row.nr_arkusza}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
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
          value={"ark id:  " + row.id}
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