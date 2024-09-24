import style from "./ProduktyTech.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
// import { _papiery, _typ_produktu,_rodzaj_oprawy} from "../api";
import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import Logo_ustawienia from "assets/settings.svg";
import Logo_ustawienia2 from "assets/refresh.png";
import ProduktyTechMenu from "./ProduktyTechMenu";

import { createArkuszeFromElemenets } from "actions/createArkuszeFromElements";

export default function ProduktyTech() {
  const contextTech = useContext(TechnologyContext);
  const input1632toElemnt = contextTech.input1632toElemnt;
  return (
    <div className={style.container}>
      <div className={style.produkt}>
        <div className={style.produkt_menu_button}>
          {/* <p>Produkt</p> */}
          <p> Druk</p>
          <div className={style.produkt_menu_button_sub}>
            <div className={style.produkt_menu_button_sub_16}>
              <p
                onClick={() => {
                  input1632toElemnt(32);
                }}
              >
                32
              </p>
            </div>
            <div className={style.produkt_menu_button_sub_16}>
              <p
                onClick={() => {
                  input1632toElemnt(16);
                }}
              >
                16
              </p>
            </div>

            <MenuProduktyBtn />
          </div>
        </div>

        <ProduktyTable2 />
      </div>
    </div>
  );
}

//--------------------------


function ProduktyTable2() {
  const contextTech = useContext(TechnologyContext);
const produktyTech = contextTech.produktyTech;
  return (
    <div className={style.main2}>
      <div className={style.row1}>
        <Typ row={produktyTech[0]} />
        <Naklad row={produktyTech[0]} />
        <Strony row={produktyTech[0]} />
        <FormatX row={produktyTech[0]} />
        <FormatY row={produktyTech[0]} />
        <Nazwa row={produktyTech[0]} />
        <RodzajOprawy row={produktyTech[0]} />
        <Uwagi row={produktyTech[0]} />
      </div>
    </div>
  );
}



