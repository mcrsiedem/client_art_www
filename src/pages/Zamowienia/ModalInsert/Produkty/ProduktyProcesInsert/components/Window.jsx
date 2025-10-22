
import style from "../ProcesProdukt.module.css";

export default function Window({children}) {
  return (
    <div className={style.blurContainer}>
      <div className={style.window}>{children}</div>
    </div>
  );
}

