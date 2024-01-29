
import style from "./Introligatornia.module.css";
import logoExpand from "../../../../svg/expand.svg";
import { _rodzaj_oprawy,_typ_elementu } from "../api";
import {  useState } from "react";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
import iconUstawienia from "../../../../svg/settings.svg";

export default function IntroligatorniaTable({
  oprawa,
  setOprawa,
  fragmenty,
  setFragmenty,
  handleChangeCardOprawa,
  handleChangeCardFragmenty,
  setShowOprawaElementyStage
}) {

  const [expand,setExpand] =useState(true);

  return (
    <div className={style.container}>
      <div className={style.oprawa}>
         <Header  />
      <OprawaTable oprawa={oprawa} setOprawa={setOprawa} handleChangeCardOprawa={handleChangeCardOprawa} fragmenty={fragmenty} expand={expand} setExpand={setExpand} handleChangeCardFragmenty={handleChangeCardFragmenty } setShowOprawaElementyStage={setShowOprawaElementyStage}/>
</div>
     

    </div>
  );
}

function OprawaTable({oprawa, setOprawa,handleChangeCardOprawa, fragmenty, expand, setExpand,handleChangeCardFragmenty,setShowOprawaElementyStage}){
  return (  <div className={style.main}>
  <table className={style.table}>
    <thead>
      <tr>
      <th className={style.col7}>

      </th>
        {/* <th className={style.col1}>Zam.</th> */}
        {/* <th className={style.col2}>Prod.</th> */}
        <th className={style.col3}>#</th>
        <th className={style.col7}></th>
        <th className={style.col4}>Oprawa</th>
        <th className={style.col4}>Wersja</th>
        <th className={style.col4}>Naklad</th>
        <th className={style.col4}>Bok oprawy</th>

        <th className={style.col6}>Data spedycji</th>
        <th className={style.col7}>Uwagi</th>
       
        <th className={style.col7}></th>
        <th className={style.col7}></th>
        
      

      </tr>
    </thead>
    <tbody>
      {oprawa.map((row) => {
        return (
          <>
            <tr key={row.id}>
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
              <PokazElementy setShowOprawaElementyStage={setShowOprawaElementyStage}/>    
              <RodzajOprawy
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />


<WersjaOprawa
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />
                  <NakladOprawa
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />
              <BokOprawy
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />

              <DataSpedycji
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />

              {/* <td>{row.data_spedycji}</td> */}

              <UwagiOprawa
                row={row}
                handleChangeCardOprawa={handleChangeCardOprawa}
              />

                
              <Usun oprawa={oprawa} setOprawa={setOprawa} row={row} handleRemoveItem={handleRemoveItem}/>
              <DodajOprawe oprawa={oprawa} setOprawa={setOprawa} row={row} />
            </tr>
            {expand ? (
              fragmenty
                .filter((el) => el.oprawa_id === row.id)
                .map((row) => {
                  return (
                    <tr key={row.id}>
      
                      <td></td>
<td></td>
                      <td></td>
                      <Typ row={row} />

                      <WersjaOprawaFragment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      />

                      <NakladOprawaFregment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      />
                      <td> </td>
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
</div>)

}

function Header() {
  return <div className={style.header}> Oprawa</div>;
}

function DataSpedycji({row,handleChangeCardOprawa}){
  return(
      <div className={style.col}>
      <input className={style.data} type="date"
      defaultValue={row.data_spedycji}
      onChange={(event) => {
        handleChangeCardOprawa({...row, data_spedycji: event.target.value});
      }}></input>
    </div>
  );
}

function RodzajOprawy({ row,handleChangeCardOprawa }) {
  return (
    <div className={style.select}>

      <select
        className={style.firma}
        defaultValue={row.id}
        onChange={(event) => {
          handleChangeCardOprawa({...row, oprawa: event.target.value});
        }}
      >
        {_rodzaj_oprawy.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}

function DodajOprawe({ row, handleChangeCardOprawa ,handleAddCard,oprawa,setOprawa}) {
  return (
    <td className={style.col_button} >
            <img
         className={style.expand}
          src={iconCopy}
          onClick={() => {handleAddRowOprawa(row,oprawa,setOprawa)}}
          alt="Procesy"
        />
    </td>
  );
}

function Usun({ row, handleChangeCardOprawa ,handleRemoveItem,oprawa,setOprawa }) {
  return (
    <td className={style.col_button}>
      <div >
                      <img
         className={style.expand}
          src={iconTrash}
          onClick={() => {handleRemoveItem(row.index, row.id,oprawa,setOprawa)}}
          alt="Procesy"
        />
      </div>

    </td>
  );
}
function PokazElementy({ setShowOprawaElementyStage  }) {
  return (
    <td className={style.col_button}>
      <div >
      <img
            className={style.pokaz_elementy_oprawy}
            src={iconUstawienia}
            onClick={() => {
              setShowOprawaElementyStage(true);
            }}
            alt="Procesy"
          />
      </div>

    </td>
  );
}

const handleRemoveItem = (index,id,oprawa,setOprawa) => {
  // id = id elementu
  if (oprawa.length !== 1) {
    setOprawa(oprawa.filter((x) => x.index !== index));

  }

  setOprawa((prev) =>
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

function handleAddRowOprawa(card,oprawa,setOprawa) {
  const newOprawa = oprawa.slice();

  newOprawa.map((x) => {
    if (x.index > card.index) {
      return {
        ...x,
        //     index: x.index++,
      };
    } else {
      return x;
    }
  });

  newOprawa.push({
    id: Math.max(...newOprawa.map((f) => f.id)) + 1,
    zamowienie_id: card.zamowienie_id,
    produkt_id: card.produkt_id,
    oprawa: card.oprawa,
    bok_oprawy: card.bok_oprawy,

    naklad: 0,
    index: Math.max(...newOprawa.map((f) => f.index)) + 1,
    uwagi: card.uwagi,
    data_spedycji: card.data_spedycji,
  
  });

  newOprawa.sort((a, b) => a.index - b.index);
  setOprawa(newOprawa);

  // const newFragmenty = fragmenty.slice();

  // newFragmenty.map((x) => {
  //   if (x.index > card.index) {
  //     return {
  //       ...x,

  //     };
  //   } else {
  //     return x;
  //   }
  // });


  // newFragmenty.push({
  //   id: Math.max(...fragmenty.map((f) => f.id)) + 1,
  //   zamowienie_id: card.zamowienie_id,
  //   produkt_id: card.produkt_id,
  //   naklad: card.naklad,
  //   element_id: Math.max(...elementy.map((f) => f.id)) + 1,
  //   index: Math.max(...newFragmenty.map((f) => f.index)) + 1,
  // });

  // newFragmenty.sort((a, b) => a.index - b.index);
  // setFragmenty(newFragmenty);
}

function Typ({ row }) {
  return (
    <td>
      <select
        className={style.select}
        value={row.typ}
        disabled
      >
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


function  WersjaOprawaFragment({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input 
        value={row.wersja}
        onChange={(e) =>
          handleChangeCardFragmenty({
            ...row,
            wersja: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function  NakladOprawaFregment({ row, handleChangeCardFragmenty }) {
  return (
    <td>
      <input
        value={row.naklad}
        onChange={(e) =>
          handleChangeCardFragmenty({
            ...row,
            naklad: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function  WersjaOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        value={row.wersja}
        onChange={(e) =>
          handleChangeCardOprawa({
            ...row,
            wersja: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function  BokOprawy({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        value={row.bok_oprawy}
        onChange={(e) =>
          handleChangeCardOprawa({
            ...row,
            bok_oprawy: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function  UwagiOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        value={row.uwagi}
        onChange={(e) =>
          handleChangeCardOprawa({
            ...row,
            uwagi: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function  NakladOprawa({ row, handleChangeCardOprawa }) {
  return (
    <td>
      <input 
        defaultValue={row.naklad}
        onChange={(e) =>
          handleChangeCardOprawa({
            ...row,
            maklad: e.target.value,
          })
        }
      ></input>
    </td>
  );
}