// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./Table.module.css";
import { _papiery,_typ_produktu } from "../api"

// import ProduktTableHeader from "./ProduktTableHeader"



export default function Table({produkty,handleChangeCardProdukty}) {
  return (
    <div className={style.produkt}>
        
      <ProduktTableHeader
        // card={card}
        // elementy={elementy}
        // setElementy={setElementy}
        // fragmenty={fragmenty}
        // setFragmenty={setFragmenty}
      />

      <div className={style.main}>
  
<table className={style.table}>
<thead>
          <tr >
            <th className={style.col1}>Zam.</th>
   
            <th className={style.col2}>#</th>
            <th className={style.col3}>Typ</th>
            <th className={style.col10}>Nakład</th>
            <th className={style.col9}>Oprawa</th>
            <th className={style.col4}>Nazwa</th>
            {/* <th className={style.col5}>Wersja</th> */}
            <th className={style.col6}>Ilość stron</th>
            <th className={style.col7}>Netto X</th>
            <th className={style.col8}>Netto Y</th>
            <th className={style.col8}>Uwagi</th>

          </tr>

        </thead>
        <tbody>

        {produkty.map((row) => {
                                return (
                                    <tr
                                    key={row.id}
                                    // onDoubleClick={(node, event) => {
                               
                                    //     setOpenModal(true);
                                    //     setRow({ id: row.id, user: row.user });
                                    // }}
                                    >
                                            <td>{row.zamowienie_id}</td>
                            
                                            <td>{row.id}</td>
                                            <Typ row={row} handleChangeCardProdukty={handleChangeCardProdukty}/>
                                            <td>{row.naklad}</td>
                                            <td>{row.oprawa}</td>
                                 
                                            <Nazwa row={row} handleChangeCardProdukty={handleChangeCardProdukty}/>
                                            {/* <Wersja row={row} handleChangeCardProdukty={handleChangeCardProdukty}/> */}
                                   
                                            {/* <td><input defaultValue={row.naklad} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>setInfo(e.target.value)}></input></td> */}
                                            <td>{row.ilosc_stron}</td>
                                
                                            <td>{row.format_x}</td>
                                            <td>{row.format_y}</td>
                                            <Uwagi row={row} handleChangeCardProdukty={handleChangeCardProdukty}/>
                             
                                           {/* <td><button onClick={()=> setInfo("OK")}>OK</button></td> */}
                                      
                                    </tr>
                                );
                                })}
    
        </tbody>
</table>

   
      </div>

    </div>
  );
}
function Typ({ row, handleChangeCardProdukty }) {
  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.typ}
        onChange={(e) => {
          handleChangeCardProdukty({
            ...row,
            typ: e.target.value,
          });
        }}
      >
        {}
        {_typ_produktu.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
}

function Nazwa({ row, handleChangeCardProdukty }) {
  return (
    <td>
      <input
      className={style.in}
        defaultValue={row.nazwa}
        onChange={(e) =>
          handleChangeCardProdukty({
            ...row,
            nazwa: e.target.value,
          })
        }
      ></input>
    </td>
  );
}
function Uwagi({ row, handleChangeCardProdukty }) {
  return (
    <td>
      <input
      className={style.in}
        defaultValue={row.uwagi}
        onChange={(e) =>
          handleChangeCardProdukty({
            ...row,
            uwagi: e.target.value,
          })
        }
      ></input>
    </td>
  );
}
function Wersja({ row, handleChangeCardProdukty }) {
  return (
    <td>
      <input
      className={style.in}
        defaultValue={row.wersja}
        onChange={(e) =>
          handleChangeCardProdukty({
            ...row,
            wersja: e.target.value,
          })
        }
      ></input>
    </td>
  );
}
function ProduktTableHeader({ card, elementy, setElementy, fragmenty, setFragmenty }) {
    const handleRemoveItem = (index) => {
      if (elementy.length !== 1) {
        setElementy(elementy.filter((x) => x.index !== index));
      }
  
      setElementy((prev) =>
        prev.map((t, a) => {
          if (t.index > index) {
            return {
              ...t,
              index: t.index--,
            };
          } else {
            return t;
          }
        })
      );
    };
  
  
                    return (
                      <div className={style.header}>
                        <div className={style.typ}>
                          {/* <img
                            onClick={() => {
                              handleRemoveItem(card.index);
                            }}
                            className={style.icon}
                            src={iconTrash}
                            alt="delete"
                          /> */}
                        </div>
  
                        <div className={style.typ}>
                          {" "}
                          {/* # {card.id} {card.typ} {card.naklad} szt. Prod{card.produkt_id}{" "} */}
                        </div>
                        <div className={style.typ}>
                          {/* <img
                            onClick={() => handleAddCard(card)}
                            className={style.icon}
                            src={iconCopy}
                            alt="add"
                          /> */}
                        </div>
                      </div>
                    );
  
  
    // function handleAddCard(card) {
    //   const newElementy = elementy.slice();
  
    //   newElementy.map((x) => {
    //     if (x.index > card.index) {
    //       return {
    //         ...x,
    //         //     index: x.index++,
    //       };
    //     } else {
    //       return x;
    //     }
    //   });
  
    //   newElementy.push({
    //     id: Math.max(...elementy.map((f) => f.id)) + 1,
    //     zamowienie_id: card.zamowienie_id,
    //     produkt_id: card.produkt_id,
    //     naklad: card.naklad,
    //     index: Math.max(...newElementy.map((f) => f.index)) + 1,
    //   });
  
    //   newElementy.sort((a, b) => a.index - b.index);
    //   setElementy(newElementy);
    //   // setElementy((prev) =>prev.map((t)=> {return t}));
  
    //   //-------------------
    //   const newFragmenty = fragmenty.slice();
  
    //   newFragmenty.map((x) => {
    //     if (x.index > card.index) {
    //       return {
    //         ...x,
    //         //     index: x.index++,
    //       };
    //     } else {
    //       return x;
    //     }
    //   });
  
    //   //let nextId = Math.max(...fragmenty.map(f=>f.id));
  
    //   newFragmenty.push({
    //     id: Math.max(...fragmenty.map((f) => f.id)) + 1,
    //     zamowienie_id: card.zamowienie_id,
    //     produkt_id: card.produkt_id,
    //     naklad: card.naklad,
    //     element_id: Math.max(...elementy.map((f) => f.id)) + 1,
    //     index: Math.max(...newFragmenty.map((f) => f.index)) + 1,
    //   });
  
    //   newFragmenty.sort((a, b) => a.index - b.index);
    //   setFragmenty(newFragmenty);
    // }
  }