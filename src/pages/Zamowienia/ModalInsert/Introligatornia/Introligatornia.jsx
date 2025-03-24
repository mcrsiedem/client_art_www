import style from "./Introligatornia.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import logoExpand from "../../../../assets/expand.svg";
import { _typ_elementu } from "utils/initialvalue";
import { useState } from "react";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import iconTable from "../../../../assets/settings.svg";
import iconUstawienia from "../../../../assets/settings.svg";
import OprawaElementyStage from "./OprawaElementyStage/OprawaElementyStage";
import axios from "axios";

import { IP } from "../../../../utils/Host";
import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";

export default function IntroligatorniaTable({
  handleChangeCardProdukty,
  handleChangeCardOprawa,
  handleChangeCardFragmenty,
  handleChangeCardFragmentyOprawaId,
}) {
  const [oprawa_row, setOprawa_row] = useState();
  const [showOprawaElementyStage, setShowOprawaElementyStage] = useState(false);
  const [expand, setExpand] = useState(true);

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

  function handleDragStart(id) {
    //   e.preventDefault();
    sessionStorage.setItem("id_element_drag", id);
    sessionStorage.setItem("typ_drag", "fragment");
  }

  return (
    <div className={style.container}>
      <div className={style.oprawa}>
        <p>Oprawa</p>
        {/* <Header  /> */}
        <OprawaTable
          handleChangeCardProdukty={handleChangeCardProdukty}
          handleDragStart={handleDragStart}
          handleChangeCardFragmentyOprawaId={handleChangeCardFragmentyOprawaId}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleChangeCardOprawa={handleChangeCardOprawa}
          expand={expand}
          setExpand={setExpand}
          handleChangeCardFragmenty={handleChangeCardFragmenty}
          setShowOprawaElementyStage={setShowOprawaElementyStage}
          oprawa_row={oprawa_row}
          setOprawa_row={setOprawa_row}
        />
        {showOprawaElementyStage && (
          <OprawaElementyStage
            showOprawaElementyStage={showOprawaElementyStage}
            setShowOprawaElementyStage={setShowOprawaElementyStage}
            oprawa_row={oprawa_row}
          />
        )}
      </div>
    </div>
  );
}

