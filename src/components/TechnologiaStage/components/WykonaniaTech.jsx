import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import iconSettings from "assets/settings.svg";
import style from "./WykonaniaTech.module.css";
import icon from "assets/copy.svg";
import iconTrash from "assets/trash2.svg"
import logoExpand from "assets/expand.svg";
import { _typ_elementu, reg_txt } from "utils/initialvalue";
import { reg_int } from "utils/initialvalue";

export default function WykonaniaTech() {
  return (
    <div className={style.container}>

      <p>Procesy</p>
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
  const [show, setShow] = useState(true);
  return (
    <>
      <div className={style.row1}>
        <Rozwin rowProces={rowProces} show={show} setShow={setShow} />
        <Nazwa rowProces={rowProces} />
        <Info rowProces={rowProces} />
      </div>
    
      {show &&
          <GrupaRow rowProces={rowProces} />}
    </>
  );
};


const GrupaRow = ({ rowProces }) => {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const [show, setShow] = useState(true);
  return (
    <>


      {show &&
        grupaWykonan
          .filter((f) => f.proces_id == rowProces.id)
          .map((row, i) =>
            <div>
<div> {row.nazwa}  </div>

             
{show &&
        wykonania
          .filter((f) => f.id == row.id)
          .map((row, i) =>
           
<div> {row.nazwa}  </div>

             
          
            
            )}



             </div>)}
    </>
  );
};



const Rozwin = ({  rowProces,show, setShow }) => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  // if  (procesyElementowTech
  // .filter((f) => f.proces_id == rowProces.id).length !== 0){
  return (
    <div className={style.expand_contener}>
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









const WykonaniaTechTable2 = () => {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const [showMenu, setShowMenu] = useState(false);
  const [showLegi, setShowLegi] = useState(true);

  return (
    <div className={style.table_legi}>
      <MenuArkusze showMenu={showMenu} setShowMenu={setShowMenu} />
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.expand}>
              <img
                className={style.icon}
                src={logoExpand}
                onClick={() => {
                  setShowLegi(!showLegi);
                }}
                alt="Procesy"
              />
            </th>
            <th className={style.th_checkbox}>
              <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu} />
            </th>
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Proces</th>
            <th className={style.col_typ}>Rodzaj</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_uwagi}>Ilość leg</th>
            <th className={style.col_uwagi}>Uwagi</th>
            <th className={style.col_uwagi}>Narząd</th>
            <th className={style.col_uwagi}>akr/h</th>
           
            <th className={style.col_doda3j}></th>
            <th className={style.col_doda3j}></th>
          </tr>
        </thead>
        <tbody
          onClick={() => {
            setShowMenu(false);
          }}
        >
          {grupaWykonan
            // .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return (
                <RowGrupa
                  key={row.indeks+"x"}
                  i={i}
                  row={row}
                  showLegi={showLegi}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

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