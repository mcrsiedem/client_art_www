import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import iconSettings from "assets/settings.svg";
import style from "./WykonaniaTech.module.css";
import icon from "assets/copy.svg";
import iconTrash from "assets/trash2.svg"
import logoExpand from "assets/expand.svg";
// import Logo_ustawienia2 from "assets/refresh.png";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import { _typ_elementu, reg_txt } from "utils/initialvalue";
import { reg_int } from "utils/initialvalue";
import { getNameOfElement } from "actions/getNameOfElement";
import RowWykonanie from "./RowWykonanie";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import { updateWykonaniaOrazGrupa } from "actions/updateWykonaniaOrazGrupa";
import { updateWydzielWykonanieZgrupy } from "actions/updateWydzielWykonanieZgrupy";
import { updatePrzeniesWykonanieDoInnejGrupy } from "actions/updatePrzeniesWykonanieDoInnejGrupy";




export default function WykonaniaTech() {
  return (
    <div className={style.container}>

       {/* <div  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",marginTop:"50px",backgroundColor:"rgb(230,230,230)", borderRadius:"10px", height:"50px"}}> */}
       <div className={style.header_procesy}>
      {/* <div className={style.procesy_menu_button}> */}
      <p></p>
        <p style={{ display: "flex", justifyContent:"center",alignItems:"center", color:"grey" , fontSize:"1.5rem"}}>Procesy</p>
        <ProcesBtn />
      </div>

      <WykonaniaTechTable />
    </div>
  );
}
const WykonaniaTechTable = () => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;

  return (
  <div className={style.container}>
    
      {procesyElementowTech.map((rowProces) => (
        <ProcesRow rowProces={rowProces} />
      ))}

      

  </div>
  )
}

const ProcesRow = ({ rowProces }) => {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const elementyTech = techContext.elementyTech;
  const [show, setShow] = useState(true);
  return (
    <>
      <div className={style.row1}>
        <Rozwin rowProces={rowProces} show={show} setShow={setShow} />
        <p className={style.nazwy_procesow}>{rowProces.nazwa} </p>
        {/* <p>{rowProces.typ} </p> */}
        <p className={style.nazwy_procesow}>Prędkość: {rowProces.predkosc} </p>
        <p className={style.nazwy_procesow}>Narząd: {rowProces.narzad}  </p>
        {/* <p>{getNameOfElement(rowProces.element_id,elementyTech)}</p> */}
        <p  className={style.nazwy_procesow2}> {getNameOfElement(rowProces.element_id,elementyTech,_typ_elementu)}</p>
        <p  className={style.nazwy_procesow}> </p>
        {/* <Nazwa rowProces={rowProces} />
        <Info rowProces={rowProces} /> */}

      </div>
    
      {show &&
          <GrupaRow rowProces={rowProces} />}

          <hr></hr>
    </>
  );
};


const GrupaRow = ({ rowProces }) => {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const [show, setShow] = useState(true);
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
  return (
    <>
      {show &&
        grupaWykonan
          .filter((f) => f.proces_id == rowProces.id)
          .map((rowGrupa, i) => (
            <div>
              <div 
                // onDragOver={handleDragOver}
                // onDrop={() => handleDrop(rowGrupa.id)}
              className={style.grupa_container}>
                 {/* <p style={{ fontSize: "1rem", color:"grey"}}>Grupa {rowGrupa.id} </p>   */}
                 <Procesor rowGrupa={rowGrupa} rowProces={rowProces}/>
                 <CzasGrupy rowGrupa={rowGrupa} />
                 <PredkoscGrupy rowGrupa={rowGrupa} />
                 <MnoznikPredkosci rowGrupa={rowGrupa}/>
                 <Stangrupy rowGrupa={rowGrupa}/>
                 <StatusGrupy rowGrupa={rowGrupa} updateWykonaniaWszystkie={updateWykonaniaWszystkie}/>
                 
                 <DodajGrupeWykonan rowGrupa={rowGrupa}/>
              </div>
              

              {show &&
                wykonania
                  .filter((f) => f.grupa_id == rowGrupa.id)
                  .map((rowWykonanie, i) => (
                    <div className={style.wykonania_container}>
                      {/* <WykonanieRow row={row}/> */}
                      <RowWykonanie rowWykonanie={rowWykonanie} updateWykonaniaWszystkie={updateWykonaniaWszystkie}/>

                    </div>
                  ))}
            </div>
          ))}
    </>
  );

};



