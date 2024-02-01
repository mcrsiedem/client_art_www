import style from "./Template.module.css";
import { _rodzaj_oprawy } from "../api";

export default function Template({ preOrder, setPreOrder,setShowTemplate,setShowParametryZamowienia }) {
  return (
    <div className={style.container}>
      <div className={style.produkt}>
        <Header />
        <Center preOrder={preOrder} setPreOrder={setPreOrder} setShowTemplate={setShowTemplate} setShowParametryZamowienia={setShowParametryZamowienia}/>
      </div>
    </div>
  );
}

//--------------------------

function Header() {
  return <div className={style.header}>Dodaj produkt...</div>;
}

function Center({ preOrder, setPreOrder,setShowTemplate,setShowParametryZamowienia  }) {
  return (
    <div className={style.main}>
      <Oprawa preOrder={preOrder} setPreOrder={setPreOrder}/>
      <Naklad preOrder={preOrder} setPreOrder={setPreOrder}/>
      <Okladka preOrder={preOrder} setPreOrder={setPreOrder}/>
      <Srodek preOrder={preOrder} setPreOrder={setPreOrder}/>
      <FormatX preOrder={preOrder} setPreOrder={setPreOrder}/>
      <FormatY preOrder={preOrder} setPreOrder={setPreOrder}/>
      <BokOprawy preOrder={preOrder} setPreOrder={setPreOrder}/>
      <Dodaj preOrder={preOrder} setPreOrder={setPreOrder}      setShowTemplate={setShowTemplate}
          setShowParametryZamowienia={setShowParametryZamowienia}/>
    </div>
  );
}

function Oprawa({ preOrder, setPreOrder }) {
  return (
    <div className={style.kontrolka}>
      <label className={style.label}> Oprawa </label>
      <select
        className={style.oprawa}
        value={preOrder.oprawa}
        onChange={(event) => {
          setPreOrder({ ...preOrder, oprawa: event.target.value });
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

function Naklad({preOrder,setPreOrder}){
  return(
      <div className={style.kontrolka}>
      <label className={style.label}> Nakład </label>
      <input className={style.naklad} type="text"
      value={preOrder.naklad}
      onChange={(event) => {
        setPreOrder({...preOrder, naklad: event.target.value});
      }}></input>
    </div>
  );
}

function Okladka({preOrder,setPreOrder}){
  return(
      <div className={style.kontrolka}>
      <label className={style.label}> Okładka strony </label>
      <input className={style.select} type="text"
      value={preOrder.strony_okl}
      onChange={(event) => {
        setPreOrder({...preOrder, strony_okl: event.target.value});
      }}></input>
    </div>
  );
}
function Srodek({preOrder,setPreOrder}){
  return(
      <div className={style.kontrolka}>
      <label className={style.label}> Srodek strony </label>
      <input className={style.select} type="text"
      value={preOrder.strony_srd}
      onChange={(event) => {
        setPreOrder({...preOrder, strony_srd: event.target.value});
      }}></input>
    </div>
  );
}

function FormatX({preOrder,setPreOrder}){
  return(
      <div className={style.kontrolka}>
      <label className={style.label}> Format x </label>
      <input className={style.select} type="text"
      value={preOrder.format_x}
      onChange={(event) => {
        setPreOrder({...preOrder, format_x: event.target.value});
      }}></input>
    </div>
  );
}

function FormatY({preOrder,setPreOrder}){
  return(
      <div className={style.kontrolka}>
      <label className={style.label}> Format y </label>
      <input className={style.select} type="text"
      value={preOrder.format_y}
      onChange={(event) => {
        setPreOrder({...preOrder, format_y: event.target.value});
      }}></input>
    </div>
  );
}
function BokOprawy({preOrder,setPreOrder}){
  return(
      <div className={style.kontrolka}>
      <label className={style.label}> Bok oprawy </label>
      <input className={style.select} type="text"
      value={preOrder.bok_oprawy}
      onChange={(event) => {
        setPreOrder({...preOrder, bok_oprawy: event.target.value});
      }}>
        
      </input>
    </div>
  );
}

function Dodaj({preOrder,setPreOrder,setShowTemplate,setShowParametryZamowienia }){
  return(
      <div className={style.kontrolka}>
   
      <button className={style.btn} type="text"
    
    onClick={() => {
        setShowTemplate(false);
         setShowParametryZamowienia(true);
      }}> Dodaj</button>
    </div>
  );
}





// function Typ({ row, handleChangeCardProdukty }) {
//   return (
//     <td>
//       <select
//         className={style.select}
//         defaultValue={row.typ}
//         onChange={(e) => {
//           handleChangeCardProdukty({
//             ...row,
//             typ: e.target.value,
//           });
//         }}
//       >
//         {}
//         {_typ_produktu.map((option) => (
//           <option key={option.id} value={option.id}>
//             {option.nazwa}
//           </option>
//         ))}
//       </select>
//     </td>
//   );
// }

// function Nazwa({ row, handleChangeCardProdukty }) {
//   return (
//     <td>
//       <input
//         className={style.in}
//         defaultValue={row.nazwa}
//         onChange={(e) =>
//           handleChangeCardProdukty({
//             ...row,
//             nazwa: e.target.value,
//           })
//         }
//       ></input>
//     </td>
//   );
// }
// function Uwagi({ row, handleChangeCardProdukty }) {
//   return (
//     <td>
//       <input
//         className={style.in}
//         defaultValue={row.uwagi}
//         onChange={(e) =>
//           handleChangeCardProdukty({
//             ...row,
//             uwagi: e.target.value,
//           })
//         }
//       ></input>
//     </td>
//   );
// }
// function Wersja({ row, handleChangeCardProdukty }) {
//   return (
//     <td>
//       <input
//         className={style.in}
//         defaultValue={row.wersja}
//         onChange={(e) =>
//           handleChangeCardProdukty({
//             ...row,
//             wersja: e.target.value,
//           })
//         }
//       ></input>
//     </td>
//   );
// }
