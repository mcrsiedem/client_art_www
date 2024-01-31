import style from "./Template.module.css";
import { _rodzaj_oprawy } from "../api";

export default function Template({ preOrder, setPreOrder }) {
  return (
    <div className={style.container}>
      <div className={style.produkt}>
        <Header />
        <Center preOrder={preOrder} setPreOrder={setPreOrder} />
      </div>
    </div>
  );
}

//--------------------------

function Header() {
  return <div className={style.header}>Dodaj produkt...</div>;
}

function Center({ preOrder, setPreOrder }) {
  return (
    <div className={style.main}>
      <Oprawa preOrder={preOrder} setPreOrder={setPreOrder}/>
    </div>
  );
}

function Oprawa({ preOrder, setPreOrder }) {
  return (
    <div className={style.col}>
      <label className={style.label}> Oprawa </label>
      <select
        className={style.firma}
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
