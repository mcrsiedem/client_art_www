import style from "../RowWykonanie.module.css";

export default function NarzadWykonania({ rowWykonanie }) {
  return (
    <div className={style.col_dane_przeloty}>
      <input
        className={style.input}
        value={rowWykonanie.narzad}
        onChange={(e) => {}}
      ></input>
    </div>
  );
}