function OprawaTable({
  handleChangeCardProdukty,
  handleDragStart,
  handleChangeCardFragmentyOprawaId,
  handleDrop,
  handleDragOver,
  handleChangeCardOprawa,
  expand,
  setExpand,
  handleChangeCardFragmenty,
  setShowOprawaElementyStage,
  oprawa_row,
  setOprawa_row,
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const fragmenty = contextModalInsert.fragmenty;
  const lockDragDrop = contextModalInsert.lockDragDrop;
  const setFragmenty = contextModalInsert.setFragmenty;
  const elementy = contextModalInsert.elementy;
  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;

  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead className={style.glowka}>
          <tr>
            <th className={style.col7}></th>
            <th className={style.col3}>#</th>
            <th className={style.col4}>Oprawa</th>
            <th className={style.col4}>Str</th>
            <th className={style.col4}>Wersja</th>
            <th className={style.col4}>Naklad</th>
            <th className={style.col4}>Bok oprawy</th>
            <th className={style.col6}>Czystodruki</th>
            <th className={style.col6}>Data spedycji</th>
            <th className={style.col7}>Uwagi</th>
            <th className={style.col7}></th>
            <th className={style.col7}></th>
            {/* <th className={style.col7}></th> */}
          </tr>
        </thead>
        <tbody>
          {oprawa
           .filter((x) => x.delete != true)
          .map((row) => {
            return (
              <>
                <tr
                  key={row.id}
                  onDrop={() => handleDrop(row.id)}
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

                  <RodzajOprawy row={row} />
                  <td></td>

                  <WersjaOprawa row={row} />
                  <NakladOprawa row={row} />
                  <BokOprawy row={row} />

                  <DataCzystodrukow row={row} />
                  <DataSpedycji row={row} />

                  <UwagiOprawa row={row} />

                  <Usun row={row} handleRemoveItem={handleRemoveItem} />
                  <DodajOprawe
                    row={row}
                    oprawa={oprawa}
                    setOprawa={setOprawa}
                  />
                  {/* <PodzielOprawe setShowOprawaElementyStage={setShowOprawaElementyStage}  row={row} oprawa_row={oprawa_row} setOprawa_row={setOprawa_row}  /> */}
                </tr>
                {expand ? (
                  fragmenty
                    .filter((el) => el.oprawa_id === row.id)
                    .filter((x) => x.delete != true)
                    .map((row) => {
                      return (
                        <tr
                          draggable={lockDragDrop}
                          onDragStart={() => handleDragStart(row.id)}
                          key={row.id}
                        >
                          <td></td>

                          <td></td>
                          <Typ row={row} />
                          <td>{row.ilosc_stron} </td>
                          <WersjaOprawaFragment
                            row={row}
                            handleChangeCardFragmenty={
                              handleChangeCardFragmenty
                            }
                          />

                          <NakladOprawaFregment
                            row={row}
                            handleChangeCardFragmenty={
                              handleChangeCardFragmenty
                            }
                          />

                          <td></td>
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
    </div>
  );
}

function Header() {
  return <div className={style.header}> Introligatornia</div>;
}

function DataSpedycji({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;

  return (
    <td className={style.col}>
      <input
        className={style.input}
        type="date"
        value={row.data_spedycji}
        onChange={(event) => {
          handleUpdateRowOprawa({ ...row, data_spedycji: event.target.value, update:true });
        }}
      ></input>
    </td>
  );
}
function DataCzystodrukow({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  return (
    <td className={style.col}>
      <input
        className={style.input}
        type="date"
        value={row.data_czystodrukow}
        onChange={(event) => {
          handleUpdateRowOprawa({
            ...row,
            data_czystodrukow: event.target.value,
            update:true
          });
        }}
      ></input>
    </td>
  );
}

function RodzajOprawy({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  const setProdukty = contextModalInsert.setProdukty;
  const contextApp = useContext(AppContext);

  return (
    <td>
      <select
        className={style.select}
        value={row.oprawa}
        onChange={(event) => {
          handleUpdateRowOprawa({ ...row, oprawa: event.target.value,update:true });

          if (row.indeks == 0) {
            setProdukty(
              produkty.map((p) => {
                if (p.id === row.produkt_id) {
                  return { ...p, oprawa: event.target.value,update:true };
                } else {
                  return p;
                }
              })
            );
          }
        }}
      >
        {contextApp.procesList?.filter(x=>x.nazwa_id==6).map((option) => (
          <option key={option.id} value={option.id}>
            {option.typ} {option.rodzaj} 
       
          </option>
        ))}
      </select>
    </td>
  );
}

function DodajOprawe({ row, oprawa, setOprawa }) {
  return (
    <td className={style.col_button}>
      <img
        className={style.expand}
        src={iconCopy}
        onClick={() => {
          handleAddRowOprawa(row, oprawa, setOprawa);
        }}
        alt="Procesy"
      />
    </td>
  );
}

function Usun({ row, handleRemoveItem }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;

  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;

  return (
    <td className={style.col_button}>
      <div>
        <img
          className={style.expand}
          src={iconTrash}
          onClick={() => {
            handleRemoveItem(
              row.indeks,
              row.id,
              oprawa,
              setOprawa,
              fragmenty,
              setFragmenty
            );
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}

function PodzielOprawe({
  row,
  handleChangeCardOprawa,
  handleAddCard,
  setShowOprawaElementyStage,
  oprawa_row,
  setOprawa_row,
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const oprawa = contextModalInsert.oprawa;
  const setOprawa = contextModalInsert.setOprawa;
  return (
    <td className={style.col_button}>
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
// function PokazElementy({ setShowOprawaElementyStage  }) {
//   return (
//     <td className={style.col_button}>
//       <div >
//       <img
//             className={style.pokaz_elementy_oprawy}
//             src={iconUstawienia}
//             onClick={() => {
//               setShowOprawaElementyStage(true);
//             }}
//             alt="Procesy"
//           />
//       </div>

//     </td>
//   );
// }

const handleRemoveItem = (
  indeks,
  id,
  oprawa,
  setOprawa,
  fragmenty,
  setFragmenty
) => {
  // kasowanie oprawy?
  // id = id elementu
  if (oprawa.filter((x) => x.delete != true).length !== 1) {

      setOprawa((prev) =>
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


  setFragmenty((prev) =>
    prev.map((t, a) => {
      if (t.oprawa_id == id) {
        return {
          ...t,
          oprawa_id: 1,
          update: true
        };
      } else {
        return t;
      }
    })
  );



  }





  // setOprawa((prev) =>
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

function handleAddRowOprawa(card, oprawa, setOprawa) {
  const newOprawa = JSON.parse(JSON.stringify(oprawa));

  newOprawa.push({
    id: Math.max(...newOprawa.map((f) => f.id)) + 1,
    zamowienie_id: card.zamowienie_id,
    produkt_id: card.produkt_id,
    oprawa: card.oprawa,
    bok_oprawy: card.bok_oprawy,
    wersja: card.wersja,
    naklad: 1,
    indeks: Math.max(...newOprawa.map((f) => f.indeks)) + 1,
    uwagi: card.uwagi,
    data_spedycji: card.data_spedycji,
    data_czystodrukow: card.data_czystodrukow,
    indeks: card.indeks + 1,
    insert: true
  });

  setOprawa(newOprawa);
}

function Typ({ row }) {
  return (
    <td>
      <select className={style.select} value={row.typ} disabled>
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

function WersjaOprawaFragment({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowFragmenty = contextModalInsert.handleUpdateRowFragmenty;
  return (
    <td>
      <input
        className={style.input}
        value={row.wersja}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowFragmenty({
              ...row,
              wersja: e.target.value,
              update:true
            });
          }
        }}
      ></input>
    </td>
  );
}

function NakladOprawaFregment({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowFragmenty = contextModalInsert.handleUpdateRowFragmenty;
  return (
    <td>
      <input
        className={style.input}
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowFragmenty({
              ...row,
              naklad: e.target.value,
              update:true
            });
          }
        }}
      ></input>
    </td>
  );
}
function IloscStronFragment({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowFragmenty = contextModalInsert.handleUpdateRowFragmenty;
  return (
    <td>
      <input
        value={row.naklad}
        onChange={(e) =>
          handleUpdateRowFragmenty({
            ...row,
            naklad: e.target.value,
            update:true
          })
        }
      ></input>
    </td>
  );
}

function WersjaOprawa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  return (
    <td>
      <input
        className={style.input}
        value={row.wersja}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowOprawa({
              ...row,
              wersja: e.target.value,
              update:true
            });
          }
        }}
      ></input>
    </td>
  );
}

function BokOprawy({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  return (
    <td>
      <input
        className={style.input}
        value={row.bok_oprawy}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowOprawa({
              ...row,
              bok_oprawy: e.target.value,
              update:true
            });
          }
        }}
      ></input>
    </td>
  );
}

function UwagiOprawa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  return (
    <td>
      <input
        className={style.input}
        value={row.uwagi}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowOprawa({
              ...row,
              uwagi: e.target.value,
              update:true
            });
          }
        }}
      ></input>
    </td>
  );
}

function NakladOprawa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  return (
    <td>
      <input
        className={style.input}
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowOprawa({
              ...row,
              naklad:  ifNoTextSetNull(e.target.value) ,
              update:true
            });
          }
        }}
      ></input>
    </td>
  );
}