const MenuProduktyBtn = ({ row, showMenu, setShowMenu }) => {
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
    <div className={style.menu_produkty}>

      <img
        className={style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Auto wszystkie arkusze + legi"
        onClick={() => {
          createArkuszeFromElemenets(
            arkusze,
            setArkusze,
            legi,
            setLegi,
            legiFragmenty,
            setLegiFragmenty,
            oprawaTech,
            setOprawaTech,
            fragmentyTech,
            setFragmentyTech,
            elementyTech,
            row, procesy, grupaWykonan, setGrupaWykonan,wykonania, setWykonania
          );
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




function Typ({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const contextApp = useContext(AppContext);

  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <div className={style.col_dane}>
       <label className={style.label}> Typ </label>
      <select
        className={style.select}
        defaultValue={row?.typ}
        onChange={(e) => {
          handleUpdateRowProdukty({
            ...row,
            typ: e.target.value,
          });
        }}
      >
        {}
        {contextApp.productType.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

function Nazwa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <div  className={style.col_dane}>
      <label className={style.label}> Nazwa </label>
      <input
        className={style.input}
        value={row?.nazwa}
        onChange={(e) =>
          {
            
            if ( e.target.value === '' || reg_txt.test(e.target.value)) {
            handleUpdateRowProdukty({
            ...row,
            nazwa: e.target.value,
          })

          }
        }
    
        }
      ></input>
    </div>
  );
}

function Naklad({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.input}
        value={row?.naklad}
        onChange={(e) => {
          // const re = /^[0-9]+$/;
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProdukty({
              ...row,
              naklad: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
}


function Strony({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Strony </label>
      <input
      disabled
        className={style.input}
        value={row?.ilosc_stron}

      ></input>
    </div>
  );
}

function FormatX({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Szer. </label>
      <input
      disabled
        className={style.input}
        value={row?.format_x}

      ></input>
    </div>
  );
}
function FormatY({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Wys. </label>
      <input
      disabled
        className={style.input}
        value={row?.format_y}

      ></input>
    </div>
  );
}



function RodzajOprawy({ row,handleChangeCardOprawa}) {
  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
const setProdukty = contextModalInsert.setProdukty;
const contextApp = useContext(AppContext);

  return (
    <div className={style.col_dane}>
<label className={style.label}> Oprawa </label>
      <select
        disabled
        className={style.select_oprawa}
        defaultValue={row?.oprawa}
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
    </div>
  );
}



function Uwagi({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <div  className={style.col_dane}>
      <label className={style.label}> Uwagi </label>
      <input
        className={style.input}
        value={row?.uwagi}
        onChange={(e) =>
          { 
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
            if ( e.target.value === '' || re.test(e.target.value)) { 
              handleUpdateRowProdukty({
            ...row,
            uwagi: e.target.value,
          })
        
        }
          }
        }
      ></input>
    </div>
  );
}











































//--------------------

function ProduktyTable() {
  const contextTech = useContext(TechnologyContext);
const produktyTech = contextTech.produktyTech;
  return <div className={style.main}>
      
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.col3}>Typ</th>
              <th className={style.col10}>Nakład</th>
              <th className={style.col9}>Oprawa</th>
              <th className={style.col4}>Nazwa</th>
              <th className={style.col6}>Strony</th>
              <th className={style.col7}>Szerokość</th>
              <th className={style.col8}>Wysokość</th>
              <th className={style.col8}>Uwagi</th>
            </tr>
          </thead>
          <tbody className={style.center}>
            {produktyTech?.map((row) => {
              return (
                <tr key={row.id}>
                  <Typ3 row={row} />
                  <Naklad3 row={row} />
                  <Oprawa3 row={row} />
                  <Nazwa3 row={row} />
                  <td>{row.ilosc_stron}</td>
                  <td>{row.format_x}</td>
                  <td>{row.format_y}</td>
                  <Uwagi3 row={row} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

}

function Typ3({ row }) {
  const contextApp = useContext(AppContext);
  const techontext = useContext(TechnologyContext);
  const updateRowProduktyTech = techontext.updateRowProduktyTech;
  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.typ}
        onChange={(e) => {
          updateRowProduktyTech({
            ...row,
            typ: e.target.value,
          });
        }}
      >
        {}
        {contextApp.productType.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
}

function Nazwa3({ row }) {
  const techontext = useContext(TechnologyContext);
  const updateRowProduktyTech = techontext.updateRowProduktyTech;
  return (
    <td>
      <input
        className={style.in}
        value={row.nazwa}
        onChange={(e) =>
          {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ.]+$/;
            if ( e.target.value === '' || re.test(e.target.value)) {
              updateRowProduktyTech({
            ...row,
            nazwa: e.target.value,
          })

          }
        }
    
        }
      ></input>
    </td>
  );
}

function Naklad3({ row }) {
  const techontext = useContext(TechnologyContext);
  const updateRowProduktyTech = techontext.updateRowProduktyTech;

  return (
    <td>
      <input
        className={style.in}
        value={row.naklad}
        onChange={(e) =>{     

           const re = /^[0-9]+$/;

          //  updateRowProduktyTech({
          //   ...row,
          //   naklad: e.target.value,
          // })

          if (e.target.value === '' || re.test(e.target.value)) {
            updateRowProduktyTech({
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

function Oprawa3({ row }) {
  const contextApp = useContext(AppContext);

  return (
    <td>
{ contextApp.bindingType.map((t) => {
        if (t.id == row.oprawa) {
          return t.nazwa;
        
        }
      })}

    </td>
  );
}
function Uwagi3({ row }) {
  const techontext = useContext(TechnologyContext);
  const updateRowProduktyTech = techontext.updateRowProduktyTech;
  return (
    <td>
      <input
        className={style.in}
        value={row.uwagi}
        onChange={(e) =>
          { 
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
            if ( e.target.value === '' || re.test(e.target.value)) { 
              updateRowProduktyTech({
            ...row,
            uwagi: e.target.value,
          })
        
        }
          }
        }
      ></input>
    </td>
  );
}