function Procesor({ rowGrupa,rowProces, handleChangeCardOprawa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania;
  return (
    <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(rowGrupa.id,rowProces.id,rowGrupa.id)}
     className={style.col_dane}>
      <label className={style.label}> Procesor </label>
      <select
        className={style.input}
        defaultValue={rowGrupa.procesor_id}
        onChange={(event) => {
          updateGrupaWykonan({ ...rowGrupa, procesor_id: event.target.value });
          dragDropProcesGrupaToProcesor(rowGrupa.global_id,event.target.value,fechGrupyAndWykonaniaForProcesor)
    
        }}
      >
        {procesory
        .filter(x => x.grupa == rowProces.nazwa_id )
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );

  function handleDragOver(e) {
    e.preventDefault();
  
  }

  function handleDrop(id,proces_id,grupa_id_drop) {
    if (sessionStorage.getItem("typ_drag") == "wykonanie" && sessionStorage.getItem("id_proces_wykonanie_drag") == proces_id) {
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");

        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length == 1){
          // console.log("Ostatnie wykonanie w grupie")
          updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, true)
        }

        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length > 1){
          // console.log("Nieostatnie wykonanie w grupie")
        updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, false)
        }
    }
  }


}

function DodajGrupeWykonan({ row }) {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

  return (
    <div style={{ paddingTop: "13px" }}>
      <img
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(1)}
        className={style.expand}
        src={icon}
        onClick={() => {
          //handleAddArkusz(row, grupaWykonan, setGrupaWykonan);
          // handleRemoveItem(row.indeks, row.id);
        }}
        alt="Procesy"
      />
    </div>
  );

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "wykonanie") {
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
      // console.log("id: "+id_drag_wykonania)
      updateWydzielWykonanieZgrupy(id_drag_wykonania, fechparametryTechnologii);
      // let id_drop_grupa = id;
    }
  }
}




