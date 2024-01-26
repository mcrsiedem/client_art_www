
import style from "./Introligatornia.module.css";
import logoExpand from "../../../../svg/expand.svg";
import { _rodzaj_oprawy } from "../api";
import {  useState } from "react";
import iconCopy from "../../../../svg/copy.svg";

export default function IntroligatorniaTable({
  oprawa,
  setOprawa,
  fragmenty,
  setFragmenty,
  handleChangeCardOprawa,
}) {

  const [expand,setExpand] =useState(true);

  return (
    <div className={style.container}>
      <div className={style.oprawa}>
         <Header  />
      <OprawaTable oprawa={oprawa} setOprawa={setOprawa} handleChangeCardOprawa={handleChangeCardOprawa} fragmenty={fragmenty} expand={expand} setExpand={setExpand}/>
</div>
     

    </div>
  );
}

function OprawaTable({oprawa, setOprawa,handleChangeCardOprawa, fragmenty, expand, setExpand}){
  return (  <div className={style.main}>
  <table className={style.table}>
    <thead>
      <tr>
        <th className={style.col1}>Zam.</th>
        <th className={style.col2}>Prod.</th>
        <th className={style.col3}>#</th>
        <th className={style.col4}>Oprawa</th>
        <th className={style.col4}>Bok oprawy</th>
        <th className={style.col5}>Nakład</th>
        <th className={style.col6}>Data spedycji</th>
        <th className={style.col7}>Uwagi</th>
        <th className={style.col7}></th>
        <th className={style.col7}>Fragmenty</th>
      

      </tr>
    </thead>
    <tbody>
      {oprawa.map((row) => {
        return (


          
          <>
          <tr
            key={row.id}
          >
            <td>{row.zamowienie_id}</td>
            <td>{row.produkt_id}</td>
            <td>{row.id}</td>
            <RodzajOprawy row={row} handleChangeCardOprawa={handleChangeCardOprawa}/>
            <td>{row.bok_oprawy}</td>
            <td>{row.naklad}</td>
            <DataSpedycji row={row} handleChangeCardOprawa={handleChangeCardOprawa}/>

            {/* <td>{row.data_spedycji}</td> */}
          
            <td>{row.uwagi}</td>
            <DodajOprawe oprawa={oprawa} setOprawa={setOprawa} row={row}/>
            <img
    className={style.icon}
    src={logoExpand}
    onClick={() => {setExpand(!expand)}}
    alt="Procesy"
  />

          </tr>
            {expand ? fragmenty
            .filter((el) => el.oprawa_id === row.id)
            .map((row) => {
              return <tr key={row.id}>
                <td></td><td></td><td></td>
                <td>
                {row.typ} 
                </td>
                <td></td>
                <td>
                  
                {row.naklad}
                </td>
                <td></td><td></td><td></td><td></td>
          </tr>;
            }):<></>}
          </>
        );
      })}
    </tbody>
  </table>
</div>)

}

function Header() {
  return <div className={style.header}></div>;
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
    bok_oprawy: "",

    naklad: 0,
    index: Math.max(...newOprawa.map((f) => f.index)) + 1,
    uwagi: "",
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