import style from "./IntroligatorniaTable.module.css";
import { useContext, useState } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { _typ_elementu } from "utils/initialvalue";
import { reg_int } from "utils/initialvalue";
import MenuIntroligatornia from "./IntroligatorniaMenu";
import iconSettings from "assets/settings.svg";
export default function IntroligatorniaTable() {
  const techContext = useContext(TechnologyContext);
  const oprawaTech = techContext.oprawaTech;

  return (
    <div className={style.container}>
      {oprawaTech.map((row) => (
        <OprawaRow row={row} />
      ))}
    </div>
  );
}





const OprawaRow = ({ row }) => {
  const [showMenu, setShowMenu] = useState(false);
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
            return { ...p, oprawa_id: id };
          } else {
            return p;
          }
        })
      );
      // console.log("typ_drag: "+sessionStorage.getItem("typ_drag"))
      // console.log("id_element_drag: "+sessionStorage.getItem("id_element_drag"))
      // console.log("id_drop_oprawa: "+sessionStorage.getItem("id_drop_oprawa"))
      // handleChangeCardFragmentyOprawaId(id_drag_element, id_drop_oprawa);
      // console.log("drop :", id)
    }

    //   setLegi(
    //     legi.map((t, a) => {

    //     if (t.id === dragLegaId) {
    //       return {
    //         ...t,
    //         arkusz_id: id

    //       };
    //     } else {
    //       return t;
    //     }
    //   })
    // );
    //   console.log("drop: "+id)
    //   setDropArkuszId(id)
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
           console.log("X: " +e.clientX +" Y: " +e.clientY);
          // setShowMenu(true)
        }}
      >
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

      {legiFragmenty
        .filter((f) => f.oprawa_id == row.id)
        .map((row, i) => (
          <LegaFragmentRow
            row={row}
            i={i}
            draggable
            onDragStart={() => handleDragStart(row.id)}
          />
        ))}
    </>
  );
};

const LegaFragmentRow = ({ row, i }) => {
  return (
    <tr key={row.id}>
      <td>{i}</td>
      <td className={style.typ_elementu}>
        {" "}
        {_typ_elementu.filter((x) => x.id == row.typ)[0]?.nazwa}{" "}
        {row.element_id}
      </td>

      {/* row.indeks */}
      {/* <td>{row.oprawa_id}</td> */}
      <td>{row.naklad}</td>
      {/* <td>{row.element_id}</td> */}
      <td>idx {row.indeks}</td>
      <td></td>
    </tr>
  );
};

const MenuBtn = ({ row, showMenu, setShowMenu }) => {
  return (
    <div className={style.menu_introligatornia}>
      <img
        className={style.iconMenuBtn}
        src={iconSettings}
        onClick={() => {
          setShowMenu(!showMenu);
          // dodaj_clikHandler();
          // console.log("z contextu :"+ token.rowSelected)
          //  sessionStorage.setItem("us",{id:1,imie:"Maciek"})
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

function RodzajOprawy({ row, handleChangeCardOprawa }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const setProdukty = contextModalInsert.setProdukty;
  const contextApp = useContext(AppContext);

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Oprawa </label>
      <select
        className={style.select}
        defaultValue={row.oprawa}
        onChange={(event) => {
          handleChangeCardOprawa({ ...row, oprawa: event.target.value });

          if (row.indeks == 0) {
            setProdukty(
              produkty.map((p) => {
                if (p.id === row.produkt_id) {
                  return { ...p, oprawa: event.target.value };
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
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            updateRowOprawaTech({
              ...row,
              wersja: e.target.value,
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
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            updateRowOprawaTech({
              ...row,
              uwagi: e.target.value,
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
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            updateRowOprawaTech({
              ...row,
              bok_oprawy: e.target.value,
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
          });
        }}
      ></input>
    </div>
  );
};