function MnoznikPredkosci({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const mnozniki = contextApp.mnozniki
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Mnożnik </label>
      <select 
        className={style.select}
        defaultValue={rowGrupa.mnoznik}
        onChange={(event) => {
          updateGrupaWykonan({ ...rowGrupa, mnoznik: event.target.value });
        }}
      >
        {mnozniki.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatusGrupy({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
   const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
   const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania
  const setWykonania = techContext.setWykonania
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Status </label>
      <select 
        className={style.select}
        defaultValue={rowGrupa.status}
        onChange={(event) => {
  
          // technologia_id == 1 - przed pierwszym zapisem zmiany localnie
          // technologia_id != 1 - zmiany bezpośrednio na serwerze
     // 1 - status
            // 2 - stan

          if(rowGrupa.technologia_id == 1){

            updateWykonaniaWszystkie({ ...rowGrupa, status: event.target.value });
            updateGrupaWykonan({ ...rowGrupa, status: event.target.value });
          }else{

       
            updateWykonaniaOrazGrupa(rowGrupa.global_id,1,event.target.value,fechparametryTechnologii)

          }

        }}
      >
        {_status_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

function Stangrupy({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _stan_wykonania = contextApp._stan_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Stan </label>
      <select 
        className={style.select}
        defaultValue={rowGrupa.stan}
        onChange={(event) => {
          



          if(rowGrupa.technologia_id == 1){

            updateWykonaniaWszystkie({ ...rowGrupa, stan: event.target.value });
            updateGrupaWykonan({ ...rowGrupa, stan: event.target.value });
          }else{

            // 1 - status
            // 2 - stan
            updateWykonaniaOrazGrupa(rowGrupa.global_id,2,event.target.value,fechparametryTechnologii)

          }





        }}
      >
        {_stan_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}


const CzasGrupy = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane}>
      
      <label className={style.label}> Czas </label>
      <input
      disable
        className={style.input}
        value={zamienNaGodziny(rowGrupa.czas)}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan({
              ...rowGrupa,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const PredkoscGrupy = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane}>
      
      <label className={style.label}> Prędkość </label>
      <input
      
        className={style.input}
        value={rowGrupa.predkosc}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan({
              ...rowGrupa,
              predkosc: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};










const Rozwin = ({  rowProces,show, setShow }) => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  // if  (procesyElementowTech
  // .filter((f) => f.proces_id == rowProces.id).length !== 0){
  return (
    <div style={{ display: "block", margin : "auto"}} >
      <img
                      
        className={style.expand}
        src={logoExpand}
        onClick={() => {
          setShow(!show);
        }}
        alt="Procesy"
      />
    </div>
  );
// }else return <p> </p>


























}

const Nazwa = ({ rowProces }) => {
  const techContext = useContext(TechnologyContext);
  const updateRowProcesyElementowTech = techContext.updateRowProcesyElementowTech;
  return (
    <div className={style.col_dane}>
      
      <label className={style.label}> Proces </label>
      <input
      disabled
        className={style.input}
        value={rowProces.nazwa}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            updateRowProcesyElementowTech({
              ...rowProces,
              info: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const Info = ({ rowProces }) => {
  const techContext = useContext(TechnologyContext);
  const updateRowProcesyElementowTech = techContext.updateRowProcesyElementowTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Info </label>
      <input
        className={style.input}
        value={rowProces.info}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            updateRowProcesyElementowTech({
              ...rowProces,
              info: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};









// const WykonaniaTechTable2 = () => {
//   const techContext = useContext(TechnologyContext);
//   const grupaWykonan = techContext.grupaWykonan;
//   const [showMenu, setShowMenu] = useState(false);
//   const [showLegi, setShowLegi] = useState(true);

//   return (
//     <div className={style.table_legi}>
//       <MenuArkusze showMenu={showMenu} setShowMenu={setShowMenu} />
//       <table className={style.table2}>
//         <thead>
//           <tr>
//             <th className={style.expand}>
//               <img
//                 className={style.icon}
//                 src={logoExpand}
//                 onClick={() => {
//                   setShowLegi(!showLegi);
//                 }}
//                 alt="Procesy"
//               />
//             </th>
//             <th className={style.th_checkbox}>
//               <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu} />
//             </th>
//             <th className={style.col1}>#</th>
//             <th className={style.col_typ}>Proces</th>
//             <th className={style.col_typ}>Rodzaj</th>
//             <th className={style.col_naklad}>Nakład</th>
//             <th className={style.col_uwagi}>Ilość leg</th>
//             <th className={style.col_uwagi}>Uwagi</th>
//             <th className={style.col_uwagi}>Narząd</th>
//             <th className={style.col_uwagi}>akr/h</th>
           
//             <th className={style.col_doda3j}></th>
//             <th className={style.col_doda3j}></th>
//           </tr>
//         </thead>
//         <tbody
//           onClick={() => {
//             setShowMenu(false);
//           }}
//         >
//           {grupaWykonan
//             // .sort((a, b) => a.indeks - b.indeks)
//             .map((row, i) => {
//               return (
//                 <RowGrupa
//                   key={row.indeks+"x"}
//                   i={i}
//                   row={row}
//                   showLegi={showLegi}
//                 />
//               );
//             })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

//------------------------------------------------------------
const RowGrupa = ({ row, showLegi }) => {
  const techContext = useContext(TechnologyContext);
  const legi = techContext.legi;
  const wykonania = techContext.wykonania;
  const setLegi = techContext.setLegi;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const dragLegaId = techContext.dragLegaId;
  const setDragLegaId = techContext.setDragLegaId;

  const setDropArkuszId = techContext.setDropArkuszId;
  function handleDragStart(id) {
    //   e.preventDefault();

    setDragLegaId(id);
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
          };
        } else {
          return t;
        }
      })
    );
    console.log("drop: " + id);
    setDropArkuszId(id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <>
      <tr
        onDrop={() => handleDrop(row.id)}
        onDragOver={handleDragOver}
        className={style.tr_legi}
        key={row.id}
      >
        <td></td>
        <td></td>
        <td></td>
        {/* <SelectBoxArkusze row={row} /> */}
        {/* <td>{row.indeks}</td> */}

        <td className={style.td_nazwa}>{row.nazwa}</td>
        <td>{row.typ_elementu}</td>
        <td></td>
        {/* <TypElementu row={row} />
      <RodzajArkusza row={row} /> */}
        
        <td></td>
        <td>{row.uwagi}</td>
        <td>{row.narzad}</td>
        <td>{row.predkosc}</td>
        <UsunArkusz row={row} />
        <DodajArkusz row={row} />
      </tr>
      {showLegi && (
        <>
          {" "}
          {wykonania
            .filter((x) => x.id == row.id)
            .map((l, i) => {
              return (
                <tr
                  draggable
                  onDragStart={() => handleDragStart(l.id)}
                  className={style.tr_legi_mini}
                  key={l.id + i}
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  {/* <td>{i + 1}</td> */}
                  <td>{i + 1} wyk. {l.indeks}</td>
                  <td></td>
                  <td>{l.naklad}</td>
                  <td>{l.ilosc_leg}</td>
                  <td>
                    {
                      _typ_elementu.filter((x) => x.id == l.typ_elementu)[0]
                        .nazwa
                    }
                  </td>
                  {/* <td>{row.element_id}</td> */}
                  {/* <td>{row.ilosc_stron}</td> */}
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
        </>
      )}
    </>
  );
};

const MenuBtn = ({ showMenu, setShowMenu }) => {
  return (
    <img
      className={style.iconMenuBtn}
      src={iconSettings}
      onClick={() => {
        setShowMenu(!showMenu);
      }}
      alt="x"
    />
  );
};


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


function MenuArkusze({ showMenu, setShowMenu }) {
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;

  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setArkusze(
              arkusze.map((t) => {
                return { ...t, select: true };
              })
            );
            setShowMenu(!showMenu);
          }}
        >
          Zaznacz wszystko
        </button>
        <button className={style.menu_legi_btn}           onClick={() => {
            setArkusze(
              arkusze.map((t) => {
                return { ...t, select: false };
              })
            );
            setShowMenu(!showMenu);
          }}>Odznacz wszystko</button>
        <button className={style.menu_legi_btn}>Legi</button>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          Anuluj
        </button>
      </div>
    );
  }
}

function RodzajArkusza ({row}) {
  const techContext = useContext(TechnologyContext)
  const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
  return (
    <td>
      <input
        value={row.rodzaj_arkusza}
        onChange={(e) =>

          {
            if (e.target.value === '' || reg_int.test(e.target.value)) {
              handleUpdateRowArkusze({
            ...row,
            rodzaj_arkusza: e.target.value,
          }
          )}}

        }
      ></input>
    </td>
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

function TypElementu ({row}) {
  const techContext = useContext(TechnologyContext)
  const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
  return (
    <td>
      <div>{_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa} </div>
      {/* <input
        value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa}
        onChange={(e) =>

          {
            if (e.target.value === '' || reg_int.test(e.target.value)) {
              handleUpdateRowArkusze({
            ...row,
            typ_elementu: e.target.value,
          }
          )}}

        }
      ></input> */}
    </td>
  );
}

function UsunArkusz({ row }) {
  const techContext = useContext(TechnologyContext)
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;

  const handleRemoveArkusz = (indeks,id,arkusze,setArkusze) => {
    // id = id elementu
    if (arkusze.length !== 1) {
      setArkusze(arkusze.filter((x) => x.indeks !== indeks));
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
            handleRemoveArkusz(row.indeks, row.id,arkusze,setArkusze)
            // handleRemoveItem(row.indeks, row.id);
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}

const ProcesBtn = ({ row, showMenu, setShowMenu }) => {
  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const procesy = techContext.procesyElementow;
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const oprawaTech = techContext.oprawaTech;
  const setOprawaTech = techContext.setOprawaTech;
  const fragmentyTech = techContext.fragmentyTech;
  const setFragmentyTech = techContext.setFragmentyTech;


  const elementyTech = techContext.elementyTech;
  return (
    <div style={{ display: "flex", justifyContent:"end", alignItems:"center"}} >

      <img
        className={style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Policz czasy wykonań"
        onClick={() => {
          // createArkuszeFromElemenets(
          //   arkusze,
          //   setArkusze,
          //   legi,
          //   setLegi,
          //   legiFragmenty,
          //   setLegiFragmenty,
          //   oprawaTech,
          //   setOprawaTech,
          //   fragmentyTech,
          //   setFragmentyTech,
          //   elementyTech,
          //   row, procesy, grupaWykonan, setGrupaWykonan,wykonania, setWykonania
          // );
          // setShowMenu(!showMenu);
          // dodaj_clikHandler();
          // console.log("z contextu :"+ token.rowSelected)
          //  sessionStorage.setItem("us",{id:1,imie:"Maciek"})
        }}
        alt="x"
      />
      {/* <ProduktyTechMenu
        row={row}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      /> */}
    </div>
  );
};