import style from "./Produkty.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
// import { _papiery, _typ_produktu,_rodzaj_oprawy} from "../api";
import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";

export default function Produkty( ) {
  return (
      <div className={style.container}>
            <div className={style.produkt}>
              {/* <ProduktyTableHeader /> */}
    
              <p>Produkt</p>
         
              <ProduktyTable2   />
           
            </div>
    </div>
  );
}

//--------------------------



function ProduktyTableHeader() {
  return <div className={style.header}>Produkt</div>;
}


function ProduktyTable2() {
  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
  return <div className={style.main2}>
    

          <div className={style.row1}>

                  <Typ2 row={produkty[0]} />
                  <Naklad2 row={produkty[0]} />
                  <RodzajOprawy row={produkty[0]} />
                  <Nazwa2 row={produkty[0]} />
                  <td>{produkty[0].ilosc_stron}</td>
                  <td>{produkty[0].format_x}</td>
                  <td>{produkty[0].format_y}</td>
                  <Uwagi2 row={produkty[0]} />
           
   
          </div>
     
      </div>

}





function Typ2({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const contextApp = useContext(AppContext);

  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <div className={style.col_dane}>
       <label className={style.label}> Typ </label>
      <select
        className={style.select}
        defaultValue={row.typ}
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

function Nazwa2({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <div>
      <input
        className={style.in}
        value={row.nazwa}
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

function Naklad2({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  
    return (
      <div className={style.col_dane}>
        <label className={style.label}> Nakład </label>
        <input
          className={style.in}
          value={row.naklad}
          onChange={(e) =>{     
  
            // const re = /^[0-9]+$/;
            if (e.target.value === '' || reg_int.test(e.target.value)) {
             handleUpdateRowProdukty({
                  ...row,
                  naklad: e.target.value,
                })
            }
              
              }
          
  
          }
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
<label className={style.label}> Typ </label>
      <select
        disabled
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
    </div>
  );
}

function Uwagi({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <td>
      <input
        className={style.in}
        value={row.uwagi}
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
    </td>
  );
}

function Uwagi2({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <div>
      <input
        className={style.in}
        value={row.uwagi}
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