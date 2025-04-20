import style from "./IntroligatorniaTable.module.css";
import { useContext, useState } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { _typ_elementu, reg_cena, reg_txt } from "utils/initialvalue";
import { reg_int } from "utils/initialvalue";
import MenuIntroligatornia from "./IntroligatorniaMenu";
import iconSettings from "assets/settings.svg";
import logoExpand from "assets/expand.svg";
export default function IntroligatorniaTable() {
  const techContext = useContext(TechnologyContext);
  const oprawaTech = techContext.oprawaTech;

  return (
    <div className={style.container}>
      {oprawaTech.map((row) => (
        <OprawaRow key={row.id} row={row} />
      ))}
    </div>
  );
}





const OprawaRow = ({ row }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(true);
  // row to jest
  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;

  function handleDragStart(id) {
    //   e.preventDefault();
    // setDragLegaId(id)
  }
  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "element") {
      let id_drag_element = sessionStorage.getItem("id_element_drag");
      let id_drop_oprawa = id;

      setLegiFragmenty(
        legiFragmenty.map((p) => {
          if (p.element_id == id_drag_element) {
            return { ...p, oprawa_id: id ,update: true};
          } else {
            return p;
          }
        })
      );

    }

    if (sessionStorage.getItem("typ_drag") == "fragmentlegi") {
      let id_drag_element = sessionStorage.getItem("id_fragment_legi_drag");


      setLegiFragmenty(
        legiFragmenty.map((p) => {
          if (p.id == id_drag_element) {
            return { ...p, oprawa_id: id,update: true };
          } else {
            return p;
          }
        })
      );

    }



  }

  function handleDragOver(e) {
    e.preventDefault();
  
  }
  return (
    <>
      <div
        className={style.row1}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(row.id)}
        onContextMenu={(e) => {
          e.preventDefault(); 
           console.log("X: " +e.clientX +" Y: " +e.clientY +" e:" );
          // setShowMenu(true)
        }}
      >
        <Rozwin row={row} show={show} setShow={setShow}/>
        <RodzajOprawy row={row} />
        <Naklad row={row} />
        <BokOprawy row={row} />
        <Wersja row={row} />
        <Uwagi row={row} />
        <DataCzystodrukow row={row} />
        <DataSpedycji row={row} />
        <MenuBtn row={row} showMenu={showMenu} setShowMenu={setShowMenu} />

        {/* <div>{row.naklad}</div> */}
      </div>
      {show && (
                  legiFragmenty
                  .filter((f) => f?.oprawa_id == row.id)
                  .filter((f) => f?.delete != true)
                  .sort((a, b) => a.indeks - b.indeks)
                  .map((row, i) => (
                    <LegaFragmentRow
                      row={row}
                      i={i}
                      // draggable
                      // onDragStart={() => handleDragStart(row.id)}
                    />


                  ))
          
        )}


    </>
  );
};

const LegaFragmentRow = ({ row, i }) => {
  const techContext = useContext(TechnologyContext);
  const setLegiFragmenty = techContext.setLegiFragmenty;
  const legiFragmenty = techContext.legiFragmenty;

  function handleDragStart(id,oprawa_id,indeks) {
    sessionStorage.setItem("id_fragment_lega_drag", id);
    sessionStorage.setItem("indeks_fragment_lega_drag", indeks);
    sessionStorage.setItem("id_oprawa_lega_drag", oprawa_id);
    sessionStorage.setItem("typ_drag", "fragment_lega");
  }
  function handleDragOver(e) {
    e.preventDefault();
  
  }

  function handleDrop(id,oprawa_id,indeks2) {
    if (sessionStorage.getItem("typ_drag") == "fragment_lega") {
      let id_drag_fragment = sessionStorage.getItem("id_fragment_lega_drag");
      let id_drag_oprawa = sessionStorage.getItem("id_oprawa_lega_drag");
      let indeks_drag_fragment = sessionStorage.getItem("indeks_fragment_lega_drag");

      let id_drop_element = id;
      let id_drop_oprawa= oprawa_id;
      let indeks_drop_fragment= indeks2;

let k= 0;
          setLegiFragmenty(
            legiFragmenty

            .map((t) => {
              if (t.indeks > indeks_drag_fragment) {
                return {...t, indeks: t.indeks -1,update: true}
              }else return t
            })

            .map((t) => {
              if (t.indeks >= indeks_drop_fragment) {
                return {...t, indeks: t.indeks +1,update: true}
              }else return t
            })

            .map((t) => {
              if (t.id == id_drag_fragment) {
                return {...t, indeks: indeks_drop_fragment,update: true}
              }else return t
            })
            .sort((a, b) => a.indeks - b.indeks)
            // .sort((a, b) => a.oprawa_id - b.oprawa_id)

            .map((frag, i) => {
              if (frag.element_id == legiFragmenty.filter(x=>x.id ==id_drag_fragment)[0].element_id  && frag.delete != true) {
                k++;
                return { ...frag,nr_legi:k, update: true };
              } else  return frag;
              
            })
          

          );
    }

  }


  return (
    <tr key={row.id} className={style.row_fragmentow}
    draggable
    onDragStart={() => handleDragStart(row.id,row.oprawa_id,row.indeks)}
    onDragOver={handleDragOver}
        onDrop={() => handleDrop(row.id,row.oprawa_id,row.indeks)}
    >
      <FRAGMENT_NR_LEGI row={row}/>
      <td style={row.select?{ width: "180px" , backgroundColor:"yellow", borderRadius:"10px",paddingTop:"5px"}:{ width: "180px",paddingTop:"5px" }}>
        {_typ_elementu.filter((x) => x.id == row.typ)[0]?.nazwa } {" "}
    {/* {row.id} */}
      </td>


      <td style={{ width: "90px" }}>{row.naklad}</td>
      {/* <td style={{ width: "200px" }}> </td> */}
      <td style={{ width: "90px" }}> {row.rodzaj_legi}</td>
      <td style={{ width: "190px" }}> {row.wersja}</td>
      
      {/* <td>idx {row.indeks}</td> */}
      {/* <td>oprawa_id {row.oprawa_id}</td> */}
      <td></td>
    </tr>
  );
};

