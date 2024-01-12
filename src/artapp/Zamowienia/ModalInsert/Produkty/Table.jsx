// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./Table.module.css";
import { _papiery,_typ_produktu } from "../api"

// import ProduktTableHeader from "./ProduktTableHeader"



export default function Table({produkty}) {
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
            <th className={style.col4}>Nazwa</th>
            <th className={style.col5}>Wersja</th>
            <th className={style.col6}>Ilość stron</th>
            <th className={style.col7}>Netto X</th>
            <th className={style.col8}>Netto Y</th>
            <th className={style.col9}>Oprawa</th>
            <th className={style.col10}>Nakład</th>

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
                                            <td>{row.typ}</td>
                                            <td>{row.tytul}</td>
                                            <td>{row.wersja}</td>
                                            {/* <td><input defaultValue={row.naklad} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>setInfo(e.target.value)}></input></td> */}
                                            <td>{row.ilosc_stron}</td>
                                
                                            <td>{row.format_x}</td>
                                            <td>{row.format_y}</td>
                                            <td>{row.oprawa}</td>
                                            <td>{row.naklad}</td>
                             
                                           {/* <td><button onClick={()=> setInfo("OK")}>OK</button></td> */}
                                      
                                    </tr>
                                );
                                })}
    
        </tbody>
</table>

   
      </div>
      {/* <CardCenter
        card={card}
        setElementy={setElementy}
        handleChangeCardElementy={handleChangeCardElementy}
        selected_papier={selected_papier}
        setSelected_papier={setSelected_papier}
      /> */}

    </div>
  );
}
function Typ({
  row,
  handleChangeCardElementy,
  listaPapierow,
  setListaGramatur,
  listaGramatur,
  listaDostepnychWykonczen,
  setListaDostepnychWykonczen,
  listaDostepnychGramatur,
  setListaDostepnychGrmatur,
}) {
  return (
    <td>
      <select
        //  listaPapierow pobierana po otwarciu okienka dodaj zmamowienie ModalInsert
        //  po wybraniu papieru filtruje się lista gramatur i czeka do wybrania z osobnym selecie
        //  jednocześnie aktualizuje się papier_id w odpowiednim row w stanie elementów
        // następnie wybieramy gramaturę, która aktualizuje gramatura_id w odpowiednim row
        className={style.select}
        defaultValue={row.papier_id}
        onChange={(e) => {
          setListaDostepnychGrmatur(
            listaGramatur.filter((wyk) => wyk.papier_id == e.target.value)
          );
          handleChangeCardElementy({
            ...row,
            papier_id: e.target.value,
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