const FRAGMENT_NR_LEGI = ({row}) =>{
  return <td>{row.typ==2 ? row.nr_legi:"-"}</td>
}

const MenuBtn = ({ row, showMenu, setShowMenu }) => {
  return (
    <div className={style.menu_introligatornia}>
      <img
        className={style.iconMenuBtn}
        src={iconSettings}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        alt="x"
      />
      <MenuIntroligatornia
        row={row}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </div>
  );
};


function Rozwin({  row,show, setShow }) {
  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  if  (legiFragmenty
  .filter((f) => f?.oprawa_id == row.id).length !== 0){
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
  );}else return <p> </p>
}

function RodzajOprawy({ row, handleChangeCardOprawa }) {
  const techContext = useContext(TechnologyContext);
  const setProduktyTech = techContext.setProduktyTech;
  const produktyTech = techContext.produktyTech;
  const updateRowOprawaTech = techContext.updateRowOprawaTech;
  const contextApp = useContext(AppContext);

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Oprawa </label>
      <select
        className={style.select}
        defaultValue={row.oprawa}
        onChange={(event) => {
          updateRowOprawaTech({ ...row, oprawa: event.target.value, update: true});

          if (row.indeks == 0) {
            setProduktyTech(
              produktyTech.map((p) => {
                if (p.id === row.produkt_id) {
                  return { ...p, oprawa: event.target.value, update: true };
                } else {
                  return p;
                }
              })
            );
          }
        }}
      >
                       {   <option value = "0"  >
             brak oprawy
            </option>}
         {contextApp.procesList?.filter(x=>x.nazwa_id==6).map((option) => (
          <option key={option.id} value={option.id}>
            {option.typ} {option.rodzaj} 
          </option>
        ))}
      </select>
    </div>
  );
}

const Naklad = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const updateRowOprawaTech = techContext.updateRowOprawaTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.input}
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            updateRowOprawaTech({
              ...row,
              naklad: e.target.value,
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};

const Wersja = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const updateRowOprawaTech = techContext.updateRowOprawaTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Wersja </label>
      <input
        className={style.input}
        value={row.wersja}
        onChange={(e) => {

          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            updateRowOprawaTech({
              ...row,
              wersja: e.target.value,
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};

const Uwagi = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const updateRowOprawaTech = techContext.updateRowOprawaTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Opis </label>
      <input
        className={style.input}
        value={row.uwagi}
        onChange={(e) => {

          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            updateRowOprawaTech({
              ...row,
              uwagi: e.target.value,
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};

const BokOprawy = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const updateRowOprawaTech = techContext.updateRowOprawaTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Bok oprawy </label>
      <input
        className={style.input}
        value={row.bok_oprawy}
        onChange={(e) => {
          if (e.target.value === "" || reg_cena.test(e.target.value)) {
            updateRowOprawaTech({
              ...row,
              bok_oprawy: e.target.value,
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};

const DataSpedycji = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const updateRowOprawaTech = techContext.updateRowOprawaTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Spedycja </label>
      <input
        className={style.select}
        type="date"
        value={row.data_spedycji}
        onChange={(e) => {
          updateRowOprawaTech({
            ...row,
            data_spedycji: e.target.value,
            update: true
          });
        }}
      ></input>
    </div>
  );
};

const DataCzystodrukow = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const updateRowOprawaTech = techContext.updateRowOprawaTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Czystodruki </label>
      <input
        className={style.select}
        type="date"
        value={row.data_czystodrukow}
        onChange={(e) => {
          updateRowOprawaTech({
            ...row,
            data_czystodrukow: e.target.value,
            update: true
          });
        }}
      ></input>
    </div>
  );
};
